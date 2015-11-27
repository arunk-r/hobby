'use strict';

exports = module.exports = function (app, mongoose) {
    var feeSchema = new mongoose.Schema({
        studentid: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Student'
        },
        description: {
            type: String,
            unique: true
        },
        amount: {
            type: Number
        },
        paiddate: {
            type: Date,
            default: Date.now
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

    feeSchema.index({description: 1});
    feeSchema.index({amount: 1});
    feeSchema.index({paiddate: 1});
    feeSchema.set('autoIndex', (app.get('env') === 'development'));
    app.db.model('Fee', feeSchema);
};
