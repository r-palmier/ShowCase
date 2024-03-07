/*///////////////////////////////////////////////////////////////////////////
D'après ce tuto : https://www.youtube.com/watch?v=NyZSIhzz5Do

Bienvenue à toi qui vient utiliser ce scipt ! Il permet de déplacer une
div où on veut sur la page, et de la redimmensionner comme on veut. 
Pour cela il suffit d'ajouter la class "movable" à la div que vous souhaitez
déplacer. 

Insérer le script dans votre body avec : 
<script src="scriptDD.js"></script>

Il faudra également ajouter le fichier styleDD.css avec ce lien dans le head : 
<link rel="stylesheet" href="styleDD.css">

Les deux fichiers doivent pour cela être dans votre dossier

/!\ En cas de déplacement d'image, ajouter la classe "img" au HTML de la div et mettre l'image en background d'une div avec : style="background: url(VotreImg.png) center/cover;"
/!\ Fonctionne dans une div "page"

Problèmes : 
- L'utilisation du css border peut provoquer un bug visuel avec les btn de resize
=> utiliser outline 


A faire : 
///////////////////////////////////////////////////////////////////////////*/
let movable = document.querySelectorAll(".movable");
let validSuppr = false;
let currentResizer;
let isResizing = false;

const tGrid = "10"; //taille de la grille en vw et vh
let xGrid;
let yGrid;

const img = document.querySelectorAll(".img");
img.forEach(item => {
    item.draggable = false;
});

const page = document.querySelector(".page");

// Ecoute pour le déplacement --------------------------------------------------
page.addEventListener("mousedown", (e) => {
    if(!e.target.classList.contains("delSection")) {
        let targP = find("movable", e);
    
        if(e.target.classList.contains("depl") || targP.classList.contains("depl")) {
            const zoneVisu = document.querySelector(".zoneSelect");
            let newRleft;
            let newRtop;
    
            let sectionP = find("section", e);
    
            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup);
    
            //recup des coo intiales de la souris
            let prevX = e.clientX;
            let prevY = e.clientY;
            
            function mousemove(e) {
                // ------ mousedown de Drag and Drop ------
                if(!isResizing) {
                    let newX = prevX - e.clientX;
                    let newY = prevY - e.clientY;

                    let prevLeft = targP.style.left;
    
                    //affichage de la grille
                    const gridContainer = sectionP.querySelector(".gridCont");
                    gridContainer.style.visibility = "visible";
                    remClass("inMove");
                    targP.classList.add("inMove");
                        
                    //récup de la taille des cases de la grille
                    const grid = document.body.querySelectorAll(".grid");
                    const rectGrid = grid[0].getBoundingClientRect();
                    xGrid = rectGrid.width;
                    yGrid = rectGrid.height;
    
                    const rect = getRect(targP, sectionP);
    
                    targP.style.left = rect.left - newX + 'px';
                    targP.style.top = rect.top - newY + 'px';
                    let resteLeft = rect.left % xGrid;
                    
                    if(resteLeft > (xGrid / 2)) {
                        let diff = xGrid - resteLeft;
                        
                        newRleft = rect.left + diff;
                    } else {
                        newRleft = rect.left - resteLeft;
                    }
                    
                    let resteTop = rect.top % yGrid;
                    if(resteTop > (yGrid / 2)) {
                        let diff = yGrid - resteTop;
    
                        newRtop = rect.top + diff;
                    } else {
                        newRtop = rect.top - resteTop;
                    }
    
                    zoneVisu.style.left = newRleft + "px";
                    zoneVisu.style.top = newRtop + "px";
    
                    //est-ce que l'elem dépasse de sa section ?
                    let bottomElem = delUnit(zoneVisu.style.top, 2) + delUnit(zoneVisu.style.height, 2);
                    let heightSection = delUnit(sectionP.style.height, 2);
                    let targLeft = delUnit(targP.style.left, 2);
                    let targTop = delUnit(targP.style.top, 2);
                    let targWidth = delUnit(targP.style.width, 2);
                    let sectRect = sectionP.getBoundingClientRect();
                    console.log(sectRect);
                    
                    if(bottomElem > heightSection) {
                        addLine(sectionP);
                    }

                    if(targTop <= 0) {
                        targP.style.top = 0 + "px";
                    }
                    if(targLeft <= 0) {
                        targP.style.left = 0 + "px";
                    }

                    console.log(targLeft + targWidth);
                    console.log(sectRect.width);
                    if(targLeft + targWidth >= sectRect.width) {
                        targP.style.left = prevLeft;
                    }

    
                    console.log("X = " + newRleft + " px, Y = " + newRtop + " px");
    
                    //maj des coo de la souris
                    prevX = e.clientX;
                    prevY = e.clientY;
                }
            }
    
            function mouseup() {
                let vwDiff = newRleft / xGrid;
                let vhDiff = newRtop / yGrid;
    
                console.log(newRleft);
                console.log(xGrid);
                console.log(vwDiff);
    
                targP.style.left = (vwDiff * tGrid) + '%';
                targP.style.top = (vhDiff * yGrid) + 'px';
    
                //désaffichage de la grille
                const gridContainer = sectionP.querySelector(".gridCont");
                gridContainer.style.visibility = "hidden";
                remClass("inMove");
    
                //annulation de tout les eventListener de la souris
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup);
                isResizing = false;
            }
        }
    }
});

