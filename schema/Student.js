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
            type: String,
            unique: true
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
        }
    });

    studentSchema.index({name: 1});
    studentSchema.index({dob: 1});
    studentSchema.index({rollnumber: 1});
    studentSchema.index({combination: 1});
    studentSchema.index({mobile: 1});
    studentSchema.index({fee: 1});
    studentSchema.set('autoIndex', (app.get('env') === 'development'));
    app.db.model('Student', studentSchema);
};
