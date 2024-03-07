const addTexte = document.querySelector('.addTexte');
const addImg = document.querySelector('.addImage');
const addForme = document.querySelector('.addFormes');
const addBtns = document.querySelector('.addBtns');

const text = document.querySelectorAll('.text');
const addElems = document.querySelectorAll(".addElems");
let toAdd;
let fileToAdd;

addElems.forEach(item => {
    item.addEventListener("click", (e) => {
        if(!item.classList.contains("addFormes")) {
            const chooseAdd = document.querySelectorAll(".chooseAdd");
    
            chooseAdd.forEach(item => {
                item.classList.toggle("hide");
            });

            toAdd = item.attributes[1].value;
        } else {
            targP = find("formesListed", e);
            
            if(targP.classList.contains("formesListed") && !targP.classList.contains("menu-triangle")) {
                const chooseAdd = document.querySelectorAll(".chooseAdd");
                
                chooseAdd.forEach(item => {
                    item.classList.toggle("hide");
                });
                
                toAdd = item.attributes[1].value;
                fileToAdd = targP.firstElementChild.classList[0];

            }
        }
    });
});

let loadFile = function(event) {
    // fileToAdd = URL.createObjectURL(event.target.files[0]);
    
    const chooseAdd = document.querySelectorAll(".chooseAdd");

    chooseAdd.forEach(item => {
        item.classList.toggle("hide");
    });
    toAdd = "image";
};


// Fonctions d'automatisation -------------------------------------------------
function findLastId() {
    let maxId = 0;
    movable.forEach(item => {
        if(Number(item.id) > maxId) {
            maxId = Number(item.id);
        }
    });
    return maxId + 1;
}

