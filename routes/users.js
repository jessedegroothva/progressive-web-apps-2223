const express = require('express');
// mini router in de main routerS
const router = express.Router()

router.get('/', (req, res) => {
    // res.send('Schilderijen')
    res.render("index");
})


// router.get('/details', (req, res) => {
//     res.send('New User')
// })


// Je kan dus ook chainen in NodeJS
// router.route('/:id').get((req, res) => {
//     req.params.id
//     res.send(`Krijg schilderij details ${req.params.id}`) 
// }).put((req, res) => {
//     req.params.id
//     res.send(`Krijg schilderij details ${req.params.id}`) 
// }).delete((req, res) => {
//     req.params.id
//     res.send(`Krijg schilderij details ${req.params.id}`) 
// })

router.get('/:id', (req, res) => {
    req.params.id
    res.send(`Krijg schilderij details ${req.params.id}`) 
})

router.param('id', (req, res, next, id) => {
    req.user = [id]
    next()
})

// router.put('/:id', (req, res) => {
//     req.params.id
//     res.send(`Krijg schilderij details ${req.params.id}`) 
// })

// router.delete('/:id', (req, res) => {
//     req.params.id
//     res.send(`Krijg schilderij details ${req.params.id}`) 
// })

module.exports = router