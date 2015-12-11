//Viewing student details 
//Paying accadamic fee
//Paying Exam Fee
//Paying Other Miscellaneous Fee
angular.module('StudentsDetailCtrl', [])
        .controller('StudentsDetailController',
                function ($scope, $state, $location, student, $stateParams, $timeout, $route, $window) {
                    $scope.studentData = [];
                    $scope.errorMsg = '';
                    $scope.feePayment = {};
                    //console.log($stateParams);
                    student.studentdetailsbyid($stateParams.id).then(function (data) {
                        //console.log(data.data.length);
                        if (data.success && data.data.length > 0) {
                            $scope.viewStudentData = data.data[0];
                            //console.log(data.data)
                        } else {
                            if (data.errors) {
                                $scope.errorMsg = data.errors[0];
                            }else{
                                $scope.errorMsg = "Error while fetching the data"
                            }
                        }
                    });
                    $scope.addFeePayment = function (id) {
                        $('#myModal').modal('hide');
                        //console.log($scope.feePayment);
                        student.payfee(id, $scope.feePayment).then(function (data) {
                            $timeout(function () {
                                var type = $scope.feePayment.type;
                                $scope.callReLoadingData(data.data, type);
                                $scope.feePayment = {};
                            }, 1000);
                        });
                    };
                    $scope.callReLoadingData = function (data, type) {
                        //console.log(data)
                        $location.path($location.path());
                        $state.go($state.current, $stateParams, {reload: true}); 
                        $timeout(function () {
                            $scope.callOpenprintDialogData(data[0], type);
                        }, 1000);
                    };
                    $scope.callOpenprintDialogData = function (data, type) {
                        //console.log(data);
                        $scope.print(data.id, data.feeid, type);
                    };
                    $scope.print = function (id, feeid, type) {
                        //console.log(id);
                        //console.log(feeid);
                        //console.log(type);
                        var left = screen.width / 2 - 200, top = screen.height / 2 - 250;
                        //console.log('feereceipt?id=' + id + '&feeid=' + feeid + '&type=' + type);
                        $window.open('feereceipt?id=' + id + '&feeid=' + feeid + '&type=' + type, '', "top=" + top + ",left=" + left + ",width=800,height=500");
                    };
                }
        );
//Adding New student
angular.module('AddStudentCtrl', [])
        .controller('AddStudentController',
                function ($scope, $state, $location, student, Flash) {
                    $scope.formData = {};
                    // Create a new student
                    $scope.createStudent = function () {
                        $scope.formData.image = $('#tumbimage').val();
                        console.log($scope.formData)
                        student.addstudent($scope.formData).then(function (data) {
                            //console.log(data.data[0]);
                            $scope.formData = {};
                            $location.path('/student/' + data.data[0]);
                            $state.go('student');
                        });
                    };
                }
        );