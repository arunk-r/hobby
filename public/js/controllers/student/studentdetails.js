//Viewing student details 
//Paying accadamic fee
//Paying Exam Fee
//Paying Other Miscellaneous Fee
angular.module('StudentsDetailCtrl', [])
        .controller('StudentsDetailController',
                function ($scope, $location, student, $routeParams, $timeout, $route, $window) {
                    $scope.studentData = [];
                    $scope.errorMsg = '';
                    $scope.feePayment = {};
                    student.studentdetailsbyid($routeParams.id).then(function (data) {
                        if (data.success) {
                            $scope.viewStudentData = data.data[0];
                            //console.log(data.data)
                        } else {
                            if (data.errors) {
                                $scope.errorMsg = data.errors[0];
                            }
                        }
                    });
                    $scope.addFeePayment = function (id) {
                        $('#myModal').modal('hide');
                        //console.log($scope.feePayment);
                        student.payfee(id, $scope.feePayment).then(function (data) {
                            $timeout(function () {
                                $scope.callReLoadingData(data.data, $scope.feePayment.type);
                            }, 1000);
                            $scope.feePayment = {};
                        });
                    };
                    $scope.callReLoadingData = function (data, type) {
                        //console.log(data)
                        $location.path($location.path());
                        $route.reload();
                        $timeout(function () {
                            $scope.callOpenprintDialogData(data[0], type);
                        }, 1000);
                    };
                    $scope.callOpenprintDialogData = function (data, type) {
                        //console.log(data);
                        $scope.print(data.id, data.feeid, type);
                    };
                    $scope.print = function (id, feeid, type) {
                        console.log(id);
                        console.log(feeid);
                        console.log(type);
                        var left = screen.width / 2 - 200, top = screen.height / 2 - 250;
                        $window.open('feereceipt?id=' + id + '&feeid=' + feeid + '&type=' + type, '', "top=" + top + ",left=" + left + ",width=800,height=500");
                    };
                }
        );
//Adding New student
angular.module('AddStudentCtrl', [])
        .controller('AddStudentController',
                function ($scope, $location, student, Flash) {
                    $scope.formData = {};
                    // Create a new student
                    $scope.createStudent = function () {
                        $scope.formData.image = $('#tumbimage').val();
                        console.log($scope.formData)
                        student.addstudent($scope.formData).then(function (data) {
                            //console.log(data.data[0]);
                            $location.path('/student/' + data.data[0]);
                        });
                    };
                }
        );