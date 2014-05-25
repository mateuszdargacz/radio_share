'use strict';
/* jshint camelcase: false */

// Dependencies
var appConfig = require('./index').appConfig,
    mongo = require('mongodb');

var server = new mongo.Server(appConfig.database.host, appConfig.database.port, { auto_reconnect: true }),
    client = module.exports.client = new mongo.MongoClient(server);


var create_user = function (collection, user) {
    console.log('Creating collection...');
    collection.insert(user, function (err, res) {
        if (err) {
            console.log('Error inserting collection data');
            console.log(err);
            return  {
                error: true,
                text: err
            };
        }

        console.log('Collection populated');
        return {
            success: true
        };
    });
};


module.exports.create_user = function (req, res) {
    var user = req.body;
    // Open a client to mongo
    client.open(function (err, client) {
        if (err) {
            console.log('Database connection error\nis mongod running?');
            console.log(err);
            res.json({
                error: true,
                text: err
            });
        }

        console.log('Database connection to ' + client.db(appConfig.database.name).databaseName);

        // Always create a new collection
        var db = client.db(appConfig.database.name);
        db.createCollection(appConfig.database.user_collection, function (err, collection) {
            if (err) {
                console.log('Error creating collection');
                console.log(err);
                db.close();
                res.json({
                    error: true,
                    text: err
                });
            }

            // If user exists
            collection.find({

                $or: [
                    {username: user.username},
                    {email: user.email}
                ]

            }).toArray(function (err, items) {

                    if (err) {
                    console.log('Error accessing collection');
                    console.log(err);
                        res.json({
                            error: true,
                            text: err
                        });
                    }

                if (items.length <= 0) {

                    return create_user(collection, user);
                } else {
                    console.log("exists");
                    res.json({
                        error: true,
                        text: "User with that email or username already exists."
                    });
                }
            });

        }, function () {
            console.log("callback");
        });
    });

// Create dummy data for the collection

};


