var scoreSec = document.getElementById("scoreboard");
var returnButt = document.getElementById("return");
var clearButt = document.getElementById("clear-scores");

function init() {
    var oldscores = JSON.parse(localStorage.getItem("scores"))
    if (!oldscores) {
        scoreSec.textContent = "No scores have been saved!"
    }
}

init();


returnButt.addEventListener("click", () => {
    window.location.href = "index.html";
})
