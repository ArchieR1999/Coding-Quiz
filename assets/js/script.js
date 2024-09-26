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
    {
        question: "Arrays in JavaScript can be used to store _________.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: 3
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: 3
    }
];

let currentQuestionIndex = 0;
let time = 76;
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
// Show high scores on click BUT ALSO WORKS WHEN THE GAME BEGINS SO THAT MUST BE CHANGED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// document.getElementById('view-high-scores').addEventListener('click', function() {
//     if ()
//     startScreen.classList.add('hide');
//     showHighScores();
// });



// Start timer
function startTimer() {
    // Run the countdown logic immediately
    time--;
    timerElement.textContent = time;

    // Then set the interval to continue every second
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
    // Final score is the remaining time
    finalScore.textContent = time;
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
    time = 76;
    timerElement.textContent = 0;
}
