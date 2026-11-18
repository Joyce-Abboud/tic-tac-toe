//store the gameboard as an array inside of a Gameboard object,
const board = [];
const rows = 3;
const columns = 3;
let activePlayer = "X";

function Gameboard() {
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }
}
Gameboard();

//players are also going to be stored in objects,
const players = [
    {
        name: "player 1",
        symbol: "O",
    },
    {
        name: "player 2",
        symbol: "X",
    }
]
//taking turns
function switchPlayer() {
    if (activePlayer === "X") {
        activePlayer = "O";
    } else {
        activePlayer = "X";
    }
}
function wait() {
    let i = 4e9;
    while (--i > 0);
}
let win = "";
//an object to control the flow of the game itself.
function flow(row, column) {
    function checkWin() {
        //checks for 3in a row i i+1 i+2 OR ij  i-1 j+1  i-2 j+2  OR  ij  i-1 j-1  i-2  j-2  OR j j+1 j+2
        if ((board[0][column] == board[1][column] && board[1][column] == board[2][column]) ||
            (board[row][0] == board[row][1] && board[row][1] == board[row][2]) ||
            (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != 0) ||
            (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[1][1] != 0)) {
            console.log(`${activePlayer}`, "You win");
            win = true; // always returning WHYYY
            return true;
        } else if (board.every(row => !row.includes(0))) {
            //check for ties: full array, no 3 in rows
            console.log("It's a tie!");
            //win = true; // bas kermel twa2ef elle3be
        } else {
            win = false;
            return false;
        }
    }
    //changes the array the gameboard ye3ne 
    if (activePlayer == "O") {
        //check if it;s already taken 
        if (board[row][column] != 0) {
            console.log("Already taken!");
            return;
        } else {
            board[row][column] = "O";

            checkWin();
            switchPlayer();
        }

    } else if (activePlayer == "X") {
        if (board[row][column] != 0) {
            console.log("Already taken!");
            return;
        } else {
            board[row][column] = "X"; //TODO: combine the 2 players into one action
            checkWin();
            switchPlayer();
        }
    }
}

//automatically ask for the next input
function ask() {
    for (let i = 0; i <= 9; i++) {
        const row = prompt(`${activePlayer}`, "Which row? (0-2):");
        const column = prompt(`${activePlayer}`, "Which column? (0-2):");
        flow(row, column);
        console.table(board);//should it be in another display? TODO
        wait();
        //  if it someone won - end
        if (win == true) {
            break;
        } else if (win == false) {
            continue;
        }
        // if someone got already taken? test it : it asks again
        // what if someone put a number larger than 2 or < 0 ??: it throws an error 
    }
}

function restart() {
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }
}

//TESTS , REMOVE LATER
function TEST() {
    // 3 x 7ad ba3d
    flow(0, 0);
    flow(1, 1);
    flow(0, 1);
    flow(1, 2);
    flow(0, 2);
}

function TEST2() {
    // 3 O fou2 ba3d bil nos
    flow(0, 1);
    flow(1, 2);
    flow(1, 1);
    flow(2, 2);
    flow(2, 1);
}

function TEST3() {
    //DIAGONAL 1
    flow(0, 0);
    flow(1, 1);
    flow(2, 2);
}

function TEST4() {
    //diagonal 2
    flow(0, 2);
    flow(1, 1);
    flow(2, 0);
}

function TESTtie() {
    flow(1, 1);//1
    flow(0, 2);//2
    flow(1, 2);//3
    flow(1, 0);//4
    flow(2, 2);//5
    flow(0, 0);//6
    flow(0, 1);//7
    flow(2, 1);//8
    flow(2, 0);//9
}

function TESTtie2() {
    flow(1, 1);//1
    flow(0, 2);//2
    flow(1, 2);//3
    flow(1, 0);//4
    flow(2, 2);//5
    flow(0, 0);//6
    flow(0, 1);//7
    flow(2, 1);//8
    flow(2, 0);//9
}

function test() {
    TEST();
    restart();
    TEST2();
    restart();
    TEST3();
    restart();
    TEST4();
    restart();
    TESTtie();
    restart();
}