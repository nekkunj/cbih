const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/userlogin',{useNewUrlParser:true},(err)=>{
    if(!err){console.log('MongoDB connection succeeded')}
    else{console.log('Error in DB connection' + err)}
}  )

require('./user.model');
require('./application.model')
require('./user_document_relation.model')
require('./forgot_links.model')
require('./backend_document_relation.model')

