const route = require('express').Router()
const mongoose=require('mongoose')
const nodeMailer=require('nodemailer')
const application=mongoose.model('application')
const user_document_relation=mongoose.model('userdocumentrelation')

route.post('/',(req,res)=>{
    var temp="Application Accepted"
    var myquery = { email: req.body.Email };
    var newvalues = { $set: {status: temp } };
application.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;

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
     Congratulations your application has been accepted,now you can upload the required documents on
     <br>
     <a href="https://cbih.herokuapp.com/upload_documents">Upload documents</a>
     <br>
     You can also check your status on <br>
     <a href="https://cbih.herokuapp.com/dashboard">Status Page</a><br>
     This is an autogenerated email <br> Do not contact through this email
     `
     let mailOptions = {
        // should be replaced with real recipient's account
        to: req.body.Email,
        subject: 'Upload documents',
        html:html,
        text:html
     };
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
       
     });




    console.log("1 document updated");
})

  });

  route.post('/document',(req,res)=>{
    var temp="Document Accepted"
    var myquery = { email: req.body.Email };
    var newvalues = { $set: {document_status: temp } };
user_document_relation.updateMany(myquery, newvalues, function(err, res) {
    if (err) throw err;
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
     Congratulations your documents have been accepted,now you can check your trip and reimbursement information on
     <br>
     <a href="https://cbih.herokuapp.com/trip_reimbursement_details">Upload documents</a>
     <br>
     You can also check your status on <br>
     <a href="https://cbih.herokuapp.com/dashboard">Status Page</a><br>
     This is an autogenerated email <br> Do not contact through this email
     `
     let mailOptions = {
        // should be replaced with real recipient's account
        to: req.body.Email,
        subject: 'Documents Accepted',
        html:html,
        text:html
     };
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
       
     });

    console.log(" documents accepted");
   
})

  });
exports=module.exports={
    route
}