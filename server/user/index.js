'use strict';
exports.signup = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);
    console.log('Inside workflow');

    workflow.on('validate', function () {
        console.log('Inside validate');
        if (!req.body.username) {
            workflow.outcome.errfor.username = 'required';
        } else if (!/^[a-zA-Z0-9\-\_]+$/.test(req.body.username)) {
            workflow.outcome.errfor.username = 'only use letters, numbers, \'-\', \'_\'';
        }

        if (!req.body.password) {
            workflow.outcome.errfor.password = 'required';
        }

        if (workflow.hasErrors()) {
            return workflow.emit('response');
        }
        workflow.emit('duplicateUsernameCheck');
    });

    workflow.on('duplicateUsernameCheck', function () {
        req.app.db.models.User.findOne({username: req.body.username}, function (err, user) {
            if (err) {
                return workflow.emit('exception', err);
            }

            if (user) {
                workflow.outcome.errfor.username = 'username already taken';
                return workflow.emit('response');
            }
            workflow.emit('createUser');
        });
    });

    workflow.on('createUser', function () {
        req.app.db.models.User.encryptPassword(req.body.password, function (err, password) {
            if (err) {
                return workflow.emit('exception', err);
            }
            req.app.db.models.User.create({username: req.body.username, password: password}, function (err, user) {
                if (err) {
                    return workflow.emit('exception', err);
                }
                workflow.user = user;
                workflow.emit('logUserIn');
            });
        });
    });

    workflow.on('createAccount', function () {
        var fieldsToSet = {
            isVerified: req.app.config.requireAccountVerification ? 'no' : 'yes',
            'name.full': workflow.user.username,
            user: {
                id: workflow.user._id,
                name: workflow.user.username
            },
            search: [
                workflow.user.username
            ]
        };

        req.app.db.models.Account.create(fieldsToSet, function (err, account) {
            if (err) {
                return workflow.emit('exception', err);
            }

            //update user with account
            workflow.user.roles.account = account._id;
            workflow.user.save(function (err, user) {
                if (err) {
                    return workflow.emit('exception', err);
                }

                workflow.emit('logUserIn');
            });
        });
    });

    workflow.on('sendWelcomeEmail', function () {
        req.app.utility.sendmail(req, res, {
            from: req.app.config.smtp.from.name + ' <' + req.app.config.smtp.from.address + '>',
            to: req.body.email,
            subject: 'Your ' + req.app.config.projectName + ' Account',
            textPath: 'signup/email-text',
            htmlPath: 'signup/email-html',
            locals: {
                username: req.body.username,
                email: req.body.email,
                loginURL: req.protocol + '://' + req.headers.host + '/login/',
                projectName: req.app.config.projectName
            },
            success: function (message) {
                workflow.emit('logUserIn');
            },
            error: function (err) {
                console.log('Error Sending Welcome Email: ' + err);
                workflow.emit('logUserIn');
            }
        });
    });

    workflow.on('logUserIn', function () {
        req._passport.instance.authenticate('local', function (err, user, info) {
            if (err) {
                return workflow.emit('exception', err);
            }

            if (!user) {
                workflow.outcome.errors.push('Error logging you in, Please try again.');
                return workflow.emit('response');
            } else {
                req.login(user, function (err) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }

                    workflow.outcome.data.push(user);
                    workflow.emit('response');
                });
            }
        })(req, res);
    });

    workflow.emit('validate');
};

exports.login = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('validate', function () {
        if (!req.body.username) {
            workflow.outcome.errfor.username = 'required';
        }

        if (!req.body.password) {
            workflow.outcome.errfor.password = 'required';
        }

        if (workflow.hasErrors()) {
            return workflow.emit('response');
        }

        workflow.emit('attemptLogin');
    });

    workflow.on('attemptLogin', function () {
        req._passport.instance.authenticate('local', function (err, user, info) {
            if (err) {
                return workflow.emit('exception', err);
            }

            if (!user) {
                workflow.outcome.errors.push('Error logging you in, Please try again.');
                return workflow.emit('response');
            } else {
                workflow.outcome.data.push(user);
                req.login(user, function (err) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    workflow.emit('response');
                });
            }
        })(req, res);
    });

    workflow.emit('validate');
};

exports.logout = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('attemptLogout', function () {
        req.logout();
        workflow.emit('response');
    });

    workflow.emit('attemptLogout');
};