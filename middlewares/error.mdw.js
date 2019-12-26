module.exports = function (app) {
    app.use(function (req, res) {
      res.render('404', {
        layout: false
      });
    })
  
    //
    // default error handler
  
    app.use(function (err, req, res, next) {
      console.log(err);
      res.render('404', {
        layout: false
      });
      //res.send('error');
    })
  }
  