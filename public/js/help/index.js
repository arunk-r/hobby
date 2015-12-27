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

//create pdf
function createPDF(source, filename) {
    var pdf = new jsPDF('p', 'pt', 'letter'),
            margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };

    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
            source[0] // HTML string or DOM elem ref.
            , margins.left // x coord
            , margins.top // y coord
            , {
                'width': margins.width // max width of content on PDF
            },
            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                //          this allow the insertion of new lines after html
                pdf.save(filename);
            },
            margins
            );
};