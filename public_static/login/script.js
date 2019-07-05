function check(userdetails){
    $('#status').css('display','none')   
   
    
    var username=$('#username')
    
    var password=$('#password')
for(userdetail of userdetails ){
    console.log(userdetail.username)
    if(userdetail.username===username.val()){
        if( userdetail.password===password.val()){
            location.href="/";
            localStorage.setItem("name", `${userdetail.username}`);
        }
        else if( userdetail.password!=password.val()){
            console.log(password.val())
            $('#status').css('display','block')   
      
        }
      
    }      
  
}

}

$(()=>{
    var username=$('#username')
    
    var password=$('#password')
    

    $('#submit').click(()=>{  
$.get('/details',function(userdetails){
check(userdetails)
})
    })
// $.post('/details/check',{
//     username:username.val(),
//     password:password.val()
// })


$('.profile-name').css('display','none')
var dfgh=localStorage.getItem("name");
if(localStorage.getItem('name')===null){
    console.log('Not login')
    $('.login-signup').css('display','inline-block')
$('.profile-name').css('display','none')
}
else{
    $('.login-signup').css('display','none')
$('.profile-name').css('display','inline')
$('.profile-name span').append(`${dfgh}`)
    console.log(dfgh)
}


$('.signout-btn').click(()=>{
    localStorage.removeItem("name");
})

})
