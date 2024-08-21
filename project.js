
const prompt= require('prompt-sync')();
const rows=3;
const cols=3;
const symbolsCount={
    A:2,
    B:4,
    C:6,
    D:8

};
const symbolsValue={
    A:5,
    B:4,
    C:3,
    D:2
};


function deposit(){
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numDepositAmount= parseFloat(depositAmount);
        if(isNaN(numDepositAmount) || numDepositAmount <= 0){
            console.log("Please enter a valid amount");
        }
        else{
            return numDepositAmount;
        }
    }
}
function getNumberOfLines(){
    while(true){
        const lines = prompt("Enter Number of lines to bet on (1-3): ");
        const numberOfLines= parseFloat(lines);
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines>3){
            console.log("Please enter a valid number of lines");
        }
        else{
            return numberOfLines;
        }
    }
}
function getBet(deposit, numberOfLines){
    while(true){
        const bet = prompt("Enter Bet amount per line: ");
        const numberBet= parseFloat(bet);
        if(isNaN(numberBet) || numberBet <= 0 || numberBet*numberOfLines>deposit){
            console.log("Please enter a valid bet amount");
        }
        else{
            return numberBet;
        }
    }
}

function spin(){
    const symbols=[];
    for(const [symbol,count] of Object.entries(symbolsCount)){
        
        for(let i=0; i<count; i++){
            symbols.push(symbol);
        }
    }
    const reels=[[],[],[],];
    for(let i =0;i<cols;i++){
        const reelSymbols=[...symbols];
        for (let j=0;j<rows;j++){
            const randInd=Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol=reelSymbols[randInd];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randInd,1);
        }

    }
    return reels;
}
function transpose(reels) {
    const Rows=[];
    for(let i=0;i<rows;i++){
        Rows.push([]);
        for(let j=0;j<cols;j++){
            Rows[i].push(reels[j][i]);
        } 
    }
    return Rows;
}
function printRows(rows){
    for(const row of rows){
        let rowString='';
        for(const [i,symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
              }
            }
            console.log(rowString);
    }
}
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
  
    for (let row = 0; row < lines; row++) {
      const symbols = rows[row];
      let allSame = true;
  
      for (const symbol of symbols) {
        if (symbol != symbols[0]) {
          allSame = false;
          break;
        }
      }
  
      if (allSame) {
        winnings += bet * symbolsValue[symbols[0]];
      }
    }
  
    return winnings;
  };
function game() {
    let depositAmount=deposit();
    while(true) {
        console.log("Your balance is $" + depositAmount.toString());
        const numberOfLines = getNumberOfLines();
        const bet = getBet(depositAmount, numberOfLines);
        depositAmount -= numberOfLines * bet;
        const reels = spin();
        
        const Rows = transpose(reels);
        printRows(Rows);
        const winnings = getWinnings(Rows, bet, numberOfLines);
        depositAmount += winnings;
        console.log("You won $" + winnings.toString());
        if (depositAmount <=0){
            console.log("ran out of money");
            break;

        }
        const playAgain=prompt("Play Again? y/n ");
        if (playAgain!="y" && playAgain!="Y") break;
    }
}
game();
