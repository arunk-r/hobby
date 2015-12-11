'use strict';

exports.create = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('validate', function () {
        if (!req.body.username) {
            workflow.outcome.errfor.username = 'required';
        } else if (!/^[a-zA-Z0-9\-\_]+$/.test(req.body.username)) {
            workflow.outcome.errfor.username = 'only use letters, numbers, \'-\', \'_\'';
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
        var fieldsToSet = {
            isActive: true,
            canDelete: true,
            username: req.body.username,
            search: [
                req.body.username
            ]
        };
        req.app.db.models.User.create(fieldsToSet, function (err, user) {
            if (err) {
                return workflow.emit('exception', err);
            }

            workflow.user = user;
            workflow.emit('createAccount');
        });
    });

    workflow.on('createAccount', function () {
        var fieldsToSet = {
            isVerified: 'yes',
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

                workflow.emit('response');
            });
        });
    });
    workflow.emit('validate');
};

exports.getall = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('getAll', function () {
        req.app.db.models.User.find(
                {},
                {username: 1, roles: 1, timeCreated: 1, canDelete: 1, isActive: -1},
                function (err, users) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    workflow.outcome.data = users;
                    workflow.emit('response');
                });
    });

    workflow.emit('getAll');
};

exports.inactive = function (req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('inactive', function () {
        req.app.db.models.User.findOneAndUpdate(
                {
                    _id: req.params.id,
                    canDelete: true
                },
                {
                    $set: {isActive: false}
                },
                function (err, user) {
                    if (err) {
                        return workflow.emit('exception', err);
                    }
                    if (!user) {
                        workflow.outcome.errors.push({error:'User not found in our system'});
                    }
                    return workflow.emit('response');
                });
    });
    workflow.emit('inactive');
};

