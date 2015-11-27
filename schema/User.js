'use strict';

exports = module.exports = function (app, mongoose) {
    var userSchema = new mongoose.Schema({
        username: {type: String, unique: true},
        hash: String,
        salt: String,
        timeCreated: {type: Date, default: Date.now}
    });

    userSchema.methods.canPlayRoleOf = function (role) {
        if (role === "admin" && this.roles.admin) {
            return true;
        }

        if (role === "account" && this.roles.account) {
            return true;
        }

        return false;
    };

    userSchema.statics.encryptPassword = function (password, callback) {
        var hash = require('./pass').hash;
        hash(password, function (err, salt, hash) {
            if (err)
                throw err;
            callback(null, salt, hash);
        });

//        var bcrypt = require('bcrypt');
//        bcrypt.genSalt(10, function (err, salt) {
//            if (err) {
//                return done(err);
//            }
//
//            bcrypt.hash(password, salt, function (err, hash) {
//                done(err, hash);
//            });
//        });
    };
    userSchema.statics.validatePassword = function (user, password, callback) {
        var hash = require('./pass').hash;
        
        hash(password, user.salt, function (err, hash) {
            console.log('hash')
        console.log(hash)    
        console.log(user.hash)    
            if (err)
                throw err;
            if (hash === user.hash)
                callback(null, true);
            callback(new Error('invalid password'));
        });
//        var bcrypt = require('bcrypt');
//        bcrypt.compare(password, hash, function (err, res) {
//            done(err, res);
//        });
    };

    userSchema.index({username: 1}, {unique: true});
    userSchema.index({timeCreated: 1});
    userSchema.set('autoIndex', (app.get('env') === 'development'));

    app.db.model('User', userSchema);
};


