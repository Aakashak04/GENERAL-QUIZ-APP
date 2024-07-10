let questions = [
    {
        "question": "1. What is Java?",
        "type": "radio",
        "options": ["A programming language", "A coffee brand", "A type of dance", "A car model"],
        "answer": "A programming language"
    },
    {
        "question": "2. Which company developed Java?",
        "type": "dropdown",
        "options": ["Microsoft", "Apple", "Sun Microsystems", "IBM"],
        "answer": "Sun Microsystems"
    },
    {
        "question": "3. Select the primitive data types in Java:",
        "type": "checkbox",
        "options": ["int", "String", "boolean", "List"],
        "answer": ["int", "boolean"]
    },
    {
        "question": "4. What does JVM stand for?",
        "type": "text",
        "answer": "Java Virtual Machine"
    },
    {
        "question": "5. Which of these is not a Java feature?",
        "type": "radio",
        "options": ["Object-oriented", "Use of pointers", "Portable", "Dynamic"],
        "answer": "Use of pointers"
    },
    {
        "question": "6. Which keyword is used to define a subclass in Java?",
        "type": "dropdown",
        "options": ["extends", "implements", "inherits", "subclass"],
        "answer": "extends"
    },
    {
        "question": "7. Which of the following is not a valid access modifier in Java?",
        "type": "radio",
        "options": ["public", "private", "protected", "final"],
        "answer": "final"
    },
    {
        "question": "8. What is the default value of a boolean variable in Java?",
        "type": "radio",
        "options": ["true", "false", "0", "null"],
        "answer": "false"
    },
    {
        "question": "9. Which method is used to start a thread in Java?",
        "type": "dropdown",
        "options": ["run()", "execute()", "start()", "begin()"],
        "answer": "start()"
    },
    {
        "question": "10. Select all valid ways to create a String object in Java:",
        "type": "checkbox",
        "options": ["new String()", "String literal", "String()", "new StringBuilder()"],
        "answer": ["new String()", "String literal"]
    },
    {
        "question": "11. What is the size of an int variable in Java?",
        "type": "radio",
        "options": ["16 bits", "32 bits", "64 bits", "128 bits"],
        "answer": "32 bits"
    },
    {
        "question": "12. Which of the following is not a type of loop in Java?",
        "type": "dropdown",
        "options": ["for", "while", "do-while", "repeat"],
        "answer": "repeat"
    },
    {
        "question": "13. How many catch blocks can be associated with one try block in Java?",
        "type": "text",
        "answer": "multiple"
    },
    {
        "question": "14. Which of the following is used to handle exceptions in Java?",
        "type": "radio",
        "options": ["try", "catch", "finally", "All of the above"],
        "answer": "All of the above"
    },
    {
        "question": "15. Select the keywords used for synchronization in Java:",
        "type": "checkbox",
        "options": ["synchronized", "volatile", "atomic", "transient"],
        "answer": ["synchronized", "volatile"]
    },
    {
        "question": "16. What is the parent class of all classes in Java?",
        "type": "text",
        "answer": "Object"
    },
    {
        "question": "17. Which package contains the String class?",
        "type": "radio",
        "options": ["java.util", "java.io", "java.lang", "java.net"],
        "answer": "java.lang"
    },
    {
        "question": "18. Which of the following statements are true about interfaces in Java?",
        "type": "checkbox",
        "options": ["Interfaces can contain method implementations.", "Interfaces can extend multiple interfaces.", "Interfaces can be instantiated.", "Interfaces can contain constants."],
        "answer": ["Interfaces can extend multiple interfaces.", "Interfaces can contain constants."]
    },
    {
        "question": "19. Which of these is a valid constructor for a class named 'Person'?",
        "type": "dropdown",
        "options": ["Person()", "void Person()", "public void Person()", "None of the above"],
        "answer": "Person()"
    },
    {
        "question": "20. What does the 'final' keyword mean when applied to a variable?",
        "type": "radio",
        "options": ["The variable cannot be changed.", "The variable is thread-safe.", "The variable is private.", "The variable is volatile."],
        "answer": "The variable cannot be changed."
    }
];

