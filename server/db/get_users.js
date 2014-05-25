'use strict';
/* jshint camelcase: false */

// Dependencies
var appConfig = require('./index').appConfig,
    mongo = require('mongodb');

var server = new mongo.Server(appConfig.database.host, appConfig.database.port, { auto_reconnect: true }),
    client = module.exports.client = new mongo.MongoClient(server);


module.exports.get_user = function (user, callback) {
    client.open(function (err, client) {
        if (err) {
            console.log('Database connection error\nis mongod running?');
            console.log(err);
            return callback({
                error: true,
                text: err
            });
        }
        console.log('Database connection to ' + client.db(appConfig.database.name).databaseName);
        var db = client.db(appConfig.database.name);
        db.createCollection(appConfig.database.user_collection, function (err, collection) {
            if (err) {
                console.log('Error creating collection');
                console.log(err);
                db.close();
                return callback({
                    error: true,
                    text: err
                });
            }
            collection.find({
                username: user.username,
                password: user.password
            }).toArray(function (err, items) {
                    console.log("USER SEARCH");
                    console.log(user.username, user.password);
                    console.log(items);
                    return callback({
                        error: (items.length <= 0),
                        text: err,
                        user: (items.length > 0) ? items[0] : undefined
                    });

                });

        }, function () {
            console.log("callback");
        });
    });
};