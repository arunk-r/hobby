angular.module('ReportsCtrl', [])
        .controller('ReportsController',
                function ($scope, $state, $stateParams, $location) {
                    $scope.reportsData = {};
                    $scope.anualreportData = getFinancialYears();//[{years: '2015-2016', name: '2015-2016'}, {code: '2016-2017', name: '2016-2017'}, {code: '2017-2018', name: '2017-2018'}];
                    $scope.showAnualFeeReport = function () {
                        var years = $scope.selectedItem.name;
                        //console.log(years);
                        $stateParams.years = years;
                        $location.path('/report/anual/' + years + '/fee');
                        $state.go('selectedyearfee', $stateParams);
                    };
                }
        );

angular.module('BalanceSheetCtrl', [])
        .controller('BalanceSheetController',
                function ($scope, $state, $stateParams, $location, report, transaction, Flash) {
                    $scope.year = currentFinancialYear();
                    report.balancesheet().then(function (data) {
                        $scope.sheetData = data;
                        console.log($scope.sheetData);
                    }, function (e) {
                        var message = '<strong> Error!</strong>  Something went wrong, Please relogin to system. ' + e;
                        Flash.create('danger', message, 'custom-class');
                    });
                    transaction.getall(currentFinancialYear()).then(function (data) {
                        $scope.transactionList = data.data;
                        $scope.credits = credits();
                        $scope.debits = debits();
                        console.log($scope.transactionList);
                    }, function (e) {
                        var message = '<strong> Error!</strong>  Something went wrong, Please relogin to system. ' + e;
                        Flash.create('danger', message, 'custom-class');
                    });
                    report.anualfee($scope.year).then(function (data) {
                        if (data.length > 0) {
                            $scope.anualfeeData = data;
                            console.log($scope.anualfeeData);
                            $scope.getTotalPaid = getTotalPaidAmount();
                        } else {
                            $scope.anualfeeData = '';
                            var message = '<strong> Information!</strong>  No fee collected data found for the financial year ' + $scope.year + '. ';
                            Flash.create('info', message, 'custom-class');
                        }
                    }, function (e) {
                        var message = '<strong> Error!</strong>  Something went wrong, Please relogin to system. ' + e;
                        Flash.create('danger', message, 'custom-class');
                    });
                    var getTotalPaidAmount = function () {
                        var total = 0;
                        for (i = 0; i < $scope.anualfeeData.length; i++) {
                            total += $scope.anualfeeData[i].totalFeePaid;
                        }
                        if (total > 0)
                            return total;
                    };
                    var credits = function () {
                        var total = 0;
                        for (i = 0; i < $scope.transactionList.length; i++) {
                            if ($scope.transactionList[i].type === 'Credit') {
                                total += $scope.transactionList[i].amount;
                            }
                        }
                        if (total > 0)
                            return total;
                    };
                    var debits = function () {
                        var total = 0;
                        for (i = 0; i < $scope.transactionList.length; i++) {
                            if ($scope.transactionList[i].type === 'Debit') {
                                total += $scope.transactionList[i].amount;
                            }
                        }
                        if (total > 0)
                            return total;
                    };
                }
        );