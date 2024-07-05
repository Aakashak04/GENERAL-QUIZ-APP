let questions = [];
let currentPage = 0;
const questionsPerPage = 5;
let timer;

async function loadQuestions() {
    try {
        console.log('Fetching questions from JSON...');
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        questions = data.questions;
        console.log('Questions loaded:', questions);
        displayQuestions(currentPage);
        startTimer();
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

function displayQuestions(page) {
    console.log('Displaying questions for page:', page);
    const quizForm = document.getElementById('quiz-form');
    quizForm.innerHTML = '';
    const start = page * questionsPerPage;
    const end = start + questionsPerPage;
    const pageQuestions = questions.slice(start, end);

    pageQuestions.forEach((q, index) => {
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question');

        const questionTitle = document.createElement('p');
        questionTitle.textContent = q.question;
        questionContainer.appendChild(questionTitle);

        if (q.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `question${start + index}`;
            questionContainer.appendChild(input);
        } else if (q.type === 'radio') {
            q.options.forEach(option => {
                const label = document.createElement('label');
                label.textContent = option;

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question${start + index}`;
                input.value = option;

                label.appendChild(input);
                questionContainer.appendChild(label);
            });
        } else if (q.type === 'checkbox') {
            q.options.forEach(option => {
                const label = document.createElement('label');
                label.textContent = option;

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = `question${start + index}`;
                input.value = option;

                label.appendChild(input);
                questionContainer.appendChild(label);
            });
        } else if (q.type === 'dropdown') {
            const select = document.createElement('select');
            select.name = `question${start + index}`;

            q.options.forEach(option => {
                const optionElem = document.createElement('option');
                optionElem.value = option;
                optionElem.textContent = option;
                select.appendChild(optionElem);
            });

            questionContainer.appendChild(select);
        }

        quizForm.appendChild(questionContainer);
    });

    document.getElementById('prev-btn').style.display = page === 0 ? 'none' : 'inline-block';
    document.getElementById('next-btn').style.display = (page + 1) * questionsPerPage >= questions.length ? 'none' : 'inline-block';
}

function nextPage() {
    if ((currentPage + 1) * questionsPerPage < questions.length) {
        currentPage++;
        displayQuestions(currentPage);
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayQuestions(currentPage);
    }
}

function submitQuiz() {
    clearInterval(timer);

    let score = 0;

    questions.forEach((q, index) => {
        const inputName = `question${index}`;
        if (q.type === 'text') {
            const input = document.querySelector(`input[name="${inputName}"]`);
            if (input && input.value.trim().toLowerCase() === q.answer.toLowerCase()) {
                score++;
            }
        } else if (q.type === 'radio') {
            const input = document.querySelector(`input[name="${inputName}"]:checked`);
            if (input && input.value === q.answer) {
                score++;
            }
        } else if (q.type === 'checkbox') {
            const inputs = document.querySelectorAll(`input[name="${inputName}"]:checked`);
            const selectedValues = Array.from(inputs).map(input => input.value);
            if (JSON.stringify(selectedValues.sort()) === JSON.stringify(q.answer.sort())) {
                score++;
            }
        } else if (q.type === 'dropdown') {
            const select = document.querySelector(`select[name="${inputName}"]`);
            if (select && select.value === q.answer) {
                score++;
            }
        }
    });

    document.getElementById('score').textContent = `${score} / ${questions.length}`;
    document.getElementById('score-popup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('score-popup').classList.add('hidden');
}

let timeLeft = 300; // 5 minutes in seconds

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        } else {
            document.getElementById('time-left').textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);
}

window.onload = () => {
    loadQuestions();
};
