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
/!\ Ne fonctionne pas sur un élément directement, la classe doit être mise sur une div contenant l'élément
/!\ Fonctionne dans une div "page"

Problèmes : 
- L'utilisation du css border peut provoquer un bug visuel avec les btn de resize
=> utiliser outline 


A faire : Grille dynamique
///////////////////////////////////////////////////////////////////////////*/
const movable = document.querySelectorAll(".movable");

let currentResizer;
let isResizing = false;

const tGrid = "10"; //taille de la grille en vw et vh
let xGrid;
let yGrid;

const img = document.querySelectorAll(".img");
img.forEach(item => {
    item.draggable = false;
});

<<<<<<< HEAD:IT2/ZT recup/scriptDD.js
const btn = document.querySelector(".btn");
=======
const page = document.querySelector(".page");

// const btn = document.querySelector(".btn");
>>>>>>> Raphael-IT2:DragDrop old/scriptDD.js

// Ecoute pour le déplacement --------------------------------------------------
document.body.addEventListener("mousedown", (e) => {
    let targP = e.target;
    do {
        if(targP.classList.contains("movable")) {
            //c'est bon
        } else {
            targP = targP.parentNode;
        }

        if(targP === document.body) {
            //désaffichage de la grille
            const gridContainer = document.body.querySelector(".gridCont");
            gridContainer.style.visibility = "hidden";
            
            remDivDepl();
            break;           
        }
    } while(!targP.classList.contains("movable") || targP == document.body);

    if(e.target.classList.contains("depl") || targP.classList.contains("depl")) {
        const zoneVisu = document.querySelector(".zoneSelect");
        let newRleft;
        let newRtop;

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

                const gridContainer = document.body.querySelector(".gridCont");
                gridContainer.style.visibility = "visible";
                remClass("inMove");
                targP.classList.add("inMove");
                    
                //récup de la taille des cases de la grille
                const grid = document.body.querySelectorAll(".grid");
                const rectGrid = grid[0].getBoundingClientRect();
                xGrid = rectGrid.width;
                yGrid = rectGrid.height;

                const rect = getRect(targP);

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

            const gridContainer = document.body.querySelector(".gridCont");
            gridContainer.style.visibility = "hidden";
            remClass("inMove");

            //annulation de tout les eventListener de la souris
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
            isResizing = false;
        }
    }
    
});

// Ecoute pour le resize --------------------------------------------------
document.body.addEventListener("mousedown", (e) => {
    let targP = e.target;
    do {
        if(targP.classList.contains("movable")) {
            //c'est bon
        } else {
            targP = targP.parentNode;
        }

        if(targP === document.body) {
            break;
        }
    } while(!targP.classList.contains("movable"));

    if(e.target.classList.contains("resizer") || targP.classList.contains("resizer")) {
        // ------ mousedown de Resizer ------
        currentResizer = e.target;
        isResizing = true;

        const zoneVisu = document.querySelector(".zoneSelect");
        let newRleft;
        let newRtop;
        let newRwidth;
        let newRheight;

        //recup des coo intiales de la souris
        let prevX = e.clientX;
        let prevY = e.clientY;

        //affichage de la grille
        const gridContainer = document.body.querySelector(".gridCont");
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
            const rect = getRect(targP);

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
            const gridContainer = document.body.querySelector(".gridCont");
            gridContainer.style.visibility = "hidden";
            remClass("inMove");

            //annulation de tout les eventListener de la souris
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
            isResizing = false;
        }
    }
});

