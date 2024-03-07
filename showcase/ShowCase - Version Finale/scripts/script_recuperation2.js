const btn_save = document.querySelector("#btn_save");
btn_save.addEventListener("click", recup);

function recup() {
    elements = document.querySelectorAll('.page .element');
    let page = {};
    console.log(elements.length);

    for (let i = 0; i < elements.length; i++) {
        page[i] = elements[i].outerHTML;
    }
    // test = elements[1].outerHTML;

    $.ajax({
        url: "./scripts/lireJson.php",

        method: "POST",
        data: page,
        // datatype: "html",
        // processData: false,
        success: function (res) {
            console.log(res);
        }
    })
};