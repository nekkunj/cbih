const route = require('express').Router()
const mongoose=require('mongoose')

const application=mongoose.model('application')
const user_document_relation=mongoose.model('userdocumentrelation')

route.post('/',(req,res)=>{
    var temp="Application Accepted"
    var myquery = { email: req.body.Email };
    var newvalues = { $set: {status: temp } };
application.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
})
  });

  route.post('/document',(req,res)=>{
    var temp="Document Accepted"
    var myquery = { email: req.body.Email };
    var newvalues = { $set: {document_status: temp } };
user_document_relation.updateMany(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(" documents accepted");
   
})
res.redirect('/backend')
  });
exports=module.exports={
    route
}