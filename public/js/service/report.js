angular.module('report.service', [])
        .factory('report',
                function (router, $q) {
                    var reports = {
                        // Attempt to get Anual Fee Report based on financial year
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
                        // Attempt to get Anual Fee Report based on financial year
                        examfee: function (year) {
                            var deferred = $q.defer();
                            router.trigger('/api/report/anual/' + year + '/exam/fee', 'get').then(
                                    function (response) {
                                        if (response.success) {
                                            deferred.resolve(response.data);
                                        }
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to get Monthly Fee Report for the specified year
                        monthlyfee: function (year, month) {
                            var deferred = $q.defer();
                            router.trigger('/api/report/month/' + year + '/' + month + '/fee', 'get').then(
                                    function (response) {
                                        if (response.success) {
                                            deferred.resolve(response.data);
                                        }
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to get Anual Fee Report based on financial year
                        miscellaneousfee: function (year) {
                            var deferred = $q.defer();
                            router.trigger('/api/report/anual/' + year + '/miscellaneous/fee', 'get').then(
                                    function (response) {
                                        if (response.success) {
                                            deferred.resolve(response.data);
                                        }
                                        deferred.resolve(response);
                                    });
                            return deferred.promise;
                        },
                        // Attempt to current academic year studnets extract based on caste and gender
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
                        },
                        // Attempt to current academic year balance sheet
                        balancesheet: function () {
                            var deferred = $q.defer();
                            router.trigger('/api/admin/report/balancesheet', 'get').then(
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