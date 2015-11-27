angular.module('student.service', [])
        .factory('student',
                function (router, $q) {
                    var student = {
                        // Attempt to add new student
                        addstudent: function (data) {
                            var deferred = $q.defer();
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
                        // Attempt to get student detail
                        studentdetailsbyid: function (id) {
                            var deferred = $q.defer();
                            router.trigger('/api/student/'+id, 'get').then(function (response) {
                                deferred.resolve(response);
                            });
                            return deferred.promise;
                        }
                    };
                    return student;
                }
        );