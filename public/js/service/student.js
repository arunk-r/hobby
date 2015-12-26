angular.module('student.service', [])
        .factory('student',
                function (router, $q) {
                    var student = {
                        // Attempt to add new student
                        addstudent: function (data) {
                            var deferred = $q.defer();
                            //console.log(data)
                            router.trigger('/api/student/add', 'post', data).then(function (response) {
                                deferred.resolve(response);
                            });
                            return deferred.promise;
                        },
                        // Attempt to get all students
                        viewstudents: function () {
                            var deferred = $q.defer();
                            router.trigger('/api/students', 'get').then(function (response) {
                                deferred.resolve(response);
                            });
                            return deferred.promise;
                        },
                        // Attempt to get student detail by id
                        studentdetailsbyid: function (id) {
                            var deferred = $q.defer();
                            router.trigger('/api/student/' + id, 'get').then(function (response) {
                                deferred.resolve(response);
                            });
                            return deferred.promise;
                        },
                        // Attempt to pay student fee
                        payfee: function (id, data) {
                            var deferred = $q.defer();
                            //console.log(data);
                            router.trigger('/api/student/' + id + '/fee/add', 'post', data).then(function (response) {
                                deferred.resolve(response);
                            });
                            return deferred.promise;
                        },
                        // Admin features
                        // Attempt to move all sutudent to next class
                        movestudents: function () {
                            var deferred = $q.defer();
                            router.trigger('/api/admin/student/move', 'patch').then(function (response) {
                                deferred.resolve(response);
                            });
                            return deferred.promise;
                        },
                        // Attempt to search all sutudents
                        search: function (data) {
                            var deferred = $q.defer();
                            router.trigger('/api/student/search', 'post', data).then(function (response) {
                                deferred.resolve(response);
                            });
                            return deferred.promise;
                        },
                        updatestudent: function (id, data) {
                            var deferred = $q.defer();
                            router.trigger('/api/student/' + id + '/update', 'put', data).then(function (response) {
                                deferred.resolve(response);
                            });
                            return deferred.promise;
                        }
                    };
                    return student;
                }
        );