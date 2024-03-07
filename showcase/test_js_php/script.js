const btn = document.querySelector(".btn");
// const div = document.querySelector(".tropClasse");


btn.addEventListener("click", (e) => {
    let emp1 = {};
    
    emp1.id = 1;
    emp1.name = "Robin";
    console.log(emp1);

    $.ajax({
        url:"readJson.php",
        method: "post",
        data: emp1,
        success: function(res) {
            console.log(res);
        }
    })
});