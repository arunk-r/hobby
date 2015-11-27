angular.module('StudentsDetailCtrl', [])
        .controller('StudentsDetailController',
                function ($scope, $location, student, $routeParams) {
                    $scope.studentData = [];
                    $scope.errorMsg = '';
                    student.studentdetailsbyid($routeParams.id).then(function (data) {
                        console.log(data.data[0])
                        if (data.success) {
                            $scope.viewStudentData = data.data[0];
                            console.log($scope.viewStudentData);
                        } else {
                            if (data.errors) {
                                $scope.errorMsg = data.errors[0];
                            }
                        }
                    });
                }
        );