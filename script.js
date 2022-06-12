const cellEllements = document.querySelectorAll("[data-cell]");
const board = document.querySelectorAll("[data-board]");
const winningMessageTextElement = document.querySelectorAll("[data-winning-message-text]");

const winningMessage = document.querySelector("[data-winning-message");
const restartButton = document.querySelectorAll("[data-restart-button]");

let isClickTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    isClickTurn = false;

    for (const cell of cellEllements) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.classList.remove('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    }

    setBoardMoverClass();
    winningMessage.classList.remove('show-winning-message');
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!";

    } else {
        winningMessageTextElement.innerText = isClickTurn ? "O venceu" : "X venceu";
    }

    winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellEllements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellEllements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle')
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardMoverClass = () => {

    board.classList.remove('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}

const swapTurn = () => {
    isClickTurn = !isClickTurn

    setBoardMoverClass();
};

const handleClick = (e) => {

    const cell = e.target;
    const classToAdd = isClickTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        swapTurn();
    }

};

startGame();

restartButton.addEventListener('click', startGame)