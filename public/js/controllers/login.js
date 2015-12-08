angular.module('LoginCtrl', [])
        .controller('LoginController', function ($scope, $location, security, utility) {
            $scope.loginData = {};
            $scope.loginData.username = 'arun';
            $scope.loginData.password = 'a';
            $scope.canSave = utility.canSave;
            // Login Staff
            $scope.loginUser = function () {
                security.signin($scope.loginData.username, $scope.loginData.password).then(function (data) {
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

angular.module('LogoutCtrl', [])
        .controller('LogoutController', function ($scope, $location, security, Flash) {
            console.log('logout invoked')
            security.signout().then(function (data) {
                var message = '<strong> Logout Successful!...</strong>.';
                Flash.create('success', message, 'custom-class');
                return $location.path('/login');
            });
        }
        );