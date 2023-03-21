const express = require('express')
// applicatie wordt gemaakt
const app = express();

// probeer css in te laden
app.use(express.static(__dirname + '/'));


app.set('view engine', 'ejs');
app.use(logger)

// fetch de data van de API op index pagina
app.get('/', (req, res) => {
  const url = 'https://www.rijksmuseum.nl/api/nl/collection?key=9ZKSEiYs&involvedMaker=Rembrandt+van+Rijn';
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const artObjects = data.artObjects.slice(0, 10); // slice the first 10 art objects
      res.render('index', { data: { artObjects } }); // pass the data object to the template
    })
    .catch(error => console.error(error));
});


// fetch de data van de API op detials pagina
app.get('/details/:objectNumber', (req, res) => {
  const url = `https://www.rijksmuseum.nl/api/nl/collection/${req.params.objectNumber}?key=9ZKSEiYs`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const artObject = data.artObject;
      res.render('details', { artObject });
    })
    .catch(error => console.error(error));
});

// fetch de data van de API op overview pagina
app.get('/overview', (req, res) => {
  const url = 'https://www.rijksmuseum.nl/api/nl/collection?key=9ZKSEiYs&involvedMaker=Rembrandt+van+Rijn';
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const artObjects = data.artObjects.slice(0, 10); // slice the first 10 art objects
      res.render('overview', { data: { artObjects } }); // pass the data object to the template
    })
    .catch(error => console.error(error));
});

// Middleware & static files
app.use(express.static('public'));

// userRouter is een mini router
const userRouter = require('./routes/users');

app.use('/users', userRouter);

function logger(req, res, next) {
    console.log('req.originalUrl', req.originalUrl)
    next()
}

const port = 3000;

app.listen(port, ()=>{
    console.log(`App is listening on port http://127.0.0.1:${port}`)
})



  

