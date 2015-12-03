'use strict';
exports.feeprintbyfeeid = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('printFee', function () {

        var id = req.params.id;
        var feeid = req.params.feeid;
        var type = req.params.type.toUpperCase();
        if (type === 'ACADEMICFEE') {
            //Attempt to get total fee paid amount be student
            req.app.db.models.Student.aggregate(
                    [
                        {$match: {'fee.id': feeid}},
                        {$unwind: '$fee'},
                        {$group: {
                                _id: '$_id',
                                totalFeePaid: {
                                    $sum: '$fee.amount'
                                }
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
                        if (data.length > 0) {
                            var totalAmount = {
                                totalPaidAmount: data[0].totalFeePaid
                            };
                            workflow.outcome.data.push(totalAmount);
                        }
                    });
            //Attempt to get perticular fee paid details
            req.app.db.models.Student.find(
                    {_id: id, 'fee.id': feeid},
                    {name: 1, rollnumber: 1, class: 1, puc1fee: 1, puc2fee: 1, combination: 1, 'fee.$': 1},
                    function (err, result) {
                        if (err) {
                            return workflow.emit('exception', err);
                        }
                        if (!result) {
                            return workflow.emit('exception', err);
                        }
                        if (result.length > 0) {
                            workflow.outcome.data.push(result[0]);
                        }
                        workflow.emit('response');
                    });
        } else if (type === 'EXAMFEE') {
            //Attempt to get total fee paid amount be student
            req.app.db.models.Student.aggregate(
                    [
                        {$match: {'examfee.id': feeid}},
                        {$unwind: '$examfee'},
                        {$group: {
                                _id: '$_id',
                                totalFeePaid: {
                                    $sum: '$examfee.amount'
                                }
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
                        if (data.length > 0) {
                            var totalAmount = {
                                totalPaidAmount: data[0].totalFeePaid
                            };
                            workflow.outcome.data.push(totalAmount);
                        }
                    });
            //Attempt to get perticular fee paid details
            req.app.db.models.Student.find(
                    {_id: id, 'examfee.id': feeid},
                    {name: 1, rollnumber: 1, class: 1, puc1fee: 1, puc2fee: 1, combination: 1, 'examfee.$': 1},
                    function (err, result) {
                        if (err) {
                            return workflow.emit('exception', err);
                        }
                        if (!result) {
                            return workflow.emit('exception', err);
                        }
                        if (result.length > 0) {
                            workflow.outcome.data.push(result[0]);
                        }
                        workflow.emit('response');
                    });
        } else if (type === 'OTHERFEE') {
            //Attempt to get total fee paid amount be student
            req.app.db.models.Student.aggregate(
                    [
                        {$match: {'otherfee.id': feeid}},
                        {$unwind: '$otherfee'},
                        {$group: {
                                _id: '$_id',
                                totalFeePaid: {
                                    $sum: '$otherfee.amount'
                                }
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
                        if (data.length > 0) {
                            var totalAmount = {
                                totalPaidAmount: data[0].totalFeePaid
                            };
                            workflow.outcome.data.push(totalAmount);
                        }
                    });
            //Attempt to get perticular fee paid details
            req.app.db.models.Student.find(
                    {_id: id, 'otherfee.id': feeid},
                    {name: 1, rollnumber: 1, class: 1, puc1fee: 1, puc2fee: 1, combination: 1, 'otherfee.$': 1},
                    function (err, result) {
                        if (err) {
                            return workflow.emit('exception', err);
                        }
                        if (!result) {
                            return workflow.emit('exception', err);
                        }
                        if (result.length > 0) {
                            workflow.outcome.data.push(result[0]);
                        }
                        workflow.emit('response');
                    });
        } else {
            workflow.outcome.errors.push({error: 'Invalid Type!..Cant insert the fee data'});
            return workflow.emit('exception', new Error('Invalid Type!..Cant insert the fee data'));
        }
    });
    workflow.emit('printFee');
};