'use strict';
angular.module('radio_share')
    .factory("postForm", function ($http) {
        var vars = {
            url: '',
            data: '',
            callback: function () {
                return "Please provide callback function"
            }
        };
        return {
            set_vars: function (url, data) {
                vars.url = url;
                vars.data = data;
            },
            set_callback: function (fun) {
                vars.callback = fun;
            },
            make_request: function () {
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

                var form_state = {
                    error: true,
                    text: ''
                };
                var responsePromise = $http({
                    method: 'POST',
                    url: vars.url,
                    data: vars.data.serializeObject(),
                    json: true,
                    headers: {'Content-Type': 'application/json'}
                });
                responsePromise.success(function (data, status, headers, config) {
                    if (data.success) {
                        form_state.error = false;
                    } else if (data.error) {
                        form_state = {
                            text: data.text,
                            error: data.error
                        };
                    }
                    vars.callback(form_state);
                });
                responsePromise.error(function (data, status, headers, config) {
                    form_state = {
                        text: "server connection error",
                        error: true
                    };
                    vars.callback(form_state);
                });
            }

        }
    });