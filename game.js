const selections = ['Rock', 'Paper', 'Scissors'];
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
    rock = document.querySelector('.Rock');
    paper = document.querySelector('.Paper');
    scissors = document.querySelector('.Scissors');
    rock.addEventListener('click', function(){game("Rock")})
    paper.addEventListener('click', function(){game("Paper")})
    scissors.addEventListener('click', function(){game("Scissors")})  

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
    if (playerWin >= 5 || computerWin >= 5){
        rock.remove();
        paper.remove();
        scissors.remove();
        return console.log("게임이 종료되었습니다.")
    }
    playerSelections.push(choice);
    computerSelections.push(computerPlay());
    
    console.log(playRound(playerSelections[playerSelections.length-1], computerSelections[computerSelections.length-1]));
    document.querySelector('.playerCanvas').textContent = playerSelections[playerSelections.length-1];
    document.querySelector('.middleCanvas').textContent = "V.S."
    document.querySelector('.computerCanvas').textContent = computerSelections[computerSelections.length-1];

}

function computerPlay(){
    let ranNum = Math.floor(Math.random()*3);
    return selections[ranNum];
}

function playRound(playerSelection, computerSelection){    
    if (playerSelection == computerSelection){
        return `결과는 .... 무승부! 같은 걸 냈네요.`
    } else if (playerSelection == 'Rock' && computerSelection == 'Paper' ||
            playerSelection == 'Paper' && computerSelection == 'Scissors' ||
            playerSelection == 'Scissors' && computerSelection == 'Rock') {

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

                return `이런... ${playerSelection}이 ${computerSelection}에 졌어요.`            
    } else {
        playerWin++;
        return `좋아요! ${playerSelection}이 ${computerSelection}를 이겼습니다.`
    }
}

function makeCheckMark(){
    let whole = document.createElement('span');
    whole.classList.add('whole');
    let stem = document.createElement('div');
    stem.classList.add('stem');
    let kick = document.createElement('div');
    kick.classList.add('kick');
    whole.appendChild(stem);
    whole.appendChild(kick);
}