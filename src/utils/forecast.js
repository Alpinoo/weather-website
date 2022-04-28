const request = require('postman-request');

const forecast = (
   longitude,
   latitude,
   callback
) => {
   const url = `http://api.weatherstack.com/current?access_key=44a1db3a1e8b883c9f41206e8f2ead31&query=${longitude},${latitude}`;
   request({url, json: true}, (error, {body}) => {
      if (error) {
         callback(
            `Couldn't connect to the weather server.`
         );
      } else if (body.error) {
         callback(`No matching location.`);
      } else {
         callback(
            undefined,
            `${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees.`
         );
      }
   });
};

module.exports = forecast;
