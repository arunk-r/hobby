'use strict';
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