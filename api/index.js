const mongoose=require('mongoose')
const users=mongoose.model('users')
const bcrypt=require('bcryptjs')
const application=mongoose.model('application')
// const express=require('express')
// const app=express()
// var flash=require("connect-flash");
// app.use(flash());
const mailer = require('express-mailer');
const nodeMailer = require('nodemailer');


const randomstring =require('randomstring')
const user_document_relation=mongoose.model('userdocumentrelation')


module.exports = function(app,passport) {
    app.get('/login',isnotloggedin, function(req, res){
      res.render('login.ejs',{message:req.flash('loginMessage')});
     });
     app.get('/sign_up',isnotloggedin, function(req, res){
        res.render('signup.ejs');
       });

app.post('/login',
   passport.authenticate('local', {
   successRedirect: '/en/online_application',
   failureRedirect: '/login',
   failureFlash:true
  }),function(req,res){
  console.log(req.user.email)
  }
  

  )



       app.post('/sign_up', (req,res)=>{

         
         var s=req.body.Phone
         var p=req.body.Password
         var temp_email=req.body.Email
         var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        var strongPassword= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

         if(!req.body.Name || !req.body.Email || !req.body.Phone || !req.body.Password || !req.body.gender ){
            req.flash('error_msg','Please Fill in all the details')
            res.redirect('/sign_up')
         }
         else if(emailReg.test(temp_email)==false){
            req.flash('error_msg','Email incorrect')
            res.redirect('/sign_up')
         }
         else if(req.body.Password!=req.body.Passwordtwo){
            req.flash('error_msg','Passwords should match')
            res.redirect('/sign_up')
         }
         
         
         else if(p.length<8){
            req.flash('error_msg','Password must be of atleast 8 characters')
            res.redirect('/sign_up')
         }
         else if(p.length>24){
            req.flash('error_msg','Password must be of maximum 24 characters')
            res.redirect('/sign_up')
         }
         else if (phoneno.test(s)==false)
         {
            req.flash('error_msg','Phone number not in correct format')
            res.redirect('/sign_up')
         }
         else if(strongPassword.test(p)==false){
            req.flash('error_msg','Password not in required format')
            res.redirect('/sign_up')
         }
         
        
         
        
       
else{
         users.findOne({email:req.body.Email})
         .then(User=>{
            if(User){
               req.flash('error_msg','This email id is already registered')
               res.redirect('/sign_up')
               
            }
            else{
               const user_one=new users()
               user_one.fullname=req.body.Name
               user_one.email=req.body.Email
               user_one.mobile=req.body.Phone
               user_one.dateofbirth=req.body.Birthdate
               user_one.gender=req.body.gender
               user_one.password=req.body.Password
               const secrettoken=randomstring.generate()
              
               user_one.secretkey=secrettoken
               user_one.active=false
               bcrypt.genSalt(10,(err,salt)=>{
                 bcrypt.hash(user_one.password,salt,(err,hash)=>{
                  console.log(typeof(hash))  
                  if (err){ throw err;}
                    
                    user_one.password=hash;    
                    user_one.save()
               .then(user=>{
                
                  // req.flash('success_msg','signup successful,now login')
                  // res.redirect('/login')

//send email

let transporter = nodeMailer.createTransport({
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
   auth: {
       // should be replaced with real sender's account
       user: 'nekkunjpilani@gmail.com',
       pass: 'nikunj24'
   }
});
const html=`
     
Hi there,
<br/>
Thank you for registering !
<br/><br/>
Please verify your email by typing the following token :
<br/>
Token: <b>${secrettoken}</b>
<br/>
On the following page:
<a href="http://localhost:7007/verify">http://localhost:7007/verify</a>
<br/><br/>
Have a pleasant day!

`
let mailOptions = {
   // should be replaced with real recipient's account
   to: req.body.Email,
   subject: 'yoyo',
   html:html,
   text:html
};
transporter.sendMail(mailOptions, (error, info) => {
   if (error) {
       return console.log(error);
   }
   console.log('Message %s sent: %s', info.messageId, info.response);
   res.redirect('/verify')
});

    
                  
               })    
               .catch(err=>console.log(err))
               
                 })
              })
               // user_one.password=req.body.password
               
               
               
            }
         })
         .catch((err)=>{
            console.log('got an error'+ err)
         })
      
      }
   
     })       

     app.get('/dashboard', isLoggedIn,(req, res) =>{
     
//Finding application information from user email
application.findOne({email:req.user.email})
.then(one=>{
if(one){
user_document_relation.findOne({email:req.user.email})
.then(usdo=>{
   if(usdo){
      res.render('dashboard.ejs', {
         user: req.user,
         app:one,
         user_doc:usdo
       })
   }
   else{
      res.render('dashboard.ejs', {
         user: req.user,
         app:one,
         user_doc:false
       })
   }
})
.catch(err=>console.log(err))
 
}
else{
   console.log('login email id and application email id must be same')
   res.redirect('/en/online_application') 
}
})
.catch((err)=>{
   console.log('got an error'+ err)
})
       
}
   );
   app.get('/en/online_application',isLoggedIn,(req,res)=>{
      application.findOne({email:req.user.email})
      .then(us=>{
         if(us){
            
            res.redirect('/dashboard')
         }
         else{
            res.render('online_application',{user:req.user})
         }
      })
      .catch(err=>{console.log(err)})
      
   })

   app.get('/verify', function(req,res){
      if(!req.isAuthenticated()){
      res.render('verify')}
      else{
         res.redirect('/login')
      }
     })



   app.get('/logout', function(req,res){
      req.logout();
      res.redirect('/');
     })
     app.post('/verify', (req,res)=>{
users.findOne({secretkey:req.body.secretToken})
.then(abc=>{
   if(!abc){
      req.flash('error_msg','Incorrect verification code')
      res.redirect('/verify')
   }
   abc.active=true;
   abc.secretkey=""
 abc.save()
   .then(us=>{
  req.flash('success_msg','Email verified,now login')
  res.redirect('/login')
   })
   .catch(err=>{console.log(err)})
})
.catch(err=>{console.log(err)})
     })
    function isLoggedIn(req, res, next){
      if(req.isAuthenticated()){
       return next(); 
      }
      else{
      res.redirect('/login');
      }
     }
     function isnotloggedin(req, res, next){
      if(!req.isAuthenticated()){
       return next(); 
      }
      else{
      res.redirect('/dashboard');
      }
     }
     


    };

    


    
  
    