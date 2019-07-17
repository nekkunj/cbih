function checkdocuments(){
  $.post('/change_document_status')
    }
$(()=>{

  
    $('#formone').hover(function(){
       
    $('#form1_div').append(` <span style="color:red;">*Image can be in  jpg,png or gif format</span><br>
            <span style="color:red;">*Size must be less than 1MB</span>`)
      },function(){
        $('#form1_div ').empty()
      })


      $('#form2').hover(function(){
        
    $('#form2_div').append(` <span style="color:red;">*Image can be in  jpg,png or gif format</span><br>
            <span style="color:red;">*Size must be less than 1MB</span>`)
      },function(){
        $('#form2_div ').empty()
      })

      $('#form3').hover(function(){
       
    $('#form3_div').append(`<span style="color:red;">*It can be doc,docx or pdf</span><br>
    <span style="color:red;">*Size must be less than 5MB</span>`)
      },function(){
        $('#form3_div ').empty()
      })

$('.container').append(`  <div class="row my-4 col-md-6">
<a class="btn btn-lg btn-warning m-auto" href="/change_document_status">Submit</a> 
</div>
    </div>  `)




    $('.photoid').on("change", function (e) {
      $('#photowarning').empty()
      var files = e.currentTarget.files;
      // for (var x in files) {

        var filesize = ((files[0].size/1024)/1024).toFixed(4);
      if(filesize>1){
        $('#photowarning').append(`*The size of photo cannot be greater than 1 Mb`)
        $('#photoupload').css('display','none')

      }
      else{
        $('#photoupload').css('display','block')
      }

    })
    $('.idcardid').on("change", function (e) {
      $('#idcardwarning').empty()
      var files = e.currentTarget.files;
      // for (var x in files) {
        var filesize = ((files[0].size/1024)/1024).toFixed(4);
      if(filesize>1){
        $('#idcardwarning').append(`*The size of photo cannot be greater than 1 Mb`)
        $('#idcardupload').css('display','none')

      }
      else{
        $('#idcardupload').css('display','block')
      }

    })
    $('.hospitalid').on("change", function (e) {
      $('#hospitalwarning').empty()
      var files = e.currentTarget.files;
      // for (var x in files) {
        var filesize = ((files[0].size/1024)/1024).toFixed(4);
      if(filesize>5){
        $('#hospitalwarning').append(`*The size of photo cannot be greater than 1 Mb`)
        $('#hospitalupload').css('display','none')

      }
      else{
        $('#hospitalupload').css('display','block')
      }

    })
})