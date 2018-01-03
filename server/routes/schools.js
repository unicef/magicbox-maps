const config = require('../../src/config.js')
const axios = require('axios');
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const mb_url = 'http://magicboxstaging.azurewebsites.net/api/v1';
let acToken = 'KE0GE1Zg1hPaE6AR'; // Initial  Access Token
const Request = require('superagent');
const magicbox_url = config.magicbox_url; // Magic box API rul
const refreshToken = config.refreshToken; // Permanent Refresh Token
const rfUrl = config.rfUrl; // Refresh Token URL

/**
 * getNewToken - gets a new token when the given token is expired
 *
 * @param  {type} url     url to get token
 * @param  {type} rfToken refresh tokem
 * @return {type}         a promise
 */
function getNewToken(url, rfToken) {
  return new Promise((resolve, reject) => {
    console.log('In getNT');
    Request
      .get(url + rfToken)
      .end(function(err, resp) {
        if (err || !resp.ok) {
          return reject(err);
          console.log('err getting new token');
        } else {
          console.log('HERE IS YOUR NEW Token');
          acToken = JSON.parse(resp.text)['access_token'];
          resolve();
          console.log('T: ' + acToken);
        }
      });
  })
}


/**
 * getResponseError - simple recalls the same api request with the updated token
 *
 * @param  {type} url   api url
 * @param  {type} token token
 * @param  {type} res   responce
 */
function getResponseError(url, token, res) {
  console.log('In getRE');
  Request
    .get(url)
    .set('Token', 'Bearer ' + token)
    .retry(2)
    .end(function(err, resp) {
      if (err || !resp.ok) {
        console.log(token);
        console.log('Error with new token');
      } else {
        console.log('yay got ' + JSON.parse(resp.text));
        res.json(JSON.parse(resp.text));
      }
    });
}


/**
 * getResponse - getResponse makes the API call
 * if there is an error then it calls get a new token && redos the request with the new token
 * If there is no erorr then it just outputs the response
 *
 * @param  {type} url   api url
 * @param  {type} token token
 * @param  {type} res   responce
 */
function getResponse(url, token, res) {
  console.log('In GetR');
  Request
    .get(url)
    .set('Token', 'Bearer ' + token)
    .retry(2)
    .end(function(err, resp) {
      if (err || !resp.ok) {
        console.log('Oh no! error. Getting new Token');
        getNewToken(rfUrl, refreshToken)
          .then(() => {
            getResponseError(url, acToken, res);
          })
      } else {
        console.log('yay got ' + JSON.parse(resp.text));
        res.json(JSON.parse(resp.text));
      }
    });
}

/**
 *  This function is called when there is an api
 *  request for a particular country
 * @param  {type} req   request
 * @param  {type} res   response
 * @param  {type} next  next
 */
const forward_get2 = (req, res, next) => {
  console.log('FORWARD_GET2');
  const url = `${magicbox_url}${req.originalUrl}`
  getResponse(url, acToken, res);
}

/**
 * This function is called when there is an api request
 * and it gets all the countries that we have info for
 * @param  {type} req   request
 * @param  {type} res   response
 * @param  {type} next  next
 */
const forward_get = (req, res, next) => {
  console.log('IN FORWARD GET');
  const url = `${mb_url}${req.originalUrl}`
  axios.get(url)
    .catch(err => {
      alert('There was an error trying to get initial load BE')
    })
    .then(response => {
      res.json(response.data);
    })
}
router.get('/countries/:country', forward_get2);
router.get('/countries', forward_get);
module.exports = router;