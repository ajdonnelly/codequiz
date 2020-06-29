
const  questions = [
    {
        question: 'Commonly used data points DO NOT inlude:',
        answers: [
            {text: 'strings', correct: false },
            {text: 'boolans', correct: false },
            {text: 'alerts', correct: true },
            {text: 'numbers', correct: false },
        ]
    },
    {
        question: 'The condition in an if/else statment is enclosed within ____.', 
        answers: [
            {text: 'quotes', correct: false },
            {text: 'curly brackets', correct: false },
            {text: 'parentheses', correct: true },
            {text: 'square brackets', correct: false },
        ]
    },   
    {
        question: 'Arrays in JavaScript can be used to store ____.', 
        answers: [
            {text:  'numbers and strings',correct: false },
            {text:  'other arrays',correct: false },
            {text:  'booleans', correct: false },
            {text:  'all of the above',correct: true },
        ]
    },
    {
        question: 'String values must be enclosed within____when being assigned to variables.', 
        answers: [
            {text: 'commas', correct: false },
            {text: 'curly brackets',correct: false }, 
            {text: 'quotes', correct: true },
            {text: 'parentheses',correct: false },
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:', 
        answers: [
            {text:  'JavaScript',correct: false},
            {text:  'terminal/bash', correct: false},
            {text:  'for loops', correct: false},
            {text:  'console.log',correct: true},
    
        ]
    },
    {
        question: 'How do you comment out Javascript?', 
        answers: [
            {text:  '<--hello world-->',correct: false},
            {text:  '/hello world', correct: false},
            {text:  '--hello world--', correct: false},
            {text:  '/*hello world*/',correct: true},
    
        ]
    },
   
];

//Begin Global Vars
// Set alloted time to 60secs
var timeLeft = 60;
// Set the body and footer to a variable
var body = document.body;
var footer = document.footer;
//stores next question button
var nextButton = document.getElementById('next-btn');
//stores question container
var questionContainerElement = document.getElementById ('question-section')
var quizHide = document.querySelector('quiz')
    //stores variable for question text
var questionElement = document.getElementById('questionText')
    //stores variable for answers text
var answerButtonsElement = document.getElementById ('answers')
    //stores variable for intro and start button section
var introRun = document.getElementById ('intro')
var controls = document.getElementById ('controls')
var mainEl = document.getElementById('main');
//to grab the body to make the element that will hold hte answer responses
var body=document.querySelector("body")
    //stores counter
var subTitle=document.createElement("h2")
let countRightAnswers = 0;
    //decrements wrong answer
var decrementEl = document.querySelector("countdown");

//defaults both these as vars to undefined so we can use them to shuffle quesitons
let shuffledQuestions, currentQuestionIndex

//timer variables
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main'); //this grabs the ids main in the document which hold the timer values


//Intro initializations
    var header = document.querySelector("header");
    var main = document.querySelector('main');//this grabs the main element that contains the game
    var h1ElIn = document.createElement('h1');//page title
    var h2ElIn = document.createElement('h2');
    var pMain = document.createElement('p');
    var startButton = document.createElement('button');//id startquiz

    h1ElIn.setAttribute('style', 'color:black, margin:auto; width:100%; text-align:center; padding-top:50px; padding-left:170px'); //class="page-title"
    h2ElIn.setAttribute('style', 'color:black, margin:auto; width:100%; text-align:center; padding-left:170px');
    pMain.setAttribute('style', 'color:black, margin:auto; width:100%; text-align:center;');
    startButton.setAttribute('style', 'color:black, margin:auto; text-align:left;outline: none; border: none; display: inline-block; padding: 10px 15px; background: rgb(207, 172, 207); font-size: 2.2rem; border-radius: 12px; position: relative; top: -3px; box-shadow: 0 3px gray;');

    h1ElIn.innerHTML = 'Coding Quiz Challenge';
    h2ElIn.innerHTML = 'Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by five seconds.';
    pMain.innerHTML = "";//id main-this is the counter
    startButton.innerText = 'Start Quiz'; //id="start-quiz" class="start-quiz btn"

    header.append(h1ElIn);
    header.append(h2ElIn);
    header.append(pMain);
    header.append(startButton);

//starts quizgame function when user clicks "StartQuiz button"
startButton.addEventListener ("click", startGame)

//end Global Vars 

nextButton.addEventListener('click', () => {
    //runs through questions
    currentQuestionIndex++
    //resets quesiton field with each new quesiton
   setNextQuestion()

})

//starts the quizgame
function startGame(){
    nextButton.setAttribute('style', 'color:black, margin:auto; text-align:left;outline: none; border: none; display: inline-block; padding: 10px 15px; background: rgb(207, 172, 207); font-size: 2.2rem; border-radius: 12px; position: relative; top: -3px; box-shadow: 0 3px gray;');
   
    event.preventDefault();
    //set score variable to 0
    countRightAnswers = 0;
    //hide start button after starting quizgame
    introRun.style.display = "none"
    //this would then shuffle through the questions randomly by assigning either a negative or pos number
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    //setting the starting point of the array at first position, ie first rand generated question
    currentQuestionIndex = 0
    
    setNextQuestion()
}

//this sends the user to the next question in the array
function setNextQuestion(){
    //resets everything back to the starting state for each quesiton
    resetState()
    //runs the function that dynamically generates the questions
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

//displays question objects
function showQuestion(question) {
   
    questionElement.innerText = question.question
  
    question.answers.forEach(answer => {
        //creates each button
        const button = document.createElement ('button')
        //populates button with answer at that position of array
        button.innerText = answer.text
        //styles button
        button.setAttribute('style', 'color:black; text-align:center; outline:none; border:black; display:inline-block; padding:10px 15px 10px 15px; background:  rgb(143, 142, 142); font-size: 1.6rem; border-radius: 12px; box-shadow: 0 3px gray;')
        //stores "true" answers, ie correct&true
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        //creates event listerner to capture click of buttons
        button.addEventListener('click', selectAnswer)
        //appends the buttons
        answerButtonsElement.appendChild(button)
})
}

//resets the dynamcially generated info from last question
function resetState() {
    
    clearStatusClass(document.body)
    
    //cycle through and remove each first child question 
    while (answerButtonsElement.firstChild) {
        
        answerButtonsElement.removeChild 
        (answerButtonsElement.firstChild)
    }
}
// store answers
function selectAnswer(e){
    
    
    const selectedButton = e.target
    
    const correct = selectedButton.dataset.correct
  
    setStatusClass(document.body, correct)
    
    Array.from(answerButtonsElement.children).forEach(button => {
       
        setStatusClass(button, button.dataset.correct)
        })
        //The score is collected and incremented here and sent to the score span below
        if (selectedButton.dataset = correct) {
            countRightAnswers++;
         }
        //conditional, continue serving up questions as it is true that there are still questions left
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
        } 
        //if it is false that there are questions left, run 
        else {
        //make nextButton dissapear
        nextButton.style.display = "none"//I don't think I need this either?
       
        startButton.innerText = 'Submit Score'//may be able to get rid of this
        
        //this fires up endGame after final answer is given because the startButton had been renamed the Next Question button
        startButton.addEventListener('click', endGame())
        }
         //this shows the score live
         document.getElementById('right-answers').innerHTML ='Score: ' + countRightAnswers + "/" + shuffledQuestions.length; // span will show the score
         //window.setTimeout(subTitle,2000);/*"subTitle.setAttribute("style","display:none")"*/
        }    
     
//store correct response
function setStatusClass(element, correct) {
    console.log("event", event);
    
    //Reset
    clearStatusClass(element)
    //checks answer 
    if(correct) {
        //assigns "correct" class if its truthy-correct: true
        element.classList.add('correct')
        //notify user of correct answer by populatin  subTitle
        subTitle.innerHTML="<b>Correct!"
        //style field
        subTitle.setAttribute("style","text-align:center;margin-left:auto;margin-right:auto; width:960px")
        //append subTitle to the body
          body.appendChild(subTitle)

        } else {
            //assigns "wrong" if its falsy-correct: false
            element.classList.add('wrong')
            //notify user of incorrect answer by populating subTitle
            subTitle.innerHTML="<b>Wrong :( "
            //style field
            subTitle.setAttribute("style","text-align:center;margin-left:auto;margin-right:auto; width:960px")
            //decrement time for false answer
            if(timeLeft > 0) {
              timeLeft -=5;
           }   
            //append subTitle to the body
            body.appendChild(subTitle)

        }
        resetState()//do I need to call this here? 
    };
    
/*this is the function we called above to clear the data stored 
about the users response to the previous question, i.e. it
removes the previously assinged classes of correct or wrong*/
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

/*timer*/
function countdown() {
    
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        timerEl.textContent = 'Time: ' + timeLeft;
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = 'Time: ' + timeLeft;
        timeLeft--;
      } else {
        //stop timer
        clearInterval(timeInterval);
        //if they run out of time before they are done wiht the quiz send them to score their incomplete score
        endGame();
      }
    }, 1000);
}
    //endGame vars
    var footer = document.querySelector("footer")
    var h1El = document.createElement('h1');//page title
    var h2El = document.createElement('h2');
    var inputInitial= document.createElement('input')
    var inputButton = document.createElement('button');
    var formEl = document.createElement('form');
    var scoreEl = document.createElement('h2');
    var highScoreShow = document.createElement('span');
    var restart = document.createElement('button');
    var msgDiv = document.createElement('div');
    var restart = document.createElement('button');
    

    //set DOM attributes
    formEl.setAttribute('method',"post");
    formEl.setAttribute('action',"submit.php");
    
    // var inputInitial = document.createElement('form');
    inputInitial.setAttribute('type',"text");
    inputInitial.setAttribute('name',"username");

    // var inputButton = document.createElement("input"); //input element, Submit button
    inputButton.setAttribute('type',"submit");
    inputButton.setAttribute('value',"Submit");
    inputButton.setAttribute('style', 'color:black, margin:auto; text-align:center;');
    highScoreShow.setAttribute('style', 'color:black, margin:auto; text-align:center;');
    
    // Set the text content of relevant elements
    
    h1El.setAttribute('style', 'color:black, margin:auto; width:50%; text-align:center;');
    h2El.setAttribute('style', 'color:black, margin:auto; width:50%; text-align:center;');
    scoreEl.setAttribute('style', 'color:black, margin:auto; width:50%; text-align:center;');
    msgDiv.setAttribute('style', 'color:black, margin:auto; text-align:center;');  
    
    h1El.innerHTML = 'Store Your Score';
    inputButton.innerHTML = 'Submit Initials';
    

