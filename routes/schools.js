const forward_get = require('./helper-router').forward_get
const forward_get_with_token = require('./helper-router')
  .forward_get_with_token
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/countries/:country', forward_get_with_token);
router.get('/school/:school_id', forward_get_with_token);
router.get('/countries', forward_get);
module.exports = router;
