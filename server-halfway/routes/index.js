var express = require('express');
var cors = require('cors')
var app = express()
const keys = require('../keys')
app.use(cors())
const fetch = require("node-fetch")
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
  keys.TWILIO_ACCOUNT_SID,
  keys.TWILIO_AUTH_TOKEN
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

//to start back end, 1) cd into server-halfway and do npm start

app.get('/', function(req, res, next) {
  // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address1}&key=AIzaSyAJz4DTBi9a5cInCXNmP_CWly2cr0YlfIw`)
  //   .then(res => res.json())
  //   .then(latlong => console.log(latlong.results[0].geometry.location));
  // let latlong = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address1}&key=AIzaSyAJz4DTBi9a5cInCXNmP_CWly2cr0YlfIw`).then(res => res.json())
  res.json(latlong);
});

app.post('/addresses', async (req,res) => {
  //get the data input from the front end
  let address1 = req.body.address1;
  let address2 = req.body.address2;
  console.log(address1, address2)

  //get the coordinates for those addresses
  let latlong1 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address1)}&key=AIzaSyAJz4DTBi9a5cInCXNmP_CWly2cr0YlfIw`)
  latlong1 = await latlong1.json()
  console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address2)}&key=AIzaSyAJz4DTBi9a5cInCXNmP_CWly2cr0YlfIw`)
  let latlong2 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address2)}&key=AIzaSyAJz4DTBi9a5cInCXNmP_CWly2cr0YlfIw`)
  latlong2 = await latlong2.json()

  //log those coordinates
  console.log(latlong1.results[0].geometry.location,  latlong2.results[0].geometry.location)
  averageLongLats(latlong1.results[0].geometry.location.lng,  latlong1.results[0].geometry.location.lat,  latlong2.results[0].geometry.location.lng,  latlong2.results[0].geometry.location.lat, res)
});

averageLongLats = async (long1,lat1,long2,lat2, res) => {
  let longTotal = long1 + long2
  let longAverage = longTotal/2

  let latTotal = lat1 + lat2
  let latAverage = latTotal/2
  
  location1 = {lat1, long1}
  location2 = {lat2, long2}

  coordAverage = { lat: latAverage, lng: longAverage}
  console.log(coordAverage)

  await fetch(`https://api.yelp.com/v3/businesses/search?longitude=${longAverage}&latitude=${latAverage}`, 
    {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer sLGt2hCEWflTgixPT4oAQE8Z132HtgtMo4bbla1RHvcPWuUiyjTcTIF1cqqZIZamdcZl2Ywf1nFueeaqtH03qR5xz9f_R2Rt4sS95xIyaIDlSXiT1zOgfTJi1ZDcXHYx'
        }
      })
      .then(response => response.json())
      .then(restaurants => res.json({restaurants, coordAverage, location1, location2 }))

}

app.post('/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: keys.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });

});


module.exports = app;