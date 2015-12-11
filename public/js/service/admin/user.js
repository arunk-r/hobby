angular.module('adminuser.service', [])
        .factory('users',
                function (router, $q, Flash) {
                    var users = {
                        // Attempt to get application users list
                        getall: function () {
                            var deferred = $q.defer();
                            router.trigger('/api/admin/users', 'get').then(
                                    function (response) {
                                        if (!response.success) {
                                            var message = '<strong> Something Wrong!...</strong> Please contact Arun Kumar(9980130541).';
                                            Flash.create('warning', message, 'custom-class');
                                        }
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to crate application user
                        create: function (data) {
                            var deferred = $q.defer();
                            router.trigger('/api/admin/user/create', 'post', data).then(
                                    function (response) {
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to in activate application user
                        inactive: function (id) {
                            var deferred = $q.defer();
                            router.trigger('/api/admin/user/'+id, 'delete').then(
                                    function (response) {
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        }
                    };
                    return users;
                }
        );