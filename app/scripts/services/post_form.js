'use strict';
angular.module('radio_share')
    .factory("postForm", function ($http) {
        var vars = {
            url: '',
            data: ''
        };
        return {
            set_vars: function (url, data) {
                vars.url = url;
                vars.data = data;
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
                    error: false,
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
                    console.log('asssa', data)
                    if (data.success) {
                        form_state.error = false;
                        alert(data.aiggght)
                    } else if (data.error) {
                        form_state = {
                            text: data.error,
                            error: true
                        };
                    }

                });
                responsePromise.error(function (data, status, headers, config) {
                    form_state = {
                        text: data.error,
                        error: true
                    };
                });
                return form_state;
            }

        }
    });