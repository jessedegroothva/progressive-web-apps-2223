const https = require("https");
const fs = require("fs");

const key = fs.readFileSync("localhost-key.pem", "utf-8");
const cert = fs.readFileSync("localhost.pem", "utf-8");

// reageert op de webpage met de express library
const express = require('express')

// applicatie wordt gemaakt
// de nodige infrastructuur opzet om een webapplicatie te kunnen bouwen en verwerken.
const app = express();

// library wordt gebruikt om de Middleware & static files te gebruiken
app.use(express.static('public'));

// library wordt gebruikt om een template engine te gebruiken voor html pagina's
app.set('view engine', 'ejs');

// logger wordt gebruikt om de informatie te loggen in de terminal
app.use(logger)

// fetch de data van de API op index pagina
app.get('/', (req, res) => {
  const url = 'https://www.rijksmuseum.nl/api/nl/collection?key=9ZKSEiYs&involvedMaker=Rembrandt+van+Rijn';
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const artObjects = data.artObjects
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
      const artObjects = data.artObjects.slice(0, 10); // slice the first 10 art objects
      res.render('overview', { data: { artObjects } }); // pass the data object to the template
    })
    .catch(error => console.error(error));
});


app.get('/search', (req, res) => {
  const searchTerm = req.query.searchTerm;
  const url = `https://www.rijksmuseum.nl/api/nl/collection?key=9ZKSEiYs&q=${searchTerm}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const artObjects = data.artObjects.filter(obj => obj.title.toLowerCase().includes(searchTerm.toLowerCase()));
      res.render('search', { data: { artObjects } });
    })
    .catch(error => console.error(error));
});



// userRouter is een mini router
// ****NOG UITVINDEN WAT HET IS, maar het zorgt ervoor dat de cache werkt
const routes = require('./routes');
app.use('/', routes);

function logger(req, res, next) {
    // console.log('req.originalUrl', req.originalUrl)
    next()
}

const port = 3000;

https.createServer({ key, cert }, app).listen(port,()=>{
  console.log(`App is listening on port https://localhost:${port}/overview`)
});

