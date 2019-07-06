
module.exports = function(app,passport) {
    app.get('/login', function(req, res){
      res.render('login.ejs');
     });
     app.get('/sign_up', function(req, res){
        res.render('signup.ejs');
       });
       
    }


