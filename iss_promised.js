const request = require('request-promise-native');

const fetchMyIp = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIp = function(body) {
  const parsedIp = JSON.parse(body).ip;
  return request(`http://ipwho.is/${parsedIp}`);
};

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body)
  return request (`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
 return fetchMyIp()
  .then(fetchCoordsByIp)
  .then(fetchISSFlyOverTimes)
  .then((body) => {
    const {response} = JSON.parse(body);
    return response;
  });
};
module.exports = {nextISSTimesForMyLocation};