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
                                        puc2fee: '$puc2fee'},
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