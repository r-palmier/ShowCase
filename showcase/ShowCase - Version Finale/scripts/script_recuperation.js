const btn_save = document.querySelector("#btn_save");
btn_save.addEventListener("click", recup);
    
function recup () {
    sections = document.querySelectorAll('#page .section');
    let page = [];

    for (let i=0; i<sections.length; i++){
        id_section = sections[i].getAttribute('id');
        
        elements = document.querySelectorAll('#'+id_section +' .movable');
        page[i] = elements;

    }
    console.log(page);

    // $.ajax({
    //     url:"./scripts/lireJson.php",
    //     method: "POST",
    //     data: emp1,
    //     success: function(res) {
    //         console.log(res);
    //     }
    // })
};