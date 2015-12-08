var routerApp = angular.module('sbpuc', [
    'flash',
    'ngRoute',
    'ui.bootstrap',
    'appRoutes',
    'router.service',
    'security.authorization',
    'sbpuc.passwordcheck',
    'sbpuc.copyval',
    'security.service',
    'student.service',
    'report.service',
    'services.utility',
    'BaseCtrl',
    'SignupCtrl',
    'LoginCtrl',
    'ViewStudentsDetailCtrl',
    'AddStudentCtrl',
    'StudentsDetailCtrl',
    'ReportsCtrl',
    'AnualFeeCtrl',
    'CurrentYearFeeCtrl',
    'CurrentYearExamFeeCtrl',
    'CurrentYearMiscellaneousFeeCtrl',
    'StudentExtractCtrl'
]);

routerApp.run(['$rootScope', '$location', 'securityAuthorization', function ($rootScope, $location, securityAuthorization, Flash) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            //console.log(securityAuthorization.getAuthenticatedUser());
//            if (!security.currentUser) {
//                console.log("Authentication Error");
//                $location.path('/');
//            }
//            if (next.data.requireLogin) {
//                if (!SessionService.getAuthenticatedUser()) {
//                    console.log("Authentication Error");
//                    $location.path('/');
//                }
//                if (next.data.adminPrev) {
//                    var admin = JSON.parse(SessionService.getAuthenticatedUser()).admin;
//                    console.log(admin)
//                    if (!admin) {
//                        event.preventDefault();
//                    }
//                }
//            }
        });
    }]);