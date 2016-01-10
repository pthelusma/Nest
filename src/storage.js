'use strict';
var AWS = require("aws-sdk");

var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    function Config(session, data) {
        if (data) {
            this.data = data;
        } else {
            this.data = {};
        }
        this._session = session;
    }

    return {
        loadConfig: function (session, callback) {
            if (session.attributes.config) {
                console.log('get game from session=' + session.attributes.config);
                callback(new Config(session, session.attributes.config));
                return;
            }

            var params = {
              TableName: 'Config',
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
                callback(data.Item);
              }
            });
        }
    };
})();
module.exports = storage;
