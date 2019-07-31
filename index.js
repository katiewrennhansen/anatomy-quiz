'use strict'

//QUESTION DATA
const QUESTIONS = [
    {
        question:'How many bones are in the adult human body?',
        answers: [ 
            '500', 
            '206', 
            '107',
            '300',
            ],
        correctAnswer: '206',
        explanation: 'There are 206 bones in the adult human body. I newborn bady will have 300, but many fuse during development.'
    },
    {
        question:'What is the primary function of muscles?',
        answers: [
            'Movement', 
            'Heat Production', 
            'Stability', 
            'All of the above' 
            ],
        correctAnswer: 'All of the above',
        explanation: 'The muscular system carries out all of these functions. Each one is vital to survival.'
    },
    {
        question:'What part of the brain is responsible for providing feedback on the position of the body in order to coordinate movement?',
        answers: [
            'Cerebrum', 
            'Midbrain', 
            'Cerebellum', 
            'The Limbic System' 
            ],
        correctAnswer: 'Cerebellum',
        explanation: 'The Cerebellum compares indended movement patterns with actual movement patterns in order to carry out better future patterns. It is responsible to awareness of where your body is in space.'
    },
    {
        question:'Which vertebrae have the largest vertebral bodies?',
        answers: [
            'Cervical', 
            'Thoracic', 
            'Lumbar', 
            'Sacral' 
            ],
        correctAnswer: 'Lumbar',
        explanation: 'The lumbar vertebrae have the largest bodies because they are responsible for supporting the majority of your body\'s weight'
    },
    {
        question:'Which muscle/s is/are responsible for closing the jaw?',
        answers: [
            'masseter and temporalis', 
            'pterygoids', 
            'trapezius and sternocleidomastoid', 
            'deltiods' 
            ],
        correctAnswer: 'masseter and temporalis',
        explanation: 'These two muscles are the primary elevators of the mandible. The pterygoids are responsible for lateral jaw translation while the others aid in neck, back and shoulder movement.'
    },
    {
        question:'Which direction do arteries carry blood?',
        answers: [
            'toward the heart', 
            'away from the bones', 
            'away from the heart', 
            'to the brain only' 
            ],
        correctAnswer: 'away from the heart',
        explanation: 'Arteries are responsible for carrying blood away from the heart while veins are responsible for carrying blood to the heart.'
    }
 
]

//GLOBAL VARIABLES
let userScore = 0;
let questionCount = 0;



//HOME PAGE 
function startQuiz(){
    $('main').on('click', 'button.landing-button', function(event){
        $(this).parent('section').addClass('hidden');
        $('.question-content').addClass('show');
        $('.question-count').text(1);
    });
}

function changeQuestionCount(){
    questionCount ++;
    $('.question-count').text(questionCount+1);
}

function updateScore(){
    userScore ++;
    $('.correct-count').text(userScore);
}


//QUESTION FORM

//generate html for question
function generateQuestionElement(){
    if (questionCount < QUESTIONS.length){
        return `
        <div>
        <form class="question-form"> 
        <h2><span class="question-text">${QUESTIONS[questionCount].question}</span></h2>
        <fieldset>
        <label class="option-choice">
            <input type="radio" class="radio-button" value="${QUESTIONS[questionCount].answers[0]}" name="question" value="Answer A" required">${QUESTIONS[questionCount].answers[0]}
        </label>
        <label class="option-choice">
            <input type="radio" class="radio-button" value="${QUESTIONS[questionCount].answers[1]}" name="question" value="Answer B" required>${QUESTIONS[questionCount].answers[1]}
        </label>
        <label class="option-choice">
            <input type="radio" class="radio-button" value="${QUESTIONS[questionCount].answers[2]}" name="question" value="Answer C" required>${QUESTIONS[questionCount].answers[2]}
        </label>
        <label class="option-choice">
            <input type="radio" class="radio-button" value="${QUESTIONS[questionCount].answers[3]}" name="question" value="Answer D" required>${QUESTIONS[questionCount].answers[3]}
         </label>
        <button class="submit-content-button"type="submit">Submit</button>
        </fieldset>
        </form>
        </div>`;
    } else {
        renderResults();
        $('.question-count').text(10);
    }
}

//render page
function renderForm(){
    $('.question-content').html(generateQuestionElement());  
    selectAnswer();
}



//CORRECT/INCORRECT LOGIC
function selectAnswer(){
    $('form').on('submit', function(event){
      event.preventDefault();
      let selected = $('input:checked').val();
      let correctAnswer = `${QUESTIONS[questionCount].correctAnswer}`;
      if (selected === correctAnswer) {
          ifAnswerIsCorrect();
          updateScore();
      } else {
          ifAnswerIsIncorrect();
      }
    });
  }



//DISPLAY CORRECT/INCORRECT PAGE

//correct
function ifAnswerIsCorrect(){
    $('.question-content').html(`<div class="quiz-feedback"><h3>Correct!</h3><button class="next-button">Next</button></div>`);
}

//incorrect
function ifAnswerIsIncorrect(){
    $('.question-content').html(`<div class="quiz-feedback"><h3>Incorrect.</h3><p>The correct answer is ${QUESTIONS[questionCount].correctAnswer}.</p><p id="explanation">${QUESTIONS[questionCount].explanation}</p><button class="next-button">Next</button></div>`);
}



//NEW QUESTION
function renderNewForm(){
    $('main').on('click', '.next-button', function(event){
        changeQuestionCount();
        renderForm();
    });
}



//RESULTS PAGE

//display results on homepage along with 'health score'
function renderResults(){
    if (userScore > 4){
        $('.question-content').html(`<div class="quiz-feedback"><h3>You got ${userScore}/10 correct</h3><p>Great job!</p><button class="retake-quiz">Retake Quiz</button></div>`)
    } else if (userScore <= 4 && userScore >= 2){
        $('.question-content').html(`<div class="quiz-feedback"><h3>You got ${userScore}/10 correct</h3><p>You did okay...</p><button class="retake-quiz">Retake Quiz</button></div>`)
    } else {
        $('.question-content').html(`<div class="quiz-feedback"><h3>You got ${userScore}/10 correct</h3><p>You probably need some help.</p><button class="retake-quiz">Retake Quiz</button></div>`)
    }
}

//give option to retake quiz
function retakeQuiz(){
    $('main').on('click', '.retake-quiz', function(){
        location.reload();
    });
}


//CALL ALL FUNCTIONS
function callAllFunctions(){
    startQuiz();
    renderForm();
    renderNewForm();
    retakeQuiz();
}

$(callAllFunctions);


