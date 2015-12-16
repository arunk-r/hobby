'use strict';

exports = module.exports = function (app, mongoose) {
    var transactionSchema = new mongoose.Schema({
        name: {
            type: String
        },
        type: {
            type: String
        },
        amount: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        deleted: {
            type: Boolean,
            default: false
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
    transactionSchema.index({name: 1, type: 1, date: 1, description: 1, amount: 1});
    transactionSchema.set('autoIndex', (app.get('env') === 'development'));
    app.db.model('Transaction', transactionSchema);
};
