'use strict';
/* jshint camelcase: false */

// Dependencies
var appConfig = require('./index').appConfig,
    mongo = require('mongodb'),
    create_user;
var server = new mongo.Server(appConfig.database.host, appConfig.database.port, { auto_reconnect: true }),
    client = module.exports.client = new mongo.MongoClient(server);
module.exports.create_user = function (user) {
    // Open a client to mongo
    client.open(function (err, client) {
        if (err) {
            console.log('Database connection error\nis mongod running?');
            console.log(err);
            return {
                error: err
            };
        }

        console.log('Database connection to ' + client.db(appConfig.database.name).databaseName);

        // Always create a new collection
        var db = client.db(appConfig.database.name);
        db.createCollection(appConfig.database.collection, function (err, collection) {
            if (err) {
                console.log('Error creating collection');
                console.log(err);
                return {
                    error: err
                };
            }

            // If collection is empty then create some dummy data
            collection.find({}).toArray(function (err, items) {
                if (err) {
                    console.log('Error accessing collection');
                    console.log(err);
                    return {
                        error: err
                    };
                }

                if (items.length <= 0) {
                    create_user(collection);
                }
                return {
                    success: true
                };
            });
            client.close();
            return  {
                error: err
            };
        }, function () {
            console.log("callback");
        });
    });

// Create dummy data for the collection
    create_user = function (collection) {
        console.log('Creating collection...');

        var dummy = [
            {
                name: 'Albert',
                surname: 'Dargacz',
                username: "dargol",
                email: 'matimilan@o2.pl',
                password: 'password'
            }

        ];
        console.log("IASFMKASFMSAKFMSAKFKASMFAS");
        console.log(user);

        collection.insert(user, function (err, res) {
            if (err) {
                console.log('Error inserting collection data');
                console.log(err);
                return  {
                    error: err
                };
            }

            console.log('Collection populated');
            return {
                success: true
            };
        });
    };
};


