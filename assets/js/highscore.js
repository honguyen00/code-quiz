var scoreSec = document.getElementById("scoreboard");
var returnButt = document.getElementById("return");
var clearButt = document.getElementById("clear-scores");

// colors pool
const colors = ["#eb8334", "#5c34eb", "#39d4d4", "#db2e82", "#1d7519", "#d9403b", "#b3921e", "#526907", "#07691c",
"#045935", "#042259", "#170469", "#3d0469", "#690431", "#690404"]

// function run everytime highscore.html is open
function init() {
    renderHighscores();
}

// function for displaying the scores to the screen
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
        scoreDiv.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        scoreSec.appendChild(scoreDiv);
    })
    }
}

// function to delete all stored scores
function deleteHighscores() {
    localStorage.removeItem("scores");
}

init();

// event listener
returnButt.addEventListener("click", () => {
    window.location.replace = "index.html";
})

clearButt.addEventListener("click", () => {
    deleteHighscores();
    renderHighscores();
})
