const mongoose=require('mongoose')


var userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    originalfilename:{
        type:String,
        required:true
    },
    type_of_file:{
        type:String
        
    },
    document_status:{
        type:String
    },
    current_date_of_documents:{
        type:Date,
        default:Date.now
    }     
    

});

mongoose.model('userdocumentrelation',userschema);


