const express = require('express');
const exphbs = require('express-handlebars');
const numeral = require('numeral');
require('express-async-errors');

const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.engine('hbs', exphbs({
  defaultLayout: 'main.hbs',
  helpers: {
    format: val => numeral(val).format('0,0')
  }
}));
app.set('view engine', 'hbs');

app.use('/public', express.static('public'));


app.get('/', function (req, res) {
    res.render('home');
})


app.get('/err', function (req, res) {
    throw new Error('beng beng');
  })

app.use(function (req, res) {
    res.render('404', {
      layout: false
    });
  })
  
  //
  // default error handler
  
  app.use(function (err, req, res, next) {
    console.log(err);
    res.send('error');
  })
  
  const PORT = 3000;
  app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
  })