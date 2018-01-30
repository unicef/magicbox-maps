// eslint-disable-next-line new-cap
const router = require('express').Router();
const axios = require('axios');
const config = require('../react-app/src/config.js')
const magicbox_url = process.env.magicbox_url || config.magicbox_url; // Magic box API url

router.get('/countries', (req, res, next) => {
  const url = `${magicbox_url}/mobility/sources/acme/series/santiblanko/countries/`;

  axios.get(url)
    .catch(err => {
      console.log('There was an error trying to get initial load BE');
    })
    .then(response => {
      res.json(response.data);
    })
});

router.get('/countries/:country', (req, res, next) => {
  const url = `${magicbox_url}/mobility/sources/acme/series/santiblanko/countries/${req.params.country}`;

  axios.get(url)
    .catch(err => {
      console.log('There was an error trying to get initial load BE');
    })
    .then(response => {
      res.json(response.data);
    })
});

router.get('/countries/:country/:filename', (req, res, next) => {
  const url = `${magicbox_url}/mobility/sources/acme/series/santiblanko/countries/${req.params.country}/${req.params.filename}`;

  axios.get(url)
    .catch(err => {
      console.log('There was an error trying to get initial load BE');
    })
    .then(response => {
      res.json(response.data);
    })
});

module.exports = router;
