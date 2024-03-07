const btn_save = document.querySelector("#btn_save");
// const div = document.querySelector(".tropClasse");


btn_save.addEventListener("click", (e) => {
    let emp1 = {};
    
    emp1.id = 1;
    emp1.name = "Robin";
    console.log(emp1);

    $.ajax({
        url:"./scripts/lireJson.php",
        method: "POST",
        data: emp1,
        success: function(res) {
            console.log(res);
        }
    })
});