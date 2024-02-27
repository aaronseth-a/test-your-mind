debugger;

/*
    TABLE OF CONTENTS (#000)
    ------------------------
    Use CTRL-F and the listed section code to jump to a preferred section
    For example, CTRL-F and then '#000' will bring you to the Table of Contents
    ------------------------
*/

var nextBttn = document.getElementById("nextButton");
var quizStarted = false;
var quizEnded = false;
var incrementer = 0;
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

nextBttn.addEventListener("click", function(){
    event.preventDefault();
    
    if(quizStarted && !quizEnded){
        document.getElementById("question").textContent = quiz[incrementer][0];
        let answerList = document.getElementById("answers");
        while (answerList.hasChildNodes()){
            answerList.removeChild(answerList.firstChild);
        }
        for(let n = 0; n<4; n++){
            let listItem = document.createElement("li");
            listItem.textContent = quiz[incrementer][1][n];
            answerList.appendChild(listItem);
        }
        incrementer++;
        if(incrementer === quiz.length){
            quizEnded = true;
            alert("Quiz Ended");
        }
    } else{
        quizStarted = true;
        document.getElementById("question").textContent = quiz[incrementer][0];
        let answerList = document.getElementById("answers");
        while (answerList.hasChildNodes()){
            answerList.removeChild(answerList.firstChild);
        }
        for(let n = 0; n<4; n++){
            let listItem = document.createElement("li");
            listItem.textContent = quiz[incrementer][1][n];
            answerList.appendChild(listItem);
        }
        incrementer++;
    }
})




console.log(quiz[0][0][0]);

// for(let i =0; i<quiz.length; i++){
//     document.getElementById("question").textContent = quiz[i][0];
//     for(let n = 0; n<4; n++){
//         let answerList = document.getElementById("answers");
//         let listItem = document.createElement("li");
//         console.log(quiz[i][1][n]);
//          listItem.textContent = quiz[i][1][n];
//          console.log(listItem.textContent);
//          answerList.appendChild(listItem);
//     } 
// }
