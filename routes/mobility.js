// eslint-disable-next-line new-cap
const router = require('express').Router();
const axios = require('axios');
const config = require('../react-app/src/config.js')
const magicboxUrl = process.env.magicbox_url || config.magicbox_url; // Magic box API url

// Mobility data
const mobilityData = '/mobility/sources/acme/series/santiblanko/countries/'
// Base url
const baseUrl = `${magicboxUrl}${mobilityData}`

router.get('/countries', (req, res, next) => {
  axios.get(baseUrl)
    .catch(err => {
      console.log('There was an error trying to get initial load BE');
    })
    .then(response => {
      res.json(response.data);
    })
});

router.get('/countries/:country', (req, res, next) => {
  const url = `${baseUrl}${req.params.country}`;

  axios.get(url)
    .catch(err => {
      console.log('There was an error trying to get initial load BE');
    })
    .then(response => {
      res.json(response.data);
    })
});

router.get('/countries/:country/:filename', (req, res, next) => {
  const url = `${baseUrl}${req.params.country}/${req.params.filename}`;

  axios.get(url)
    .catch(err => {
      console.log('There was an error trying to get initial load BE');
    })
    .then(response => {
      res.json(response.data);
    })
});

module.exports = router;
