'use strict';

exports.set = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('validate', function () {
        if (!req.body.password) {
            workflow.outcome.errfor.password = 'required';
        }

        if (workflow.hasErrors()) {
            return workflow.emit('response');
        }

        workflow.emit('findUser');
    });

    workflow.on('findUser', function () {
        var conditions = {
            username: req.params.username,
            resetPasswordExpires: {$gt: Date.now()}
        };
        req.app.db.models.User.findOne(conditions, function (err, user) {
            if (err) {
                return workflow.emit('exception', err);
            }

            if (!user) {
                workflow.outcome.errors.push('Invalid request.');
                return workflow.emit('response');
            }
            console.log(user)
            req.app.db.models.User.validatePassword(req.params.token, user.resetPasswordToken, function (err, isValid) {
                if (err) {
                    return workflow.emit('exception', err);
                }

                if (!isValid) {
                    workflow.outcome.errors.push('Invalid request.');
                    return workflow.emit('response');
                }

                workflow.emit('patchUser', user);
            });
        });
    });

    workflow.on('patchUser', function (user) {
        req.app.db.models.User.encryptPassword(req.body.password, function (err, hash) {
            if (err) {
                return workflow.emit('exception', err);
            }

            var fieldsToSet = {password: hash, resetPasswordToken: ''};
            req.app.db.models.User.findByIdAndUpdate(user._id, fieldsToSet, function (err, user) {
                if (err) {
                    return workflow.emit('exception', err);
                }

                workflow.emit('response');
            });
        });
    });

    workflow.emit('validate');
};
