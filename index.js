'use strict'

//QUESTION DATA
const QUESTIONS = [
    {
        question:'How many minutes of physical activity to you get per week?',
        answers: [ 
            'less that 30 minutes of moderate exercise or 15 minutes of vigorous exercise', 
            'between 30 - 60 minutes of moderate exercise or between 15 - 30 minutes of vigorous exercise', 
            'between 6 - 150 minutes of moderate exercise or 30 - 75 minutes of vigorous exercise',
            'more than 150 minutes of moderate exercise or 75 minutes of vigorous exercise',
            ],
        correctAnswer: 'more than 150 minutes of moderate exercise or 75 minutes of vigorous exercise'
    },
    {
        question:'How many day per week do you participte in strength training?',
        answers: [
            'I never strength train', 
            'Once every few weeks', 
            '1', 
            '2+' 
            ],
        correctAnswer: '2+'
    },
    {
        question:'How many cups of water do you drink per day?',
        answers: [
            'none', 
            '1-3', 
            '3-5', 
            '5-8' 
            ],
        correctAnswer: '5-8'
    }
 
]

//GLOBAL VARIABLES
let userScore = 0;
let questionCount = 0;



//HOME PAGE 
function startQuiz(){
    $('button.landing-button').on('click', function(event){
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
        <h2>Question: <span class="question-text">${QUESTIONS[questionCount].question}</span></h2>
        <fieldset>
        <label>
            <input type="radio" value="${QUESTIONS[questionCount].answers[0]}" name="question" value="Answer A" required">${QUESTIONS[questionCount].answers[0]}
        </label>
        <label>
            <input type="radio" value="${QUESTIONS[questionCount].answers[1]}" name="question" value="Answer B" required>${QUESTIONS[questionCount].answers[1]}
        </label>
        <label>
            <input type="radio" value="${QUESTIONS[questionCount].answers[2]}" name="question" value="Answer C" required>${QUESTIONS[questionCount].answers[2]}
        </label>
        <label>
            <input type="radio" value="${QUESTIONS[questionCount].answers[3]}" name="question" value="Answer D" required>${QUESTIONS[questionCount].answers[3]}
         </label>
        <button class="submit-content-button"type="submit">Submit</button>
        </fieldset>
        </form>
        </div>`;
    } else {
        //render results
        renderResults();
        //start new quiz
        retakeQuiz();
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
// - render correct html page
// - next button takes you to the next questions (make sure question is not do over)
function ifAnswerIsCorrect(){
    $('.question-content').html(`<div><p>Correct!</p><button class="next-button">Next</button></div>`);
}

//incorrect
// - render advice page, content from the QUESTIONS array, for each incorrect answer
// - next button takes you to the next questions (make sure question is not do over)
function ifAnswerIsIncorrect(){
    $('.question-content').html(`<div><p>Incorrect</p><button class="next-button">Next</button></div>`);
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
    if (userScore > 7){
        $('.question-content').html(`<div><p>Great job!</p><button class="retake-quiz">Retake Quiz</button></div>`)
    } else if (userScore <= 7 && userScore >= 4){
        $('.question-content').html(`<div><p>You did okay...</p><button class="retake-quiz">Retake Quiz</button></div>`)
    } else {
        $('.question-content').html(`<div><p>You probably need some help.</p><button class="retake-quiz">Retake Quiz</button></div>`)
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
}


callAllFunctions();