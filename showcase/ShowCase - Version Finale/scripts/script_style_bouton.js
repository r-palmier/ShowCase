'use strict'
const boutons = document.getElementsByClassName("boutton");
const bouton_style1 = document.getElementById("btn_style1");
const bouton_style2 = document.getElementById("btn_style2");
const bouton_style3 = document.getElementById("btn_style3");



bouton_style1.addEventListener("click", (e) => {
    for(let i=0; i<boutons.length; i++){
        boutons[i].classList.add("style_bouton1");
        boutons[i].classList.remove("style_bouton2");
        boutons[i].classList.remove("style_bouton3");
    }
});

bouton_style2.addEventListener("click", (e) => {
    for(let i=0; i<boutons.length; i++){
        boutons[i].classList.add("style_bouton2");
        boutons[i].classList.remove("style_bouton1");
        boutons[i].classList.remove("style_bouton3");
    }
});

bouton_style3.addEventListener("click", (e) => {
    for(let i=0; i<boutons.length; i++){
        boutons[i].classList.add("style_bouton3");
        boutons[i].classList.remove("style_bouton1");
        boutons[i].classList.remove("style_bouton2");
    }
});