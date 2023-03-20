const express = require('express')
// applicatie wordt gemaakt
const app = express();

app.set('view engine', 'ejs');
app.use(logger)

app.get('/', (req, res) => {
    console.log('Here')
    res.render('index', { text: 'World'})
});

// userRouter is een mini router
const userRouter = require('./routes/users');

app.use('/users', userRouter);

function logger(req, res, next) {
    console.log('req.originalUrl', req.originalUrl)
    next()
}

app.listen(3000)