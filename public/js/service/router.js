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
                            } else {
                                throw new Error('Invalid Request');
                            }
                            request.then(function (response) {
                                if (response.data && response.data.authError) {
                                    securityAuthorization.setAuthenticatedUser('');
                                    var message = '<strong> Error!..</strong>  Authentication Error, Please login to System. ';
                                    Flash.create('danger', message, 'custom-class');
                                    return $location.path('/login');
                                } else if (response.data && !(!!response.data.errors || !!response.data.errfor)) {
                                    var message = '<strong> Warning!..</strong>  Problem in processing your current request. ';
                                    Flash.create('warning', message, 'custom-class');
                                    return $location.path('/login');
                                }
                                deferred.resolve(response.data);
                            });
                            return deferred.promise;
                        }
                    };
                    return router;
                }
        );