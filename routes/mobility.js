// eslint-disable-next-line new-cap
const router = require('express').Router();
const axios = require('axios');
const config = require('../react-app/src/config.js')
const magicboxUrl = process.env.magicbox_url || config.magicbox_url; // Magic box API url

// Mobility data
const mobilityData = '/mobility/sources/acme/series/santiblanko/countries/'
// Base url
const baseUrl = `${magicboxUrl}${mobilityData}`

/**
 * Forward request to given url
 *
 * @param  {String} res
 * @param  {String} url
 */
const forwardRequestToUrl = (res, url) => {
  axios.get(url)
    .catch(err => {
      console.log('There was an error trying to get initial load BE');
    })
    .then(response => {
      res.json(response.data);
    })
}

router.get('/countries', (req, res, next) => {
  forwardRequestToUrl(res, baseUrl)
})

router.get('/countries/:country', (req, res, next) => {
  const url = `${baseUrl}${req.params.country}`;
  forwardRequestToUrl(res, url)
})

router.get('/countries/:country/:filename', (req, res, next) => {
  const url = `${baseUrl}${req.params.country}/${req.params.filename}`;
  forwardRequestToUrl(res, url)
})

module.exports = router;
