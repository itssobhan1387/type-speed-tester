const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
    "JavaScript is a programming language that allows you to implement complex features on web pages. Every time a web page does more than just sit there and display static information for you to look at.",
    "Modern web development requires a good understanding of HTML, CSS, and JavaScript. These three technologies work together to create beautiful and interactive web applications.",
    "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It helps catch errors early in development.",
    "The best way to learn programming is by doing. Practice makes perfect, and consistent effort leads to mastery of any skill, including coding."
];

const textToType = document.getElementById('text-to-type');
const inputArea = document.getElementById('input-area');
const wpmDisplay = document.getElementById('wpm');
const timeDisplay = document.getElementById('time');
const accuracyDisplay = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');

let timer;
let timeLeft = 60;
let isTyping = false;
let currentText = '';
let correctChars = 0;
let totalChars = 0;

function init() {
    timeLeft = 60;
    isTyping = false;
    correctChars = 0;
    totalChars = 0;
    inputArea.value = '';
    inputArea.disabled = false;
    inputArea.focus();
    currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textToType.textContent = currentText;
    wpmDisplay.textContent = '0';
    timeDisplay.textContent = timeLeft;
    accuracyDisplay.textContent = '0';
    clearInterval(timer);
}

function startTest() {
    if (!isTyping) {
        isTyping = true;
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                endTest();
            }
        }, 1000);
    }
}

function endTest() {
    isTyping = false;
    clearInterval(timer);
    inputArea.disabled = true;
    const words = inputArea.value.trim().split(/\s+/).length;
    const wpm = Math.round((words / (60 - timeLeft)) * 60);
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
}

function checkAccuracy() {
    const inputText = inputArea.value;
    let correct = 0;
    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] === currentText[i]) {
            correct++;
        }
    }
    correctChars = correct;
    totalChars = inputText.length;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    accuracyDisplay.textContent = accuracy;
    const words = inputText.trim().split(/\s+/).length;
    const timeElapsed = 60 - timeLeft;
    const wpm = timeElapsed > 0 ? Math.round((words / timeElapsed) * 60) : 0;
    wpmDisplay.textContent = wpm;
}

inputArea.addEventListener('input', () => {
    if (!isTyping) {
        startTest();
    }
    checkAccuracy();
});

restartBtn.addEventListener('click', init);

init();