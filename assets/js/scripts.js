//debugger;

/*
    TABLE OF CONTENTS (#000)
    ------------------------
    Use CTRL-F and the listed section code to jump to a preferred section
    For example, CTRL-F and then '#000' will bring you to the Table of Contents
    ------------------------
*/

var timeDisplay = document.getElementById("timer");
var grade = document.getElementById("grade");
var introScreen = document.getElementById("intro");
var quizForm = document.getElementById("quizForm");
var startBttn = document.getElementById("startButton");
var choiceList = document.getElementById("answers");

var incrementer = 0;
var initialTime = 45;
var quizTime = initialTime;
quizStart = false;

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

quiz[0]= ["Question 1", 
        [
            "TEST 1", 
            "TEST 2", 
            "TEST 3", 
            "TEST 4"
        ], 
        "TEST 2"];
quiz[1]= ["Question 2", 
        [
            "TEST 1", 
            "TEST 2", 
            "TEST 3", 
            "TEST 4"
        ], 
        "TEST 3"];

startBttn.addEventListener("click", function(event){
    event.preventDefault();
    introScreen.setAttribute("style", "display: none");
    quizForm.setAttribute("style", "display: block");
    timeDisplay.textContent = quizTime;
    quizStart = true;

    loadQuestion();
});

choiceList.addEventListener("click", function(event){
    event.preventDefault();
    
    let element = event.target;

    console.log(element.textContent);
    console.log(quiz[incrementer][2]);

    if(element.textContent === quiz[incrementer][2]){
        let soundFile = new Audio("./assets/audio/644948__craigscottuk__quiz-gameshow-correct-ping-01.mp3");
        soundFile.play();
        grade.textContent = "Correct";
    } else {
        let soundFile = new Audio("./assets/audio/720893__baggonotes__incorrect_buzz.wav");
        soundFile.play();
        grade.textContent = "Incorrect";
        lessTime(15);
    }
    incrementer++;

    setTimeout(function(){if(!quizEnded()){  //check to see if game has ended
        loadQuestion();
    } else{
        clearInterval(quizTimer);
        alert("Quiz Ended");
    }}, 3000);
});

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

function quizEnded(){
    return (quiz.length === incrementer || quizTime === 0);
}

function lessTime(amount){
    quizTime -= amount;
}