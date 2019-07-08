const mongoose=require('mongoose')


var applicationschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dateofbirth:{
        type:String,
        required:true
    },
    gpname:{
        type:String,
        required:true
    },
    gpphone:{
        type:String,
        required:true
    },
    medical_center:{
        type:String
    },
    medical_center_phone:{
        type:String
    },
    hospital:{
        type:String
    },
    hospital_phone:{
        type:String
    },
    complaint_nature:{
        type:String,
        required:true
    },
    message:{
        type:String
    }
        
    

});

mongoose.model('users',applicationschema);


