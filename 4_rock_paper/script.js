let Rock = document.getElementById("Rock")
let Paper = document.getElementById("Paper")
let Scissor = document.getElementById("Scissor")
let Tie = document.getElementById("Tie")
let PlayerScore = document.getElementById("PlayerScore")
let ComputerScore = document.getElementById("CompScore")
let PlayerChoice = document.getElementById("PlayerChoice")
let ComputerChoice = document.getElementById("CompChoice")


let playerScore = 0;
let computerScore = 0;
let tie = 0;



Rock.addEventListener("click", () => playGame("Rock"));
Paper.addEventListener("click", () => playGame("Paper"));
Scissor.addEventListener("click", () => playGame("Scissor"));


// function to play the game
function playGame(playerSelection) {
    PlayerChoice.innerText = ("Player Choice: " + playerSelection);
    let computerChoice = Math.floor(Math.random() * 3) + 1;
    if (computerChoice == 1) {
        computerChoice = "Rock";
    } else if (computerChoice == 2) {
        computerChoice = "Paper";
    } else {
        computerChoice = "Scissor";
    }
    ComputerChoice.innerText =("Computer chose: " + computerChoice);
  


    // switch statement to determine the winner
    if (playerSelection === computerChoice) {
        tie++;
       Tie.innerText = ("Tie Score : " + tie);
    } else if (
        (playerSelection === "Rock" && computerChoice === "Scissor") ||
        (playerSelection === "Paper" && computerChoice === "Rock") ||
        (playerSelection === "Scissor" && computerChoice === "Paper")
    ) {
        playerScore++;
        PlayerScore.innerText = ("Your score: " + playerScore);
    } else {
        computerScore++;
       ComputerScore.innerText = ("Computer score: " + computerScore);
       
    }
}




