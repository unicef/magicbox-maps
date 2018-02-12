// eslint-disable-next-line new-cap
const router = require('express').Router();
const helper = require('./helper-router')
const axios = require('axios');
const config = require('../react-app/src/config.js')
const magicboxUrl = config.magicbox_url; // Magic box API url

// Mobility data
const mobilityData = '/mobility/sources/acme/series/santiblanko/countries/'
// Base url
const baseUrl = `${magicboxUrl}${mobilityData}`

// Forward request to given url
const forwardRequestToUrl = (res, url) => {
  axios.get(url)
    .catch(err => {
      console.log('There was an error trying to get initial load BE');
    })
    .then(response => {
      res.json(response.data);
    })
}

router.get('/countries', helper.cache_response(300), (req, res, next) => {
  forwardRequestToUrl(res, baseUrl)
})

router.get('/countries/:country', helper.cache_response(300), (req, res, next) => {
  const url = `${baseUrl}${req.params.country}`;
  forwardRequestToUrl(res, url)
})

router.get('/countries/:country/:filename', helper.cache_response(300), (req, res, next) => {
  const url = `${baseUrl}${req.params.country}/${req.params.filename}`;
  forwardRequestToUrl(res, url)
})

module.exports = router;
