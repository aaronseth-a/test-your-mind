var scoreListEl = document.getElementById('scoresList');
var clearButton = document.getElementById('clearScores');
var homeButton = document.getElementById('returnHome');

var scoreList = JSON.parse(localStorage.getItem('scoreList'));

if (scoreList !== null){
    for(const el of scoreList){
        let li = document.createElement('li');
        li.textContent = `${el.name} - ${el.score}`;
        scoreListEl.append(li);
    }
}

homeButton.addEventListener('click',(event)=>{
    event.preventDefault();
    window.location.assign('../index.html'); 
});


clearButton.addEventListener('click',(event)=>{
    event.preventDefault();
    localStorage.removeItem('scoreList');
    localStorage.removeItem('newScore');
    window.location.reload(); 
});