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

angular.module('CurrentYearFeeCtrl', [])
        .controller('CurrentYearFeeController',
                function ($scope, report, Flash) {
                    $scope.year = '';
                    var todayDate = new Date();
                    var year = todayDate.getFullYear();
                    var yearEndDate = new Date(year, 2, 31, 23, 59);
                    if (todayDate <= yearEndDate) {
                        $scope.year = (+year - +1) + '-' + year;
                    } else {
                        $scope.year = year + '-' + (+year + +1);
                    }
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