// Ecoute pour le resize --------------------------------------------------
page.addEventListener("mousedown", (e) => {
    if(!e.target.classList.contains("delSection")) {
        let targP = find("movable", e);
    
        if(e.target.classList.contains("resizer") || targP.classList.contains("resizer")) {
            // ------ mousedown de Resizer ------
            currentResizer = e.target;
            isResizing = true;
    
            let sectionP = find("section", e)
    
            const zoneVisu = document.querySelector(".zoneSelect");
            let newRleft;
            let newRtop;
            let newRwidth;
            let newRheight;
    
            //recup des coo intiales de la souris
            let prevX = e.clientX;
            let prevY = e.clientY;
    
            //affichage de la grille
            const gridContainer = sectionP.querySelector(".gridCont");
            gridContainer.style.visibility = "visible";
            remClass("inMove");
            targP.classList.add("inMove");
    
            const grid = document.body.querySelectorAll(".grid");
            const rectGrid = grid[0].getBoundingClientRect();
            xGrid = rectGrid.width;
            yGrid = rectGrid.height;
    
            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup);
    
            function mousemove(e) {
                const rect = getRect(targP, sectionP);

                let prevHeight = targP.style.height;
    
                let resteLeft = rect.left % xGrid;
                if(resteLeft > (xGrid / 2)) {
                    let diff = xGrid - resteLeft;
                    
                    newRleft = rect.left + diff;
                } else {
                    newRleft = rect.left - resteLeft;
                }
                
                let resteTop = rect.top % yGrid;
                if(resteTop > (yGrid / 2)) {
                    let diff = yGrid - resteTop;
    
                    newRtop = rect.top + diff;
                } else {
                    newRtop = rect.top - resteTop;
                }
    
                let resteWidth = rect.width % xGrid;
                if(resteWidth > (xGrid / 2)) {
                    let diff = xGrid - resteWidth;
                    
                    newRwidth = rect.width + diff;
                } else {
                    newRwidth = rect.width - resteWidth;
                }
                
                let resteHeight = rect.height % yGrid;
                if(resteHeight > (yGrid / 2)) {
                    let diff = yGrid - resteHeight;
    
                    newRheight = rect.height + diff;
                } else {
                    newRheight = rect.height - resteHeight;
                }
    
                if(currentResizer.classList.contains("se")) {
                    //curs bas droite
                    targP.style.width = rect.width - (prevX - e.clientX) + "px";
                    targP.style.height = rect.height - (prevY - e.clientY) + "px";
    
                    //visuel
                    zoneVisu.style.width = newRwidth + "px";
                    zoneVisu.style.height = newRheight + "px";
                } else if(currentResizer.classList.contains("sw")) {
                    //curs bas gauche
                    targP.style.width = rect.width + (prevX - e.clientX) + "px";
                    targP.style.height = rect.height - (prevY - e.clientY) + "px";
    
                    targP.style.left = rect.left - (prevX - e.clientX) + "px";
    
                    //visuel
                    zoneVisu.style.width = newRwidth + "px";
                    zoneVisu.style.height = newRheight + "px";
                    zoneVisu.style.left = newRleft + "px";
                } else if(currentResizer.classList.contains("ne")) {
                    //curs haut droite
                    targP.style.width = rect.width - (prevX - e.clientX) + "px";
                    targP.style.height = rect.height + (prevY - e.clientY) + "px";
    
                    targP.style.top = rect.top - (prevY - e.clientY) + "px";
    
                    zoneVisu.style.width = newRwidth + "px";
                    zoneVisu.style.height = newRheight + "px";
                    zoneVisu.style.top = newRtop + "px";
                } else if(currentResizer.classList.contains("nw")) {
                    //curs haut gauche
                    targP.style.width = rect.width + (prevX - e.clientX) + "px";
                    targP.style.height = rect.height + (prevY - e.clientY) + "px";
    
                    targP.style.top = rect.top - (prevY - e.clientY) + "px";
                    targP.style.left = rect.left - (prevX - e.clientX) + "px";
    
                    zoneVisu.style.width = newRwidth + "px";
                    zoneVisu.style.height = newRheight + "px";
                    zoneVisu.style.left = newRleft + "px";
                    zoneVisu.style.top = newRtop + "px";
                }

                //est-ce que l'elem dépasse de sa section ?
                let bottomElem = (Number(delUnit(zoneVisu.style.top, 2)) + Number(delUnit(zoneVisu.style.height, 2)));
                
                let heightSection = Number(delUnit(zoneVisu.parentNode.style.height, 2));
                
                if(bottomElem > heightSection) {
                    addLine(zoneVisu.parentNode);
                }

                if(delUnit(targP.style.top, 2) <= 0) {
                    targP.style.top = 0 + "px";
                    targP.style.height = prevHeight;
                }

                //maj des coo de la souris
                prevX = e.clientX;
                prevY = e.clientY;
            }
            
            function mouseup() {
                let vwDiff2 = newRleft / xGrid;
                let vhDiff2 = newRtop / yGrid;
                targP.style.left = (vwDiff2 * tGrid) + '%';
                targP.style.top = (vhDiff2 * yGrid) + 'px';
                
                let vwDiff3 = newRwidth / xGrid;
                let vhDiff3 = newRheight / yGrid;
                targP.style.width = (vwDiff3 * tGrid) + '%';
                targP.style.height = (vhDiff3 * yGrid) + 'px';
    
                //désaffichage de la grille
                const gridContainer = sectionP.querySelector(".gridCont");
                gridContainer.style.visibility = "hidden";
                remClass("inMove");
    
                //annulation de tout les eventListener de la souris
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup);
                isResizing = false;
            }
        }
    }
});

