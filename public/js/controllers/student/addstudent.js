angular.module('AddStudentCtrl', [])
        .controller('AddStudentController',
function ($scope, $location, student) {
                        $scope.formData = {};
                        // Create a new student
                        $scope.createStudent = function () {
                            student.addstudent($scope.formData).then(function (data) {
                                if(!data.success){
                                    $scope.errorMsg = data.errors[0];
                                    $scope.errfor = data.errfor;
                                }
                            });
                        };
                    }
                );