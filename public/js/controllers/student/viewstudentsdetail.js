angular.module('ViewStudentsDetailCtrl', [])
        .controller('ViewStudentsDetailController',
                function ($scope, $state, $stateParams, $location, student) {
                    $scope.studentData = [];
                    $scope.errorMsg = '';
                    $scope.go = function (id) {
                        //console.log('/student/' + id)
                        $location.path('/student/' + id);
                        $stateParams.id = id;
                        $state.go('user.student', $stateParams);
                    };
                    student.viewstudents().then(function (data) {
                        //console.log(data)
                        //console.log(data.data.length)
                        if (data.success && data.data.length > 0) {
                            $scope.studentData = data.data;
                        } else {
                            if (data.errors) {
                                $scope.errorMsg = data.errors[0];
                            }
                        }
                    });
                }
        );