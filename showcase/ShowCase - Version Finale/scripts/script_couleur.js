// const boutons = document.getElementsByClassName("boutton");
const bandeaux = document.getElementsByClassName("bandeau");
console.log(bandeaux);
const pied = document.getElementById("pied");

const bouton1 = document.getElementById("couleur1");
const bouton2 = document.getElementById("couleur2");
const bouton3 = document.getElementById("couleur3");
bouton1.addEventListener("click", couleurs1);
bouton2.addEventListener("click", couleurs2);
bouton3.addEventListener("click", couleurs3);

function couleurs1 () {
    for(let i=0; i<boutons.length; i++){
        boutons[i].classList.add("bleu_fonce");
        boutons[i].classList.remove("vert");
        boutons[i].classList.remove("rouge");
    }
    for(let i=0; i<bandeaux.length; i++){
        bandeaux[i].classList.add("bleu_clair");
        bandeaux[i].classList.remove("seashell");
        bandeaux[i].classList.remove("orange");
    }
    pied.classList.add("marron_fonce");
    pied.classList.remove("noir");
    pied.classList.remove("vert_pastelle");
}

function couleurs2 () {
    for(let i=0; i<boutons.length; i++){
        boutons[i].classList.add("rouge");
        boutons[i].classList.remove("bleu_fonce");
        boutons[i].classList.remove("vert");
    }
    for(let i=0; i<bandeaux.length; i++){
        bandeaux[i].classList.add("orange");
        bandeaux[i].classList.remove("bleu_clair");
        bandeaux[i].classList.remove("seashell");
    }
    pied.classList.add("vert_pastelle");
    pied.classList.remove("noir");
    pied.classList.remove("marron_fonce");
}

function couleurs3 () {
    for(let i=0; i<boutons.length; i++){
        boutons[i].classList.add("vert");
        boutons[i].classList.remove("bleu_fonce");
        boutons[i].classList.remove("rouge");
    }
    for(let i=0; i<bandeaux.length; i++){
        bandeaux[i].classList.add("seashell");
        bandeaux[i].classList.remove("orange");
        bandeaux[i].classList.remove("bleu_clair");
    }
    pied.classList.add("noir");
    pied.classList.remove("vert_pastelle");
    pied.classList.remove("marron_fonce");
}