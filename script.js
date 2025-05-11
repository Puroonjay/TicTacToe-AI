let board = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let ai = "O";
let gameActive = true;

const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const cells = document.querySelectorAll(".cell");

cells.forEach((cell, index) => {
    cell.onclick = () => handleClick(cell, index);
});

function handleClick(cell, index) {
    if (board[index] === "" && gameActive) {
        board[index] = player;
        cell.innerHTML = player;

        if (checkWinner(player)) {
            status.innerHTML = player + " Wins!";
            gameActive = false;
            return;
        }

        if (!board.includes("")) {
            status.innerHTML = "It's a Tie!";
            gameActive = false;
            return;
        }

        setTimeout(() => {
            let aiMove = bestMove(board);
            board[aiMove] = ai;
            document.getElementById(`cell-${aiMove}`).innerHTML = ai;

            if (checkWinner(ai)) {
                status.innerHTML = ai + " Wins!";
                gameActive = false;
            }
        }, 500);
    }
}

function checkWinner(player) {
    return (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)
    );
}

function bestMove(board) {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = ai;
            let score = minimax(board, 0, false);
            board[i] = "";

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    return move;
}

function minimax(board, depth, isMaximizing) {
    if (checkWinner(ai)) return 10 - depth;
    if (checkWinner(player)) return depth - 10;
    if (!board.includes("")) return 0;

    let bestScore = isMaximizing ? -Infinity : Infinity;
    let symbol = isMaximizing ? ai : player;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = symbol;
            let score = minimax(board, depth + 1, !isMaximizing);
            board[i] = "";

            bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
        }
    }

    return bestScore;
}

resetBtn.onclick = function () {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    status.innerHTML = "Start the game!";
    cells.forEach(cell => cell.innerHTML = "");
};