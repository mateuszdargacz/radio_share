'use strict';

angular.module('radio_share', [ 'ngRoute', 'ui.bootstrap', 'btford.socket-io' ])
    .config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'scripts/login/loginView.html',
                controller: 'loginCtrl'
            })
            .when('/main', {
                templateUrl: 'scripts/main/mainView.html',
                controller: 'MainCtrl'
            })
            .when('/register', {
                templateUrl: 'scripts/register/registerView.html',
                controller: 'registerCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }])


    .factory('socket', function ($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    });


