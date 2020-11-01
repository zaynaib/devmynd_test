import $ from "jquery";

//import * as data from './data.json';
const data = require("./data.json");



function hello() {
    return 'hello, this is Ola'
  }



function renderQuestion(question){
  //create div element for question
  const element = document.createElement('div');
  element.innerHTML =(`<h2>${question.question}</h2>`);


  //create form for questions
  const form = document.createElement('form');
  element.appendChild(form);


  //<input type="radio" id="male" name="gender" value="male">


  question.incorrect.forEach(q => {
    var input = document.createElement('input');
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

function checkAnswer(){
  // if checked is of class correct add point to user
}

function setup(d){
  console.log(d)
  d.forEach(ele => renderQuestion(ele))


  //console.log(d[0])
}

// function setup(d){
//   var myElement = renderQuestion(d[0]);
//   console.log(myElement)
//   return myElement;
// }

var results = setup(data)

export {hello,data,results};