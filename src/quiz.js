//https://stackoverflow.com/questions/49836912/how-can-i-call-event-from-webpack-bundle-if-event-written-in-html-file
//https://stackoverflow.com/questions/35781579/basic-webpack-notjav-working-for-button-click-function-uncaught-reference-error
//npm run build
//https://blog.jakoblind.no/css-modules-webpack/
//https://www.digitalocean.com/community/tutorials/js-classlist

import $ from "jquery";
const data = require("./data.json");

let points = 0;

function getPoints(){
  return points;
}

function updatePoints(){
  points += 1;
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



  element.appendChild(form)

  document.body.appendChild(element);


}

function uclicked() {

  if(this.classList.value){
   
    updatePoints();
    let elePoints = document.getElementById("game-points").innerHTML = `Your Score is ${points}`;
    let answerLabel = $(this).next().get(0);
    answerLabel.classList.add("correct-answer");
  }
  else{
  let answerLabel = $(this).next()[0];
  answerLabel.classList.add("wrong-answer");
  }

}
window.uclicked = uclicked;

function setup(d){

  d.forEach(ele => {renderQuestion(ele)});

}


var results = setup(data)

export {data,results,points};