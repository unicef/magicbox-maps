// eslint-disable-next-line new-cap
const router = require('express').Router();
const helper = require('./helper-router')
const config = require('../react-app/src/config.js')
const magicboxUrl = config.magicbox_url; // Magic box API url

router.get('/countries', helper.cache_response(300), (req, res, next) => {
  helper.forward_request_to_url(res, magicboxUrl + 'mobility/countries')
})

router.get(
  '/sources/:source/series/:series/countries/:country',
  helper.cache_response(300),
  (req, res, next) => {
    const url = `${magicboxUrl}mobility/sources/` +
    req.params.source +
    '/series/' + req.params.series +
    '/countries/' + req.params.country
    helper.forward_request_to_url(res, url)
  })

router.get('/sources/:source/series/:series/countries/:country/:filename',
           helper.cache_response(300), (req, res, next) => {
             const url = `${magicboxUrl}mobility/sources/` +
             req.params.source +
             '/series/' + req.params.series +
             '/countries/' + req.params.country +
             '/' + req.params.filename
             helper.forward_request_to_url(res, url)
           })

module.exports = router;
