'use strict';

exports = module.exports = function (app, mongoose) {
    var staffSchema = new mongoose.Schema({
        name: {
            type: String
        },
        dob: {
            type: Date
        },
        education: {
            type: String
        },
        subject: {
            type: String
        },
        experience: {
            type: Number
        },
        gender: {
            type: String
        },
        mobile: {
            type: Number
        },
        address: {
            type: String
        },
        image: {
            type: String
        },
        active: {
            type: Boolean,
            default: true
        },
        createddate: {
            type: Date,
            default: Date.now
        },
        createduser: {
            type: String
        },
        updateddate: {
            type: Date
        },
        updateduser: {
            type: String
        },
        search: [String]
    });
    staffSchema.index({name: 1, dob: 1, education: 1, subject: 1, experience: 1, gender: 1, mobile: 1, address: 1});
    staffSchema.set('autoIndex', (app.get('env') === 'development'));
    app.db.model('Staff', staffSchema);
};
