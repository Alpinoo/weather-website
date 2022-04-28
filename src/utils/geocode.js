const request = require('postman-request');

const geocode = (address, callback) => {
   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
   )}.json?access_token=pk.eyJ1IjoiYWxwaW5vOTciLCJhIjoiY2wyZG1mNDV0MTBpejNrcDltazNhdmQ4YyJ9.EtaiGDWIDq6VylqjbZ5Q-g&limit=1`;
   request({url, json: true}, (error, {body}) => {
      if (error) {
         callback(
            `Couldn't connect to the weather service`
         );
      } else if (body.features.length === 0) {
         callback(`Couldn't find the location.`);
      } else {
         callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name,
         });
      }
   });
};

module.exports = geocode;
