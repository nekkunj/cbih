const mongoose=require('mongoose')
const nodeMailer = require('nodemailer');
const randomstring =require('randomstring')
const initial_form=mongoose.model('initialform')



module.exports=function(app,passport){
   app.get('/initial_form',isnotloggedin,(req,res)=>{
       res.render('enter_form_details')
   })
    app.post('/initial_form',(req,res)=>{
        initial_form.findOne({email:req.body.email})
        .then((ih)=>{
            if(ih){
                req.flash('error_msg','*The form is already filled with this email')
                res.redirect('/initial_form')
            }
            else{
                initial_form_one=new initial_form()
                initial_form_one.Irish_medical_card=req.body.Irish
                initial_form_one.email=req.body.email
                initial_form_one.PPS_NUMBER=req.body.PPS_NUMBER
                initial_form_one.phone=req.body.phone
                initial_form_one.HSE_waiting_list=req.body.waiting_list
                initial_form_one.age=req.body.age
                initial_form_one.type_of_treatment=req.body.treatment
                initial_form_one.details=req.body.subject
        initial_form_one.save()
        .then(one=>{
        res.render('submit_initial_form')
        })
        .catch(err=>{console.log(err)})
          
            }
        })
        .catch(err=>{console.log(err)})
            
    })



app.get('/backend/initial_forms',isAdmin,(req,res)=>{
    
initial_form.find()
.then((data)=>{
    if(data){
        res.render('initial_forms',{forms:data,user:req.user})
    }
    else{
        res.render('initial_forms',{forms:false,user:req.user})

    }
})
.catch(err=>{console.log(err)})
})
app.get('/backend/accept/:email',isAdmin,function(req,res){
initial_form.findOne({email:req.params.email})
.then((any)=>{
    if(any){
        any.status="accept"
        any.save()
        .then((one)=>{
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
             var te=req.originalUrl
             const html=`
             Yes, you are eligible to apply to the CBIH programme!
             <br>
If you would like to apply now, please create a personal area, it will only take 5 minutes
<br>
<a href="http://localhost:7007/sign_up">Apply now!</a>
             `
             let mailOptions = {
                // should be replaced with real recipient's account
                to: req.params.email,
                subject: 'Your form is accepted',
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

            res.redirect('/backend/initial_forms')
        })
.catch(err=>{console.log(err)})

    }
    else{
console.log('no email found')
    }
})
.catch(err=>{console.log(err)})
})
app.get('/backend/reject/:email',isAdmin,function(req,res){
    initial_form.findOne({email:req.params.email})
    .then((any)=>{
        if(any){
            
            
            
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
                 Sorry, you are not eligible to apply to the CBIH programme!
                 <br>
    If you would like to apply again, please fill the options correctly
    <br>
    <a href="http://localhost:7007/initial_form">Apply now!</a>
                 `
                 let mailOptions = {
                    // should be replaced with real recipient's account
                    to: req.params.email,
                    subject: 'Your form is Rejected',
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
initial_form.deleteOne({email:req.params.email})
.then((del)=>{
    if(del){
        res.redirect('/backend/initial_forms')
    }
})    
.catch(err=>{console.log(err)})


            
    
    
        }
        else{
    console.log('no email found')
        }
    })
    .catch(err=>{console.log(err)})
    })

function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.type==='server'){
     return next(); 
    }
    else{
    res.redirect('/login');
    }
   }


function isLoggedIn(req, res, next){
      if(req.isAuthenticated()){
         if(req.user.type==='server'){
            res.redirect('/backend')
         }
       else{return next(); }
      }
      else{
      res.redirect('/login');
      }
     }
     function isnotloggedin(req, res, next){
        if(!req.isAuthenticated()){
  
         return next(); 
        }
        else if(req.isAuthenticated() && req.user.type==='server'){
        res.redirect('/backend');
        }
        else{
           res.redirect('/dashboard');
        }
       }


}

