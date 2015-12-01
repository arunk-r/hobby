'use strict';
exports.init = function (req, res) {
    var path = require('path');
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
};

exports.feereceipt = function (req, res) {
    var path = require('path');
    res.sendFile(path.join(__dirname, '../', 'views', 'print', 'feereceipt.html'));
};
