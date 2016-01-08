/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.

var AlexaSkill = require('./AlexaSkill');
var nest = require('./nest');
var AWS = require("aws-sdk");

var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

this.config = {};



var self = this;

/*
dynamodb.getItem({
  TableName: 'Config',
  Key: {
    id:
    {
      S: "nest"
    }
  }
}, function(err, data){
  if(err) {
    console.log(err);
    return;
  }
  config = data;
  console.log(data);
});
*/


var APP_ID = self.config.app_id;
var NEST_TOKEN = self.config.token;

var DEVICE_MAP = {
};

var options = {
  hostname: 'developer-api.nest.com',
  port: 443,
  path: '/devices/thermostats/',
  method: 'GET',
  headers: {'Authorization' : 'Bearer ' + NEST_TOKEN }
};

var NestSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
NestSkill.prototype = Object.create(AlexaSkill.prototype);
NestSkill.prototype.constructor = NestSkill;

NestSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("NestSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);

};

NestSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("NestSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    getWelcomeResponse(response);
};

NestSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("NestSkill onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session cleanup logic would go here
};

NestSkill.prototype.intentHandlers = {
  "WhatsMyLivingRoomTemperature": function(intent, session, response) {
    getMyLivingRoomTemperature(response);
  },
  "WhatsTheTemperature": function(intent, session, response) {
    getTemperature(intent, response);
  }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var nestSkill = new NestSkill();
    nestSkill.execute(event, context);
};

function getMyLivingRoomTemperature(response) {
  console.log("Do nothing");
}

function getTemperature(intent, response) {

  var params = {
    TableName : 'Config',
    Key: {
      id: 'nest'
    }
  };


  var docClient = new AWS.DynamoDB.DocumentClient();

  docClient.get(params, function(err, data) {
    if (err) {
      console.log(err);
    }
    else {
      self.config = data.Item;
      console.log(self.config);
    }
  });

  var where = intent.slots.Where.value;
  var deviceId = DEVICE_MAP[where];

  //console.log(self.config);

  nest.getDevice(NEST_TOKEN, deviceId, function (device) {
    console.log("Device: " + device.ambient_temperature_f);
    response.tell("Your " + where + " temperature is " + device.ambient_temperature_f + " degrees.");
  });
}
// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(response) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Welcome to the Alexa Skills Kit sample. " +
        "Please tell me your favorite color by saying, my favorite color is red";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "Please tell me your favorite color by saying, " +
        "my favorite color is red";
    var shouldEndSession = false;

    response.tell(speechOutput);
}
