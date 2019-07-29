const mongoose=require('mongoose')
const Grid = require('gridfs-stream');
const mongoURI = 'mongodb://localhost:27017/userdocuments';
const GridFsStorage = require('multer-gridfs-storage');
const multer=require('multer')
const crypto = require('crypto');
const fs=require('fs')
const application=mongoose.model('application')
const nodeMailer=require('nodemailer')
const user_document_relation=mongoose.model('userdocumentrelation')
// Create mongo connection
const conn = mongoose.createConnection(mongoURI,{ useNewUrlParser: true });
const path=require('path')
// Init gfs
let gfs;
var temp_email=''

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('documents');          
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      var a=req.url.split('/')
      return new Promise((resolve,reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          
          const filename = buf.toString('hex') + path.extname(file.originalname);
         user_document_one=new user_document_relation()
        if(a.length==3){
          user_document_one.email=temp_email
        }
         else{
          user_document_one.email=a[3]
         }


         
         user_document_one.filename=filename  
         user_document_one.originalfilename=file.originalname
         user_document_one.type_of_file=a[2]
         user_document_one.document_status='In Progress'
         user_document_one.save()
         .then(user=>{
          
       })    
       .catch(err=>console.log(err))
          const fileInfo = {
            
            filename: filename,
            bucketName: 'documents',
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const documents = multer({ storage });
  module.exports=function(app,passport){

    app.get('/upload_documents',isLoggedIn, (req, res) => {
       temp_email=req.user.email
//This code is to ensure user cannot open upload_documents until he is verified
        application.findOne({email:req.user.email})
       .then(rop=>{
         if(!rop){
           res.redirect('/en/online_application')
         }
         else if(rop && rop.status==='Application Accepted'){
         
          

            
              gfs.files.find().toArray((err, files) => {
                 
                // Check if files
                if (!files || files.length === 0) {
                  user_document_relation.find({email:req.user.email})
                  .then(one=>{
                    if(one){
                      res.render('upload_documents', { files:false,user_doc:one });
                    }
                  })
                  .catch(err=>{console.log(err)})
                } else {
                  files.map(file => {
                    if (
                      file.contentType === 'image/jpeg' ||
                      file.contentType === 'image/png'
                    ) {
                      file.isImage = true;
                    } else {
                      file.isImage = false;
                    }
                  });
                  user_document_relation.find({email:req.user.email})
                  .then(one=>{
                    if(one){
                      res.render('upload_documents', { files:files,user_doc:one });
                    }
                  })
                  .catch(err=>{console.log(err)})
                  
                }
              });
            
          
          
            
         }
         else{
           res.redirect('/dashboard')
         }
       })
       .catch(err=>{console.log(err)})


    
    
  

       
       

       
       

      });


















// doc1
app.post('/documents/waiting_list_letter',documents.single('file'),(req,res)=>{

res.redirect('/upload_documents');
})
// doc2
app.post('/documents/referral_letter',documents.single('file'),(req,res)=>{
 
res.redirect('/upload_documents');
})
// doc3
app.post('/documents/hse_proforma_invoice',documents.single('file'),(req,res)=>{
  
res.redirect('/upload_documents');
})
// doc4
app.post('/documents/HSE_Prior_authorization',documents.single('file'),(req,res)=>{
  
  res.redirect('/upload_documents');
  })
// doc5
app.post('/documents/Passports',documents.single('file'),(req,res)=>{
  
  res.redirect('/upload_documents');
  })
  // doc6
app.post('/documents/Medical_cards',documents.single('file'),(req,res)=>{
  
  res.redirect('/upload_documents');
  })
  // doc7
app.post('/documents/Medical_Reports',documents.single('file'),(req,res)=>{
  
  res.redirect('/upload_documents');
  })
  // doc8
app.post('/documents/Medical_documents',documents.single('file'),(req,res)=>{
  
  res.redirect('/upload_documents');
  })
  //doc 9
  app.post('/documents/payment_details/:email',documents.single('file'),(req,res)=>{
  
    res.redirect(`/showapplication/${req.params.email}`);
    })
app.get('/files',isAdmin, (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.json(files);
    });
  });
  
// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename',isLoggedIn, (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // File exists
      var readstream = gfs.createReadStream({
        filename: file.filename
      });
      
      //error handling, e.g. file does not exist
      readstream.on('error', function (err) {
        console.log('An error occurred!', err);
        throw err;
      });
    //   res.download('/files/:filename', 'report.doc')
       readstream.pipe(res);
     
      
    });
  });


// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename',isLoggedIn, (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
// Check if image
if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
    // Read output to browser
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  } else {
    res.status(404).json({
      err: 'Not an image'
    });
  }
});
});


// @route DELETE /files/:id
// @desc  Delete file
app.post('/files/:id',isLoggedIn,(req, res) => {
    gfs.remove({ _id: req.params.id, root: 'documents' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
  
      res.redirect('/upload_documents');
    });
  });

 
app.get('/change_document_status',isLoggedIn,(req,res)=>{

  var temp="Processing"
  var myquery = { email: req.user.email };
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
 Your documents have been uploaded successfully,you can check them on
 <br>
 <a href="http://localhost:7007/upload_documents">Upload Documents</a>
 <br>
 You can also check your document status on <br>
 <a href="http://localhost:7007/dashboard">Status Page</a><br>
 You will be informed whenever your documents are accepted<br>
 This is an autogenerated email <br> Do not contact through this email
 `
 let mailOptions = {
    // should be replaced with real recipient's account
    to: req.user.email,
    subject: 'Documents uploaded successfully',
    html:html,
    text:html
 };
 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    
 });    
  
})
res.redirect('/dashboard')
})    
app.get('/showapplication/:email',isAdmin,(req,res)=>{
  var temp;
  application.findOne({email:req.params.email})
  .then(app=>{
      if(app){
user_document_relation.find({email:req.params.email})
.then(usdo=>{
  gfs.files.find().toArray((err, files) => {
       
    // Check if files
    
    if (!files || files.length === 0) {
      res.render('application_information.ejs', { files: false,app:app,user_doc:usdo });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('application_information.ejs', { files: files,app:app,user_doc:usdo});
    }
  });
})
.catch(err=>{console.log(err)})
      



          
      }
      else{
          res.status(404).send('Page Not found');       
          
      }
  })
  .catch(err=>{console.log(err)})  

   
  })

app.get('/forwardpage/:email',isAdmin,(req,res)=>{
 var temp;
  application.findOne({email:req.params.email})
  .then(app=>{
      if(app){
user_document_relation.find({email:req.params.email})
.then(usdo=>{
  gfs.files.find().toArray((err, files) => {
       
    // Check if files
    
    if (!files || files.length === 0) {
      res.render('patient_information.ejs', { files: false,app:app,user_doc:usdo });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('patient_information.ejs', { files: files,app:app,user_doc:usdo});
    }
  });
})
.catch(err=>{console.log(err)})
      



          
      }
      else{
          res.status(404).send('Page Not found');       
          
      }
  })
  .catch(err=>{console.log(err)})  
  })
   
  
  
  
  app.get('/refill_applicationform/:email',isLoggedIn,(req,res)=>{
application.deleteOne({email:req.params.email})
.then(suc=>{
  res.redirect('/en/online_application')
})
.catch(err=>{console.log(err)})
  })

// app.get('/reupload_documents/:email',isLoggedIn,(req,res)=>{
//  user_document_relation.deleteMany({email:req.params.email})
//  .then((data)=>{
//    if(data){
// for(d in data){
// documents.deleteOne({})
// }
//    }
//  })
//  .catch(err =>{console.log(err)})
// })



  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      //  if(req.user.type==='server'){
      //     res.redirect('/backend')
      //  }
     return next(); 
    }
    else{
    res.redirect('/login');
    }
   }
   function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.type==='server'){
     return next(); 
    }
    else{
    res.redirect('/login');
    }
   }

  }
  