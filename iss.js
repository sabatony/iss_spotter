const request = require('request')

const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=jason', (error, Response, body) => {
    if (error) return callback(error, null);

    if(Response.statusCode !== 200) {
      callback(error(`status code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip)
  });
   
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const url = `https://iss-pass.herokuapp.com/jason/>lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if(error) {
      callback(error, null);
      return;
    }
    if( response.statusCode !== 200) {
      callback(Error(`status code ${response.statusCode} when fetching ISS pass times: ${body}`), null)
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };

