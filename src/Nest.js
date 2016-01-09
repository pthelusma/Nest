'use strict';
var AlexaSkill = require('./AlexaSkill'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers');

var APP_ID = "amzn1.echo-sdk-ams.app.fda59453-7cba-4b5d-aeac-43f551975d90";
var skillContext = {};

var Nest = function () {
    AlexaSkill.call(this, APP_ID);
    skillContext.needMoreHelp = true;
};

// Extend AlexaSkill
Nest.prototype = Object.create(AlexaSkill.prototype);
Nest.prototype.constructor = Nest;

eventHandlers.register(Nest.prototype.eventHandlers, skillContext);
intentHandlers.register(Nest.prototype.intentHandlers, skillContext);

module.exports = Nest;
