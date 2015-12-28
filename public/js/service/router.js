angular.module('router.service', [])
        .factory('router',
                function ($http, $location, $q, securityAuthorization, Flash) {

                    var router = {
                        // Attempt to invoke all routes with one port of entry
                        trigger: function (url, type, data) {
                            var deferred = $q.defer();
                            var request = null;
                            if (!url || !type) {
                                throw new Error('Invalid Request');
                            }
                            type = type.toUpperCase();
                            if (type === 'GET') {
                                request = $http.get(url);
                            } else if (type === 'POST') {
                                request = $http.post(url, data);
                            } else if (type === 'DELETE') {
                                request = $http.delete(url, data);
                            } else if (type === 'PUT') {
                                request = $http.put(url, data);
                            } else if (type === 'OPTIONS') {
                                request = $http.options(url, data);
                            } else if (type === 'PATCH') {
                                request = $http.patch(url, data);
                            } else {
                                throw new Error('Invalid Request');
                            }
                            request.then(function (response) {
                                //console.log(response.data)
                                //console.log(!!response.data.errors)
                                //console.log(!!response.data.errfor)
                                if (response.data && response.data.authenticationError) {
                                    securityAuthorization.setAuthenticatedUser('');
                                    var message = '<strong> Error!..</strong>' + data.errors[0];
                                    Flash.create('danger', message, 'custom-class');
                                    return $location.path('/login');
                                } else if (response.data && response.data.authorizationError) {
                                    securityAuthorization.setAuthenticatedUser('');
                                    var message = '<strong> Warning!..</strong> ' + data.errors[0];
                                    Flash.create('warning', message, 'custom-class');
                                    return $location.path('/login');
                                } else if (response.data && !response.data.success) {
                                    var message = '<strong> Warning!..</strong>  Problem in processing your current request. ';
                                    Flash.create('warning', message, 'custom-class');
                                }
                                deferred.resolve(response.data);
                            });
                            return deferred.promise;
                        }
                    };
                    return router;
                }
        );