const selections = ['Rock', 'Paper', 'Scissors'];
let playerWin = 0;
let computerWin = 0;
let playerSelections = [];
let computerSelections = [];

const container = document.querySelector('#container');
const start = document.querySelector('.start');
const canvas = document.querySelector('#canvas');


// 스타트 버튼을 누르면 버튼을 감추고, 가위바위보 이미지를 노출한다. 
start.addEventListener('click', function(){
    start.classList.add('disappear');
    for (let i=0; i<3; i++){
        let img = document.createElement('img');
        img.setAttribute('src', `/images/${selections[i]}.png`);
        img.setAttribute('alt', selections[i]);
        img.classList.add(selections[i]);
        container.appendChild(img);
    }
    const rock = document.querySelector('.Rock');
    const paper = document.querySelector('.Paper');
    const scissors = document.querySelector('.Scissors');
    rock.addEventListener('click', function(){game("Rock")})
    paper.addEventListener('click', function(){game("Paper")})
    scissors.addEventListener('click', function(){game("Scissors")})   
})



function game(choice){
    if (playerWin >= 5 || computerWin >= 5){
        return console.log("게임이 종료되었습니다.")
    }
    playerSelections.push(choice);
    computerSelections.push(computerPlay());
    
    console.log(playRound(playerSelections[playerSelections.length-1], computerSelections[computerSelections.length-1]));
    document.querySelector('.playerCanvas').textContent = playerSelections[playerSelections.length-1];
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
                computerWin++;
                return `이런... ${playerSelection}이 ${computerSelection}에 졌어요.`            
    } else {
        playerWin++;
        return `좋아요! ${playerSelection}이 ${computerSelection}를 이겼습니다.`
    }
}