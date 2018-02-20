const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
var thisYear = new Date().getFullYear();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
    console.log('Unable to append to server.log')
  }
});
  console.log(log);
  next();
});

//app.use((req, res, next) => {
//  res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  //res.send('<h1>Hello Express!</h1>');
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: thisYear,
    welcomeMessage: 'Welcom to our site! Thanks for visiting'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: thisYear
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'This is your error',
    errorCode: 'ID10T'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
