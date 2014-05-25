'use strict';
/* jshint camelcase: false */

// Dependencies
var appConfig = require('./index').appConfig,
    mongo = require('mongodb');

var server = new mongo.Server(appConfig.database.host, appConfig.database.port, { auto_reconnect: true }),
    client = module.exports.client = new mongo.MongoClient(server);


module.exports.get_user = function (req, res) {
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


    });
};
//'use strict';
//
//var appConfig   = require( '../../app-config.json' ),
//    db          = require( '../db' ).db( appConfig.database.name );
//
//// Example route - returns all items in database collection
//module.exports = function( req, res ) {
//
//    console.log( 'Accessing database ' + db.databaseName );
//
//    db.collection( appConfig.database.collection, function( err, collection ) {
//        if ( err ) {
//            console.log( 'Error accessing collection' );
//            console.log( err );
//            return err;
//        }
//
//        // Find all items and return them
//        collection.find().toArray( function( err, items ) {
//            if ( err ) {
//                console.log( 'Error finding items in collection' );
//                console.log( err );
//                return err;
//            }
//
//            res.send( items );
//        } );
//    } );
//
//};