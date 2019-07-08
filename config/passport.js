const localstrategy=require('passport-local').Strategy
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

// const users  =require('../models/user.model')
const users=mongoose.model('users')
module.exports=function(passport){
    passport.serializeUser(function(user, done){
        console.log(user.email);
       done(null, user.id);
      });
     
      passport.deserializeUser(function(id, done){
       users.findById(id,(err,user)=>{
           done(err,user)
       })
      });

passport.use(
    new localstrategy({
        passReqToCallback : true
      ,usernameField:'email'},
    function (req,email,password,done){
        users.findOne({email:email})
        .then(user=>{
            if(!user){
                console.log('abcd')
                return done(null,false,req.flash('loginMessage','That email is not registered'));
             
            }
            console.log('find user')
            bcrypt.compare(password,user.password,(err,isMatch)=>{
if(err) throw err;

if(isMatch){
    console.log('login successful')
    return done(null,user);
}   else{
    console.log('password wrong')
    return done(null,false, req.flash('loginMessage','Incorrect Password') )
}
            })
        })
        .catch(err=>console.log(err));
    }
    )
)






}