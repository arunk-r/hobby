angular.module('LoginCtrl', [])
        .controller('LoginController', function ($scope, $location, security, utility) {
            $scope.loginData = {};
            $scope.loginData.username = 'arun';
            $scope.loginData.password = 'arun';
            $scope.canSave = utility.canSave;
            // Login Staff
            $scope.loginUser = function () {
                security.login($scope.loginData.username, $scope.loginData.password).then(function (data) {
                    console.log(data);
                    if (data.success) {
                        return $location.path('/');
                    } else {
                        //error due to server side validation
                        $scope.errfor = data.errfor;
                        $scope.errorMsg = data.errors[0];
                        return $location.path('/login');
                    }
                });
            };
        }
        );