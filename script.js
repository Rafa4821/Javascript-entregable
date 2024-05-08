
const words = ['javascript', 'html', 'funcion', 'programacion', 'web', 'github'];
let chosenWord = '';
let guessedLetters = [];
let attemptsLeft = 6;

const hangmanImages = [
  'images/hangman-0.png',
  'images/hangman-1.png',
  'images/hangman-2.png',
  'images/hangman-3.png',
  'images/hangman-4.png',
  'images/hangman-5.png',
  'images/hangman-6.png'
];

const wordContainer = document.getElementById('word-container');
const lettersContainer = document.getElementById('letters-container');
const startBtn = document.getElementById('start-btn');
const hangmanImg = document.getElementById('hangman-img');

function initializeGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  attemptsLeft = 6;
  hangmanImg.src = hangmanImages[0];
  displayWord();
  displayLetters();
  startBtn.style.display = 'none';
}

function displayWord() {
  wordContainer.innerHTML = '';
  chosenWord.split('').forEach(letter => {
    const span = document.createElement('span');
    span.textContent = guessedLetters.includes(letter) ? letter : '_';
    wordContainer.appendChild(span);
  });
}

function displayLetters() {
  lettersContainer.innerHTML = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  alphabet.split('').forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.addEventListener('click', () => handleGuess(letter));
    lettersContainer.appendChild(btn);
  });
}

function handleGuess(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    if (!chosenWord.includes(letter)) {
      attemptsLeft--;
      hangmanImg.src = hangmanImages[6 - attemptsLeft];
    }
    displayWord();
    checkGameStatus();
  }
}

function checkGameStatus() {
  if (attemptsLeft === 0) {
    alert('¡Perdiste! La palabra era: ' + chosenWord);
    initializeGame();
  } else if (!wordContainer.textContent.includes('_')) {
    alert('¡Ganaste!');
    initializeGame();
  }
}

startBtn.addEventListener('click', initializeGame);
initializeGame();
