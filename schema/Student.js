'use strict';

exports = module.exports = function (app, mongoose) {
    var studentSchema = new mongoose.Schema({
        name: {
            type: String
        },
        dob: {
            type: Date
        },
        rollnumber: {
            type: String
        },
        class: {
            type: String
        },
        combination: {
            type: String
        },
        puc1fee: {
            type: Number
        },
        puc2fee: {
            type: Number
        },
        caste: {
            type: String
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
        sslcschooladdress: {
            type: String
        },
        sslcpercentage: {
            type: String
        },
        image: {
            type: String
        },
        otherfee: [
        ],
        examfee: [
        ],
        fee: [
        ],
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
    studentSchema.index({name: 1, dob: 1, rollnumber: 1, combination: 1, caste: 1, gender: 1, mobile: 1, fee: 1});
    studentSchema.index({ search: 1 });
    studentSchema.set('autoIndex', (app.get('env') === 'development'));
    app.db.model('Student', studentSchema);
};
