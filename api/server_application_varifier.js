const mongoose=require('mongoose')
const users=mongoose.model('users')

const application=mongoose.model('application')
const user_document_relation=mongoose.model('userdocumentrelation')



module.exports = function(app) {
app.get('/backend',(req,res)=>{

    var temp="Under review"
    application.find()
    .then(app=>{
if(app){
user_document_relation.find()
.then(item=>{
    res.render('backend.ejs',{
        app:app,
        doc:item
    })
})  
.catch(err=>{console.log(err)})



}
    })
    .catch(err=>{console.log(err)})
    
})

}