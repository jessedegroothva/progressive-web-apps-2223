const express = require('express');
const router = express.Router()


router.use('/', (req, res) => {
    res.render('offline');
})


module.exports = router