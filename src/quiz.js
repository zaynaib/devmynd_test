//https://stackoverflow.com/questions/49836912/how-can-i-call-event-from-webpack-bundle-if-event-written-in-html-file
//https://stackoverflow.com/questions/35781579/basic-webpack-notjav-working-for-button-click-function-uncaught-reference-error
//npm run build

import $ from "jquery";

//import * as data from './data.json';
const data = require("./data.json");

function renderQuestion(question){
  //create div element for question
  const element = document.createElement('div');
  element.innerHTML =(`<h2>${question.question}</h2>`);


  //create form for questions
  const form = document.createElement('form');
  element.appendChild(form);

  question.incorrect.forEach(q => {
    var input = document.createElement('input');
    input.addEventListener('click',uclicked);

    var label = document.createElement('label');
    label.innerHTML = (`${q}<br>`)
    console.log(input);
    console.log(label);

    input.setAttribute('type', 'radio');
    input.setAttribute('value',`${q}`);
    form.appendChild(input);
    form.appendChild(label)
  });


  var input = document.createElement('input');
  input.addEventListener('click',uclicked);
  var label = document.createElement('label');
  label.innerHTML = (`${question.correct}<br>`);
  input.setAttribute('type', 'radio');
  input.setAttribute('value',`${question.correct}`);
  
  input.classList.add("correct");

  form.appendChild(input);
  form.appendChild(label)



  console.log(form)
  element.appendChild(form)

  document.body.appendChild(element);

  //return element;

}

function uclicked() {
  // do something
  console.log('hi')
  var x = this.getAttribute('value');
  console.log(x)
  // if(this.classList.correct){
  //   console.log('plus one')
  // }
}
window.uclicked = uclicked;

function setup(d){
  
  console.log(d)
  d.forEach(ele => {renderQuestion(ele)});

  



  //console.log(d[0])
}

// function setup(d){
//   var myElement = renderQuestion(d[0]);
//   console.log(myElement)
//   return myElement;
// }

var results = setup(data)

export {data,results};