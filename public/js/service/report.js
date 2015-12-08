angular.module('report.service', [])
        .factory('report',
                function (router, $q) {
                    var reports = {
                        // Attempt to get Anula Fee Report based on financial year
                        anualfee: function (year) {
                            var deferred = $q.defer();
                            router.trigger('/api/report/anual/' + year + '/fee', 'get').then(
                                    function (response) {
                                        if (response.success) {
                                            deferred.resolve(response.data);
                                        }
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        studentsextract: function () {
                            var deferred = $q.defer();
                            router.trigger('/api/report/studentsextract', 'get').then(
                                    function (response) {
                                        if (response.success) {
                                            deferred.resolve(response.data);
                                        }
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        }
                    };
                    return reports;
                }
        );