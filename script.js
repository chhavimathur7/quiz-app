// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");

showQuestion();

function showQuestion() {
  if(currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentQuestion];
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectOption(option, button));
    optionsEl.appendChild(button);
  });

  updateProgress();
}

function selectOption(selected, button) {
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => {
    btn.disabled = true;
    if(btn.innerText === questions[currentQuestion].answer){
      btn.classList.add("correct");
    } else if(btn.innerText === selected){
      btn.classList.add("wrong");
    }
  });

  if(selected === questions[currentQuestion].answer) score++;

  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 1000);
}

function showResult() {
  questionEl.parentElement.classList.add("hide");
  resultEl.classList.remove("hide");
  scoreEl.innerText = score;
  totalEl.innerText = questions.length;
}

function updateProgress() {
  const progressPercent = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

// Restart quiz
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultEl.classList.add("hide");
  questionEl.parentElement.classList.remove("hide");
  showQuestion();
});
