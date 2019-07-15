//const route = require('express').Router()
const mongoose=require('mongoose')
const application=mongoose.model('application')

module.exports=function(app){
app.post('/add_application',(req,res)=>{
console.log(typeof(req.body.complaint))
var application_one=new application()
application_one.name=req.body.name
application_one.surname=req.body.surname
application_one.address=req.body.address
application_one.phone=req.body.phone
application_one.email=req.body.email
application_one.dateofbirth=req.body.date_of_birth
application_one.gpname=req.body.gp_name
application_one.gpphone=req.body.gp_number
application_one.medical_center=req.body.medical_center
application_one.medical_center_phone=req.body.medical_center_phone_number
application_one.hospital=req.body.hospital
application_one.hospital_phone=req.body.hospital_phone_number
application_one.complaint_nature=req.body.complaint
application_one.message=req.body.message
application_one.status="Under review"
application_one.save().then(user=>{
                   req.flash('success_msg','signup successful,now login')
                   res.redirect('/login')

 })    
 .catch(err=>console.log(err))
});
app.get('/showapplication/:email',(req,res)=>{
application.findOne({email:req.params.email})
.then(app=>{
    if(app){
        res.render('application_information.ejs',{
            app:app
        })
    }
    else{
        res.status(404).send('Page Not found');       
        
    }
})
.catch(err=>{console.log(err)})  
}) 
}