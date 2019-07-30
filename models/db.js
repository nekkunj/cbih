const mongoose=require('mongoose')
const db=require('../config/keys').mongoURI
mongoose.connect(db,{useNewUrlParser:true},(err)=>{
    if(!err){console.log('MongoDB connection succeeded')}
    else{console.log('Error in DB connection' + err)}
}  )

require('./user.model');
require('./application.model')
require('./user_document_relation.model')
require('./forgot_links.model')
require('./backend_document_relation.model')
require('./initial_form.model')
