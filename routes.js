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
//File upload NPM
var multipart = require('connect-multiparty');

var base = require('./server/index');
var signin = require('./server/signin/index');
var forgot = require('./server/signin/forgot/index');
var reset = require('./server/signin/reset/index');
var student = require('./server/student/index');
var fee = require('./server/fee/index');
var print = require('./server/print/index');
var feereport = require('./server/reports/fee/index');
var extracts = require('./server/reports/casteextract/index');

//Admin features
var user = require('./server/user/index');
var staff = require('./server/staff/index');
var transaction = require('./server/transaction/index');

exports = module.exports = function (app, passport) {
    //app.use('/', base.init);
    app.use('/feereceipt', base.feereceipt);
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
    //Reports
    app.get('/api/report/anual/:years/fee', feereport.anualreport);
    app.get('/api/report/month/:year/:month/fee', feereport.monthlyreport);
    app.get('/api/report/anual/:years/exam/fee', feereport.examreport);
    app.get('/api/report/anual/:years/miscellaneous/fee', feereport.miscellaneousreport);
    app.get('/api/report/studentsextract', extracts.studentsextract);

    //admin features
    //App Users
    app.post('/api/admin/user/create', user.create);
    app.get('/api/admin/users', user.getall);
    app.delete('/api/admin/user/:id', user.inactive);
    //Staff
    app.post('/api/admin/staff/create', staff.create);
    app.get('/api/admin/staff', staff.getall);
    app.delete('/api/admin/staff/:id', staff.inactive);
    app.get('/api/admin/staff/:id', staff.getdetail);
    //Transaction
    app.post('/api/admin/transaction/create', multipart(), transaction.create);
    app.get('/api/admin/transaction/:years', transaction.getall);
    app.delete('/api/admin/transaction/:id', transaction.inactive);
    app.get('/api/admin/transaction/:id', transaction.getdetail);
    //Students Admin module
    app.patch('/api/admin/student/move', student.migratestudents);
    app.post('/api/admin/student/search', student.search);
    app.put('/api/admin/student/:id/update', student.update);
};