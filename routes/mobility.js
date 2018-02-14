// eslint-disable-next-line new-cap
const router = require('express').Router();
const helper = require('./helper-router')
const config = require('../react-app/src/config.js')
const magicboxUrl = config.magicbox_url; // Magic box API url

// Mobility data
const mobilityData = '/mobility/sources/acme/series/santiblanko/countries/'
// Base url
const baseUrl = `${magicboxUrl}${mobilityData}`

router.get('/countries', helper.cache_response(300), (req, res, next) => {
  helper.forward_request_to_url(res, baseUrl)
})

router.get('/countries/:country', helper.cache_response(300),
           (req, res, next) => {
             const url = `${baseUrl}${req.params.country}`;
             helper.forward_request_to_url(res, url)
           })

router.get('/countries/:country/:filename',
           helper.cache_response(300), (req, res, next) => {
             const url = `${baseUrl}${req.params.country}/${req.params.filename}`;
             helper.forward_request_to_url(res, url)
           })

module.exports = router;