//sélection de la div --------------------------------------------------------
page.addEventListener("click", (e) => {
    if(!e.target.classList.contains("delSection")) {
        let targP = find("movable", e);
        if(targP.classList.contains("movable") && !targP.classList.contains("editable")) {
            if(!targP.classList.contains("selected")) {
                //on retire les autres sélections
                remClass("selected");
                remClass("depl");
                remSelectedBtns(document.body);
    
                //On met la sélection sur ce qui nous intéresse
                targP.classList.add("selected", "depl");
                addSelectedBtns(targP);
    
                remDivDepl();
                let sectionP = find("section", e)
                const rect = getRect(targP, sectionP);
    
                const parentTarg = targP.parentNode;
                createDivDepl(parentTarg, rect);
    
                // if(targP.classList.contains("movable")) {
                    elemApp("moreEdit");
                // } 
    
            } 
        }
            
        function addSelectedBtns(parent) {
            //ajoute les btns de resize à la div movable
            const newNe = document.createElement("div");
            newNe.classList.add("resizer", "ne");
    
            const newNw = document.createElement("div");
            newNw.classList.add("resizer", "nw");
    
            const newSw = document.createElement("div");
            newSw.classList.add("resizer", "sw");
    
            const newSe = document.createElement("div");
            newSe.classList.add("resizer", "se");
    
            parent.appendChild(newNe);
            parent.appendChild(newNw);
            parent.appendChild(newSw);
            parent.appendChild(newSe);
        }
    
        
        function createDivDepl(parent, rect) {
            const newDivDepl = document.createElement("div");
            newDivDepl.classList.add("zoneSelect");
            parent.appendChild(newDivDepl);
            
            const div = document.querySelector(".zoneSelect");
            div.style.left = rect.left + "px";
            div.style.width = rect.width + "px";
            div.style.top = rect.top + "px";
            div.style.height = rect.height + "px";
        }

    }

});

