module.exports = function (app) {
    app.get('/', function (req, res) {
      // res.send('hello expressjs');
      res.render('home');
    })
  
    app.get('/about', function (req, res) {
      res.render('about');
    })
  
    app.get('/bs', function (req, res) {
      // res.sendFile(__dirname + '/bs.html');
      res.render('bs', {
        layout: false
      });
    })
  
    //app.use('/categories', require('../routes/category.route'));
  };
  