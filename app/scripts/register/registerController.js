'use strict';

angular.module( 'radio_share' )
    .controller('registerCtrl', [ '$scope', 'socket', '$location', '$window', '$http', 'postForm', function ($scope, socket, $location, $window, $http, postForm) {
        $scope.form_error = {
            text: '',
            error: false
        };
        $scope.my_register = function () {
            postForm.set_vars('/register', $('form[name="register"]'));
            $scope.form_error = postForm.make_request();
            console.log('es', $scope.form_error);
            $scope.form_error.text = "You shall not pass";
            $scope.form_error.error = true;
        }


    }]);
