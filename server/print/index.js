exports.feeprintbyfeeid = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('printFee', function () {

        var id = req.params.id;
        var feeid = req.params.feeid;
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
    });
    workflow.emit('printFee');
};