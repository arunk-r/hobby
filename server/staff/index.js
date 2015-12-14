'use strict';

exports.create = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('validate', function () {
        if (!req.body.name) {
            workflow.outcome.errfor.username = 'required';
        }
        if (!req.body.dob) {
            workflow.outcome.errfor.dob = 'required';
        }
        if (!req.body.mobile) {
            workflow.outcome.errfor.mobile = 'required';
        }
        if (!req.body.gender) {
            workflow.outcome.errfor.gender = 'required';
        }
        if (!req.body.education) {
            workflow.outcome.errfor.education = 'required';
        }
        if (!req.body.subject) {
            workflow.outcome.errfor.subject = 'required';
        }
        if (!req.body.experience) {
            workflow.outcome.errfor.experience = 'required';
        }
        if (!req.body.address) {
            workflow.outcome.errfor.address = 'required';
        }
        if (!req.body.image) {
            workflow.outcome.errfor.image = 'required';
        }
        if (workflow.hasErrors()) {
            return workflow.emit('response');
        }

        workflow.emit('createStaff');
    });

    workflow.on('createStaff', function () {
        var fieldsToSet = {
            name: req.body.name,
            mobile: req.body.mobile,
            dob: req.body.dob,
            gender: req.body.gender,
            education: req.body.education,
            subject: req.body.subject,
            experience: req.body.experience,
            image: req.body.image,
            address: req.body.address,
            createduser: req.user.username,
            updateduser: req.user.username,
            search: [
                req.body.name, req.body.dob, req.body.gender, req.body.subject, req.body.mobile
            ]
        };
        req.app.db.models.Staff.create(fieldsToSet, function (err, staff) {
            if (err) {
                return workflow.emit('exception', err);
            }
            if (!staff) {
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
        req.app.db.models.Staff.find(
                {},
                {image: 0, createddate: 0, createduser: 0, updateddate: 0, updateduser: 0},
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
        req.app.db.models.Staff.find(
                {_id: req.params.id},
                {createddate: 0, createduser: 0, updateddate: 0, updateduser: 0},
                function (err, staff) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    workflow.outcome.data = staff;
                    workflow.emit('response');
                });
    });

    workflow.emit('getdetail');
};

exports.inactive = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('inactive', function () {
        req.app.db.models.Staff.findOneAndUpdate(
                {
                    _id: req.params.id,
                    active: true
                },
                {
                    $set: {active: false}
                },
                function (err, staff) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!staff) {
                        workflow.outcome.errors.push({error: 'Staff not found in our system'});
                    }
                    return workflow.emit('response');
                });
    });
    workflow.emit('inactive');
};

