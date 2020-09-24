var scores, roundScore, diceOne, diceTwo, activePlayer, activeGame, winScore;

newGame();

document.querySelector('.btn-roll').addEventListener('click', rollDice);


//Function sets up the next player

function nextPlayer() {

    totalScore = 0;
    activePlayer = (activePlayer === 0) ? 1 : 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    var diceDOM = document.querySelectorAll('.img-dice');
    diceDOM[0].style.display = 'none';
    diceDOM[1].style.display = 'none';

}

//Function sets up the new game

function newGame() {

    scores = [0, 0];
    totalScore = 0;
    activePlayer = 0;
    activeGame = true;
    winScore = 20;

    var diceDOM = document.querySelectorAll('.img-dice');
    diceDOM[0].style.display = 'none';
    diceDOM[1].style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.getElementById('player-id-0').classList.remove('winner-detail');
    document.getElementById('player-id-1').classList.remove('winner-detail');
    document.getElementById('player-id-0').textContent = 'Player 1';
    document.getElementById('player-id-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('win-score').readOnly = false;
    document.getElementById("win-score").style.outline = "thin solid rgb(10,0,0)";
    document.getElementById("win-score").style.backgroundColor = "white";
    document.getElementById('win-score').value = "";

};


//Function to roll Dice

function rollDice() {

    if (activeGame) {
        diceOne = Math.floor(Math.random() * 6) + 1;
        diceTwo = Math.floor(Math.random() * 6) + 1;

        var diceDOM = document.querySelectorAll('.img-dice');
        diceDOM[0].style.display = 'block';
        diceDOM[1].style.display = 'block';
        diceDOM[0].src = 'img/dice-' + diceOne + '.png';
        diceDOM[1].src = 'img/dice-' + diceTwo + '.png';

        if (diceOne === diceTwo) {
            setTimeout(function () {
                nextPlayer();
            }, 1000);
        } else {
            totalScore += diceOne;
            totalScore += diceTwo;
            document.getElementById('current-' + activePlayer).textContent = totalScore;
        }
    }
}



//Function to Hold the score

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (activeGame) {
        scores[activePlayer] += totalScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] < winScore) {
            nextPlayer();
        } else {
            document.getElementById('player-id-' + activePlayer).textContent = 'WINNER !';
            document.getElementById('player-id-' + activePlayer).classList.add('winner-detail');
            var diceDOM = document.querySelectorAll('.img-dice');
            diceDOM[0].style.display = 'none';
            diceDOM[1].style.display = 'none';

            activeGame = false;
        }
    }

});


//Getting Winning Score from User

function disableWinScore() {
    document.getElementById('win-score').readOnly = true;
    document.getElementById("win-score").style.outline = "none";
    document.getElementById("win-score").style.backgroundColor = "rgb(255,185,184)";
}

document.getElementById('win-score').addEventListener('input', function (event) {

    if (event.target.value > winScore) {
        winScore = event.target.value;
        disableWinScore();
    } else {
        document.getElementById("win-score").style.outline = " medium solid red";
    }
});

document.getElementById('win-score').addEventListener('focusout', function (event) {
    if (event.target.value < winScore && event.target.value != "") {
        document.getElementById('win-score').value = winScore;
        disableWinScore();
    }
});