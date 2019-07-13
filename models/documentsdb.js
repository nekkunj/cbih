const mongoose=require('mongoose')
const Grid = require('gridfs-stream');
const mongoURI = 'mongodb://localhost:27017/userdocuments';
const GridFsStorage = require('multer-gridfs-storage');
const multer=require('multer')
const crypto = require('crypto');
const fs=require('fs')
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
        
         


         user_document_one.email=temp_email
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
      var file_photo=[]
      // var file_idcard=[]
      // var file_hospital=[]
       temp_email=req.user.email
       

  
    gfs.files.find().toArray((err, files) => {
       
      // Check if files
      if (!files || files.length === 0) {
        res.render('upload_documents', { file_photo: false,file_idcard: false,file_hospital: false });
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
        res.render('upload_documents', { file_photo: files,file_idcard: false,file_hospital: false });
      }
    });
    
  

       
       

       
       
//         gfs.files.find().toArray((err, files) => {
          
//            for(i=0;i<files.length;i++) {
//             console.log(files[i])
//              user_document_relation.findOne({filename:files[i].filename})
//              .then(ele=>{
//                if(ele){
//                    console.log(ele.originalfilename)
//                  if(ele.type_of_file==='photo'){
//                    file_photo.push(files[i])
                    
//                  }
//                  else if(ele.type_of_file==='idcard'){
//                   file_idcard.push(files[i])
//                 }
//                 else if(ele.type_of_file==='hospital'){
//                   file_hospital.push(files[i])
//                 }
//                 else{

//                 }
              
//                }
//                else{
// console.log('no file found in user_documents')
//                }
//              })
//              .catch(error=>{
//                console.log(error)
//              })
             
//             }
            
            

           

//           // Check if files
//           if (  file_photo.length === 0) {
//             if(!file_idcard || file_idcard.length === 0) {
//               if(!file_hospital || file_hospital.length === 0) {
//                 console.log('all null')
//                 res.render('upload_documents', { file_photo: false,file_idcard:false,file_hospital:false });
//               }
//               else{
//                 console.log('3rd not null')
//                 file_hospital.map(file => {
//                   if (
//                     file.contentType === 'image/jpeg' ||
//                     file.contentType === 'image/png'
//                   ) {
//                     file.isImage = true;
//                   } else {
//                     file.isImage = false;
//                   }
//                 });
//             res.render('upload_documents', { file_photo: false,file_idcard:false,file_hospital:file_hospital  });

//               }

//             }
// else{
//   file_idcard.map(file => {
//     if (
//       file.contentType === 'image/jpeg' ||
//       file.contentType === 'image/png'
//     ) {
//       file.isImage = true;
//     } else {
//       file.isImage = false;
//     }
//   });
// res.render('upload_documents', { file_photo: false,file_idcard:file_idcard,file_hospital:file_hospital  });

// }
            
//           } else {
//             files.map(file => {
//               if (
//                 file.contentType === 'image/jpeg' ||
//                 file.contentType === 'image/png'
//               ) {
//                 file.isImage = true;
//               } else {
//                 file.isImage = false;
//               }
//             });
//             res.render('upload_documents', { file_photo: file_photo,file_idcard:file_idcard,file_hospital:file_hospital });
//           }
//         });
      });



app.post('/documents/photo',documents.single('file'),(req,res)=>{

res.redirect('/upload_documents');
})

app.post('/documents/idcard',documents.single('file'),(req,res)=>{
 
res.redirect('/upload_documents');
})
app.post('/documents/hospital',documents.single('file'),(req,res)=>{
  
res.redirect('/upload_documents');
})


app.get('/files', (req, res) => {
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
app.get('/files/:filename', (req, res) => {
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
app.get('/image/:filename', (req, res) => {
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
app.post('/files/:id', (req, res) => {
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
  console.log("1 document updated");
  
})
res.redirect('/dashboard')
})  
  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
     return next(); 
    }
    else{
    res.redirect('/login');
    }
   }

  }