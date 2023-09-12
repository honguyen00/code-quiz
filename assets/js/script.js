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
    time = 50;
    isIngame = true;
    mainSec.setAttribute("class", "hidden");
    renderQuestion(questionPool[currentQues]);
    startTimer()
}

function startTimer() {
    timer = setInterval(function() {
        timeSpan.textContent = time;
        time--;
        if (time < 0) {
            saveHighscores();
            clearInterval(timer);
        }
    }, 1000);
}

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

function deleteContent() {
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

// function clickButton(event) {
//     if (event.target.matches("button[class='answer']")) {
//         deleteContent();
//         if (currentQues < questionPool.length-1) {
//             var choosen = event.target.textContent;
//             currentQues++;
//             renderQuestion(questionPool[currentQues]);
//         } else {
//             clearInterval(timer);
//         }
//         if (choosen === questionPool[currentQues-1].right()) {
//             displayResult("Correct!");
//         } else {
//             displayResult("Wrong!");
//             time -= 10;
//         }
//     }
// }

function clickButton(event) {
    if (event.target.matches("button[class='answer']")) {
        deleteContent();  
        var choosen = event.target.textContent;
        currentQues++; 
        // if there are still questions to render and time not finish, show question
        if (currentQues < questionPool.length && time > 0) {
            renderQuestion(questionPool[currentQues]);
        }
        // else no more question, finish game 
        else {
            clearInterval(timer);
            saveHighscores();
        }
        if (choosen === questionPool[currentQues-1].right()) {
            displayResult("Correct!");
        } else {
            displayResult("Wrong!");
            if (time > 10) {
                time -= 10;
            } else {
                time = 0;
            }
        }
    }
    if (event.target.matches("button[class='name']")) {
        storeScores();
    }
}

function saveHighscores() {
    var text1 = document.createElement("h2");
    text1.textContent = "Challenge's over!";
    var text2 = document.createElement("p");
    text2.textContent = "Your final score is " + (time+1) + ".";
    var text3 = document.createElement("label");
    text3.textContent = "Enter initials: "
    var inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    var submitName = document.createElement("button");
    submitName.textContent = "Submit";
    submitName.setAttribute("class", "name")
    var arr = [text1, text2, text3, inputName, submitName];
    for (var i=0; i<arr.length; i++) {
        main.appendChild(arr[i]);
    }
 }

function storeScores() {
    console.log(main.children()); 
}

function getstoredScores() {

}



startButt.addEventListener("click", startgame);
main.addEventListener("click", clickButton);