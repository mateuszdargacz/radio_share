'use strict';

var appConfig = require('../../app-config.json'),
    db = require('../db').client.db(appConfig.database.name);

// Example route - returns all items in database collection
module.exports = function (req, res) {

    console.log('Accessing database ' + db.databaseName);

    db.collection(appConfig.database.user_collection, function (err, collection) {
        if (err) {
            console.log('Error accessing collection');
            console.log(err);
            res.json({
                error: err
            });
        }

        // Find all items and return them
        collection.find().toArray(function (err, items) {
            if (err) {
                console.log('Error finding items in collection');
                console.log(err);
                res.json({
                    error: err
                });
            }

            res.json(items);
        });
    });

};