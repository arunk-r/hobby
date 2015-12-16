angular.module('admintransaction.service', [])
        .factory('transaction',
                function (router, $q, Flash) {
                    var users = {
                        // Attempt to get application users list
                        getall: function (years) {
                            var deferred = $q.defer();
                            router.trigger('/api/admin/transaction/'+years, 'get').then(
                                    function (response) {
                                        if (!response.success) {
                                            var message = '<strong> Something Wrong!...</strong> Please contact Arun Kumar(9980130541).';
                                            Flash.create('warning', message, 'custom-class');
                                        }
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to get application users list
                        getdetail: function (id) {
                            var deferred = $q.defer();
                            router.trigger('/api/admin/transaction/' + id, 'get').then(
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
                            router.trigger('/api/admin/transaction/create', 'post', data).then(
                                    function (response) {
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to in activate application user
                        inactive: function (id) {
                            var deferred = $q.defer();
                            router.trigger('/api/admin/transaction/' + id, 'delete').then(
                                    function (response) {
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        }
                    };
                    return users;
                }
        );