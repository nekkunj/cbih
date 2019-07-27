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
    document_type:{
        type:String
    },
    type_of_file:{
        type:String
        
    },
    current_date_of_documents:{
        type:Date,
        default:Date.now
    }     
    

});

mongoose.model('backenddocumentrelation',userschema);


