'use strict';
exports.students = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('students', function () {
        req.app.db.models.Student.find(
                {
                    active: true
                },
                {
                    address: 0,
                    sslcschooladdress: 0,
                    sslcpercentage: 0,
                    createddate: 0,
                    createduser: 0,
                    updateddate: 0,
                    updateduser: 0,
                    active: 0,
                    fee: 0,
                    __v: 0
                },
                function (err, students) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!students) {
                        workflow.outcome.errors.push('No data found in systmem, Please try again or Contact Arun Kumar(9980130541).');
                        return workflow.emit('response');
                    }
                    workflow.outcome.data = students;
                    workflow.emit('response');
                });
    });
    workflow.emit('students');
};
exports.addstudent = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('validate', function () {

        // TODO: Needs complete validation
        if (!req.body.name) {
            workflow.outcome.errfor.name = 'required';
        }
        if (!req.body.dob) {
            workflow.outcome.errfor.dob = 'required';
        }
        if (!req.body.rollnumber) {
            workflow.outcome.errfor.rollnumber = 'required';
        }
        if (!req.body.class) {
            workflow.outcome.errfor.class = 'required';
        }
        if (!req.body.combination) {
            workflow.outcome.errfor.combination = 'required';
        }
        if (!req.body.initialfee) {
            workflow.outcome.errfor.initialfee = 'required';
        }
        if (!req.body.mobile) {
            workflow.outcome.errfor.mobile = 'required';
        }
        if (!req.body.address) {
            workflow.outcome.errfor.address = 'required';
        }
        if (!req.body.sslcschooladdress) {
            workflow.outcome.errfor.sslcschooladdress = 'required';
        }
        if (!req.body.sslcpercentage) {
            workflow.outcome.errfor.sslcpercentage = 'required';
        }
        if (workflow.hasErrors()) {
            console.log('error')
            return workflow.emit('response');
        }
        workflow.emit('createStudent');
    });

    workflow.on('createStudent', function () {
        var puc1fee = 0;
        var puc2fee = 0;
        // Grab data from http request
        if (req.body.class === 'PUC1')
            puc1fee = req.body.initialfee;
        else
            puc2fee = req.body.initialfee;
        var data = {
            name: req.body.name,
            dob: new Date(req.body.dob),
            rollnumber: req.body.rollnumber,
            class: req.body.class,
            puc1fee: puc1fee,
            puc2fee: puc2fee,
            mobile: req.body.mobile,
            address: req.body.address,
            fee:[],
            combination: req.body.combination,
            sslcschooladdress: req.body.sslcschooladdress,
            sslcpercentage: req.body.sslcpercentage,
            createduser: req.user.username,
            updateduser: req.user.username,
            updateddate: Date.now()
        };
        console.log(data);
        req.app.db.models.Student.create(data, function (err, student) {
            if (err) {
                console.log(err)
                return workflow.emit('exception', err);
            }
            workflow.outcome.data.push(student._id);
            workflow.emit('response');
        });
    });

    workflow.emit('validate');
};

exports.studentdetails = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on('viewStudentDetails', function () {
        var id = req.params.id;
        req.app.db.models.Student.findOne(
                {_id: id},
                {name: 1, dob: 1, rollnumber: 1, class: 1, puc1fee: 1, puc2fee: 1, mobile: 1, combination: 1, fee: 1, examfee:1, otherfee:1},
                function (err, student) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!student) {
                        workflow.outcome.errors.push('No data found in systmem, Please try again or Contact Arun Kumar(+919980130541).');
                        return workflow.emit('response');
                    }
                    workflow.outcome.data.push(student);
                    return workflow.emit('response');
                });
    });
    workflow.emit('viewStudentDetails');
};