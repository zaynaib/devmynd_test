//setup dependices
const data = require("./data.json");

const shuffleArray = array =>
  array
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

//property: keep track of users points
let points = 0;

//getter for points property
function getPoints() {
  return points;
}

//setter for points property
function updatePoints() {
  points += 1;
}

function createAnswer(triviaAnswer, index) {
  const label = document.createElement("label");
  label.addEventListener("click", uclicked);
  label.innerHTML = `<input type="radio" value="${triviaAnswer}" name="group-${index}"> ${triviaAnswer}`;
  return label;
}

//creates + appends html elements for each question in data.json
function renderQuestion(question, index) {
  //create form for questions
  const form = document.createElement("div");
  document.body.appendChild(form);

  //create div questionHeader for question
  const questionHeader = document.createElement("h2");
  questionHeader.innerHTML = `${question.question}`;
  form.appendChild(questionHeader);

  //loop through each answers, add event listener, label, input attributes
  const answers = question.answers.map((q, aIndex) => {
    const answerLabel = createAnswer(q, index);
    if (aIndex === question.correct) {
      answerLabel.classList.add("correct");
    }
    return answerLabel;
  });

  shuffleArray(answers).forEach(answer => form.appendChild(answer));
  document.body.appendChild(form);
}

// click function for each answer keeps tracks of points and css styles to signify to the user if choice is right or wrong
function uclicked() {
  if (this.classList.contains("correct")) {
    const answerInput = this.querySelector("input");
    updatePoints();
    document.getElementById(
      "game-points"
    ).innerHTML = `Your Score is ${points}`;
    this.classList.add("correct-answer");
    this.querySelector("input").checked = true;
    document.querySelectorAll(`[name="${answerInput.name}"]`).forEach(el => {
      el.parentElement.removeEventListener("click", uclicked);
      el.disabled = true;
    });
  } else {
    this.classList.add("wrong-answer");
  }
}

//uclicked function to be in the global scope
window.uclicked = uclicked;

// question each question in the dom
function setup(jsonData) {
  const gamePointsEl = document.createElement("span");
  gamePointsEl.setAttribute("id", "game-points");
  document.body.appendChild(gamePointsEl);
  jsonData.forEach((ele, index) => {
    renderQuestion(ele, index);
  });
}

export { data, setup };
