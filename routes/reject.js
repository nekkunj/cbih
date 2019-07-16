const route = require('express').Router()
const mongoose=require('mongoose')

const application=mongoose.model('application')
const user_document_relation=mongoose.model('userdocumentrelation')

route.post('/',(req,res)=>{
    application.findOne({email:req.body.Email})
    .then((user)=>{
        if(user){
user.status='Rejected'
user.save()
.then((sv)=>{
    res.redirect('/backend')
})
.catch(err=>{console.log(err)})

        }
    })
    .catch(err=>{console.log(err)})
  });

  route.post('/document',(req,res)=>{
    user_document_relation.findOne({email:req.body.Email})
    .then((user)=>{
        if(user){
user.document_status='Rejected'
user.save()
.then((sv)=>{
    res.redirect('/backend')
})
.catch(err=>{console.log(err)})
        }
    })
    .catch(err=>{console.log(err)})
  });
exports=module.exports={
    route
}