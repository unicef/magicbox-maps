var axios = require('axios');
var express = require('express');
var router = express.Router();
var mb_url = 'http://magicboxstaging.azurewebsites.net/api/v1';

/* GET home page. */
const forward_get = (req, res, next) => {
  console.log("IN FORWARD GET");
  const url = `${mb_url}${req.originalUrl}`
  axios.get(url)
    .catch(err => {
      alert('There was an error trying to get initial load BE')
    })
    .then(response => {
      res.json(response.data);
    })
}

router.get('/countries', forward_get);
module.exports = router;
