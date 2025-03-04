const request = require("postman-request");
require("dotenv").config();

const geocode = (address, callback) => {
   if (!process.env.MAPBOX) {
      return callback("Missing API Key: MAPBOX");
   }

   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
   )}.json?access_token=${process.env.MAPBOX}&limit=1`;

   request({ url, json: true }, (error, response) => {
      if (error) {
         return callback("Couldn't connect to the location service.", undefined);
      }

      if (!response || !response.body || !response.body.features) {
         return callback("Invalid API response from Mapbox.", undefined);
      }

      const { body } = response;

      if (body.features.length === 0) {
         return callback("Couldn't find the location.", undefined);
      }

      const { center, place_name } = body.features[0];

      callback(undefined, {
         latitude: center[1],
         longitude: center[0],
         location: place_name,
      });
   });
};

module.exports = geocode;
