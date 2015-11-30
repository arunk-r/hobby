angular.module('StudentsDetailCtrl', [])
        .controller('StudentsDetailController',
                function ($scope, $location, student, $routeParams, $timeout, $route, $window) {
                    $scope.studentData = [];
                    $scope.errorMsg = '';
                    $scope.feePayment = {};
                    student.studentdetailsbyid($routeParams.id).then(function (data) {
                        if (data.success) {
                            $scope.viewStudentData = data.data[0];
                        } else {
                            if (data.errors) {
                                $scope.errorMsg = data.errors[0];
                            }
                        }
                    });
                    $scope.addFeePayment = function (id) {
                        $('#myModal').modal('hide');
                        student.payfee(id, $scope.feePayment).then(function (data) {
                            $timeout(function () {
                                $scope.callReLoadingData(data.data);
                            }, 1000);
                        });
                    };
                    $scope.callReLoadingData = function (data) {
                        console.log(data)
                        $location.path($location.path());
                        $route.reload();
                        $timeout(function () {
                            $scope.callOpenprintDialogData(data[0]);
                        }, 1000);
                    };
                    $scope.callOpenprintDialogData = function (data) {
                        console.log(data);
                        //var left = screen.width / 2 - 200, top = screen.height / 2 - 250
                        //$window.open('feereceipt?id=' + data.id + '&feeid=' + data.feeid, '', "top=" + top + ",left=" + left + ",width=800,height=500");
                        $scope.print(data.id, data.feeid);
                    };
                    $scope.print = function (id, feeid) {
                        console.log(id);
                        console.log(feeid);
                        var left = screen.width / 2 - 200, top = screen.height / 2 - 250
                        $window.open('feereceipt?id=' + id + '&feeid=' + feeid, '', "top=" + top + ",left=" + left + ",width=800,height=500");
                    }
                }
        );