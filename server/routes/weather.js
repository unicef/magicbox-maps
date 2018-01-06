const axios = require('axios');
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();


/**
 * forward_get - gets weather for lat lon points
 *
 * @param  {type} req  reqyuest
 * @param  {type} res  response
 * @param  {type} next next
 */
const forward_get = (req, res, next) => {
  console.log('IN FORWARD GET WEATHER');
  let lat = Math.round(req.query.lat * 10) / 10;
  let lon = Math.round(req.query.lon * 10) / 10;
  let url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=db2d58ed888ba9a7f1e95a9c291f301d';
  axios.get(url)
    .catch(err => {
      alert('There was an error trying to get initial load BE')
    })
    .then(response => {
      res.json(response.data.weather[0]);
    })
}

router.get('/', forward_get);
module.exports = router;