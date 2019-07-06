    const express = require("express")
//   const art=require('express-ejs-layouts')
    const app = express();
    const passport = require('passport');

require('./models/db');
const path=require('path')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

require('./config/passport')(passport);

// EJS
// app.use(art)
var morgan=require('morgan')
const flash = require('connect-flash');
const session=require('express-session')

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
 
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());

// app.use((req,res,next)=>{
//     res.locals.success_msg=req.flash('success_msg');
//     res.locals.error_msg=req.flash('error_msg');
// })
require('./api/index.js')(app,passport);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/',express.static(__dirname+"/public_static"))
app.use('/en/cross_border_health',express.static(__dirname+"/public_static/services.html"))
app.use('/en/application',express.static(__dirname+"/public_static/application.html"))
app.use('/en/online_application',express.static(__dirname+"/public_static/online_application.html"))
app.use('/en/contact_us',express.static(__dirname+"/public_static/contact_us.html"))
app.use('/en/faqs',express.static(__dirname+"/public_static/faqs.html"))
app.use('/en/about_us',express.static(__dirname+"/public_static/about_us.html"))

//  app.use('/addlogin', require('./routes').route)

app.listen(7007,(err)=>{
    console.log("Server Started at http://localhost:7007")
})
