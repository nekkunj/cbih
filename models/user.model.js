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
    },
    secretkey:{
        type:String
    },
    active:{
        type:Boolean
    },
    type:{
        type:String,
        default:"user"
    }
        
    

});

mongoose.model('users',userschema);


