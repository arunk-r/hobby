angular.module('security.service', [])
        .factory('security',
                function (router, $q, securityAuthorization) {
                    var service = {
                        // Attempt to authenticate a user by the given username and password
                        login: function (username, password) {
                            var deferred = $q.defer();
                            router.trigger('/user/login', 'post', {username: username, password: password}).then(
                                    function (response) {
                                        if (response.success) {
                                            securityAuthorization.currentUser = response.data[0];
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
                                            securityAuthorization.currentUser = response.data[0];
                                        }
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        }
                    };
                    return service;
                }
        );