$("form").change(function(evt){	 
    evt.preventDefault();
    let formData = new FormData($(this)[0]);

    console.log('work');
    $.ajax({
        url: 'scripts/upload.php',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (response) {
            console.log(response);
            let fileTmp = response;
            fileTmp = fileTmp.split("");
            fileTmp[0] = "";
            fileToAdd = fileTmp.join("");
        }
    });
    return false;
});