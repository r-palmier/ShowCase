let sections = document.querySelectorAll(".section");

const sectionUp = document.querySelectorAll(".sectionUp");
const sectionDown = document.querySelectorAll(".sectionDown");
const ajoutSection = document.querySelectorAll(".addSection");


// Affichage des boutons sur le mouseover des sections -----------------------
page.addEventListener("mouseover", (e) => {
    let targP = e.target;
    do {
        if(!targP.classList.contains("section")) {
            targP = targP.parentNode;
        } 

        if(targP === document.body) {
            break;
        }
    } while(!targP.classList.contains("section"));

    if(targP.classList.contains("section")) {
        elemDisp("btnSizeContainer");
        elemDisp("addSection");

        //la souris est sur une section, on lui affiche ses btns

        const cont = targP.querySelector(".btnSizeContainer");
        cont.style.visibility = "visible";

        const addSect = targP.querySelector(".addSection");
        addSect.style.visibility = "visible";

    }
});


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


//ajout de Section ------------------------------------------------------------

ajoutSection.forEach(item => {
    item.addEventListener("click", (e) => {
        //créatin de la nouvelle section et implémentation en dessous de la section actuelle
        let idAct = item.parentNode.id;
        let height = 1400;
        const newSect = document.createElement("div");
        newSect.classList.add("section");
        newSect.style.height = height + "px";

        page.insertBefore(newSect, item.parentNode.nextSibling);

        //redéfinition des id de section
        sections = document.querySelectorAll(".section");
        let i = 0;
        sections.forEach(sects => {
            sects.id = "s" + i;
            i++;
            console.log(sects.id);
        });
        
        //mise en place du contenu de la novuelle section
        idAct = Number(idAct[1]) + 1;
        
        $(function() {
            $("#s" + idAct).load("corps1.html");
        });
        
        // sections = document.querySelectorAll("section");
    });
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
    return numb;
}


