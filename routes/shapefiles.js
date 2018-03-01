const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const mpio = require('../public/mpio');

router.get('/:country', (req, res) => {
  console.log('BBBB')
  res.send(mpio)
})
module.exports = router;
