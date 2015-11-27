'use strict';

exports = module.exports = function (app, passport) {
    var LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(
            function (username, password, done) {
                app.db.models.User.findOne({username: username}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {message: 'Unknown user'});
                    }
                    console.log(user);
                    app.db.models.User.validatePassword(user, password, function (err, isValid) {
                        if (err) {
                            return done(err);
                        }

                        if (!isValid) {
                            return done(null, false, {message: 'Invalid password'});
                        }

                        return done(null, user);
                    });
                });
            }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        app.db.models.User.findOne({_id: id}).populate('roles.admin').populate('roles.account').exec(function (err, user) {
            if (user && user.roles && user.roles.admin) {
                user.roles.admin.populate("groups", function (err, admin) {
                    done(err, user);
                });
            } else {
                done(err, user);
            }
        });
    });
};
