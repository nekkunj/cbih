const mongoose=require('mongoose')
const users=mongoose.model('users')

const application=mongoose.model('application')
const user_document_relation=mongoose.model('userdocumentrelation')



module.exports = function(app,passport) {
app.get('/backend',isAdmin,(req,res)=>{

    var temp="Under review"
    application.find()
    .then(app=>{
if(app){
user_document_relation.find()
.then(item=>{
    res.render('backend.ejs',{
        user:req.user,
        app:app,
        doc:item
    })
})  
.catch(err=>{console.log(err)})



}
    })
    .catch(err=>{console.log(err)})
    
})
function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.type==='server'){
     return next(); 
    }
    else{
    res.redirect('/login');
    }
   }
}