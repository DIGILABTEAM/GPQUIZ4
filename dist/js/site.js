
let questions = [
  {
    id: 1,
    question: "All of the followings are selective β2-agonist except:",
    answer: "aIsoprenaline",
    options: [
      "aIsoprenaline",
      "Salbutamol",
      "Terbutaline",
      "Formeterol"
    ]
  },
  {
    id: 2,
    question: "All of the following combinations of drug and its mechanism of action is correct except",
    answer: "Theophylline: non-selective β2 receptor stimulation causing bronchodilation",
    options: [
      "Salbutamol: stimulation of β2 receptor causing bronchodilation",
      "Sodium cromoglicate: mast cell stabilization",
      "Zafirlukast: leukotriene modulators",
      "Theophylline: non-selective β2 receptor stimulation causing bronchodilation"
    ]
  },
  {
    id: 3,
    question: "All of the following statements about histamine is true except:",
    answer: "Increases blood pressure",
    options: [
      "Increases blood pressure",
      "Stimulates gastric acid secretion",
      "Causes constriction of bronchial smooth muscles",
      "Causes dilatation of capillaries"
    ]
  },
  {
    id: 4,
    question: "All of the following statements about antihistaminic are correct EXCEPT:",
    answer: "Histamine H1 receptor antagonists inhibit the release of histamine",
    options: [
      "Some histamine H1 receptor antagonists are used in the prophylaxis and treatment of motion sickness",
      "Promethazine possesses anti-emetic, sedative and anti-muscarinic activity",
      "Histamine H1 receptor antagonists inhibit the release of histamine",
      "Histamine H1 receptor antagonists are effective in the treatment of hay fever"
    ]
  },
  {
    id: 5,
    question: "A 45-year-old woman complains of sudden onset of a non-productive cough and shortness of breath. Examination of the chest is unremarkable. Respiratory rate = 25, Pulse = 95. T = 98.2° F. In this setting which of the following is high in your differential diagnosis:",
    answer: "Pulmonary embolism",
    options: [
      "Pulmonary embolism",
      "Myocardial infarction",
      "Asthma",
      "Pneumonia"
    ]
  }
];

let question_count = 0;
let points = 0;

window.onload = function() {
  show(question_count);

};

function next() {

   
  // if the question is last then redirect to final page
  if (question_count == questions.length - 1) {
    sessionStorage.setItem("time", time);
    clearInterval(mytime);
    location.href = "end.html";
  }
  console.log(question_count);

  let user_answer = document.querySelector("li.option.active").innerHTML;
  // check if the answer is right or wrong
  if (user_answer == questions[question_count].answer) {
    points += 10;
    sessionStorage.setItem("points", points);
  }
  console.log(points);

  question_count++;
  show(question_count);
}

function show(count) {
  let question = document.getElementById("questions");
  let [first, second, third, fourth] = questions[count].options;

  question.innerHTML = `
  <h2>Q${count + 1}. ${questions[count].question}</h2>
   <ul class="option_group">
  <li class="option">${first}</li>
  <li class="option">${second}</li>
  <li class="option">${third}</li>
  <li class="option">${fourth}</li>
</ul> 
  `;
  toggleActive();
}

function toggleActive() {
  let option = document.querySelectorAll("li.option");
  for (let i = 0; i < option.length; i++) {
    option[i].onclick = function() {
      for (let i = 0; i < option.length; i++) {
        if (option[i].classList.contains("active")) {
          option[i].classList.remove("active");
        }
      }
      option[i].classList.add("active");
    };
  }
}
