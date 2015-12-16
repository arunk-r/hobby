'use strict';

exports.create = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    var fs = require('fs');
    var uuid = require('node-uuid');

    // console.log(req.files)
    workflow.on('validate', function () {
        if (!req.body.amount) {
            workflow.outcome.errfor.amount = 'required';
        }
        if (!req.body.date) {
            workflow.outcome.errfor.date = 'required';
        }
        if (!req.body.description) {
            workflow.outcome.errfor.description = 'required';
        }
        if (!req.files.image.path) {
            workflow.outcome.errfor.image = 'required';
        }
        if (workflow.hasErrors()) {
            return workflow.emit('response');
        }
        workflow.emit('createTransaction');
    });

    workflow.on('createTransaction', function () {
        var imageName = req.files.image.name;
        imageName = '.' + imageName.split('.').pop();
        imageName = uuid.v1() + imageName;
        imageName = '/uploads/' + imageName;
        fs.readFile(req.files.image.path, function (err, data) {
            var newPath = __dirname + "/../../public" + imageName;
            fs.writeFile(newPath, data, function (err) {
                if (err) {
                    return workflow.emit('exception', err);
                }
            });
        });
        var name = req.body.type;
        var type = 'Debit';
        if (name === 'Bank Deposite')
            type = 'Credit';


        var fieldsToSet = {
            name: name,
            amount: req.body.amount,
            type: type,
            date: req.body.date,
            description: req.body.description,
            image: imageName,
            createduser: req.user.username,
            updateduser: req.user.username,
            updateddate: Date.now(),
            search: [
                req.body.name, req.body.amount, req.body.date, req.body.description, imageName
            ]
        };
        req.app.db.models.Transaction.create(fieldsToSet, function (err, transaction) {
            if (err) {
                return workflow.emit('exception', err);
            }
            if (!transaction) {
                return workflow.emit('exception');
            }
            workflow.emit('response');
        });
    });

    workflow.emit('validate');
};

exports.getall = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('getAll', function () {
        var years = req.params.years;
        var year = years.split('-');

        req.app.db.models.Transaction.find(
                {
                    date:
                            {
                                $gte: new Date(year[0] + "-03-31T23:59:00Z"),
                                $lt: new Date(year[1] + "-04-01T00:00:00Z")
                            }

                },
                {createddate: 0, createduser: 0, updateddate: 0, updateduser: 0},
                {
                    sort: {date: -1}
                },
                function (err, staffs) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    workflow.outcome.data = staffs;
                    workflow.emit('response');
                });
    });
    workflow.emit('getAll');
};

exports.getdetail = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('getdetail', function () {
        req.app.db.models.Transaction.find(
                {_id: req.params.id},
                {createddate: 0, createduser: 0, updateddate: 0, updateduser: 0},
                function (err, transaction) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    workflow.outcome.data = transaction;
                    workflow.emit('response');
                });
    });

    workflow.emit('getdetail');
};

exports.inactive = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('inactive', function () {
        req.app.db.models.Transaction.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {deleted: true, updateduser: req.user.username, updateddate: Date.now()}
                },
                function (err, transaction) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!transaction) {
                        workflow.outcome.errors.push({error: 'This transaction is not found in our system'});
                    }
                });
        workflow.emit('response');
    });
    workflow.emit('inactive');
};