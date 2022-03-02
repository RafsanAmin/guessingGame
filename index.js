//made by HRM Rafsan Amin
var limA = { '100': 0, '50': 1, '20': 2 };
var trA = { '10': 0, '1': 1, '5': 2, '20': 3 };
var limit;
var guessedNumber;
var min;
var max;
var tries;
var maxTries;
var gameOver;
//functions
var setSpan = function () {
    document.querySelector('#s').innerHTML = min + " - " + max;
};
var setStatus = function (msg) {
    document.getElementById('st').innerHTML = msg;
};
var setHighScore = function (score) {
    var ls = localStorage.getItem('hs');
    var hs = Math.max(score || 0, Number(ls)).toString();
    localStorage.setItem('hs', hs);
    document.getElementById('hs').innerHTML = 'Your High score is: ' + hs;
};
var reset = function (l, mt) {
    if (!localStorage.getItem('lim') || !localStorage.getItem('tr')) {
        localStorage.setItem('lim', '100');
        localStorage.setItem('tr', '10');
    }
    var lim = localStorage.getItem('lim');
    var tr = localStorage.getItem('tr');
    limit = l || Number(lim);
    guessedNumber = Math.ceil(Math.random() * limit);
    min = 0;
    max = limit;
    tries = 0;
    maxTries = mt || Number(tr);
    gameOver = false;
    setSpan();
    setStatus("Max " + maxTries + " tries");
    document
        .querySelector('#lim')
        .children[limA[lim] || 0].setAttribute('selected', 'true');
    document
        .querySelector('#tr')
        .children[trA[tr] || 0].setAttribute('selected', 'true');
    console.log(guessedNumber);
};
var checkGuess = function () {
    var inputValue = Number(document.querySelector('#in').value);
    tries++;
    var left = ' Total Left ' + (maxTries - tries) + ' Tries';
    if (gameOver) {
        setStatus('Game is Over!! ⚠️ Click on reset!');
    }
    else if (tries >= maxTries && inputValue !== guessedNumber) {
        setStatus('Wrong!! ❌ Wrong Input. Answer was ' + guessedNumber);
        alert('Game Over!!');
        gameOver = true;
    }
    else {
        if (inputValue === guessedNumber) {
            var score = Math.ceil((maxTries - tries + 1) * 100 * Math.pow(maxTries, -1)) + (20 - maxTries);
            setStatus('Right!!✅' + '. Your score is: ' + score);
            setHighScore(score);
            gameOver = true;
        }
        else if (inputValue < min || inputValue > max || inputValue === NaN) {
            setStatus('Wrong!! ❌ Out of Limit ' + left);
        }
        else if (inputValue < guessedNumber) {
            setStatus('Wrong!! ❌' + left);
            min = Math.max(inputValue, min);
            setSpan();
        }
        else if (inputValue > guessedNumber) {
            setStatus('Wrong!! ❌' + left);
            max = Math.min(inputValue, max);
            setSpan();
        }
        else {
            setStatus('Wrong!! ❌ Wrong Input' + left);
        }
    }
};
//event listeners
document.querySelector('#lim').addEventListener('change', function () {
    reset(Number(this.value));
    localStorage.setItem('lim', this.value);
});
document.querySelector('#tr').addEventListener('change', function () {
    reset(null, Number(this.value));
    localStorage.setItem('tr', this.value);
});
document.querySelector('#btn').addEventListener('click', checkGuess);
window.addEventListener('load', function () {
    reset();
    setHighScore();
    setStatus("Max " + maxTries + " tries");
    setSpan();
});
