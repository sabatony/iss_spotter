const request = require('request');

const fetchMyIp = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`status code ${response.statusCode} when fetching IP: ${body}`, null));
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });


};




module.exports = {fetchMyIp};