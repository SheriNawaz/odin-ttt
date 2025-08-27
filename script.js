const gameboard = (function () {
    let board = ["","","","","","","","",""]
    function addMarker(index, marker){
        board[index - 1] = marker
        displayController.mark(index, marker)
    }
    return {
        board: board,
        addMarker
    };
})();

function createPlayer(name, marker){
    return{name:name, marker:marker};
}

const gameController = (function() {
    const p1 = createPlayer(prompt("Enter Player 1's Name: "), "X");
    const p2 = createPlayer(prompt("Enter Player 2's Name: "), "O");

    let currentPlayer = p1;

    let gameRunning = true;
    let winningSquares = [[0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    
    function reset() {
        gameboard.board.fill(""); 
        currentPlayer = p1;
        displayController.turnText.textContent =  currentPlayer.name + "'s Turn";
        displayController.resetCells();
        gameRunning = true;
    }

    function checkWin(){
        for (let combo of winningSquares) {
            if (
                gameboard.board[combo[0]] === currentPlayer.marker &&
                gameboard.board[combo[1]] === currentPlayer.marker &&
                gameboard.board[combo[2]] === currentPlayer.marker
            ) {
                displayController.turnText.textContent =  currentPlayer.name + " WINS";
                gameRunning = false;
                return;
            }
        }
    }

    function playRound(index) {
        if (!gameRunning) return;

        if (gameboard.board[index - 1] !== "") {
            console.log("Occupied");
            return;
        }

        gameboard.addMarker(index, currentPlayer.marker);
        console.log(gameboard.board);
        checkWin();

        if (!gameboard.board.includes("")) {
            gameRunning = false;
            displayController.turnText.textContent = "Game Is A Tie!";
            return;
        }

        if(gameRunning){
            currentPlayer = currentPlayer === p1 ? p2 : p1;
            displayController.turnText.textContent = currentPlayer.name + "'s Turn";
        }
    }

    return {
        playRound, reset, currentPlayer
    }
})();

const displayController = (function(){
    let turnText = document.getElementById("turn");
    turnText.textContent =  gameController.currentPlayer.name + "'s Turn";


    document.getElementById("reset").addEventListener('click', function() {
        gameController.reset();
    });

    document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function() {
        gameController.playRound(parseInt(cell.id));
        });
    });
    function resetCells(){
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = "";
        });
    }
    function mark(index, marker){
        let square = document.getElementById(index);
        square.textContent = marker;
    }
    return {
        turnText: turnText, mark, resetCells
    }
})();
