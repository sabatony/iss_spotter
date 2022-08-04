const {fetchMyIp} = require('./iss');

fetchMyIp((error, ip) => {
  if(error) {
    console.log('it didnt work!', error);
    return;
  }


  console.log('it worked! return ip:' , ip);
});