angular.module('BaseCtrl', [])
        .controller('BaseController',
                function ($scope, securityAuthorization) {
//                    /console.log(securityAuthorization.getAuthenticatedUser());
                    $scope.isAuthenticated = securityAuthorization.isAuthenticated();
                    //console.log($scope.isAuthenticated);
                    $scope.$watch(function () {
                        return sessionStorage.currentUser;
                    }, function (oldVal, newVal) {
                        if (oldVal !== newVal) {
                            $scope.isAuthenticated = securityAuthorization.isAuthenticated();
                        }
                    });
                }
        );