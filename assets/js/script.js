var startButt = document.getElementById("start");
var timeSpan = document.getElementById("countdown-time");
var main = document.getElementById("main");
var mainSec = document.getElementById("main-section");
var isIngame = false;
var time;
var timer;
var currentQues = 0;

const question1 = {
    id: 1,
    question: "Commonly used data types DO NOT include:",
    answer: ["1. strings", "2. booleans", "3. alerts", "4. number"],
    right: function () {
        return this.answer[2];
    }
}

const question2 = {
    id: 2,
    question: "The condition in an if/else statement is enclosed within _____.",
    answer: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    right: function () {
        return this.answer[2];
    }
}

const question3 = {
    id: 3,
    question: "Arrays in JavaScript can be used to store _____.",
    answer: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    right: function () {
        return this.answer[3];
    }
}

const question4 = {
    id: 4,
    question: "String values must be enclosed within _____ when being assigned to variables.",
    answer: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    right: function () {
        return this.answer[2];
    }
}

const question5 = {
    id: 5,
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
    right: function () {
        return this.answer[3];
    }
}

const questionPool = [question1, question2, question3, question4, question5];

function startgame() {
    time = 90;
    isIngame = true;
    mainSec.setAttribute("class", "hidden");
    renderQuestion(questionPool[currentQues]);
    startTimer()
}

function startTimer() {
    timer = setInterval(function() {
        timeSpan.textContent = time;
        time--;
    }, 1000);
}

function renderQuestion(obj) {
    var quesEl = document.createElement("h2");
    quesEl.textContent = obj.question;
    main.appendChild(quesEl);
    for (var i=0; i<obj.answer.length; i++) {
        var ansButt = document.createElement("button");
        ansButt.textContent = obj.answer[i];
        ansButt.addEventListener("click", clickAnswer);
        main.appendChild(ansButt);
    }
}

function deleteQuestion() {
    var first = main.firstElementChild;
    while (first) {
        first.remove();
        first = main.firstElementChild;
    }
}

function displayResult(str) {
    var notification = document.createElement("div");
    notification.textContent = str
    notification.setAttribute("class", "noti");
    main.appendChild(notification);
    setTimeout(()=> {
        notification.setAttribute("class", "hidden");
    }, 1000)
}

function clickAnswer(event) {
    if (currentQues < questionPool.length) {
        var choosen = event.target.textContent;
        console.log(choosen);
        deleteQuestion();
        currentQues++;
        renderQuestion(questionPool[currentQues]);
    } else {
        deleteQuestion();
    }
    if (choosen === questionPool[currentQues-1].right()) {
        displayResult("Correct!");
    } else {
        displayResult("Wrong!");
        time -= 10;
    }
}


startButt.addEventListener("click", startgame)