//sélection de la div --------------------------------------------------------
page.addEventListener("click", (e) => {
    let targP = e.target;
    do {
        if(targP.classList.contains("movable")) {
            //c'est bon
        } else {
            targP = targP.parentNode;
        }

        if(targP == document.body) {
            break;
        }
    } while(!targP.classList.contains("movable"));
<<<<<<< HEAD:IT2/ZT recup/scriptDD.js
    
    if(targP.classList.contains("movable")) {
        
=======
    console.log(targP);
    if(targP.classList.contains("movable") && !targP.classList.contains("editable")) {
>>>>>>> Raphael-IT2:DragDrop old/scriptDD.js
        if(!targP.classList.contains("selected")) {
            //on retire les autres sélections
            remClass("selected");
            remClass("depl");
            remSelectedBtns(document.body);

            //On met la sélection sur ce qui nous intéresse
            targP.classList.add("selected", "depl");
            addSelectedBtns(targP);

            remDivDepl();
            const rect = getRect(targP);

            const parentTarg = targP.parentNode;
            createDivDepl(parentTarg, rect);

<<<<<<< HEAD:IT2/ZT recup/scriptDD.js
        } else {
            //si la div contient déjà selected, on l'enlève
            targP.classList.remove("selected");
            targP.classList.remove("depl");
            remSelectedBtns(targP);
            remDivDepl();
        }
=======
            // if(targP.classList.contains("movable")) {
                elemApp("moreEdit");
            // } 

        } 
>>>>>>> Raphael-IT2:DragDrop old/scriptDD.js
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
        
});

//pour enlever la zone de sélection
document.body.addEventListener("click", (e) => {
<<<<<<< HEAD:IT2/ZT recup/scriptDD.js
    if(!e.target.classList.contains("movable")) {
=======
    let targP = e.target;
    do {
		if(targP.classList.contains("toolbar")) {
			break;
		}

		if(targP.classList.contains("movable")) {
			//c'est bon
		} else {
			targP = targP.parentNode;
		}

		if(targP === document.body) {
			break;
		}
	} while(!targP.classList.contains("movable") );
    // console.log(targP);
    if(targP.classList.contains("toolbar")) {
        //rien

    } else if(!targP.classList.contains("movable")) {
>>>>>>> Raphael-IT2:DragDrop old/scriptDD.js
        //si la div contient déjà selected, on l'enlève
        remClass("selected");
        remClass("depl");
        remSelectedBtns(document.body);
        remDivDepl();

<<<<<<< HEAD:IT2/ZT recup/scriptDD.js
=======
        elemDisp("moreEdit");
>>>>>>> Raphael-IT2:DragDrop old/scriptDD.js
    }
    
    if(!targP.classList.contains("editable") && !targP.classList.contains("toolbar")){
		const texts = document.querySelectorAll('[contenteditable]');

<<<<<<< HEAD:IT2/ZT recup/scriptDD.js
//test à virer
btn.addEventListener("click", (e) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("movable", "textetest");
    const textDiv = document.createTextNode("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt beatae temporibus alias. Necessitatibus quisquam aut similique consequatur esse voluptatum porro tenetur recusandae voluptas harum! Iste commodi eligendi mollitia voluptatum sapiente.");
    newDiv.appendChild(textDiv);

    const page = document.querySelector(".page");
    page.appendChild(newDiv);
});
=======
		texts.forEach (item => {
			item.setAttribute("contentEditable","false");
			remClass('editable');
		});
		elemDisp("textEdit");

	}
});

>>>>>>> Raphael-IT2:DragDrop old/scriptDD.js

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

function getRect(targP) {
    const page = document.querySelector(".page");
    let offset = [];

    let divRect = page.getBoundingClientRect();
    let elemRect = targP.getBoundingClientRect();
    offset.left = (elemRect.left - divRect.left) + page.scrollLeft;
    offset.top = (elemRect.top - divRect.top) + page.scrollTop;
    offset.width = elemRect.width;
    offset.height = elemRect.height;

    console.log('Element is ' + offset.top + ' vertical pixels from .page');
    return offset;
}

document.onload = loading();
function loading() {
    //construction de la grille au chargement 
    const page = document.querySelector(".page");
    const newCont = document.createElement("div");
    newCont.classList.add("gridCont");
    page.appendChild(newCont);
    
    const container = document.querySelector(".gridCont");
    const yPage = page.clientHeight;
    const xPage = page.clientWidth;
    let i = 0;

    
    do {
        const newGrid = document.createElement("div");
        newGrid.style.width = tGrid + "%";
        newGrid.style.height = 50 + "px";
        newGrid.classList.add("grid");
        
        const newGridInt = document.createElement("div");
        newGridInt.classList.add("gridInt");
        newGrid.appendChild(newGridInt);
        
        container.appendChild(newGrid);
        i++;
        console.log(yPage);
        console.log(container.clientHeight);
    } while(yPage + 900 > container.clientHeight);
    //  ||
}