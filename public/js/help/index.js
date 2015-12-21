var currentFinancialYear = function () {
    var todayDate = new Date();
    var year = todayDate.getFullYear();
    var yearEndDate = new Date(year, 2, 31, 23, 59);
    if (todayDate <= yearEndDate) {
        return (+year - +1) + '-' + year;
    } else {
        return year + '-' + (+year + +1);
    }
};

var getFinancialYears = function () {
    var d = new Date();
    var n = d.getFullYear();
    var years = [{name: 'Pick Year'}];
    var val = '';
    for (i = 2015; i <= (n + 1); i++) {
        val = i + '-' + (+i + +1);
        years.push({name: val});
    }
    return years;
};

var getFinancialYearsList = function () {
    var d = new Date();
    var n = d.getFullYear();
    var years = [];
    var val = '';
    for (i = 2015; i <= (n + 1); i++) {
        val = i;
        if (i === n)
            years.push({name: val, selected: true});
        else
            years.push({name: val, selected: false});
    }
    return years;
};