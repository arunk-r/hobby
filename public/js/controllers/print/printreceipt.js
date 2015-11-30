angular.module('printsbpuc', ['ngRoute']).controller('printreceiptCtrl', function ($scope, $http, $routeParams, $window, $timeout) {
    $scope.errMsg = null;
    $scope.printData = {};
    $scope.paidAmount = {};
    // Get all todos
    $http.get('/api/student/' + getParameterByName('id') + '/fee/' + getParameterByName('feeid') + '/print')
            .success(function (data) {
                $scope.errMsg = null;
                if (data.errors.length === 0 && !!data.errfor) {
                    $scope.paidAmount = data.data[0];
                    $scope.printData = data.data[1];
                    $timeout(function () {
                        $scope.callPrintAfterLoadingDat();
                    }, 1000);
                } else {
                    $scope.errMsg = 'Login Issue, please close this window and try again with main application.';
                }
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });
    $scope.callPrintAfterLoadingDat = function () {
        $window.print();
    };
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}