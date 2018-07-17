const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/:country', (req, res) => {
  _parsedUrl = req['_parsedUrl']
  path = _parsedUrl['path']
  console.log('path' + path)
  if ( path === '/COD' ) {
    const cod = require('../public/cod_2.json');
    res.send(cod)
  } else if ( path == '/COL' ) {
    const mpio = require('../public/mpio.json');
    res.send(mpio)
  }
})
module.exports = router;
