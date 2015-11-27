angular.module('router.service', [])
        .factory('router',
                function ($http, $location, $q, securityAuthorization) {

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