const quizData = [
    {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Madrid"],
        "answer": "Paris"
    },
    {
        "question": "What is the capital of Germany?",
        "options": ["Berlin", "Munich", "Hamburg", "Frankfurt"],
        "answer": "Berlin"

    },
    {
        "question": "What is the capital of Italy?",
        "options": ["Rome", "Milan", "Naples", "Turin"],
        "answer": "Rome"
    },
    {
        "question": "What is the capital of Spain?",
        "options": ["Madrid", "Barcelona", "Seville", "Valencia"],
        "answer": "Madrid"
    },
    {
        "question": "What is the capital of Portugal?",
        "options": ["Lisbon", "Porto", "Braga", "Co"],
        "answer": "Lisbon"
    },
    {
        "question": "What is the capital of Greece?",
        "options": ["Athens", "Thessaloniki", "Piraeus"],
        "answer": "Athens"
    },
    {
        "question": "What is the capital of Turkey?",
        "options": ["Istanbul", "Ankara", "Izmir"],
        "answer": "Ankara"
    },
    {
        "question": "What is the capital of Poland?",
        "options": ["Warsaw", "Krakow", "Gdansk"],
        "answer": "Warsaw"
    },
    {
        "question": "What is the capital of Russia?",
        "options": ["Moscow", "St. Petersburg", "Novosibirsk"],
        "answer": "Moscow"
    },
    {
        "question": "What is the capital of Sweden?",
        "options": ["Stockholm", "Gothenburg", "Malmö"],
        "answer": "Stockholm"
    },
    {
        "question": "What is the capital of Norway?",
        "options": ["Oslo", "Bergen", "Larvik"],
        "answer": "Oslo"
    },
    {
        "question": "What is the capital of Denmark?",
        "options": ["Copenhagen", "Aarhus", "Odense"],
        "answer": "Copenhagen"
    },


];



const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const result = document.getElementById('result')
const timeLeft = document.getElementById('timeLeft');

let currentQuestionIndex = 0;
let score = 0;
let time = 10;
let timer;


function startTimer() {
    timeLeft.innerText = `Time left: ${time}s`;
    timer = setInterval(() => {
        time--;
        timeLeft.innerText = `Time left: ${time}s`;

        if (time === 0) {
            clearInterval(timer);
            moveToNext();
        }
    }, 1000);
}

function moveToNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        result.innerText = `Your current score is ${score} out of ${currentQuestionIndex +
                1}`
    }
}


function loadQuestion() {
    clearInterval(timer);
    clearState();

    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", () => selectAnswer(button));
        optionsContainer.appendChild(button);

    });

    startTimer();
}
function clearState() {
    time = 10;
    clearInterval(timer);
    timeLeft.innerText = "";
    optionsContainer.innerHTML = "";
    questionContainer.textContent = "";

}

function selectAnswer(button) {
    const currentQuestion = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll(".option")

    button.addEventListener("click", () => {
        if (button.innerText === currentQuestion.answer) {
        

            score++;


            result.innerText = `Your current score is ${score} out of ${currentQuestionIndex +
                1}`
        }
        else {
          
            result.innerText = `Your current score is ${score} out of ${currentQuestionIndex +
                1}`

        }
        nextQuestion();
        loadQuestion();
    });
}
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();

    }
    else {
        result.innerText = `Quiz finished, your final score is ${score} out of ${quizData
            .length}`;
    }

}
loadQuestion();