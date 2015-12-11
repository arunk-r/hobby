'use strict';

exports.send = function (req, res, next) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('validate', function () {
        if (!req.body.username) {
            workflow.outcome.errfor.username = 'required';
            return workflow.emit('response');
        }

        req.app.db.models.User.findOne({username: req.body.username, isActive:true}, function (err, user) {
            if (err) {
                return workflow.emit('exception', err);
            }
            if (!user) {
                workflow.outcome.errfor.username = 'username not exists in our system';
                return workflow.emit('response');
            }
            workflow.emit('generateToken');
        });
    });

    workflow.on('generateToken', function () {
        var crypto = require('crypto');
        crypto.randomBytes(21, function (err, buf) {
            if (err) {
                return next(err);
            }

            var token = buf.toString('hex');
            req.app.db.models.User.encryptPassword(token, function (err, hash) {
                if (err) {
                    return next(err);
                }

                workflow.emit('patchUser', token, hash);
            });
        });
    });

    workflow.on('patchUser', function (token, hash) {
        var conditions = {username: req.body.username.toLowerCase()};
        var fieldsToSet = {
            resetPasswordToken: hash,
            resetPasswordExpires: Date.now() + 10000000
        };
        req.app.db.models.User.findOneAndUpdate(conditions, fieldsToSet, function (err, user) {
            if (err) {
                return workflow.emit('exception', err);
            }

            if (!user) {
                return workflow.emit('response');
            }

            workflow.emit('sendEmail', token, user);
        });
    });

    workflow.on('sendEmail', function (token, user) {
        workflow.outcome.data.push({username:user.username});
        workflow.outcome.data.push({token:token});
        workflow.emit('response');
    });

    workflow.emit('validate');
};
