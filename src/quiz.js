//setup dependices
import $ from "jquery";
const data = require("./data.json");

//https://stackoverflow.com/questions/46270587/webpack-dev-server-runs-twice/46478898

//property: keep track of users points
let points = 0;

//getter for points property
function getPoints(){
  return points;
}

//setter for points property
function updatePoints(){
  points += 1;
}

function createQuestions(triviaQuestion,formElement,questionEvent){
  var input = document.createElement('input');
  input.addEventListener('click',questionEvent);

  var label = document.createElement('label');
  label.innerHTML = (`${triviaQuestion}<br>`)
  

  input.setAttribute('type', 'radio');
  input.setAttribute('value',`${triviaQuestion}`);

  //add each label and input to the form
  formElement.appendChild(input);
  formElement.appendChild(label);

  return input;

}

//creates + appends html elements for each question in data.json
function renderQuestion(question){
  let groupNumber = 0;
  let groupName = `group${groupNumber}`;

  //create form for questions
  const form = document.createElement('div');
  document.body.appendChild(form);

  //create div element for question
  const element = document.createElement('div');
  element.innerHTML =(`<h2>${question.question}</h2>`);

  //loop through each incorrect answer add event listener, label,input attributes
  question.incorrect.forEach(q => {
    let incorrectInput = createQuestions(q,form,uclicked);
    incorrectInput.setAttribute("name",groupName)

  });

  //correct questions
  let input = createQuestions(question.correct,form,uclicked);
  input.setAttribute("name",groupName);
  input.classList.add("correct");
  

  groupNumber +=1;

  //append last question
  element.appendChild(form);
  document.body.appendChild(element);


}

// click function for each answer keeps tracks of points and css styles to signify to the user if choice is right or wrong
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

//uclicked function to be in the global scope
window.uclicked = uclicked;

// question each question in the dom
function setup(jsonData){
  jsonData.forEach(ele => {renderQuestion(ele)});

}



export {data,setup};