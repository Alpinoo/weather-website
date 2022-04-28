const request = require('postman-request');

const forecast = (
   longitude,
   latitude,
   callback
) => {
   const url = `http://api.weatherstack.com/current?access_key=752ffb45255a82d5c0c9745c6c17a996&query=${longitude},${latitude}`;
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
