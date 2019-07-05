const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/userdb',{useNewUrlParser:true},(err)=>{
    if(!err){console.log('MongoDB connection succeeded')}
    else{console.log('Error in DB connection' + err)}
}  )

require('./user.model');