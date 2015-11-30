'use strict';

function ensureAuthenticated(req, res, next) {
    var workflow = req.app.utility.workflow(req, res);
    if (req.isAuthenticated()) {
        return next();
    }
    res.set('X-Auth-Required', 'true');
    workflow.outcome.success = false;
    workflow.outcome.authError = true;
    workflow.outcome.errors.push('Credential issue, Please try with admin credentials!..');
    return workflow.emit('response');
}

function ensureAdmin(req, res, next) {
    if (req.user.canPlayRoleOf('admin')) {
        return next();
    }
    res.redirect('/');
}

var base = require('./server/index');
var users = require('./server/user/index');
var student = require('./server/student/index');
var fee = require('./server/fee/index');
var print = require('./server/print/index');

exports = module.exports = function (app, passport) {
    //app.use('/', base.init);
    app.use('/feereceipt', base.feereceipt);
    app.post('/user/signup', users.signup);
    app.post('/user/login', users.login);
    
    //app.all('/api/*', ensureAuthenticated);
    app.get('/api/students', student.students);
    app.get('/api/student/:id', student.studentdetails);
    app.post('/api/student/add', student.addstudent);
    app.post('/api/student/:id/fee/add', fee.addstudentfee);
    app.get('/api/student/:id/fee/:feeid/print', print.feeprintbyfeeid);
    
};