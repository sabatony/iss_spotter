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

const fetchCoordsByIp = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      callback(Error(`Success status was ${parsedBody.success}. Server says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`), null);
      return;
    }
    const {latitude, longitude} = parsedBody;
    callback(null, {latitude, longitude});
    
  });

};

const fetchISSFlyOverTimes = function(object, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${object.latitude}&lon=${object.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null)
      return;
    }
    const parsedData = JSON.parse(body).response;
    callback(null, parsedData);
  });

};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIp(ip, (error, loc) => {
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




module.exports = {fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation};