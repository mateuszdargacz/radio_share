'use strict';

angular.module('radio_share')
    .controller('registerCtrl', [ '$scope', 'socket', '$location', '$window', '$http', 'postForm', function ($scope, socket, $location, $window, $http, postForm) {
        $scope.form_error = {
            text: '',
            error: false
        };
        $scope.my_register = function () {
            postForm.set_vars('/register', $('form[name="register"]'));
            postForm.set_callback(function (form_error) {
                $scope.form_error = form_error;
            });
            postForm.make_request();
        }


    }]);
