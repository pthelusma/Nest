'use strict';
var storage = require('./storage');

var registerEventHandlers = function (eventHandlers, skillContext) {
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        //if user said a one shot command that triggered an intent event,
        //it will start a new session, and then we should avoid speaking too many words.
        skillContext.needMoreHelp = false;
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
      console.log("Launching . . .");
        //Speak welcome message and ask user questions
        //based on whether there are players or not.
        storage.loadConfig(session, function (config) {
            var speechOutput = 'I have retrieved the Nest configuration.',
                reprompt;

            response.tell(speechOutput, reprompt);
        });
    };
};
exports.register = registerEventHandlers;
