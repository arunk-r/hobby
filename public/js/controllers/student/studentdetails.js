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
                    $scope.paidAmount = 0;
                    //console.log($stateParams);
                    student.studentdetailsbyid($stateParams.id).then(function (data) {
                        //console.log(data.data.length);
                        if (data.success && data.data.length > 0) {
                            $scope.viewStudentData = data.data[0];
                            $scope.getPaidAmount();
                            //console.log($scope.paidAmount)
                            //console.log(data.data)
                        } else {
                            if (data.errors) {
                                $scope.errorMsg = data.errors[0];
                            } else {
                                $scope.errorMsg = "Error while fetching the data";
                            }
                        }
                    });
                    $scope.getPaidAmount = function () {
                        for (i = 0; i < $scope.viewStudentData.fee.length; i++) {
                            $scope.paidAmount = +$scope.paidAmount + +$scope.viewStudentData.fee[i].amount;
                            //console.log($scope.viewStudentData.fee[i].amount)
                        }
                    };
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
                function ($scope, $state, $location, $stateParams, student, Flash) {
                    $scope.formData = {};
                    // Create a new student
                    $scope.createStudent = function () {
                        $scope.formData.image = $('#tumbimage').val();
                        console.log($scope.formData)
                        student.addstudent($scope.formData).then(function (data) {
                            //console.log(data.data[0]);
                            //TODO Add falsh
                            $stateParams.id = data.data[0];
                            $location.path('/student/' + data.data[0]);
                            $state.go('user.student', $stateParams, {reload: true});
                        });
                    };
                }
        );

//Student Search Adminfeature
angular.module('SearchStudentCtrl', [])
        .controller('SearchStudentController',
                function ($scope, $state, $location, $stateParams, student, Flash) {
                    $scope.formData = {};
                    // Create a new student
                    $scope.searchStudent = function () {
                        student.search($scope.formData).then(function (data) {
                            $scope.studentData = data.data;
                            $scope.viewStudentData = '';
                            $scope.formData = '';
                            //console.log(data.data)
                        });
                    };
                    $scope.edit = function (id) {
                        console.log(id);
                        $state.go('admin.studentsearch.edit');
                        student.studentdetailsbyid(id).then(function (data) {
                            //console.log(data.data.length);
                            if (data.success && data.data.length > 0) {
                                $scope.viewStudentData = data.data[0];
                                $scope.formData = data.data[0];
                                $scope.formData.dob = new Date($scope.formData.dob);
                                $scope.formData.initialfee = ($scope.formData.class === 'PUC1') ? $scope.formData.puc1fee : $scope.formData.puc2fee;
                                $scope.formData.sslcpercentage = parseInt($scope.formData.sslcpercentage);
                                $scope.getPaidAmount();
                                //console.log($scope.paidAmount)
                                //console.log(data.data[0])
                            } else {
                                if (data.errors) {
                                    $scope.errorMsg = data.errors[0];
                                } else {
                                    $scope.errorMsg = "Error while fetching the data";
                                }
                            }
                        });
                    };
                    $scope.getPaidAmount = function () {
                        for (i = 0; i < $scope.viewStudentData.fee.length; i++) {
                            $scope.paidAmount = +$scope.paidAmount + +$scope.viewStudentData.fee[i].amount;
                            //console.log($scope.viewStudentData.fee[i].amount)
                        }
                    };
                    $scope.editStudent = function () {
                        console.log($scope.formData);
                        student.updatestudent($scope.formData._id, $scope.formData).then(function (data) {
                            console.log(data);
                            if (data.success) {
                                var message = '<strong>Info :  ' + $scope.formData.name + ' </strong> Record Updete was Successful!...';
                                Flash.create('success', message, 'custom-class');
                            } else {
                                var message = '<strong>Error</strong> ' + $scope.formData.name + ' Something wrong in system!...Please logout and re-login.';
                                Flash.create('error', message, 'custom-class');
                            }
                            $scope.studentData = '';
                            $scope.viewStudentData = '';
                            $scope.formData = '';
                        });
                    };
                }
        );