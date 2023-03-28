const express = require('express');
const router = express.Router()

const users = require('./users');
const error = require('./error');

router.use('/users', users);
router.use('/offline', error);


module.exports = router
