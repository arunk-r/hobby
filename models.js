'use strict';

exports = module.exports = function (app, mongoose) {
//  //then regular docs
    require('./schema/User')(app, mongoose);
    require('./schema/Student')(app, mongoose);
    require('./schema/Account')(app, mongoose);
    require('./schema/Admin')(app, mongoose);
    require('./schema/Staff')(app, mongoose);
    require('./schema/Transcation')(app, mongoose);
};