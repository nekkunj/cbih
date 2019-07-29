const mongoose=require('mongoose')


var userschema=new mongoose.Schema({
    Irish_medical_card:{
        type:String,
        required:true
    },
    PPS_NUMBER:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    HSE_waiting_list:{
        type:String
    },
    type_of_treatment:{
        type:String
    },
    age:{
        type:String
    },
    details:{
        type:String
    },
    status:{
        type:String,
        default:'under verification'
    }
        
    

});

mongoose.model('initialform',userschema);


