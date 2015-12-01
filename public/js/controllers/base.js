angular.module('BaseCtrl', [])
        .controller('BaseController',
                function ($scope, securityAuthorization, Flash) {
//                    /console.log(securityAuthorization.getAuthenticatedUser());
                    var message = '<strong> Well done!</strong>  You successfully read this important alert message.';
                    Flash.create('danger', message, 'custom-class');
                    $scope.isAuthenticated = securityAuthorization.isAuthenticated();
                    $scope.$watch(function () {
                        return sessionStorage.currentUser;
                    }, function (oldVal, newVal) {
                        if (oldVal !== newVal) {
                            $scope.isAuthenticated = securityAuthorization.isAuthenticated();
                        }
                    });
                }
        );