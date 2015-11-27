exports.addstudentfee = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('validate', function () {

        // TODO: Needs complete validation
        if (!req.body.amount) {
            workflow.outcome.errfor.amount = 'required';
        }
        if (!req.body.description) {
            workflow.outcome.errfor.description = 'required';
        }
        if (workflow.hasErrors()) {
            console.log('error')
            return workflow.emit('response');
        }
        workflow.emit('associateFeeToStudent');
    });

    workflow.on('associateFeeToStudent', function () {

        var id = req.params.id;
        var data = {
            description: req.body.description,
            amount: req.body.amount,
            paiddate: Date.now,
            createduser: req.user.username
        };
        req.app.db.models.Fee.update({_id:id},{$push:{fee:data}}, function (err, results) {
            if (err) {
                return workflow.emit('exception', err);
            }
            console.log(results);
            workflow.outcome.data.push(id);
            workflow.emit('response');
        });
    });
    workflow.emit('validate');
};