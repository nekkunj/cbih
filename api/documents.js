const Grid = require('gridfs-stream');
module.exports=function(app){

app.get('/upload_documents',(req,res)=>{
    res.render('upload_documents.ejs')
})

// app.get('/upload',)

}