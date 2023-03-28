const express = require('express');
// mini router in de main routerS
const router = express.Router()

router.get('/', (req, res) => {
    // res.send('Schilderijen')
    res.render("index");
})

router.get('/:id', (req, res) => {
    req.params.id
    res.send(`Krijg schilderij details ${req.params.id}`) 
})

router.param('id', (req, res, next, id) => {
    req.user = [id]
    next()
})

module.exports = router