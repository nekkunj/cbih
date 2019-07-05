const mongoose=require('mongoose')


var userschema=new mongoose.Schema({
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    password:{
        type:String
    }

});

mongoose.model('users',userschema);