//pour enlever la zone de sélection -----------------------------------------
document.body.addEventListener("click", (e) => {
    if(!e.target.classList.contains("delSection")) {
        let targP = find("movable", e);
        if(targP.classList.contains("toolbar")) {
            //rien

        } else if(!targP.classList.contains("movable")) {
            //si la div contient déjà selected, on l'enlève
            remClass("selected");
            remClass("depl");
            remSelectedBtns(document.body);
            remDivDepl();

            elemDisp("moreEdit");
        }
        
        //pour enlever la zone de texte
        if(!targP.classList.contains("editable") && !targP.classList.contains("toolbar")){
            const texts = document.querySelectorAll('[contenteditable]');

            texts.forEach (item => {
                item.setAttribute("contentEditable","false");
                remClass('editable');
            });
            elemDisp("textEdit");

        }

        // Fermeture de la popup section
        if(e.target.classList.contains("closeListSection") || e.target.classList.contains("choiceSectionContainer")) {
            popupSection.style.visibility = "collapse";
        }

        //choix de la div où ajouter un elem
        if(e.target.classList.contains("chooseAdd")) {
            let sectionP = find("section", e);
            console.log(sectionP.id);
            console.log("add " + toAdd);
            console.log(fileToAdd);

            const chooseAdd = document.querySelectorAll(".chooseAdd");
            let newElement = "";

            chooseAdd.forEach(item => {
                item.classList.toggle("hide");
            });


            if(toAdd === "button") {
                newElement = document.createElement("button");
            } else {
                newElement = document.createElement("div");
            }

            newElement.classList.add("movable");
            newElement.style.position = "absolute";
            newElement.style.left = "30%";
            newElement.style.top = "200px";
            newElement.style.width = "40%";
            newElement.style.height = "200px";
            newElement.style.zIndex = 1000;

            switch(toAdd) {
                case "text": 
                    const newP = document.createElement("p");
                    newP.innerHTML = "Insérez du texte ici";
                    newElement.appendChild(newP);
                    newElement.classList.add("text");
                break;
                case "image": 
                    newElement.style.background = `url(${fileToAdd}) center/cover`;
                    newElement.classList.add("img");
                    newElement.setAttribute("alt", "Image importée");
                break;
                case "forme":
                    const newChild = document.createElement("div");
                    newChild.classList.add(fileToAdd);

                    newElement.appendChild(newChild);
                    newElement.classList.add("formeContainer");
                break;
                case "button": 
                    newElement.classList.add("boutton");
                    newElement.classList.add("style_bouton1");
                break;
            }

            let maxId = findLastId();
            newElement.setAttribute("id", maxId);

            sectionP.appendChild(newElement);
            
        }
    }
});


//fonctions d'automatisation -----------------------------------------------
function remSelectedBtns(parent) {
    //retire les btns de resize
    const resi = parent.querySelectorAll(".resizer");
    resi.forEach((item) => { 
        item.remove();
    });
}

function remClass(classToRem) {
    const cl = document.body.querySelectorAll("."+classToRem);
    cl.forEach((item) => {
        item.classList.remove(classToRem);
    });
}

function remDivDepl() {
    const div = document.querySelectorAll(".zoneSelect");
    div.forEach((item) => {
        item.remove();
    });
}

function getRect(targP, section) {
    let offset = [];

    let divRect = section.getBoundingClientRect();
    let elemRect = targP.getBoundingClientRect();
    offset.left = (elemRect.left - divRect.left) + section.scrollLeft;
    offset.top = (elemRect.top - divRect.top) + section.scrollTop;
    offset.width = elemRect.width;
    offset.height = elemRect.height;

    return offset;
}

function find(classF, e) {
    let targ = e.target;
    while(!targ.classList.contains(classF)) {
        targ = targ.parentNode;

        if(targ === document.body) {break;}

        if(targ.classList.contains("toolbar")) {break;}
    } 
    return targ;
}

// Génération de la grille ----------------------------------------------------
document.onload = loading();
function loading() {
    //construction de la grille au chargement 
    
    const sects = document.querySelectorAll(".section");

    sects.forEach(item => {
        const newCont = document.createElement("div");
        newCont.classList.add("gridCont");
        item.appendChild(newCont);

        const ySect = item.clientHeight;
        
        do {
            const newGrid = document.createElement("div");
            newGrid.style.width = tGrid + "%";
            newGrid.style.height = 50 + "px";
            newGrid.classList.add("grid");
            
            const newGridInt = document.createElement("div");
            newGridInt.classList.add("gridInt");
            newGrid.appendChild(newGridInt);
            
            newCont.appendChild(newGrid);
        } while(ySect > newCont.clientHeight);
        let i = 0;
        do {
            const newGrid = document.createElement("div");
            newGrid.style.width = tGrid + "%";
            newGrid.style.height = 50 + "px";
            newGrid.classList.add("grid");
            
            const newGridInt = document.createElement("div");
            newGridInt.classList.add("gridInt");
            newGrid.appendChild(newGridInt);
            
            newCont.appendChild(newGrid);
            i++;
        } while(i < 9);
    });

    movable = page.querySelectorAll(".movable");
    movable.forEach(item => {
        item.idSection = item.parentNode.id;
    });
} 