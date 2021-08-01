// index module
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results")
const submitButton = document.getElementById("submit")

const questionArray = [{
        question: "Who invented Python?",
        answers: {
            a: "Sheryl Sandberg",
            b: "Guido van Rossum",
            c: "Brendan Eich"
        },
        correctAnswer: "b"
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
            a: "Node.js",
            b: "TypeScript",
            c: "npm"
        },
        correctAnswer: "c"
    },
    {
        question: "Which one of these is the best text editor?",
        answers: {
            a: "vim",
            b: "emacs",
            c: "vscode",
            d: "pycharm"
        },
        correctAnswer: "a"
    }
];


function buildQuiz() {

    const output = [];

    questionArray.forEach(
        (question, qstNumber) => {

            const answers = [];
            let letter = '';
            for (letter in question.answers) {
                answers.push(
                    `
                   <label>
                   <input type="radio" name="question${qstNumber}" value="${letter}">
                   ${letter} : ${question.answers[letter]}
                   </label>
                  `
                );
            }

            output.push(
                `
              <div class="question">${question.question} </div>
              <div class="answers">${answers.join('')} </div>
              `
            );
        }
    );
    quizContainer.innerHTML = output.join('');
}


function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');

    let numCorrect = 0;

    questionArray.forEach((question, qstNum) => {

        const answerContainer = answerContainers[qstNum];
        const selector = `input[name=question${qstNum}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value

        if (userAnswer === question.correctAnswer) {
            numCorrect++;
            answerContainers[qstNum].style.color = 'lightgreen';
        } else {
            answerContainers[qstNum].style.color = 'red';
        }

    });

    resultsContainer.innerHTML = `${numCorrect} out of ${questionArray.length}`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);
