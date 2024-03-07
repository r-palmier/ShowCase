let sections = document.querySelectorAll(".section");

const sectionUp = document.querySelectorAll(".sectionUp");
const sectionDown = document.querySelectorAll(".sectionDown");
const ajoutSection = document.querySelectorAll(".labelAddSection");
const delSection = document.querySelectorAll(".delSection");

const popupSection = document.querySelector(".choiceSectionContainer");
const listSection = document.querySelectorAll(".sectionListing");

let sectionToAdd;

// Gestion des boutons de resize des sections ---------------------------------
sectionUp.forEach(item => {
    item.addEventListener("click", () => {
        remLine(item.parentNode.parentNode);
    });
});

sectionDown.forEach(item => {
    item.addEventListener("click", () => {
        addLine(item.parentNode.parentNode);
    });
});

function remLine(arg) {
    const section = arg;

    let height = section.style.height;
    height = Number(delUnit(height, 2));
    height -= 50;
    
    section.style.height = height + "px";

    gridLine("del", section)
}

function addLine(arg) {
    const section = arg;

    let height = section.style.height;
    height = Number(delUnit(height, 2));
    height += 50;
    
    section.style.height = height + "px";

    gridLine("add", section);
}


// Ajout de Section -----------------------------------------------------------
page.addEventListener("click", (e) => {
    let targP = find("labelAddSection", e);
    if(targP.classList.contains("labelAddSection")) {
        popupSection.style.visibility = "visible";

        sectionToAdd = find("section", e);
        console.log(sectionToAdd);
    }
});

listSection.forEach(item => {
    item.addEventListener("click", (e) => {
        // Création de la nouvelle section et implémentation en dessous de la section actuelle
        console.log("is ok");
        let idAct = sectionToAdd.id;
        targP = find("sectionListing", e);
        
        let sectionChoisie = targP.attributes[1].value;
        let height = targP.attributes[2].value;
        console.log(targP.attributes);

        const newSect = document.createElement("div");
        newSect.classList.add("section");
        newSect.style.height = height + "px";
    
        page.insertBefore(newSect, sectionToAdd.nextSibling);
    
        //redéfinition des id de section
        sections = document.querySelectorAll(".section");
        let i = 0;
        sections.forEach(sects => {
            sects.id = "s" + i;
            i++;
        });
    
        movable = page.querySelectorAll(".movable");
        movable.forEach(item => {
            item.idSection = item.parentNode.id;
        });
        
        //mise en place du contenu de la nouvelle section
        idAct = Number(idAct[1]) + 1;
        
        console.log(sectionChoisie);
        //en attente du choix de section à ajouter
        let file = `./Templates/${sectionChoisie}.html`;
        console.log(file);
        
        $(function() {
            $("#s" + idAct).load(file);
        });

        popupSection.style.visibility = "collapse";
    });
});

// Delete de Section ----------------------------------------------------------
page.addEventListener("click", (e) => {
    let targP = find("delSection", e);
    if(targP.classList.contains("delSection")) {

        let confirm = window.confirm("Etes vous sûr de vouloir supprimer cette section ? Cette action est irréversible.");

        if(confirm === true) {
            let sectionP = find("section", e);
            sectionP.remove();

            //redéfinition des id de section
            sections = document.querySelectorAll(".section");
            let i = 0;
            sections.forEach(sects => {
                sects.id = "s" + i;
                i++;
                console.log(sects.id);
            });
        } else {
            //bah non
        }
    }
});

// Fonctions d'automatisation -------------------------------------------------
function gridLine(state, section) {
    const gridCont = section.querySelector(".gridCont");
    let i = 0;
    switch (state) {
        case "add": 
            do {
                const newGrid = document.createElement("div");
                newGrid.style.width = tGrid + "%";
                newGrid.style.height = 50 + "px";
                newGrid.classList.add("grid");
                
                const newGridInt = document.createElement("div");
                newGridInt.classList.add("gridInt");
                newGrid.appendChild(newGridInt);
                
                gridCont.appendChild(newGrid);
                i++;
            } while(i < 10);
        break;
        case "del":
            for(i = 0;i < 10;i++) {
                gridCont.firstChild.remove();
            }
        break;
    }
}

function delUnit(numb, nbUnit) {
    numb = numb.split("");
    numb.splice((numb.length - nbUnit), nbUnit);
    numb = numb.join("");
    return Number(numb);
}


