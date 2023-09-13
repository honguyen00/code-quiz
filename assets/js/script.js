var startButt = document.getElementById("start");
var timeSpan = document.getElementById("countdown-time");
var main = document.getElementById("main");
var mainSec = document.getElementById("main-section");
var time;
var timer;
var currentQues = 0;

// Declare all the questions and put them in an array called "questionPool"
const question1 = {
    question: "Commonly used data types DO NOT include:",
    answer: ["1. strings", "2. booleans", "3. alerts", "4. number"],
    right: function () {
        return this.answer[2];
    }
}

const question2 = {
    question: "The condition in an if/else statement is enclosed within _____.",
    answer: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    right: function () {
        return this.answer[2];
    }
}

const question3 = {
    question: "Arrays in JavaScript can be used to store _____.",
    answer: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    right: function () {
        return this.answer[3];
    }
}

const question4 = {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    answer: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    right: function () {
        return this.answer[2];
    }
}

const question5 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
    right: function () {
        return this.answer[3];
    }
}

const questionPool = [question1, question2, question3, question4, question5];

// function for when the "start" button is clicked and begin game
function startgame(event) {
    time = 60;
    isIngame = true;
    mainSec.setAttribute("class", "hidden");
    renderQuestion(questionPool[currentQues]);
    startTimer()
}

// function for the timer
function startTimer() {
    timer = setInterval(function() {
        timeSpan.textContent = time;
        if (time <= 0) {
            deleteContent();
            saveHighscores();
            clearInterval(timer);
        }
        else {
            time--;
        }
    }, 1000);
}

// function for displaying the question to the screen
function renderQuestion(obj) {
    var quesEl = document.createElement("h2");
    quesEl.textContent = obj.question;
    main.appendChild(quesEl);
    for (var i=0; i<obj.answer.length; i++) {
        var ansButt = document.createElement("button");
        ansButt.textContent = obj.answer[i];
        ansButt.setAttribute("class", "answer");
        main.appendChild(ansButt);
    }
}

// function for deleting all child elements from main
function deleteContent() {
    var first = main.firstElementChild;
    while (first) {
        first.remove();
        first = main.firstElementChild;
    }
}

// function for displaying the result after an answer is chosen
function displayResult(str) {
    var notification = document.createElement("div");
    notification.textContent = str;
    notification.setAttribute("class", "noti");
    main.appendChild(notification);
    setTimeout(()=> {
        notification.setAttribute("class", "hidden");
    }, 1500)
}

// function for handling when a button is clicked
function clickButton(event) {
    // if the button is for chosing an answer
    if (event.target.matches("button[class='answer']")) {
        var result;
        deleteContent();  
        var choosen = event.target.textContent;
        if (choosen != questionPool[currentQues].right()) {
            if (time >= 10) {
                time -= 10;
            } else {
                time = 0;
            }
            result = "Wrong!"
        }
        else {
            result = "Correct!"
        }
        currentQues++; 
        // if there are still questions to render and time not finish, show question
        if (currentQues < questionPool.length && time > 0) {
            renderQuestion(questionPool[currentQues]);
        }
        // else no more question or time runs out, finish game 
        else {
            clearInterval(timer);
            timeSpan.textContent = time;
            saveHighscores();
        }
        displayResult(result);
    }
    // if the button is for submiting score
    if (event.target.matches("button[class='submit']")) {
        event.preventDefault();
        storeScores();
    }
}

// function for showing the form to store your score
function saveHighscores() { 
    var text1 = document.createElement("h2");
    text1.textContent = "Challenge's over!";
    var text2 = document.createElement("p");
    text2.textContent = "Your final score is " + (time) + ".";
    var text3 = document.createElement("label");
    var form = document.createElement("form")
    text3.textContent = "Enter initials: "
    var inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("required", "");
    var submitName = document.createElement("button");
    submitName.textContent = "Submit";
    submitName.setAttribute("class", "submit")
    form.appendChild(text3);
    form.appendChild(inputName);
    form.appendChild(submitName);
    var arr = [text1, text2, form];
    for (var i=0; i<arr.length; i++) {
        main.appendChild(arr[i]);
    }
 }

// function for when users submit their score with their initials
function storeScores() {
    var username = main.children[2].children[1].value.trim();
    console.log(username);
    if (username != "") {
        deleteContent();
        username = username.toUpperCase();
        var highscore = {name: username, score: time}; 
        var oldscores = localStorage.getItem("scores");
        var allscores = [];
        if (!oldscores) {
            allscores.unshift(highscore);
        } else {
            var newscores = JSON.parse(oldscores)
            newscores.unshift(highscore);
            allscores = newscores;
        }
        localStorage.setItem("scores", JSON.stringify(allscores));  
        showHighscores();
    } else {
        window.alert("You must include your initials to save score!")
    }
    mainSec.setAttribute("class", "show");
}

// funtion for switching to scoreboard screen
function showHighscores() {
    window.location.href = 'highscore.html';
}

// event listener
startButt.addEventListener("click", startgame);
main.addEventListener("click", clickButton);

