// game.js

document.addEventListener("DOMContentLoaded", function() {

    // constant and variables
    const victoryCondition = 3

    let computerChoice;
    let userChoice;
    let roundWinner;
    let userTally = 0;
    let computerTally = 0;
    let drawTally = 0;

    // version 2 inputs (under construction)
    const startButton = document.getElementById('startButton');
    const button0input = document.getElementById('button0');
    const button1input = document.getElementById('button1');
    const button2input = document.getElementById('button2');
    const userSpot = document.getElementById('user_spot')
    const compSpot = document.getElementById('comp_spot')

    // input buttons disabled until game starts
    button0input.disabled = true;
    button1input.disabled = true;
    button2input.disabled = true;

    // function to overwrite to innerHTML div id alpha_output
    function overwriteContent(message, box) {
        if (box === "output_alpha") {
            const outputDiv = document.getElementById('output_alpha');
            outputDiv.innerHTML = message + '<br>';
        } else if (box === "output_beta") {
            const outputDiv = document.getElementById('output_beta');
            outputDiv.innerHTML = message + '<br>';
        } else if (box === "output_gamma_user") {
            const outputDiv = document.getElementById('output_gamma_user');
            outputDiv.innerHTML = message + '<br>';
        } else if (box === "output_gamma_comp") {
            const outputDiv = document.getElementById('output_gamma_comp');
            outputDiv.innerHTML = message + '<br>';
        } else if (box === "user_spot") {
            const outputDiv = document.getElementById('user_spot');
            outputDiv.innerHTML = message + '<br>';
        } else if (box === "comp_spot") {
            const outputDiv = document.getElementById('comp_spot');
            outputDiv.innerHTML = message + '<br>';
        } else {
            console.log('overwriteContent error')
        }
    }

    // function to start game
    function startGame() {
        message = "Game Started! Make your first choice!";
        overwriteContent(message);

        // enables the user input buttons when game starts
        button0input.disabled = false;
        button1input.disabled = false;
        button2input.disabled = false;

        // change the text of the startButton
        startButton.textContent = "Game Started"; 

        // change appearance of start button while in progress
        startButton.classList.add('button-in-progress');

        // change appearance of user buttons while in progress
        button0input.classList.add('image-buttons-play');
        button1input.classList.add('image-buttons-play');
        button2input.classList.add('image-buttons-play');

        button0input.classList.add('image-buttons-play:hover');
        button1input.classList.add('image-buttons-play:hover');
        button2input.classList.add('image-buttons-play:hover');
    }

    function playRound(choice) {

        // start the round - new round tracker
        console.log("ROUND ", userTally + computerTally + drawTally + 1)
        message = "ROUND " + (userTally + computerTally + drawTally + 1);
        box = "output_alpha"
        overwriteContent(message, box);

        // get user input
        userChoice = choice.toString();

        // computer choice 
        computerChoice = getComputerChoice();

        // display user input
        userHand(userChoice);

        // display computer input
        compHand(computerChoice);

        // determine round winner
        roundWinner = getWinner();

        // round end animation

        // get tally and add to scoreboard
        getTally();

        messageUser = "Your tally: " + (userTally);
        boxUser = "output_gamma_user";
        overwriteContent(messageUser, boxUser);
        messageComp = "Red tally: " + (computerTally);
        boxComp = "output_gamma_comp";
        overwriteContent(messageComp, boxComp);
    
        // evaluate tally for victory conditions
        if (userTally >= victoryCondition || computerTally >= victoryCondition) {
            victory();
            resetGame();
        } else {
            console.log("tally eval error")
        }
    }

    // function to get computer's choice of rock, paper, or scissors
    function getComputerChoice() {
        let choices = ["rock", "paper", "scissors"];
        let genChoice = Math.floor(Math.random() * 3); // gives 0, 1, or 2
        console.log("Computer picked: ", choices[genChoice]);

        computerChoice = genChoice.toString();
        return computerChoice;
    }

    // function to display user's choice in battle-box
    function userHand(userChoice) {
        if (userChoice === "0") {
            message = "<img src=\"imgs/b_r.png\" alt=\"Blue Rock\">";
            userSpot.innerHTML = message;
            userSpot.classList.add('hand-action');
        } else if (userChoice === "1") {
            message = "<img src=\"imgs/b_p.png\" alt=\"Blue Paper\">";
            userSpot.innerHTML = message;
            userSpot.classList.add('hand-action');
        } else if (userChoice === "2") {
            message = "<img src=\"imgs/b_s.png\" alt=\"Blue Scissors\">";
            userSpot.innerHTML = message;
            userSpot.classList.add('hand-action');
        } else {
            console.log('userHand error');
        }
    }

    // function to display computer's choice in battle-box
    function compHand(computerChoice) {
        if (computerChoice === "0") {
            message = "<img src=\"imgs/r_r.png\" alt=\"Red Rock\">";
            compSpot.innerHTML = message;
            compSpot.classList.add('hand-action');
        } else if (computerChoice === "1") {
            message = "<img src=\"imgs/r_p.png\" alt=\"Red Paper\">";
            compSpot.innerHTML = message;
            compSpot.classList.add('hand-action');
        } else if (computerChoice === "2") {
            message = "<img src=\"imgs/r_s.png\" alt=\"Red Scissors\">";
            compSpot.innerHTML= message;
            compSpot.classList.add('hand-action');
        } else {
            console.log('computerHand error');
        }
    }

    // function to determine match winner
    // 0 = rock
    // 1 = paper
    // 2 = scissors
    // 0 beats 2
    // 1 beats 0
    // 2 beats 1
    function getWinner() {

        if (computerChoice === "0" && userChoice === "2") {
            console.log("Computer wins");
            message = "Computer wins";
            box = "output_beta"
            overwriteContent(message, box);
            roundWinner = "computer";
            return roundWinner;
        } else if (computerChoice === "0" && userChoice === "1") {
            console.log("User wins");
            message = "User wins";
            box = "output_beta"
            overwriteContent(message, box);
            roundWinner = "user";
            return roundWinner;
        } else if (computerChoice === "0" && userChoice === "0") {
            console.log("Draw");
            message = "Draw";
            box = "output_beta"
            overwriteContent(message, box);
            roundWinner = "draw";
            return roundWinner;
        } else if (computerChoice === "1" && userChoice === "0") {
            console.log("Computer wins");
            message = "Computer wins";
            box = "output_beta"
            overwriteContent(message, box);
            roundWinner = "computer";
            return roundWinner;
        } else if (computerChoice === "1" && userChoice === "2") {
            console.log("User wins");
            message = "User wins";
            box = "output_beta"
            overwriteContent(message, box);
            roundWinner = "user";
            return roundWinner;
        } else if (computerChoice === "1" && userChoice === "1") {
            console.log("Draw");
            message = "Draw";
            box = "output_beta"
            overwriteContent(message, box);
            roundWinner = "draw";
            return roundWinner;
        } else if (computerChoice === "2" && userChoice === "1") {
            console.log("Computer wins");
            message = "Computer wins";
            box = "output_beta"
            overwriteContent(message, box);
            roundWinner = "computer";
            return roundWinner;
        } else if (computerChoice === "2" && userChoice === "0") {
            console.log("User wins");
            message = "User wins";
            box = "output_beta"
            overwriteContent(message, box);
            roundWinner = "user";
            return roundWinner;
        } else if (computerChoice === "2" && userChoice === "2") {
            console.log("Draw");
            message = "Draw";
            box = "output_beta"
            overwriteContent(message, box);
            roundWinner = "draw";
            return roundWinner;
        } else {
            console.error("unknown error");
        }
    }

    // a function to tally up the winner of each round
    function getTally() {
        if (roundWinner === "user") {
            userTally++;
        } else if (roundWinner === "computer") {
            computerTally++;
        } else if (roundWinner === "draw") {
            drawTally++;
        } else {
            return console.error("unknown tally error")
        }
    }

    // function to determine the victor
    function victory() {

        if (computerTally > userTally) {
            console.log("DEFEAT");
            message = "<img src=\"imgs/def.png\" alt=\"Defeat\">";
            box = "output_alpha";
            overwriteContent(message, box);

        } else if (userTally > computerTally) {
            console.log("VICTORY");
            message = "<img src=\"imgs/vict.png\" alt=\"Victory\">";
            box = "output_alpha";
            overwriteContent(message, box);

        } else {
            console.log("unknown victory error");
        }

    }

    function resetGame() {
        // ensure values are reset
        computerTally = 0;
        userTally = 0;
        drawTally = 0;

        // re-enables the start button
        startButton.disabled = false;

        // re-disables the input buttons
        button0input.disabled = true;
        button1input.disabled = true;
        button2input.disabled = true;

        // reset start button text
        startButton.textContent = "Restart";

        // return start button to normal appearance
        startButton.classList.remove('button-in-progress');

        // return play buttons to normal appearance
        button0input.classList.remove('image-buttons-play');
        button1input.classList.remove('image-buttons-play');
        button2input.classList.remove('image-buttons-play');

        button0input.classList.remove('image-buttons-play:hover');
        button1input.classList.remove('image-buttons-play:hover');
        button2input.classList.remove('image-buttons-play:hover');
    }
    
    // event listener for starting the game
    startButton.addEventListener("click", function() {
        startGame();
        this.disabled = true;
    });

    // event listener for user choice buttons
    button0input.addEventListener('click', function() {
        playRound(0);
    });
    
    button1input.addEventListener('click', function() {
        playRound(1);
    });
    
    button2input.addEventListener('click', function() {
        playRound(2);
    });

    // end of program

});
