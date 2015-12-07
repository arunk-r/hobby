'use strict';
exports.studentsextract = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on('studentsExtract', function () {
        req.app.db.models.Student.aggregate(
                [
                    {$match:
                                {active: true}
                    },
                    {$group:
                                {
                                    _id: {caste: '$caste', gender: '$gender', class:'$class'},
                                    count: {$sum: 1}
                                }
                    },
                    {$sort:
                                {
                                    '_id.gender': 1,
                                    '_id.caste': 1,
                                    '_id.class':1
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
    workflow.emit('studentsExtract');
};