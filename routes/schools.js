const helper = require('./helper-router')
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/countries/:country', helper.cache_response(10), helper.forward_get_with_token);
router.get('/school/:school_id', helper.cache_response(10), helper.forward_get_with_token);
router.get('/countries', helper.cache_response(300), helper.forward_get);

module.exports = router;
