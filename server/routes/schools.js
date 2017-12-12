var axios = require('axios');
var express = require('express');
var router = express.Router();
var mb_url = 'http://magicboxstaging.azurewebsites.net/api/v1';

/* GET home page. */
const forward_get = (req, res, next) => {
  console.log("IN FORWARD GET");
  //console.log(mb_url);
  //console.log(req.originalUrl);
  const url = `${mb_url}${req.originalUrl}`
  console.log(url);
  axios.get(url)
    .catch(err => {
      alert('There was an error trying to get initial load BE')
    })
    .then(response => {
      console.log(response.data);
      //res.send(response.data);
      res.json(response.data);
    })


}

router.get('/countries', forward_get);
module.exports = router;
