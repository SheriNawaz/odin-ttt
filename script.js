const gameboard = (function () {
    let board = ["","","","","","","","",""]
    function addMarker(index, marker){
        board[index - 1] = marker
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
    const p1 = createPlayer("1", "X");
    const p2 = createPlayer("2", "O");
    let currentPlayer = p1;
    let gameRunning = true;
    let winningSquares = [[0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    
    function reset() {
        gameboard.board.fill(""); 
        currentPlayer = p1;
        console.log("Game reset. Player " + currentPlayer.name + " starts.");
    }

    function checkWin(){
        for (let combo of winningSquares) {
            if (
                gameboard.board[combo[0]] === currentPlayer.marker &&
                gameboard.board[combo[1]] === currentPlayer.marker &&
                gameboard.board[combo[2]] === currentPlayer.marker
            ) {
                console.log("Player " + currentPlayer.name + " WINS");
                reset();
                return;
            }
        }
    }

    function playRound(index) {
        
        if (gameboard.board[index - 1] === "") {
            gameboard.addMarker(index, currentPlayer.marker);
            console.log(gameboard.board);
            checkWin();
            if (!gameboard.board.includes("")) {
                gameRunning = false;
                console.log("TIE");
                reset();
                return;
            }
            currentPlayer = currentPlayer === p1 ? p2 : p1;
        } else {
            console.log("Occupied");
        }
    }

    return {
        playRound
    }
})();

const displayController = (function(){

})();
