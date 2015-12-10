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
var signin = require('./server/signin/index');
var forgot = require('./server/signin/forgot/index');
var reset = require('./server/signin/reset/index');
var signup = require('./server/signup/index');
var student = require('./server/student/index');
var fee = require('./server/fee/index');
var print = require('./server/print/index');
var feereport = require('./server/reports/fee/index');
var extracts = require('./server/reports/casteextract/index');

exports = module.exports = function (app, passport) {
    //app.use('/', base.init);
    app.use('/feereceipt', base.feereceipt);
    app.post('/user/signup', signup.signup);
    app.post('/user/login', signin.login);
    app.post('/user/forgot', forgot.send);
    app.post('/user/reset/:username/:token', reset.set);
    app.get('/user/logout', signin.logout);

    //app.all('/api/*', ensureAuthenticated);
    app.get('/api/students', student.students);
    app.get('/api/student/:id', student.studentdetails);
    app.post('/api/student/add', student.addstudent);
    app.post('/api/student/:id/fee/add', fee.addstudentfee);
    app.get('/api/student/:id/:type/fee/:feeid/print', print.feeprintbyfeeid);
    app.get('/api/report/anual/:years/fee', feereport.anualreport);
    app.get('/api/report/anual/:years/exam/fee', feereport.examreport);
    app.get('/api/report/anual/:years/miscellaneous/fee', feereport.miscellaneousreport);
    app.get('/api/report/studentsextract', extracts.studentsextract);
};