const {fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes} = require('./iss');
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