const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const mpio = require('../public/mpio');

router.get('/:country', (req, res) => {
  res.send(mpio)
})
module.exports = router;
