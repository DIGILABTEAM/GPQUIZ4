const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progresstext = document.getElementById("progresstext");
const scoretext = document.getElementById('score');
const progressbarfull = document.getElementById('progressbarfull');
let currentquestion = {};
let acceptinganswers = false;
let score = 0;
let questioncounter = 0;
let availablequestions = [];

let questions = [
  {
    question: "All of the followings are selective β2-agonist except:",
    choice1: "aIsoprenaline",
    choice2: "Salbutamol",
    choice3: "Terbutaline",
    choice4: "Formeterol",
    answer: 1
  },
  {
    question: "All of the following combinations of drug and its mechanism of action is correct except",
    choice1: "Salbutamol: stimulation of β2 receptor causing bronchodilation",
    choice2: "Sodium cromoglicate: mast cell stabilization",
    choice3: "Zafirlukast: leukotriene modulators",
    choice4: "Theophylline: non-selective β2 receptor stimulation causing bronchodilation",
    answer: 4
  },
  {
    question: "8.	All of the following statements about histamine is true except:",
    choice1: "Increases blood pressure",
    choice2: "Stimulates gastric acid secretion",
    choice3: "Causes dilatation of capillaries",
    choice4: "Causes constriction of bronchial smooth muscles",
    answer: 1
  },
  {
    question: "All of the following statements about antihistaminic are correct EXCEPT:",
    choice1: "Some histamine H1 receptor antagonists are used in the prophylaxis and treatment of motion sickness",
    choice2: "Promethazine possesses anti-emetic, sedative and anti-muscarinic activity",
    choice3: "Histamine H1 receptor antagonists inhibit the release of histamine",
    choice4: "Histamine H1 receptor antagonists are effective in the treatment of hay fever",
    answer: 3
  },
  {
    question: "A 45-year-old woman complains of sudden onset of a non-productive cough and shortness of breath. Examination of the chest is unremarkable. Respiratory rate = 25, Pulse = 95. T = 98.2° F. In this setting which of the following is high in your differential diagnosis:",
    choice1: "Pulmonary embolism",
    choice2: "Myocardial infarction",
    choice3: "Asthma",
    choice4: "Pneumonia",
    answer: 1
  }

];




const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questioncounter = 0;
  score = 0;
  availablequestions = [...questions];
  console.log(availablequestions);
  getquestion();
};
getquestion = () => {
  if (availablequestions.length == 0 || questioncounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostrecentscore", score);
    return window.location.assign("end.html");
  }
  questioncounter++;
  progresstext.innerText = `Question ${questioncounter}/${MAX_QUESTIONS}`;
  progressbarfull.style.width = `${(questioncounter / MAX_QUESTIONS) * 100}%`;
  const questionindex = Math.floor(Math.random() * availablequestions.length);
  currentquestion = availablequestions[questionindex];
  question.innerText = currentquestion.question;
  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentquestion['choice' + number];
  });
  availablequestions.splice(questionindex, 1);
  console.log(availablequestions);
  acceptinganswers = true;
};
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptinganswers) return;
    acceptinganswers = false;
    const selectedchoice = e.target;
    const selectedanswer = selectedchoice.dataset["number"];

    const classtoapply = selectedanswer == currentquestion.answer ? 'correct' : 'incorrect';
    if (classtoapply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedchoice.parentElement.classList.add(classtoapply);
    setTimeout(() => {
      selectedchoice.parentElement.classList.remove(classtoapply);
      getquestion();
    }, 1000);
  });
});
incrementScore = num => {
  score += num;
  scoretext.innerText = score;
};
startGame();