footer.append(highScoreShow);

highScoreShow.innerHTML = 'The current high score for the game is ' + localStorage.getItem ("dataKey"); 
    
var val = JSON.parse(window.localStorage.getItem('dataKey'));

document.getElementsByTagName("footer")[0].setAttribute("class", "footer");

var val = localStorage.getItem('dataKey');

function endGame(){
    
    h2El.innerHTML = 'Fill Out This Form With Your Initials to Store your Score!' + "<br>" + 'Your Score was: ' + countRightAnswers;
    subTitle.innerHTML=""
    document.getElementById("game").style.display = "none";
    
    footer.appendChild(h1El);
    footer.appendChild(h1El);
    footer.appendChild(h2El);
    footer.appendChild(formEl);
    footer.appendChild(scoreEl);
    footer.appendChild(msgDiv);
    footer.append(inputInitial);
    footer.append(inputButton);
  


inputButton.addEventListener("click", function (event) {
  event.preventDefault();

  

  if (initials === "") {
    displayMessage("error", "Email cannot be blank");
  } else {
    displayMessage("success", "Your score is stored!");

    var getData = 
{
   "initials":initials,
   "score":countRightAnswers
   
}
if (val.score < getData.score) {
        window.localStorage.setItem('dataKey', JSON.stringify(getData));
        
  }

    inputButton.setAttribute("style", "display: none")
    inputInitial.setAttribute("style", "display: none")
    
    document.getElementById('dataKey').value = val
   // highScore(); //i'm calling highScore here so that it calls after they have stored their score in the event that their answer ends up being the high score
   restartQuiz();

  }
// 

});
}

  function displayMessage(type, message) {
   msgDiv.textContent = message;
   msgDiv.setAttribute("class", type);
    }
  function restartQuiz(){
    

    restart.setAttribute('style', 'color:black, margin:auto; text-align:center;');
    restart.innerHTML = 'Restart Quiz???';
    footer.append(restart);
    restart.addEventListener("click", function (event){
    location.reload();
    
    
   })
  
}


startButton.onclick = countdown


    

    