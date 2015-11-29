angular.module('StudentsDetailCtrl', [])
        .controller('StudentsDetailController',
                function ($scope, $location, student, $routeParams, $timeout, $route) {
                    $scope.studentData = [];
                    $scope.errorMsg = '';
                    $scope.feePayment = {};
                    student.studentdetailsbyid($routeParams.id).then(function (data) {
                        console.log(data.data[0])
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
                                $scope.callReLoadingData(id, data);
                            }, 1000);
                        });
                    };
                    $scope.callReLoadingData = function (id, data) {
                        $location.path($location.path());
                        $route.reload();
//                        $timeout(function () {
//                            $scope.callOpenprintDialogData(id, data);
//                        }, 1000);
                    };
                    $scope.callOpenprintDialogData = function (id, data) {
                        $location.path($location.path());
                        $route.reload();
                        var left = screen.width / 2 - 200, top = screen.height / 2 - 250
                        $window.open('print?id=' + id + '&feeid=' + data, '', "top=" + top + ",left=" + left + ",width=800,height=500");
                    };
                }
        );