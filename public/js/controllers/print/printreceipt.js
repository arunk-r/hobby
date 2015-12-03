angular.module('printsbpuc', ['ngRoute', 'flash']).controller('printreceiptCtrl', function ($scope, $http, $window, $timeout, Flash) {
    $scope.errMsg = null;
    $scope.printData = {};
    $scope.paidAmount = {};
    $scope.type = getParameterByName('type');
    //console.log(getParameterByName('type'))
    // Get all todos
    $http.get('/api/student/' + getParameterByName('id') + '/' + $scope.type + '/fee/' + getParameterByName('feeid') + '/print')
            .success(function (data) {
                //console.log(data)
                $scope.errMsg = null;
                if (data.errors.length === 0 && !!data.errfor) {
                    $scope.paidAmount = data.data[0];
                    $scope.printData = data.data[1];
                    $timeout(function () {
                        $scope.callPrintAfterLoadingDat();
                    }, 1000);
                } else {
                    var message = '<strong> Login Issue!...</strong>  Please close this window and try again with main application.';
                    Flash.create('danger', message, 'custom-class');
                    Flash.pause();
                    $scope.errMsg = 'Login Issue!..., Please close this window and try again with main application.';
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