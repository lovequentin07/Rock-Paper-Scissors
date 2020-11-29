const selections = ['Rock', 'Paper', 'Scissors'];

function computerPlay(){
    let ranNum = Math.floor(Math.random()*3);
    return selections[ranNum];
}

