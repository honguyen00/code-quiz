var scoreSec = document.getElementById("scoreboard");
var returnButt = document.getElementById("return");
var clearButt = document.getElementById("clear-scores");

function init() {
    renderHighscores();
}

function renderHighscores() {
    var oldscores = JSON.parse(localStorage.getItem("scores"))
    if (oldscores === null) {
        scoreSec.textContent = "No scores have been saved!"
    }
    else {
        oldscores.sort((a,b) => 
        (a.score < b.score) ? 1 : (a.score > b.score) ? -1 : 0);
        oldscores.forEach((score) => {
        var scoreDiv = document.createElement("div"); 
        scoreDiv.textContent = score.name + " - " + score.score;
        scoreSec.appendChild(scoreDiv);
    })
    }
}

function deleteHighscores() {
    localStorage.removeItem("scores");
}

init();


returnButt.addEventListener("click", () => {
    window.location.href = "index.html";
})

clearButt.addEventListener("click", () => {
    deleteHighscores();
    renderHighscores();
})