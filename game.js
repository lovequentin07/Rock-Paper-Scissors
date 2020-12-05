const selections = ['바위', '보', '가위'];
const players = ['유저 : ', '컴퓨터 :']
let rock;
let paper;
let scissors;
let playerWin = 0;
let computerWin = 0;
let playerSelections = [];
let computerSelections = [];

const container = document.querySelector('#container');
const start = document.querySelector('.start');
const intro = document.querySelector('.intro');
const dsc = document.querySelector('.dsc');
const result = document.querySelector('.result');
const canvas = document.querySelector('#canvas');
const info = document.querySelector('#info');


// 스타트 버튼을 누르면 버튼을 감추고, 가위바위보 이미지를 노출한다. 
start.addEventListener('click', function(){
    // 버튼을 감춘다. 
    start.classList.add('disappear');
    // 가위바위보 이미지를 로드한다. 
    for (let i=0; i<3; i++){
        let img = document.createElement('img');
        img.setAttribute('src', `/images/${selections[i]}.jpg`);
        img.setAttribute('alt', selections[i]);
        img.classList.add(selections[i]);
        img.classList.add('outline');
        container.appendChild(img);
    }
    // 이미지에 이벤트 리스너를 추가한다. 
    rock = document.querySelector(`.${selections[0]}`);
    paper = document.querySelector(`.${selections[1]}`);
    scissors = document.querySelector(`.${selections[2]}`);
    rock.addEventListener('click', function(){game(`${selections[0]}`)})
    paper.addEventListener('click', function(){game(`${selections[1]}`)})
    scissors.addEventListener('click', function(){game(`${selections[2]}`)})  

    for (let i=0; i<2; i++){
        let div = document.createElement('div');
        div.classList.add('board' + i);
        div.textContent = players[i];
        for (let j=0; j<5; j++){
            let circle = document.createElement('span');
            circle.classList.add('circle' + j);
            div.appendChild(circle);
        }
        info.appendChild(div);
    }
    
})

function game(choice){
   
    playerSelections.push(choice);
    computerSelections.push(computerPlay());
    
    result.textContent = (playRound(playerSelections[playerSelections.length-1], computerSelections[computerSelections.length-1]));
    document.querySelector('.playerCanvas').textContent = playerSelections[playerSelections.length-1];
    document.querySelector('.middleCanvas').textContent = "VS"
    document.querySelector('.computerCanvas').textContent = computerSelections[computerSelections.length-1];
    if (playerWin == 5 || computerWin == 5){
        rock.remove();
        paper.remove();
        scissors.remove();
        dsc.remove();
        result.remove();
        canvas.remove();
        if (playerWin == 5){
            intro.textContent = '게임이 종료되었습니다. 당신의 승리입니다.';
        } else {
            intro.textContent = `게임이 종료되었습니다. 컴퓨터의 승리입니다.`;
        }
            }
}

function computerPlay(){
    let ranNum = Math.floor(Math.random()*3);
    return selections[ranNum];
}

function playRound(playerSelection, computerSelection){    
    if (playerSelection == computerSelection){
        return `결과는 .... 무승부!`
    } else if (playerSelection == `${selections[0]}` && computerSelection == `${selections[1]}` ||
            playerSelection == `${selections[1]}` && computerSelection == `${selections[2]}` ||
            playerSelection == `${selections[2]}` && computerSelection == `${selections[0]}`) {

                let stem = document.createElement('div');
                stem.classList.add('stem');
                let kick = document.createElement('div');
                kick.classList.add('kick');
                let markDiv = document.querySelector('.board1');
                let checkMark = markDiv.querySelector('.circle' + computerWin);
                checkMark.classList.add('checkMark');
                checkMark.appendChild(stem);
                checkMark.appendChild(kick);
                computerWin++;

                return `이런... 졌네요.`            
    } else {
        let stem = document.createElement('div');
        stem.classList.add('stem');
        let kick = document.createElement('div');
        kick.classList.add('kick');
        let markDiv = document.querySelector('.board0');
        let checkMark = markDiv.querySelector('.circle' + playerWin);
        checkMark.classList.add('checkMark');
        checkMark.appendChild(stem);
        checkMark.appendChild(kick);
        playerWin++;
        return `좋아요! 이겼습니다.`
    }
}