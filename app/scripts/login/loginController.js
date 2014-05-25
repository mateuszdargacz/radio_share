'use strict';

angular.module('radio_share')
    .controller('loginCtrl', [ '$scope', 'socket', '$location', '$window', '$http', 'postForm', function ($scope, socket, $location, $window, $http, postForm) {
        $scope.form_error = {
            text: '',
            error: false
        };
        $scope.my_login = function () {
            postForm.set_vars('/login', $('form[name="login"]'));
            postForm.set_callback(function (form_error) {
                if (!form_error.error) {
                    $location.path("/main")
                } else {
                    $scope.form_error = form_error;
                }
            });
            postForm.make_request();
        };

    }]);
