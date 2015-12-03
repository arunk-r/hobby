'use strict';
exports.addstudentfee = function (req, res) {
    var uuid = require('node-uuid');
    var workflow = req.app.utility.workflow(req, res);
    workflow.on('validate', function () {
        console.log(req.body)
        // TODO: Needs complete validation
        if (!req.body.type) {
            workflow.outcome.errfor.type = 'required';
        }
        if (!req.body.amount) {
            workflow.outcome.errfor.amount = 'required';
        }
        if (!req.body.description) {
            workflow.outcome.errfor.description = 'required';
        }
        if (workflow.hasErrors()) {
            console.log('workflow error')
            return workflow.emit('response');
        }
        workflow.emit('associateFeeToStudent');
    });
    workflow.on('associateFeeToStudent', function () {

        var id = req.params.id;
        var feeid = uuid.v1();
        var type = req.body.type.toUpperCase();
        var data = {
            id: feeid,
            description: req.body.description,
            amount: req.body.amount,
            paiddate: new Date(),
            createduser: req.user.username
        };
        if (type === 'ACADEMICFEE') {
            console.log('Inside ACADEMICFEE');
            req.app.db.models.Student.update(
                    {_id: id},
                    {
                        $push: {
                            'fee': {
                                $each: [data],
                                $sort: {paiddate: -1}
                            }
                        }
                    },
                    {safe: true, upsert: true},
                    function (err, results) {
                        if (err) {
                            return workflow.emit('exception', err);
                        }
                    });
        } else if (type === 'EXAMFEE') {
            console.log('Inside EXAMFEE');
            req.app.db.models.Student.update(
                    {_id: id},
                    {
                        $push: {
                            'examfee': {
                                $each: [data],
                                $sort: {paiddate: -1}
                            }
                        }
                    },
                    {safe: true, upsert: true},
                    function (err, results) {
                        if (err) {
                            return workflow.emit('exception', err);
                        }
                    });
        } else if (type === 'OTHERFEE') {
            console.log('Inside OTHERFEE');
            req.app.db.models.Student.update(
                    {_id: id},
                    {
                        $push: {
                            'otherfee': {
                                $each: [data],
                                $sort: {paiddate: -1}
                            }
                        }
                    },
                    {safe: true, upsert: true},
                    function (err, results) {
                        if (err) {
                            return workflow.emit('exception', err);
                        }
                    });
        } else {
            workflow.outcome.errors.push({error: 'Invalid Type!..Cant insert the fee data'});
            return workflow.emit('exception', new Error('Invalid Type!..Cant insert the fee data'));
        }
        var data = {
            id: id,
            feeid: feeid
        };
        workflow.outcome.data.push(data);
        workflow.emit('response');
    });
    workflow.emit('validate');
};