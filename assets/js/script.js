// Quiz data
const questions = [
    {
        question: "Commonly used data types do NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: 2
    },
    {
        question: "The condition in an if / else statement is enclosed with: _________.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: 2
    },
    
];

let currentQuestionIndex = 0;
let time = 75;
let timerInterval;

const startScreen = document.getElementById('start-screen');
const quizSection = document.getElementById('quiz-section');
const endScreen = document.getElementById('end-screen');
const highScoresScreen = document.getElementById('high-scores-screen');

const timerElement = document.getElementById('timer');
const questionTitle = document.getElementById('question-title');
const choicesList = document.getElementById('choices-list');
const feedback = document.getElementById('feedback');
const finalScore = document.getElementById('final-score');



// Start the quiz
document.getElementById('start-btn').addEventListener('click', function() {
    startScreen.classList.add('hide');
    quizSection.classList.remove('hide');
    startTimer();
    showQuestion();
});
// Show high scores on click ONLY if game has not started




// Start timer
function startTimer() {
    timerInterval = setInterval(function() {
        time--;
        timerElement.textContent = time;

        if (time <= 0) {
            endQuiz();
        }
    }, 1000);
}

// Show a question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    choicesList.innerHTML = '';

    currentQuestion.choices.forEach((choice, index) => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.setAttribute('data-index', index);
        li.classList.add('choice');
        li.addEventListener('click', checkAnswer);
        choicesList.appendChild(li);
    });
}

// Check the user's answer
function checkAnswer(event) {
    const selectedIndex = event.target.getAttribute('data-index');
    const correctIndex = questions[currentQuestionIndex].answer;

    if (parseInt(selectedIndex) === correctIndex) {
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = "Incorrect!";
        time -= 10;
    }

    setTimeout(() => {
        feedback.textContent = '';
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

// End the quiz
function endQuiz() {
    clearInterval(timerInterval);
    quizSection.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = time; // Final score is the remaining time
}

// Submit high score
document.getElementById('submit-score').addEventListener('click', function() {
    const name = document.getElementById('name-input').value;
    if (name !== '') {
        saveHighScore(name, time);
        showHighScores();
    }
});

// Save high score in local storage
function saveHighScore(name, score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ name, score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Display high scores
function showHighScores() {
    endScreen.classList.add('hide');
    highScoresScreen.classList.remove('hide');
    
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = '';

    highScores.forEach((score) => {
        const li = document.createElement('li');
        li.textContent = `${score.name} - ${score.score}`;
        highScoresList.appendChild(li);
    });
}

// Go back to start screen
document.getElementById('go-back').addEventListener('click', function() {
    highScoresScreen.classList.add('hide');
    startScreen.classList.remove('hide');
    resetQuiz();
});

// Clear high scores
document.getElementById('clear-scores').addEventListener('click', function() {
    localStorage.removeItem('highScores');
    document.getElementById('high-scores-list').innerHTML = '';
});

// Reset the quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    time = 75;
    timerElement.textContent = time;
}
