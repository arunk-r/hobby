angular.module('LoginCtrl', [])
        .controller('LoginController', function ($scope, $state, $location, security, utility) {
            $scope.loginData = {};
            $scope.canSave = utility.canSave;
            // Login Staff
            $scope.loginUser = function () {
                //console.log($scope.loginData)
                $scope.loginData.username = 'root';
                $scope.loginData.password = 'a';
                security.signin($scope.loginData.username, $scope.loginData.password).then(function (data) {
                    //console.log(data);
                    $scope.loginData = {};
                    if (data.success) {
                        //console.log(data);
                        $location.path('/home');
                        $state.go('home');
                    } else {
                        //error due to server side validation
                        $scope.errfor = data.errfor;
                        $scope.errorMsg = data.errors[0];
                        $location.path('/login');
                        $state.go('login');
                    }
                });
            };
        }
        );

angular.module('ForgetPasswordCtrl', [])
        .controller('ForgetPasswordController', function ($scope, $state, $stateParams, $location, security, Flash) {
            //console.log('logout invoked');
            $scope.user = {};
            $scope.resetPassword = function () {
                //console.log($scope.user)
                security.forgetpwd($scope.user).then(function (data) {
                    $scope.user = {};
                    if (data.success) {
                        //console.log(data.data[0].username);
                        //console.log(data.data[1].token);
                        $stateParams.username = data.data[0].username;
                        $stateParams.token = data.data[1].token;
                        $location.path('/resetpassword/' + data.data[0].username + '/' + data.data[1].token);
                        $state.go('resetpassword');
                    } else {
                        //error due to server side validation
                        $scope.errfor = data.errfor;
                        $scope.errorMsg = data.errors[0];
                        $location.path('/login');
                        $state.go('login');
                    }
                });
            };
        }
        );

angular.module('ResetPasswordCtrl', [])
        .controller('ResetPasswordController', function ($scope, $state, $stateParams, $location, security, Flash) {
            //console.log('logout invoked');
            $scope.signupData = {};
            $scope.confirmNewPassword = function () {
                //console.log($scope.signupData)
                //console.log($stateParams.username)
                //console.log($stateParams.token)
                security.resetpwd($stateParams.username, $stateParams.token, $scope.signupData.password).then(function (data) {
                    $scope.signupData = {};
                    if (data.success) {
                        //console.log(data.data);
                        $location.path('/login');
                        $state.go('login');
                    } else {
                        //error due to server side validation
                        $scope.errfor = data.errfor;
                        $scope.errorMsg = data.errors[0];
                        $location.path('/login');
                        $state.go('login');
                    }
                });
            };
        }
        );


angular.module('LogoutCtrl', [])
        .controller('LogoutController', function ($scope, $state, $location, security, Flash) {
            //console.log('logout invoked');
            security.signout().then(function (data) {
                var message = '<strong> Logout Successful!...</strong>.';
                Flash.create('success', message, 'custom-class');
                $location.path('/login');
                $state.go('login');
            });
        }
        );