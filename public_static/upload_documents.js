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
<a class="btn btn-warning m-auto" href="/change_document_status">Submit</a> 
</div>
    </div>  `)


})