let currentPage = 0;
const questionsPerPage = 5;
let userAnswers = {};
let timer;

function loadQuestions() {
    displayQuestions(currentPage);
    startTimer();
}

function displayQuestions(page) {
    console.log("Displaying questions for page:", page);
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

        const questionIndex = start + index;

        if (q.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `question${questionIndex}`;
            if (userAnswers[`question${questionIndex}`]) {
                input.value = userAnswers[`question${questionIndex}`];
            }
            questionContainer.appendChild(input);
        } else if (q.type === 'radio') {
            q.options.forEach(option => {
                const label = document.createElement('label');
                label.textContent = option;

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question${questionIndex}`;
                input.value = option;
                if (userAnswers[`question${questionIndex}`] === option) {
                    input.checked = true;
                }

                label.appendChild(input);
                questionContainer.appendChild(label);
            });
        } else if (q.type === 'checkbox') {
            q.options.forEach(option => {
                const label = document.createElement('label');
                label.textContent = option;

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = `question${questionIndex}`;
                input.value = option;
                if (userAnswers[`question${questionIndex}`] && userAnswers[`question${questionIndex}`].includes(option)) {
                    input.checked = true;
                }

                label.appendChild(input);
                questionContainer.appendChild(label);
            });
        } else if (q.type === 'dropdown') {
            const select = document.createElement('select');
            select.name = `question${questionIndex}`;
            q.options.forEach(option => {
                const optionElem = document.createElement('option');
                optionElem.value = option;
                optionElem.textContent = option;
                if (userAnswers[`question${questionIndex}`] === option) {
                    optionElem.selected = true;
                }
                select.appendChild(optionElem);
            });

            questionContainer.appendChild(select);
        }

        quizForm.appendChild(questionContainer);
    });

    document.getElementById('prev-btn').style.display = page === 0 ? 'none' : 'inline-block';
    document.getElementById('next-btn').style.display = (page + 1) * questionsPerPage >= questions.length ? 'none' : 'inline-block';
}

function saveAnswers() {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;

    for (let i = start; i < end; i++) {
        const question = questions[i];
        const inputName = `question${i}`;

        if (question.type === 'text') {
            const input = document.querySelector(`input[name="${inputName}"]`);
            if (input) {
                userAnswers[inputName] = input.value.trim();
            }
        } else if (question.type === 'radio') {
            const input = document.querySelector(`input[name="${inputName}"]:checked`);
            if (input) {
                userAnswers[inputName] = input.value;
            }
        } else if (question.type === 'checkbox') {
            const inputs = document.querySelectorAll(`input[name="${inputName}"]:checked`);
            userAnswers[inputName] = Array.from(inputs).map(input => input.value);
        } else if (question.type === 'dropdown') {
            const select = document.querySelector(`select[name="${inputName}"]`);
            if (select) {
                userAnswers[inputName] = select.value;
            }
        }
    }
}

function nextPage() {
    if ((currentPage + 1) * questionsPerPage < questions.length) {
        saveAnswers();
        currentPage++;
        displayQuestions(currentPage);
    }
}

function prevPage() {
    if (currentPage > 0) {
        saveAnswers();
        currentPage--;
        displayQuestions(currentPage);
    }
}

function submitQuiz() {
    saveAnswers();
    clearInterval(timer);

    let score = 0;

    questions.forEach((q, index) => {
        const inputName = `question${index}`;
        if (q.type === 'text') {
            if (userAnswers[inputName] && userAnswers[inputName].toLowerCase() === q.answer.toLowerCase()) {
                score++;
            }
        } else if (q.type === 'radio') {
            if (userAnswers[inputName] === q.answer) {
                score++;
            }
        } else if (q.type === 'checkbox') {
            if (JSON.stringify(userAnswers[inputName].sort()) === JSON.stringify(q.answer.sort())) {
                score++;
            }
        } else if (q.type === 'dropdown') {
            if (userAnswers[inputName] === q.answer) {
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
    loadQuestions();
};
