//https://stackoverflow.com/questions/49836912/how-can-i-call-event-from-webpack-bundle-if-event-written-in-html-file
//https://stackoverflow.com/questions/35781579/basic-webpack-notjav-working-for-button-click-function-uncaught-reference-error
//npm run build
//https://blog.jakoblind.no/css-modules-webpack/
//https://www.digitalocean.com/community/tutorials/js-classlist

import $ from "jquery";

//import * as data from './data.json';
const data = require("./data.json");
let points = 0;

function getPoints(){
  return points;
}

function updatePoints(){
  points += 1;
  //document.getElementById("game-points").innerHTML(`${points}`);

}

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
  if(this.classList.value){
   
    updatePoints();
    let elePoints = document.getElementById("game-points")//.innerHTML(`${points}`);
    elePoints.innerHTML = `Your Score is ${points}`;
    console.log(elePoints)
    elePoints.classList.add("correct-answer");
    console.log($(this).val())
    console.log($(this).next())
    console.log($(this).next().get())
    console.log($(this).next().get(0))

   let answerLabel = $(this).next().get(0);
   answerLabel.classList.add("correct-answer")



    //console.log(document.querySelector(`${this}`),"apple")
  }
}
window.uclicked = uclicked;

function setup(d){


  d.forEach(ele => {renderQuestion(ele)});

}


var results = setup(data)

export {data,results,points};