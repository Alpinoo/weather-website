const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const htmlPath = path.join(
   __dirname,
   '../public'
);

const viewPath = path.join(
   __dirname,
   '../templates/views'
);

const partialsPath = path.join(
   __dirname,
   '../templates/partials'
);

app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialsPath);

app.use(express.static(htmlPath));

app.get('', (req, res) => {
   res.render('index', {
      name: 'Alp Oral',
      title: 'Weather page',
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About Me',
      name: 'Alp oral',
   });
});

app.get('/weather', (req, res) => {
   if (!req.query.address) {
      return res.send({
         error: 'Please provide an address',
      });
   } else {
      geocode(
         req.query.address,
         (
            error,
            {latitude, longitude, location} = {}
         ) => {
            if (error) {
               return res.send({
                  error,
               });
            } else {
               forecast(
                  latitude,
                  longitude,
                  (error, forecast) => {
                     if (error) {
                        return res.send(
                           'No matching coordinates'
                        );
                     } else {
                        res.send({
                           forecast: forecast,
                           location,
                           address:
                              req.query.address,
                        });
                     }
                  }
               );
            }
         }
      );
   }
});

app.get('/help/*', (req, res) => {
   res.render('404', {
      title: '404',
      errorMessage: 'Help article not found',
      name: 'Alp',
   });
});

app.get('*', (req, res) => {
   res.render('404', {
      title: '404',
      errorMessage: 'Page not found',
      name: 'Alp',
   });
});

app.listen(3000, () => {
   console.log('Server has started on port 3000');
});
