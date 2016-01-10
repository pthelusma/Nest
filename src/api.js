var request = require('request');

var api = (function () {
  return {
      getDevice: function (token, deviceId, callback) {
          var getDeviceResponseHandler = function (error, response, body) {
              if (!error) {
                  var device = JSON.parse(body);
                  callback(device);
              }
              else {
                  console.log('Error happened: ' + error);
                  callback(null);
              }
          };

          var url = 'https://developer-api.nest.com/devices/thermostats/' + deviceId + '?auth=' + token;
          var options = this.getRequestOptions(url);

          request(options, getDeviceResponseHandler);
      },

      getRequestOptions: function (url, method) {
          if(url === null) {
              console.log("URL is a required parameter of getRequestOptions().");
              return null;
          }

          var methodType = (method === null) ? 'GET' : method;
          return {
              method: methodType,
              url: url,
              followRedirect: true,
              followAllRedirects: true
          };
      }
  };
})();
module.exports = api;
