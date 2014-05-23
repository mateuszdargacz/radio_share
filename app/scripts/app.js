'use strict';

angular.module( 'radio_share', [ 'ngRoute', 'ui.bootstrap', 'btford.socket-io' ])
    .config( [ '$routeProvider', '$locationProvider', function ( $routeProvider, $locationProvider ) {
        $routeProvider
        .when( '/login', {
            templateUrl: 'scripts/login/loginView.html',
            controller: 'loginCtrl'
        })
        .when( '/radio', {
            templateUrl: 'scripts/main/mainView.html',
            controller: 'MainCtrl'
        })
        .when( '/', {
            templateUrl: 'scripts/register/registerView.html',
            controller: 'registerCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode( true );
    }]);
