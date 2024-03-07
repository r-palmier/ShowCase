/*
A rajouter au style de chaque élément spawnable : 
- position
- haut/larg
- z-index: 1000;
Image : 
- class="img"
- image en background avec center/cover
Texte : 
- font-size: 16px;
- font-family: "Work Sans";
- text-align: left;
- color: #000;

*/

const btn = document.querySelector(".btn");
const div1_parent = document.querySelector('.page');
let nbr_id = 0;

//boutons de la barre editTexte
const selectFontSize = document.querySelector(".selectFontSize");
const selectFont = document.querySelector(".selectPolice");
const iColor = document.querySelector(".i-color");
const selectAlignText = document.querySelector(".selectAlignText");

//boutons de la barre moreEdit
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
const deleteBtn = document.querySelector(".delete-btn");


document.body.addEventListener('dblclick',(e) =>{
  	console.log("doubleclick");
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
	// console.log(targP);
	if(targP.classList.contains("text")){
		//entrée en mode texte
		targP.setAttribute("contentEditable","true");
		targP.style.height = "fit-content";

		// remClass("selected");
		remClass("depl");
		remDivDepl();
		remSelectedBtns(document.body);
		targP.classList.add("editable");

		elemApp("textEdit", targP.id);

	} else {
		//sortie du mode texte
		remClass('editable');

	}
	
}); 

deleteBtn.addEventListener("click", () => {
	console.log("slt");
	const divToRem = document.querySelector(".selected");

	let confirm = window.confirm("Etes vous sûr de vouloir supprimmer cet élément ? Cet action est irréversible");
		
	if(confirm === true) {
		//on suppr l'élément
		divToRem.remove();
		elemDisp("moreEdit");
		elemDisp("textEdit");
	} else {
		//rien, c'est le btn annuler
		console.log("bah non");
	}
});

//Tracking des boutons de modifs de texte -------------------------------------
selectFontSize.addEventListener("change", () => {
	const div = document.querySelector(".selected");
	
	div.style.fontSize = Number(selectFontSize.value) + 4 + 'px';
});

selectFont.addEventListener("change", () => {
	const div = document.querySelector(".selected");

	div.style.fontFamily = '"' + selectFont.value + '"';
});

iColor.addEventListener("change", () => {
	const div = document.querySelector(".selected");
	
	div.style.color = iColor.value;
});

selectAlignText.addEventListener("change", () => {
	const div = document.querySelector(".selected");
	
	let align = selectAlignText.value;
	align = align.split('-');
	align = align[1];
	console.log(align);
	
	div.style.textAlign = align;
});

forwardBtn.addEventListener("click", (e) => {
	const div = document.querySelector(".selected");

	div.style.zIndex ++;
});

backwardBtn.addEventListener("click", (e) => {
	const div = document.querySelector(".selected");
	
	div.style.zIndex --;
});



//fonctions d'automatisation -----------------------------------------------

function elemApp(elem) {
	const div = document.querySelectorAll("." + elem);
	const divSelect = document.querySelector(".selected");
	
	div.forEach((item) => {
		item.style.visibility = "visible";
	});

	//affichage des valeurs selon celles de la div selected 

	//font Size
	let size = divSelect.style.fontSize;
	size = size.split("");
	size.splice(2, 2);
	size = size.join("");

	selectFontSize.value = Number(size) - 4; 

	//font family
	let family = divSelect.style.fontFamily;
	family = family.split('"');
	family = family[1];
	selectFont.value = family;

	//text-align
	let align = divSelect.style.textAlign;
	console.log(align);
	selectAlignText.value = "a-" + align;
	
}

function elemDisp(elem) {
	const div = document.querySelectorAll("." + elem);
	div.forEach((item) => {
		item.style.visibility = "collapse";
	});
}
