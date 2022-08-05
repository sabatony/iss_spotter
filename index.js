const {fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');
/*
fetchMyIp((error, ip) => {
  if(error) {
    console.log('it didnt work!', error);
    return;
  }
  console.log('it worked! return ip:' , ip);
});

fetchCoordsByIp('24.85.241.38', (error, data) => {
  if (error) {
    console.log('it didnt work!', error)
    return;
  }
  console.log('it worked return data:' , data);
}); 

const exampleCoords = {latitude: '49.27670', longitude: '-123.13000'};

fetchISSFlyOverTimes(exampleCoords, (error, data) => {
  if (error) {
    console.log('it didnt work!', error)
    return;
  }

  console.log('it worked, returned flyocver times:', data);

}); */

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log('It didnt work!', error);
    return ;
  }

  printPassTimes(passTimes);
});
