angular.module('printsbpuc', ['ngRoute']).controller('printreceiptCtrl', function ($scope, $http, $routeParams, $window, $timeout) {
    console.log(getParameterByName('id'));
    console.log(getParameterByName('feeid'));
    $scope.printData = {};
    // Get all todos
    $http.get('/print/' + getParameterByName('id') + '/' + getParameterByName('feeid'))
            .success(function (data) {
                $scope.printData = data[0];
                $timeout(function () {
                    $scope.callPrintAfterLoadingDat();
                }, 1000);
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