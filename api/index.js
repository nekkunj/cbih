const mongoose=require('mongoose')
const users=mongoose.model('users')
const bcrypt=require('bcryptjs')
// const express=require('express')
// const app=express()
// var flash=require("connect-flash");
// app.use(flash());

module.exports = function(app,passport) {
    app.get('/login', function(req, res){
      res.render('login.ejs',{message:req.flash('loginMessage')});
     });
     app.get('/sign_up', function(req, res){
        res.render('signup.ejs');
       });


app.post('/login',(req,res,next)=>{
   console.log(req.body);
   passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/login',
   failureFlash:true
  })(req,res,next);
}
  )



       app.post('/sign_up', (req,res)=>{

         console.log(req.body) 
        
         let errors=[]
         
         if(!req.body.Name || !req.body.Email || !req.body.Phone || !req.body.Password){
          
         errors.push({msg:"Please fill in all details "})
         }
         if(req.body.Password!=req.body.Passwordtwo){
            errors.push({msg:"Passwords should match"})
         }
         // var ne =req.body.Password
         // if(ne.length<6){
         //    errors.push({msg:"Password must be of atleast 6 characters"})
         // }
         if(errors.length>0){
            console.log(errors)
            res.render('signup',{
               errors
            })
         }
else{
         users.findOne({email:req.body.Email})
         .then(User=>{
            if(User){
               console.log('duplicate data')
               res.render('signup');
            }
            else{
               const user_one=new users()
               user_one.fullname=req.body.Name
               user_one.email=req.body.Email
               user_one.mobile=req.body.Phone
               user_one.password=req.body.Password
            
               bcrypt.genSalt(10,(err,salt)=>{
                 bcrypt.hash(user_one.password,salt,(err,hash)=>{
                  console.log(typeof(hash))  
                  if (err){ throw err;}
                    
                    user_one.password=hash;    
                    user_one.save()
               .then(user=>{
                  res.redirect('/login')
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
    }


