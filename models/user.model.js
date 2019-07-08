const mongoose=require('mongoose')


var userschema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    dateofbirth:{
        type:String
    },
    gender:{
        type:String
    }
        
    

});

mongoose.model('users',userschema);


