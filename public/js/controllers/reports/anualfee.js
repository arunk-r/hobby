//Attempt to get requested year anual fee report
angular.module('AnualFeeCtrl', [])
        .controller('AnualFeeController',
                function ($scope, $routeParams, report, Flash) {
                    $scope.year = $routeParams.years;
                    $scope.anualfeeData = {};
                    report.anualfee($scope.year).then(function (data) {
                        if (data.length > 0)
                            $scope.anualfeeData = data;
                        else {
                            $scope.anualfeeData = '';
                            var message = '<strong> Information!</strong>  No data found for the financial year ' + $scope.year + '. ';
                            Flash.create('info', message, 'custom-class');
                        }
                    }, function (e) {
                        var message = '<strong> Error!</strong>  Something went wrong, Please relogin to system. ' + e;
                        Flash.create('danger', message, 'custom-class');
                    });
                    $scope.getPUC1Fee = function () {
                        var total = 0;
                        for (i = 0; i < $scope.anualfeeData.length; i++) {
                            total += $scope.anualfeeData[i]._id.puc1fee;
                        }
                        if (total > 0)
                            return total;
                    };
                    $scope.getPUC2Fee = function () {
                        var total = 0;
                        for (i = 0; i < $scope.anualfeeData.length; i++) {
                            total += $scope.anualfeeData[i]._id.puc2fee;
                        }
                        if (total > 0)
                            return total;
                    };
                    $scope.getTotalPaidAmount = function () {
                        var total = 0;
                        for (i = 0; i < $scope.anualfeeData.length; i++) {
                            total += $scope.anualfeeData[i].totalFeePaid;
                        }
                        if (total > 0)
                            return total;
                    };
                }
        );

//Attempt to get current financial year anual fee report
angular.module('CurrentYearFeeCtrl', [])
        .controller('CurrentYearFeeController',
                function ($scope, report, Flash) {
                    $scope.year = currentFinancialYear();
                    $scope.anualfeeData = {};
                    report.anualfee($scope.year).then(function (data) {
                        if (data.length > 0)
                            $scope.anualfeeData = data;
                        else {
                            $scope.anualfeeData = '';
                            var message = '<strong> Information!</strong>  No data found for the financial year ' + $scope.year + '. ';
                            Flash.create('info', message, 'custom-class');
                        }
                    }, function (e) {
                        var message = '<strong> Error!</strong>  Something went wrong, Please relogin to system. ' + e;
                        Flash.create('danger', message, 'custom-class');
                    });
                    $scope.getPromisedFeeToBeCollected = function () {
                        var total = 0;
                        var fee = 0;
                        for (i = 0; i < $scope.anualfeeData.length; i++) {
                            fee = ($scope.anualfeeData[i]._id.class === 'PUC1') ? $scope.anualfeeData[i]._id.puc1fee : $scope.anualfeeData[i]._id.puc2fee
                            total += fee;
                        }
                        if (total > 0)
                            return total;
                    };
                    $scope.getTotalPaidAmount = function () {
                        var total = 0;
                        for (i = 0; i < $scope.anualfeeData.length; i++) {
                            total += $scope.anualfeeData[i].totalFeePaid;
                        }
                        if (total > 0)
                            return total;
                    };
                }
        );

var currentFinancialYear = function () {
    var todayDate = new Date();
    var year = todayDate.getFullYear();
    var yearEndDate = new Date(year, 2, 31, 23, 59);
    if (todayDate <= yearEndDate) {
        return (+year - +1) + '-' + year;
    } else {
        return year + '-' + (+year + +1);
    }
};

