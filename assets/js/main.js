
//  ----- Connect JS to HTML Elements
var timeDisplay = document.getElementById("timer");
var grade = document.getElementById("grade");
var introScreen = document.getElementById("intro");
var quizForm = document.getElementById("quizForm");
var startBttn = document.getElementById("startButton");
var choiceList = document.getElementById("answers");
var scoreSpot = document.getElementById("highScoreLink");
var scoreLink = document.createElement('a');
var quizResult = document.getElementById('quizResult');
var finalScore = document.getElementById('finalScore');
var nameForm = document.getElementById('nameForm');

//  ----- Global variable declarations
var currentScore = 0;
var incrementer = 0;
var initialTime = 45;
var quizTime = initialTime;

//  -----Set starting page conditions
quizStart = false;
scoreLink.textContent = 'High Scores';
scoreLink.setAttribute('href', './pages/scores.html');
scoreLink.classList.add('text-white');
scoreSpot.append(scoreLink);

//  -----Activate Timer
var quizTimer =    
   setInterval(function(){
        if(quizStart){
            quizTime--;
            timeDisplay.textContent = quizTime;
            if(quizTime === 0){
                clearInterval(quizTimer);
                quizTime = initialTime;
                alert("Time's Up!");
            }
        }
    },1000);

var quiz = [];

//  -----Quiz questions sourced from W3 Schools (https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS)
quiz[0]= ["What is the correct syntax for referring to an external script called xxx.js?", 
        [
            '<script href="xxx.js">', 
            '<script name="xxx.js">', 
            '<script src="xxx.js">', 
            '<script file="xxx.js">'
        ], 
        '<script src="xxx.js">'];
quiz[1]= ["What HTML element is used for JavaScript?", 
        [
            "<scripting>", 
            "<javascript>", 
            "<script>", 
            "<js>"
        ], 
        "<script>"];
quiz[2]= ["Where is the correct place to insert a JavaScript?", 
        [
            "<head>", 
            "<body>", 
            "<head> or <body>", 
            "<html>"
        ], 
        "<head> or <body>"];

quiz[3]= ["How can you add a comment in a JavaScript?",
        [
            "<!--This is a comment-->",
            "//This is a comment",
            "`This is a comment",
            "##This is a comment"
        ],
        "//This is a comment"];


//  -----This will initiallize the quiz upon button press
startBttn.addEventListener("click", function(event){
    event.preventDefault();
    
    //  -----initialize quiz loop
    introScreen.classList.add('d-none');
    quizForm.classList.remove('d-none');
    timeDisplay.textContent = quizTime;
    scoreSpot.textContent = currentScore;
    quizStart = true;

    loadQuestion();
});


//  -----As player answers each question, this function moves through all questions and calls functions to update scores and timers
choiceList.addEventListener("click", function(event){
    event.preventDefault();
    
    let element = event.target;

    console.log(element.textContent);
    console.log(quiz[incrementer][2]);

    if(element.textContent === quiz[incrementer][2]){
        let soundFile = new Audio("./assets/audio/644948__craigscottuk__quiz-gameshow-correct-ping-01.mp3");
        soundFile.play();
        currentScore++;
        scoreSpot.textContent = currentScore;
        grade.textContent = "Correct";

    } else {
        let soundFile = new Audio("./assets/audio/720893__baggonotes__incorrect_buzz.wav");
        soundFile.play();
        grade.textContent = "Incorrect";
        lessTime(15);
    }
    incrementer++;

    setTimeout(function(){if(!quizEnded()){  // -----check to see if game has ended
        loadQuestion();
    } else{
        clearInterval(quizTimer);
        quizForm.classList.add('d-none');
        quizResult.classList.remove('d-none');
        scoreSpot.classList.add('d-none');
        timeDisplay.classList.add('d-none');
        finalScore.textContent = currentScore;
    }}, 1000);
});

//  -----Stores final data into local storage after submission
nameForm.addEventListener('submit',(event) => {
    event.preventDefault();

    var scoreSet ={
        name: document.getElementById('playerName').value,
        score: currentScore
    };

    var scoreList = JSON.parse(localStorage.getItem('scoreList'));
    if(scoreList === null){
        scoreList = [scoreSet];
    }else{
        scoreList.push(scoreSet);
    }
    debugger;
    localStorage.setItem("scoreList",JSON.stringify(scoreList));
    window.location.assign('./pages/scores.html');
});

//  -----Loads next question
function loadQuestion(){
    grade.textContent = "";
    while (choiceList.hasChildNodes()){
        choiceList.removeChild(choiceList.firstChild);
    } 
    
    document.getElementById("question").textContent = quiz[incrementer][0];
        
        for(let n = 0; n<4; n++){
            let listItem = document.createElement("li");
            let buttonElem = document.createElement("button");
            buttonElem.textContent = quiz[incrementer][1][n];
            choiceList.appendChild(listItem);
            listItem.appendChild(buttonElem);
        }
}

//  -----Checks for end of quiz conditions
function quizEnded(){
    return (quiz.length === incrementer || quizTime <= 0);
}

//  -----Can adjust time when called
function lessTime(amount){
    quizTime -= amount;
}

