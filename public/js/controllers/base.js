angular.module('BaseCtrl', [])
        .controller('BaseController',
                function ($scope, securityAuthorization) {
//                    /console.log(securityAuthorization.getAuthenticatedUser());
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