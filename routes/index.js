const route = require('express').Router()
const mongoose=require('mongoose')
const users=mongoose.model('users')
route.post('/', (req,res)=>{

    console.log(req.body)
    insertRecord(req,res);
})
function insertRecord(req,res){
    var user_one=new users()
    user_one.fullname=req.body.Name
    user_one.email=req.body.Email
    user_one.mobile=req.body.Phone
    console.log(typeof(req.body.Email))
    // user_one.password=req.body.password
    user_one.save((err,doc)=>{
        if(!err){
            res.redirect('/login');
        }
        else{
            console.log('Error during insertion of user details ' + err)    
        }
    })
}
exports = module.exports = {
    route
}