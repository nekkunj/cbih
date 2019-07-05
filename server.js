    const express = require("express")
const app = express();
require('./models/db');
const path=require('path')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use('/',express.static(__dirname+"/public_static"))
app.use('/en/cross_border_health',express.static(__dirname+"/public_static/services.html"))
app.use('/en/application',express.static(__dirname+"/public_static/application.html"))
app.use('/en/online_application',express.static(__dirname+"/public_static/online_application.html"))
app.use('/en/contact_us',express.static(__dirname+"/public_static/contact_us.html"))
app.use('/en/faqs',express.static(__dirname+"/public_static/faqs.html"))
app.use('/en/about_us',express.static(__dirname+"/public_static/about_us.html"))
app.use('/sign_up',express.static(__dirname+"/public_static/signup"))
app.use('/login',express.static(__dirname+"/public_static/login/"))
app.use('/addlogin', require('./routes').route)
app.listen(7007,(err)=>{
    console.log("Server Started at http://localhost:7007")
})
