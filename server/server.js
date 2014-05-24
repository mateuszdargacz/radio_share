'use strict';

/**
 * Module dependencies
 */

var express = require('express'),
    connect = require('connect'),
    cons = require('consolidate'),
    http = require('http'),
    path = require('path'),
    io = require('socket.io'),
    appConfig = require('./../app-config.json'),
    passport = exports.passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passportSocketIo = require('passport.socketio'),
    sessionStore = new connect.session.MemoryStore(),
    sessionSecret = 'wielkiSekret44',
    sessionKey = 'connect.sid';

// Server instance
var server = exports.server = express();


// Konfiguracja passport.js
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        if ((username === 'admin') && (password === 'tajne')) {
            return done(null, {
                username: username,
                password: password
            });
        } else {
            return done(null, false);
        }
    }
));

server.use(express.cookieParser());
server.use(express.urlencoded());
server.use(express.methodOverride());
server.use(express.session({
    store: sessionStore,
    key: sessionKey,
    secret: sessionSecret
}));
server.use(passport.initialize());
server.use(passport.session());


// Configure Server
server.configure(function () {
    server.set('port', process.env.PORT || appConfig.server.port);
    server.set('views', path.join(__dirname, './../app'));
    server.engine('html', cons.hogan);
    server.set('view engine', 'html');
    server.engine('hjs', cons.hogan);
    server.set('view engine', 'hjs');

    server.use(express.bodyParser());
    server.use(express.methodOverride());
    server.use(express.static(path.join(__dirname, './../app')));
    server.use(server.router);
});

server.configure('development', function () {
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.configure('production', function () {
    server.use(express.errorHandler());
});

var onAuthorizeSuccess = function (data, accept) {
    console.log('Udane połączenie z socket.io');
    accept(null, true);
};

var onAuthorizeFail = function (data, message, error, accept) {
    if (error) {
        throw new Error(message);
    }
    console.log('Nieudane połączenie z socket.io:', message);
    accept(null, false);
};


// Start server - hook in sockets instance
exports.io = io.listen(http.createServer(server).listen(server.get('port'), function () {
    console.log('Express server listening on ' + server.get('port'));
}));
exports.io.set('authorization', passportSocketIo.authorize({
    passport: require('passport'),
    cookieParser: express.cookieParser,
    key: sessionKey, // nazwa ciasteczka, w którym express/connect przechowuje identyfikator sesji
    secret: sessionSecret,
    store: sessionStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
}));

exports.io.set('log level', 2); // 3 == DEBUG, 2 == INFO, 1 == WARN, 0 == ERROR

// Configure Routes
require('./routes');

// Configure Sockets
require('./sockets');

// Configure Database
require('./db');
