let gameSeq = [];
let userSeq = [];
let colors = ["red","green","purple","yellow"];
let highestScore = [];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("click",function(){
    if(started == false){
        console.log("game is started");
        started = true;
        levelUp();
    }
});
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;
    let randomIdx = Math.floor(Math.random()*4);
    let randomColor = colors[randomIdx];
    let randbtn = document.querySelector(`.${randomColor}`);
    gameFlash(randbtn);
    gameSeq.push(randomColor);
    console.log(gameSeq); 
}
function gameFlash(btn){
    btn.classList.add("gameblink");
    setTimeout(function(){
        btn.classList.remove("gameblink");
    }, 300);
}
function userFlash(btn){
    btn.classList.add("userblink");
    setTimeout(function(){
        btn.classList.remove("userblink");
    }, 300);
}
function checkAns(idx){
    if(gameSeq[idx] == userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            // console.log("both are equal");
            setTimeout(levelUp, 1000);
            highestScore.push(level);
            
        }
    }else{
        let h_score = score();
        console.log("Game over !! please press any key again");
        let finalLevel = level-1;
        h2.innerHTML = `Game is over!! Your score is <b>${finalLevel}</b> and highest score is ${h_score}<br>please press any key again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        reset();
    }
}

function btnPress(event){
    event.stopPropagation();
    let btn = this;
    userFlash(btn);
    console.log("btn pressed");
    let color= this.getAttribute("id");
    userSeq.push(color);
    console.log(userSeq);
    checkAns(userSeq.length-1);
}
let btns = document.querySelectorAll(".btn");
for(btn of btns){
    btn.addEventListener("click",btnPress);
}

function score(){
    let largest = 0;
    for(eachScore of highestScore){
        if(largest < eachScore){
            largest = eachScore;
        }
    }
    return largest;

}
function reset(){
     gameSeq = [];
     userSeq = [];
     level = 0;
     started = false;

}