//Attempt to get current academic year student extrace report
angular.module('StudentExtractCtrl', [])
        .controller('StudentExtractController',
                function ($scope, report, Flash) {
                    $scope.studentExtractData = {};
                    $scope.year = currentFinancialYear();

                    report.studentsextract().then(function (data) {
                        if (data.length > 0) {
                            $scope.studentExtractData = data;
                        } else {
                            $scope.studentExtractData = '';
                            var message = '<strong> Information!</strong>  No data found for the financial year ' + $scope.year + '. ';
                            Flash.create('info', message, 'custom-class');
                        }
                    }, function (e) {
                        var message = '<strong> Error!</strong>  Something went wrong, Please relogin to system. ' + e;
                        Flash.create('danger', message, 'custom-class');
                    });
                    $scope.getCount = function (cls) {
                        var log = 0;
                        angular.forEach($scope.studentExtractData, function (value, key) {
                            if (value._id.class === cls || cls === undefined)
                                log += value.count;
                        }, log);
                        return log;
                    };
                    $scope.getCasteClassGenderCount = function (caste, cls, gender) {
                        var log = 0;
                        angular.forEach($scope.studentExtractData, function (value, key) {
                            if (value._id.caste === caste && value._id.class === cls && value._id.gender === gender)
                                log = value.count;
                        }, log);
                        return log;
                    };
                    $scope.getCasteGenderCount = function (caste, gender) {
                        var log = 0;
                        angular.forEach($scope.studentExtractData, function (value, key) {
                            if (value._id.caste === caste && value._id.gender === gender)
                                log += value.count;
                        }, log);
                        return log;
                    };
                    $scope.getCasteCount = function (caste, cls) {
                        var log = 0;
                        angular.forEach($scope.studentExtractData, function (value, key) {
                            if (value._id.caste === caste && (value._id.class === cls || cls === undefined))
                                log += value.count;
                        }, log);
                        return log;
                    };
                    $scope.getGenderCount = function (gender, cls) {

                        var log = 0;
                        angular.forEach($scope.studentExtractData, function (value, key) {
                            if (value._id.gender === gender && (value._id.class === cls || cls === undefined))
                                log += value.count;
                        }, log);
                        return log;
                    };
                }
        );

//Attempt to get current financial year exam fee report
angular.module('CurrentYearExamFeeCtrl', [])
        .controller('CurrentYearExamFeeController',
                function ($scope, report, Flash) {
                    $scope.year = currentFinancialYear();
                    $scope.examfeeData = {};
                    report.examfee($scope.year).then(function (data) {
                        if (data.length > 0)
                            $scope.examfeeData = data;
                        else {
                            $scope.examfeeData = '';
                            var message = '<strong> Information!</strong>  No data found for the financial year ' + $scope.year + '. ';
                            Flash.create('info', message, 'custom-class');
                        }
                    }, function (e) {
                        var message = '<strong> Error!</strong>  Something went wrong, Please relogin to system. ' + e;
                        Flash.create('danger', message, 'custom-class');
                    });
                    $scope.getTotalPaidAmount = function () {
                        var total = 0;
                        for (i = 0; i < $scope.examfeeData.length; i++) {
                            total += $scope.examfeeData[i].totalFeePaid;
                        }
                        if (total > 0)
                            return total;
                    };
                }
        );

//Attempt to get current financial year miscellaneous fee report
angular.module('CurrentYearMiscellaneousFeeCtrl', [])
        .controller('CurrentYearMiscellaneousFeeController',
                function ($scope, report, Flash) {
                    $scope.year = currentFinancialYear();
                    $scope.miscellaneousfeeData = {};
                    report.miscellaneousfee($scope.year).then(function (data) {
                        if (data.length > 0)
                            $scope.miscellaneousfeeData = data;
                        else {
                            $scope.anualfeeData = '';
                            var message = '<strong> Information!</strong>  No data found for the financial year ' + $scope.year + '. ';
                            Flash.create('info', message, 'custom-class');
                        }
                    }, function (e) {
                        var message = '<strong> Error!</strong>  Something went wrong, Please relogin to system. ' + e;
                        Flash.create('danger', message, 'custom-class');
                    });
                    $scope.getTotalPaidAmount = function () {
                        var total = 0;
                        for (i = 0; i < $scope.miscellaneousfeeData.length; i++) {
                            total += $scope.miscellaneousfeeData[i].totalFeePaid;
                        }
                        if (total > 0)
                            return total;
                    };
                }
        );