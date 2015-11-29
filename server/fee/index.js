exports.addstudentfee = function (req, res) {
    var uuid = require('node-uuid');
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
        var feeid = uuid.v1();
        var data = {
            id: feeid,
            description: req.body.description,
            amount: req.body.amount,
            paiddate: new Date(),
            createduser: req.user.username
        };
        req.app.db.models.Student.update({_id: id}, {$push: {'fee': data}}, {safe: true, upsert: true}, function (err, results) {
            if (err) {
                return workflow.emit('exception', err);
            }
            var data = {
                id: id,
                feeid: feeid
            };
            workflow.outcome.data.push(data);
            workflow.emit('response');
        });
    });
    workflow.emit('validate');
};