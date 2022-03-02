//made by HRM Rafsan Amin
const limA = { '100': 0, '50': 1, '20': 2 };
const trA = { '10': 0, '1': 1, '5': 2, '20': 3 };

let limit: number;
let guessedNumber: number;
let min: number;
let max: number;
let tries: number;
let maxTries: number;
let gameOver: boolean;
//functions
const setSpan = () => {
  document.querySelector('#s').innerHTML = `${min} - ${max}`;
};
const setStatus = (msg: string) => {
  document.getElementById('st').innerHTML = msg;
};
const setHighScore = (score?: number) => {
  let ls = localStorage.getItem('hs');
  let hs = Math.max(score || 0, Number(ls)).toString();
  localStorage.setItem('hs', hs);
  document.getElementById('hs').innerHTML = 'Your High score is: ' + hs;
};
const reset = (l?: number, mt?: number) => {
  let lim = localStorage.getItem('lim');
  let tr = localStorage.getItem('tr');
  limit = l || Number(lim);
  guessedNumber = Math.ceil(Math.random() * limit);
  min = 0;
  max = limit;
  tries = 0;
  maxTries = mt || Number(tr);
  gameOver = false;
  setSpan();
  setStatus(`Max ${maxTries} tries`);
  document
    .querySelector<HTMLSelectElement>('#lim')
    .children[limA[lim]].setAttribute('selected', 'true');
  document
    .querySelector<HTMLSelectElement>('#tr')
    .children[trA[tr]].setAttribute('selected', 'true');
  console.log(guessedNumber);
};
const checkGuess = () => {
  let inputValue: number = Number(document.querySelector<HTMLInputElement>('#in').value);
  tries++;
  let left = ' Total Left ' + (maxTries - tries) + ' Tries';
  if (gameOver) {
    setStatus('Game is Over!! ⚠️ Click on reset!');
  } else if (tries >= maxTries && inputValue !== guessedNumber) {
    setStatus('Wrong!! ❌ Wrong Input. Answer was ' + guessedNumber);
    alert('Game Over!!');
    gameOver = true;
  } else {
    if (inputValue === guessedNumber) {
      let score = Math.ceil((maxTries - tries + 1) * 100 * maxTries ** -1) + (20 - maxTries);
      setStatus('Right!!✅' + '. Your score is: ' + score);
      setHighScore(score);
      gameOver = true;
    } else if (inputValue < min || inputValue > max || inputValue === NaN) {
      setStatus('Wrong!! ❌ Out of Limit ' + left);
    } else if (inputValue < guessedNumber) {
      setStatus('Wrong!! ❌' + left);
      min = Math.max(inputValue, min);
      setSpan();
    } else if (inputValue > guessedNumber) {
      setStatus('Wrong!! ❌' + left);
      max = Math.min(inputValue, max);
      setSpan();
    } else {
      setStatus('Wrong!! ❌ Wrong Input' + left);
    }
  }
};

//event listeners
document.querySelector<HTMLSelectElement>('#lim').addEventListener('change', function () {
  reset(Number(this.value));
  localStorage.setItem('lim', this.value);
});
document.querySelector<HTMLSelectElement>('#tr').addEventListener('change', function () {
  reset(null, Number(this.value));
  localStorage.setItem('tr', this.value);
});

document.querySelector('#btn').addEventListener('click', checkGuess);
window.addEventListener('load', () => {
  reset();
  setHighScore();
  setStatus(`Max ${maxTries} tries`);
  setSpan();
});
