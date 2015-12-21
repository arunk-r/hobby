'use strict';
exports.anualreport = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on('anualReport', function () {

        var years = req.params.years;
        var year = years.split('-');
        req.app.db.models.Student.aggregate(
                [
                    {$match:
                                {'fee.paiddate':
                                            {
                                                $gte: new Date(year[0] + "-03-31T23:59:00Z"),
                                                $lt: new Date(year[1] + "-04-01T00:00:00Z")
                                            }
                                }
                    },
                    {$unwind: '$fee'},
                    {$group:
                                {
                                    _id: {
                                        name: '$name',
                                        class: '$class',
                                        combination: '$combination',
                                        rollnumber: '$rollnumber',
                                        puc1fee: '$puc1fee',
                                        puc2fee: '$puc2fee',
                                        active: '$active'
                                    },
                                    totalFeePaid: {$sum: '$fee.amount'}}
                    },
                    {$sort:
                                {
                                    '_id.name': 1,
                                    '_id.class': 1,
                                    '_id.combination': 1
                                }
                    }
                ],
                function (err, data) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!data) {
                        return workflow.emit('exception', err);
                    }
                    workflow.outcome.data = data;
                    workflow.emit('response');
                });
    });
    workflow.emit('anualReport');
};
 
exports.monthlyreport = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on('monthlyReport', function () {

        var year = req.params.year;
        var month = req.params.month;
        req.app.db.models.Student.aggregate(
                [
                    {$match:
                                {'fee.paiddate':
                                            {
                                                $gte: new Date(year + '-' + month + '-01T00:00:00Z'),
                                                $lt: new Date(year + '-' + month + '-31T23:59:59Z')
                                            }
                                }
                    },
                    {$unwind: '$fee'},
                    {$group:
                                {
                                    _id: {
                                        name: '$name',
                                        class: '$class',
                                        combination: '$combination',
                                        rollnumber: '$rollnumber',
                                        puc1fee: '$puc1fee',
                                        puc2fee: '$puc2fee',
                                        active: '$active'
                                    },
                                    totalFeePaid: {$sum: '$fee.amount'}}
                    },
                    {$sort:
                                {
                                    '_id.name': 1,
                                    '_id.class': 1,
                                    '_id.combination': 1
                                }
                    }
                ],
                function (err, data) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!data) {
                        return workflow.emit('exception', err);
                    }
                    workflow.outcome.data = data;
                    workflow.emit('response');
                });
    });
    workflow.emit('monthlyReport');
};

exports.examreport = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on('examReport', function () {

        var years = req.params.years;
        var year = years.split('-');
        req.app.db.models.Student.aggregate(
                [
                    {$match:
                                {'examfee.paiddate':
                                            {
                                                $gte: new Date(year[0] + "-03-31T23:59:00Z"),
                                                $lt: new Date(year[1] + "-04-01T00:00:00Z")
                                            }
                                }
                    },
                    {$unwind: '$examfee'},
                    {$group:
                                {
                                    _id: {
                                        name: '$name',
                                        class: '$class',
                                        combination: '$combination',
                                        rollnumber: '$rollnumber',
                                        caste: '$caste',
                                        gender: '$gender'
                                    },
                                    totalFeePaid: {$sum: '$examfee.amount'}}
                    },
                    {$sort:
                                {
                                    '_id.name': 1,
                                    '_id.class': 1,
                                    '_id.combination': 1,
                                    '_id.gender': 1,
                                    '_id.caste': 1
                                }
                    }
                ],
                function (err, data) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!data) {
                        return workflow.emit('exception', err);
                    }
                    workflow.outcome.data = data;
                    workflow.emit('response');
                });
    });
    workflow.emit('examReport');
};

exports.miscellaneousreport = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on('miscellaneousReport', function () {

        var years = req.params.years;
        var year = years.split('-');
        req.app.db.models.Student.aggregate(
                [
                    {$match:
                                {'otherfee.paiddate':
                                            {
                                                $gte: new Date(year[0] + "-03-31T23:59:00Z"),
                                                $lt: new Date(year[1] + "-04-01T00:00:00Z")
                                            }
                                }
                    },
                    {$unwind: '$otherfee'},
                    {$group:
                                {
                                    _id: {
                                        name: '$name',
                                        class: '$class',
                                        combination: '$combination',
                                        rollnumber: '$rollnumber',
                                        caste: '$caste',
                                        gender: '$gender'
                                    },
                                    totalFeePaid: {$sum: '$otherfee.amount'}}
                    },
                    {$sort:
                                {
                                    '_id.name': 1,
                                    '_id.class': 1,
                                    '_id.combination': 1,
                                    '_id.gender': 1,
                                    '_id.caste': 1
                                }
                    }
                ],
                function (err, data) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!data) {
                        return workflow.emit('exception', err);
                    }
                    workflow.outcome.data = data;
                    workflow.emit('response');
                });
    });
    workflow.emit('miscellaneousReport');
};