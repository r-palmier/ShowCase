const btn1 = document.querySelector('#btn_a');
const btn2 = document.querySelector('#btn_b');
const btn3 = document.querySelector('#btn_c');
const btn4 = document.querySelector('#btn_d');
const list = document.getElementById('list');
const form = document.querySelector('form');
const item = document.getElementById('item');
const cont = document.querySelectorAll('.container');
const text = document.querySelectorAll('.text');
const div1_parent = document.querySelector('.page');
let nbr_id = 0;
console.log(nbr_id);


// // zone texte //

btn1.addEventListener('click', () => {

  const new_dt = document.createElement('div');
  new_dt.setAttribute("class","text movable");

  const new_p= document.createElement('p');
  var newContent = document.createTextNode('inserer text')
  new_p.appendChild(newContent);
  new_dt.appendChild(new_p);
  div1_parent.appendChild(new_dt);
  nbr_id = nbr_id + 1;
  for (let i = 0; i < 100; i++) {
    new_dt.setAttribute("id", nbr_id); 
    
  }
});

// //zone image //


btn2.addEventListener('click', () => {

  const new_di = document.createElement('div');
  new_di.setAttribute("class","image movable");
  new_di.setAttribute("style",'background: url("Dream.jpg") center/cover; position: absolute; left: -10vw; top: 10vh; width: 100vw; height: 100vh;');
  div1_parent.appendChild(new_di);
  nbr_id = nbr_id + 1;
  for (let i = 0; i < 100; i++) {
    new_di.setAttribute("id", nbr_id); 
    
  }
});


// zone formes //

btn3.addEventListener('click', () => {

  const new_df = document.createElement('div');
  new_df.setAttribute("class"," forme exemple movable");
  div1_parent.appendChild(new_df);

  nbr_id = nbr_id + 1;
  for (let i = 0; i < 100; i++) {
    new_df.setAttribute("id", nbr_id); 
    
  }
});


//boutton //

btn4.addEventListener('click', () => {
console.log("click");
  const new_dd = document.createElement('div');
  new_dd.setAttribute("class"," movable");
  
  const new_db = document.createElement('button');
  new_db.setAttribute("class"," boutton movable"); 
  new_dd.appendChild(new_db);
  div1_parent.appendChild(new_dd);

  nbr_id = nbr_id + 1;
  for (let i = 0; i < 100; i++) {
    new_db.setAttribute("id", nbr_id); 
    
  }
});


// click en dehors de la zone de texte//


document.body.addEventListener('click',(e) =>{
  console.log("click zone_txt");
  if(!e.target.parentNode.classList.contains("text")){
    console.log("clicktext");
    const texts = document.querySelectorAll('[contenteditable]');

    texts.forEach (item => {
      item.setAttribute("contentEditable","false");
      remClass('editable');
    }); 
  }
});


// double click//

document.body.addEventListener('dblclick',(e) =>{
  console.log("doubleclick");
  if(e.target.parentNode.classList.contains("text")){
  
    e.target.parentNode.setAttribute("contentEditable","true");
    console.log(e);   
    remClass('selected');
    e.target.parentNode.classList.add("editable");
  } else {
      remClass('editable');
      e.target.setAttribute("contentEditable","false");
    }
}); 


// fct supp classe //

function remClass(classToRem) {
  const cl = document.body.querySelectorAll("."+classToRem);
  cl.forEach((item) => {
      item.classList.remove(classToRem);
  });
}