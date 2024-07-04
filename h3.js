const questions = [
        {
        type: 'text',
        question: '1. What is the capital of Tamil nadu?',
        answer: 'Chennai'
    },
    {
        type: 'radio',
        question: '2.Which is the largest planet in our solar system?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Jupiter'
    },
    {
        type: 'checkbox',
        question: '3. Select all prime numbers:',
        options: ['2', '3', '4', '5'],
        answer: ['2', '3', '5']
    },
    {
        type: 'dropdown',
        question: '4. What is the capital of Japan?',
        options: ['Tokyo', 'Kyoto', 'Osaka', 'Nagoya'],
        answer: 'Tokyo'
    },
{
        type: 'radio',
        question: '5.How many days in a week?',
        options: ['5', '4', '7', '6'],
        answer: '7'
    },
{
        type: 'text',
        question: '6.How many months in a year?',
        options: ['23', '10', '11', '12'],
        answer: '12'
    },
{
        type: 'dropdown',
        question: '7.What is the largest lake in the world??',
        options: ['Caspian Sea', 'Baikal', 'Lake Superior', 'Ontario'],
        answer: 'Baikal'
    },

{
        type: 'radio',
        question: '8.What is the official currency of Japan??',
        options: ['Won', 'Yen', 'Yuan', 'Dollars'],
        answer: 'Yen'
    },
{
        type: 'radio',
        question: '9. Who is the captain of Indian Cricket team?',
        options: ['Dhoni', 'Rohit sharma', 'Virat kohli', 'Dravid'],
        answer: 'Yen'
    },
  {
        type: 'radio',
        question: '10. Who is the Director of Indian 2 ?',
        options: ['Shankar', 'Atlee', 'Raja mouli', 'karthick subburaj'],
        answer: 'Shankar'
    },
];
let currentPage = 0;
const questionsPerPage = 5;
let timer; 

function displayQuestions(page) {
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
    document.getElementById('quiz-container').style.display = 'none'; // Hide the quiz form
}

function closePopup() {
    document.getElementById('score-popup').classList.add('hidden');
}

let timeLeft = 300;

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
    displayQuestions(currentPage);
    startTimer();
};
