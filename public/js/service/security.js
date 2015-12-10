angular.module('security.service', [])
        .factory('security',
                function (router, $q, securityAuthorization) {
                    var service = {
                        // Attempt to authenticate a user by the given username and password
                        signin: function (username, password) {
                            var deferred = $q.defer();
                            router.trigger('/user/login', 'post', {username: username, password: password}).then(
                                    function (response) {
                                        if (response.success) {
                                            securityAuthorization.setAuthenticatedUser(response.data[0]);
                                        }
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to Sign up the new user by the given username and password
                        signup: function (username, password) {
                            var deferred = $q.defer();
                            router.trigger('/user/signup', 'post', {username: username, password: password}).then(
                                    function (response) {
                                        if (response.success) {
                                            securityAuthorization.setAuthenticatedUser(response.data[0]);
                                        }
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to lOGOUT THE USER
                        signout: function () {
                            var deferred = $q.defer();
                            router.trigger('/user/logout', 'get').then(
                                    function (response) {
                                        securityAuthorization.setAuthenticatedUser('');
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to send forget password details
                        forgetpwd: function (data) {
                            var deferred = $q.defer();
                            router.trigger('/user/forgot', 'post', data).then(
                                    function (response) {
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to send reset password details
                        resetpwd: function (username, token, password) {
                            var deferred = $q.defer();
                            router.trigger('/user/reset/' + username + '/' + token, 'post', {password: password}).then(
                                    function (response) {
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        }
                    };
                    return service;
                }
        );