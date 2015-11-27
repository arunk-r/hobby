angular.module('ViewStudentsDetailCtrl', [])
        .controller('ViewStudentsDetailController',
                function ($scope, $location, student) {
                    $scope.studentData = [];
                    $scope.errorMsg = '';
                    $scope.go = function (id) {
                        $location.path('/student/' + id);
                    };
                    student.viewstudents().then(function (data) {
                        if (data.success) {
                            $scope.studentData = data.data;
                        } else {
                            if (data.errors) {
                                $scope.errorMsg = data.errors[0];
                            }
                        }
                    });
                }
        );