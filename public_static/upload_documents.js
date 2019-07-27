function checkdocuments(){
  $.post('/change_document_status')
    }
$(()=>{

  
    $('#formone').hover(function(){
       
    $('#form1_div').append(` <span style="color:red;">*It can be doc,docx or pdf</span><br>
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
    <span style="color:red;">*Size must be less than 1MB</span>`)
      },function(){
        $('#form3_div ').empty()
      })
      $('#form4').hover(function(){
        
        $('#form4_div').append(` <span style="color:red;">*It can be doc,docx or pdf</span><br>
                <span style="color:red;">*Size must be less than 1MB</span>`)
          },function(){
            $('#form4_div ').empty()
          })
          $('#form5').hover(function(){
        
            $('#form5_div').append(` <span style="color:red;">*Image can be in  jpg,png or gif format</span><br>
                    <span style="color:red;">*Size must be less than 1MB</span>`)
              },function(){
                $('#form5_div ').empty()
              })    


              $('#form6').hover(function(){
        
                $('#form6_div').append(` <span style="color:red;">*Image can be in  jpg,png or gif format</span><br>
                        <span style="color:red;">*Size must be less than 1MB</span>`)
                  },function(){
                    $('#form6_div ').empty()
                  })


                  $('#form7').hover(function(){
        
                    $('#form7_div').append(` <span style="color:red;">*Image can be in  jpg,png or gif format</span><br>
                            <span style="color:red;">*Size must be less than 1MB</span>`)
                      },function(){
                        $('#form7_div ').empty()
                      })

                      $('#form8').hover(function(){
        
                        $('#form8_div').append(` <span style="color:red;">*It can be doc,docx or pdf</span><br>
                                <span style="color:red;">*Size must be less than 1MB</span>`)
                          },function(){
                            $('#form8_div ').empty()
                          })

                          $('#form9').hover(function(){
        
                            $('#form9_div').append(` <span style="color:red;">*Image can be in  jpg,png or gif format</span><br>
                                    <span style="color:red;">*Size must be less than 1MB</span>`)
                              },function(){
                                $('#form9_div ').empty()
                              })

$('.container').append(`  <div class="row my-4 col-md-6">
<a class="btn btn-lg btn-warning m-auto" href="/change_document_status">Submit</a> 
</div>
    </div>  `)



// doc1
    $('.waiting_list_letter_id').on("change", function (e) {
      $('#waiting_list_letter_warning').empty()
      var files = e.currentTarget.files;
      // for (var x in files) {

        var filesize = ((files[0].size/1024)/1024).toFixed(4);
      if(filesize>1){
        $('#waiting_list_letter_warning').append(`*The size of photo cannot be greater than 1 Mb`)
        $('#waiting_list_letter_upload').attr("disabled", true);

      }
      else{
        $('#waiting_list_letter_upload').attr("disabled", false);
      }

    })
    // doc2

    $('.referral_letter_id').on("change", function (e) {
      $('#referral_letter_warning').empty()
      var files = e.currentTarget.files;
      // for (var x in files) {
        var filesize = ((files[0].size/1024)/1024).toFixed(4);
      if(filesize>1){
        $('#referral_letter_warning').append(`*The size of photo cannot be greater than 1 Mb`)
        $('#referral_letter_upload').attr("disabled", true);

      }
      else{
        $('#referral_letter_upload').attr("disabled", false);
      }

    })
    // doc3
    $('.hse_proforma_invoice_id').on("change", function (e) {
      $('#hse_proforma_invoice_warning').empty()
      var files = e.currentTarget.files;
      // for (var x in files) {
        var filesize = ((files[0].size/1024)/1024).toFixed(4);
      if(filesize>1){
        $('#hse_proforma_invoice_warning').append(`*The size of photo cannot be greater than 1 Mb`)
        $('#hse_proforma_invoice_upload').attr("disabled", true);

      }
      else{
        $('#hse_proforma_invoice_upload').attr("disabled", false);
      }

    })
    // doc4
    $('.HSE_Prior_authorization_id').on("change", function (e) {
      $('#HSE_Prior_authorization_warning').empty()
      var files = e.currentTarget.files;
      // for (var x in files) {
        var filesize = ((files[0].size/1024)/1024).toFixed(4);
      if(filesize>1){
        $('#HSE_Prior_authorization_warning').append(`*The size of photo cannot be greater than 1 Mb`)
        $('#HSE_Prior_authorization_upload').attr("disabled", true);

      }
      else{
        $('#HSE_Prior_authorization_upload').attr("disabled", false);
      }

    })
    // doc5
    $('.Passports_id').on("change", function (e) {
      $('#Passports_warning').empty()
      var files = e.currentTarget.files;
      // for (var x in files) {
        var filesize = ((files[0].size/1024)/1024).toFixed(4);
      if(filesize>1){
        $('#Passports_warning').append(`*The size of photo cannot be greater than 1 Mb`)
        $('#Passports_upload').attr("disabled", true);

      }
      else{
        $('#Passports_upload').attr("disabled", false);
      }

    })
    // doc 6
    $('.Medical_cards_id').on("change", function (e) {
      $('#Medical_cards_warning').empty()
      var files = e.currentTarget.files;
      // for (var x in files) {
        var filesize = ((files[0].size/1024)/1024).toFixed(4);
      if(filesize>1){
        $('#Medical_cards_warning').append(`*The size of photo cannot be greater than 1 Mb`)
        $('#Medical_cards_upload').attr("disabled", true);

      }
      else{
        $('#Medical_cards_upload').attr("disabled", false);
      }

    })
    // doc 7
    $('.Medical_Reports_id').on("change", function (e) {
      $('#Medical_Reports_warning').empty()
      var files = e.currentTarget.files;
      // for (var x in files) {
        var filesize = ((files[0].size/1024)/1024).toFixed(4);
      if(filesize>1){
        $('#Medical_Reports_warning').append(`*The size of photo cannot be greater than 1 Mb`)
        $('#Medical_Reports_upload').attr("disabled", true);

      }
      else{
        $('#Medical_Reports_invoice_upload').attr("disabled", false);
      }

    })
    // doc 8
    $('.Medical_documents_id').on("change", function (e) {
      $('#Medical_documents_warning').empty()
      var files = e.currentTarget.files;
      // for (var x in files) {
        var filesize = ((files[0].size/1024)/1024).toFixed(4);
      if(filesize>1){
        $('#Medical_documents_warning').append(`*The size of photo cannot be greater than 1 Mb`)
        $('#Medical_documents_upload').attr("disabled", true);

      }
      else{
        $('#Medical_documents_upload').attr("disabled", false);
      }

    })

})