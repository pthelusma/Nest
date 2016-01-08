var request = require('request');
var https = require('https');

var nest = (function () {
    return {
        getDevice: function (token, deviceId, callback) {
            console.log("Getting Device deviceId:" + deviceId);

            //create a callback when were done getting the device
            var getDeviceResponseHandler = function (error, response, body) {
                if (!error) {
                    console.log("Got response: " + response.statusCode);
                    //console.log("data:" + body);
                    var device = JSON.parse(body);
                    callback(device);
                }
                else {
                    console.log('Error happened: ' + error);
                    //getErrorResponse(callback, error);
                    callback(null);
                }
            };


            var url = 'https://developer-api.nest.com/devices/thermostats/' + deviceId + '?auth=' + token;
            var options = this.getRequestOptions(url);

            //we have what we need, get it.
            request(options, getDeviceResponseHandler);
        },

        getRequestOptions: function (url, method) {

            //url is required
            if(url === null) {
                console.log("URL is a required parameter of getRequestOptions().");
                return null;
            }

            //default request method is GET
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
module.exports = nest;
