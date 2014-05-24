'use strict';

// Dependencies
var server = require( './../server' ).server;


// Router
// Index route - usually served as static via express
server.get('/', require('./main').index);

//auth Routes
server.post('/login', require('../auth/login'));
server.post('/register', require('../auth/register'));
server.get('/logout', require('../auth/logout'));
//End auth Routes

// Example route
server.get( '/route/:route', require( './example' ) );

// Example database route
server.get( '/db', require( '../db/example' ) );

// Catch all
server.get('*', require('./main').notFound);
