const route = require('express').Router()
const mongoose=require('mongoose')

const application=mongoose.model('application')

route.post('/',(req,res)=>{
    var temp="Application Accepted"
    var myquery = { email: req.body.Email };
    var newvalues = { $set: {status: temp } };
application.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
})
  });

 
exports=module.exports={
    route
}