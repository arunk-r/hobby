angular.module('SignupCtrl', [])
        .controller('SignupController',
                    function ($scope, $location, security, utility) {
                        $scope.signupData = {};
                        $scope.hasError = utility.hasError;
                        $scope.showError = utility.showError;
                        // Signup Staff
                        $scope.signupUser = function () {
                            security.signup($scope.signupData.username, $scope.signupData.password).then(function (data) {
                                if (data.success) {
                                    //$scope.$emit('login', {message: 'Login'});
                                    return $location.path('/');
                                } else {
                                    //error due to server side validation
                                    $scope.errfor = data.errfor;
                                    $scope.errorMsg = data.errors[0];
                                    return $location.path('/signup');
                                }
                            }, function (e) {
                                $scope.errorMsg = 'Error logging you in, Please try Signup again';
                                return $location.path('/signup');
                            });
                        };
                    }
                );