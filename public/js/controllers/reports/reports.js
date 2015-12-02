angular.module('ReportsCtrl', [])
        .controller('ReportsController',
                function ($scope, $location) {
                    $scope.reportsData = {};
                    $scope.anualreportData = getFinancialYears();//[{years: '2015-2016', name: '2015-2016'}, {code: '2016-2017', name: '2016-2017'}, {code: '2017-2018', name: '2017-2018'}];
                    $scope.showAnualFeeReport = function () {
                        var years = $scope.selectedItem.name;
                        //console.log(years);
                        $location.path('/report/anual/' + years + '/fee');
                    };
                }
        );

function getFinancialYears() {
    var d = new Date();
    var n = d.getFullYear();
    var years = [{name:'Pick Year'}];
    var val = '';
    for (i = 2015; i <= (n + 1); i++) {
        val = i + '-' + (+i + +1);
        years.push({name: val});
    }
    return years;
}