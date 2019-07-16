const mongoose=require('mongoose')


var userschema=new mongoose.Schema({
    
    email:{
        type:String
    },
    link:{
        type:String
    }
    

});

mongoose.model('forgotlinks',userschema);


