const mongoose=require('mongoose')
const Grid = require('gridfs-stream');
const mongoURI = 'mongodb://localhost:27017/backenddocuments';
const GridFsStorage = require('multer-gridfs-storage');
const multer=require('multer')
const crypto = require('crypto');

const backend_document_relation=mongoose.model('backenddocumentrelation')


const conn = mongoose.createConnection(mongoURI,{ useNewUrlParser: true });
const path=require('path')



conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('tandrdocuments');          
  });



  const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      var a=req.url.split('/')
      console.log(a)
      return new Promise((resolve,reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          
          const filename = buf.toString('hex') + path.extname(file.originalname);
         backend_document_one=new backend_document_relation()
        
         


         backend_document_one.email=a[5]
         backend_document_one.filename=filename  
         backend_document_one.originalfilename=file.originalname
         backend_document_one.type_of_file=a[4]
         backend_document_one.document_type=a[3]
         backend_document_one.save()
         .then(user=>{
          
       })    
       .catch(err=>console.log(err))
          const fileInfo = {
            
            filename: filename,
            bucketName: 'tandrdocuments',
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const documents = multer({ storage });

  module.exports=function(app,passport){
app.get('/backend/trip/:email',isAdmin,(req,res)=>{
    gfs.files.find().toArray((err, files) => {
                 
        // Check if files
        if (!files || files.length === 0) {
          backend_document_relation.find({email:req.params.email})
          .then(one=>{
            if(one){
              res.render('upload_trip_information',{Email:req.params.email,user:req.user,files:false,backend_doc:one});
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
          backend_document_relation.find({email:req.params.email})
          .then(one=>{
            if(one){
              res.render('upload_trip_information',{Email:req.params.email,user:req.user,files:files,backend_doc:one});
            }
          })
          .catch(err=>{console.log(err)})
          
        }
      });

})
app.get('/backend/reimbursement/:email',isAdmin,(req,res)=>{
    gfs.files.find().toArray((err, files) => {
                 
        // Check if files
        if (!files || files.length === 0) {
          backend_document_relation.find({email:req.params.email})
          .then(one=>{
            if(one){
              res.render('upload_reimbursement_information',{Email:req.params.email,user:req.user,files:false,backend_doc:one});
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
          backend_document_relation.find({email:req.params.email})
          .then(one=>{
            if(one){
              res.render('upload_reimbursement_information',{Email:req.params.email,user:req.user,files:files,backend_doc:one});
            }
          })
          .catch(err=>{console.log(err)})
          
        }
      });
    
})


app.get('/trip_reimbursement_details',isLoggedIn,(req,res)=>{
    gfs.files.find().toArray((err, files) => {
                 
        // Check if files
        if (!files || files.length === 0) {
          backend_document_relation.find({email:req.user.email})
          .then(one=>{
            if(one){
              res.render('trip_reimbursement_information',{user:req.user,files:false,backend_doc:one});
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
          backend_document_relation.find({email:req.user.email})
          .then(one=>{
            if(one){
              res.render('trip_reimbursement_information',{user:req.user,files:files,backend_doc:one});
            }
          })
          .catch(err=>{console.log(err)})
          
        }
      });
})

// trip
app.post('/backend/documents/trip/Hotel_confirmation/:email',documents.single('file'),(req,res)=>{

    res.redirect(`/backend/trip/${req.params.email}`);
    })
app.post('/backend/documents/trip/Flights_confirmation/:email',documents.single('file'),(req,res)=>{

        res.redirect(`/backend/trip/${req.params.email}`);
        })
        // reimbursement
app.post('/backend/documents/reimbursement/Proforma_Invoice/:email',documents.single('file'),(req,res)=>{

            res.redirect(`/backend/reimbursement/${req.params.email}`);
            })
app.post('/backend/documents/reimbursement/Proof_of_Travel/:email',documents.single('file'),(req,res)=>{

                res.redirect(`/backend/reimbursement/${req.params.email}`);
                })
app.post('/backend/documents/reimbursement/Wating_list_Referral_letter/:email',documents.single('file'),(req,res)=>{

                    res.redirect(`/backend/reimbursement/${req.params.email}`);
                    })
app.post('/backend/documents/reimbursement/Medical_report_Preassessment/:email',documents.single('file'),(req,res)=>{

                        res.redirect(`/backend/reimbursement/${req.params.email}`);
                        })
app.post('/backend/documents/reimbursement/Invoice_and_receipt/:email',documents.single('file'),(req,res)=>{

                            res.redirect(`/backend/reimbursement/${req.params.email}`);
                            })




                            app.get('/backend/files/:filename',isLoggedIn, (req, res) => {
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
                            app.get('/backend/image/:filename',isLoggedIn, (req, res) => {
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