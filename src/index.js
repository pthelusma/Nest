'use strict';
var Nest = require('./Nest');

exports.handler = function (event, context) {
    var nest = new Nest();
    nest.execute(event, context);
};
