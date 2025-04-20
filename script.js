let workMinutes = 25, seconds = 0;
let timerInterval, quoteInterval;
let isRunning = false;

const quotes = [
  "Stay focused king/queen 👑",
  "Every effort counts 💪",
  "Small steps lead to big changes 🚀",
  "Believe in yourself 🌟",
  "Discipline > Motivation 🎯",
  "Winners never quit 🔥",
  "Progress over perfection 📈"
];

const memes = [
  "https://i.imgflip.com/4/4t0m5.jpg",
  "https://i.imgflip.com/1bij.jpg",
  "https://i.imgflip.com/26am.jpg",
  "https://i.imgflip.com/30b1gx.jpg",
  "https://i.imgflip.com/3si4.jpg"
];

let streak = parseInt(localStorage.getItem('streak')) || 0;
let level = Math.floor(streak / 5) + 1;
document.getElementById('streak').innerText = streak;
document.getElementById('level').innerText = level;

function updateDisplay() {
  const min = String(workMinutes).padStart(2, '0');
  const sec = String(seconds).padStart(2, '0');
  document.getElementById('timer').innerText = `${min}:${sec}`;
}

function startTimer() {
  if (isRunning) return;
  document.getElementById('startSound').play();
  isRunning = true;

  timerInterval = setInterval(() => {
    if (seconds === 0) {
      if (workMinutes === 0) {
        clearInterval(timerInterval);
        clearInterval(quoteInterval);
        isRunning = false;
        sessionCompleted();
      } else {
        workMinutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);

  // Random quote every 5 minutes
  quoteInterval = setInterval(() => {
    randomQuote();
  }, 300000);
}

function resetTimer(resetQuote = true) {
  clearInterval(timerInterval);
  if (resetQuote) clearInterval(quoteInterval);
  isRunning = false;
  workMinutes = 0;
  seconds = 5;
  updateDisplay();
}

function randomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteArea').innerText = quote;
  document.getElementById('quoteSound').play();
}

function sessionCompleted() {
  document.getElementById('endSound').play();
  randomQuote();
  const meme = memes[Math.floor(Math.random() * memes.length)];
  document.getElementById('memeArea').innerHTML = `<img src="${meme}" alt="Meme">`;
  streak++;
  localStorage.setItem('streak', streak);
  level = Math.floor(streak / 5) + 1;
  document.getElementById('streak').innerText = streak;
  document.getElementById('level').innerText = level;
  resetTimer(false);

  // Confetti Celebration
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function confirmQuit() {
  document.getElementById('confirmModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('confirmModal').style.display = 'none';
}

function quitConfirmed() {
  streak = 0;
  localStorage.setItem('streak', streak);
  document.getElementById('streak').innerText = 0;
  document.getElementById('level').innerText = 1;
  resetTimer();
  closeModal();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}
