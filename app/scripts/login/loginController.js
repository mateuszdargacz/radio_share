'use strict';

angular.module('radio_share')
    .controller('loginCtrl', [ '$scope', 'socket', '$location', '$window', '$http', function ($scope, socket, $location, $window, $http) {
        $.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };

        $scope.form_error = {
            text: '',
            error: false
        };
        $scope.my_login = function () {

            var responsePromise = $http({
                method: 'POST',
                url: '/login',
                data: $('form[name="login"]').serializeObject(),
                json: true,
                headers: {'Content-Type': 'application/json'}
            });
            responsePromise.success(function (data, status, headers, config) {
                if (data.success) {
                    $scope.form_error.error = false;
                    $location.path("/main");
                } else if (data.error) {
                    $scope.form_error = {
                        text: data.error,
                        error: true
                    };
                }

            });
            responsePromise.error(function (data, status, headers, config) {
                $scope.form_error = {
                    text: data.error,
                    error: true
                };
            });
        };

    }]);
