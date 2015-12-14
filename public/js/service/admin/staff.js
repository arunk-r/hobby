angular.module('adminstaff.service', [])
        .factory('staff',
                function (router, $q, Flash) {
                    var users = {
                        // Attempt to get application users list
                        getall: function () {
                            var deferred = $q.defer();
                            router.trigger('/api/admin/staff', 'get').then(
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
                            router.trigger('/api/admin/staff/' + id, 'get').then(
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
                            router.trigger('/api/admin/staff/create', 'post', data).then(
                                    function (response) {
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to in activate application user
                        inactive: function (id) {
                            var deferred = $q.defer();
                            router.trigger('/api/admin/staff/' + id, 'delete').then(
                                    function (response) {
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        }
                    };
                    return users;
                }
        );