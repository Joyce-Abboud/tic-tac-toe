const winner = document.querySelector(".winner");
const turn = document.querySelector(".turn");
const restart = document.querySelector(".restart");
document.querySelectorAll(".cellP").forEach((p) => {
    p.textContent = "";
});
//logic
const Gameboard = //iife
    (function Gameboard() {//store the gameboard as an array inside of a Gameboard object,
        const board = [];
        const rows = 3;
        const columns = 3;
        function createGrid() {
            for (let i = 0; i < rows; i++) {
                board[i] = [];
                for (let j = 0; j < columns; j++) {
                    board[i].push(0);
                }
            }
        } createGrid();
        function getboard() {
            return board;
        }
        function restartboard() {
            createGrid();
        }
        return { getboard, restartboard };
    })();
console.log(Gameboard.getboard());

const GameController = (function () {

    let player1 = player("player 1", "O", "1");
    let player2 = player("player 2", "X", "2");
    let activePlayer = player1;
    let win = false;
    let symbol = `${activePlayer.symbol}`;
    //players are also going to be stored in objects,
    function player(name, symbol, number) {
        return {
            name: name,
            symbol: symbol,
            number: number
        }
    }
    function switchplayer() {

        if (activePlayer == player1) {
            activePlayer = player2;
            symbol = player2.symbol;
        } else {
            activePlayer = player1;
            symbol = player1.symbol;
        }
        turn.textContent = (`${symbol} turn`);
    }
    function playRound(row, column, cellP) {
        if (win == true) {
            return;
        } else if (Gameboard.getboard()[row][column] != 0) {
            console.log("Already taken!");
            winner.textContent = "Already taken";
            return;
        } else {
            Gameboard.getboard()[row][column] = symbol;
            cellP.textContent = symbol;
            checkWin();
        }
        if (!win) { switchplayer(); }

        function checkWin() {
            //checks for 3in a row i i+1 i+2 OR ij  i-1 j+1  i-2 j+2  OR  ij  i-1 j-1  i-2  j-2  OR j j+1 j+2
            for (let i = 0; i < 3; i++) {
                const isWin1 = Gameboard.getboard()[0][i] == Gameboard.getboard()[1][i] && Gameboard.getboard()[1][i] == Gameboard.getboard()[2][i] && Gameboard.getboard()[1][i] !== 0;
                const isWin2 = Gameboard.getboard()[i][0] == Gameboard.getboard()[i][1] && Gameboard.getboard()[i][1] == Gameboard.getboard()[i][2] && Gameboard.getboard()[i][1] !== 0;
                const isWin3 = Gameboard.getboard()[0][0] == Gameboard.getboard()[1][1] && Gameboard.getboard()[1][1] == Gameboard.getboard()[2][2] && Gameboard.getboard()[1][1] !== 0;
                const isWin4 = Gameboard.getboard()[2][0] == Gameboard.getboard()[1][1] && Gameboard.getboard()[1][1] == Gameboard.getboard()[0][2] && Gameboard.getboard()[1][1] !== 0;
                if (isWin1 || isWin2 || isWin3 || isWin4) {
                    winner.textContent = (`${symbol} YOU WIN!`);
                    turn.textContent = "Game over";
                    win = true;
                    break;
                } else if (Gameboard.getboard().every(row => !row.includes(0))) {//check for ties: full array, no 3 in rows
                    winner.textContent = "It's a tie!"
                    break;
                } else {
                    win = false;
                    continue;
                }
            }
        }
    }

    restart.addEventListener("click", () => {
        document.querySelectorAll(".cellP").forEach((p) => { p.textContent = ""; });
        win = false;
        turn.textContent = "O turn";
        winner.textContent = "";
        symbol = player1.symbol;
        activePlayer = player1;
        Gameboard.restartboard();
    });


    function play() {//automatically ask for the next input
        //DOMMMMMMM
        const container = document.querySelector(".container");

        (() => {
            for (let row = 0; row < 3; row++) {
                for (let column = 0; column < 3; column++) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell");
                    cell.dataset.row = row;
                    cell.dataset.column = column;

                    const cellP = document.createElement("p");
                    cellP.classList.add("cellP");
                    cell.append(cellP);

                    cell.addEventListener("click", () => playRound(row, column, cellP));
                    container.appendChild(cell);
                }
            }
        })();
        //
    } play();
})();
