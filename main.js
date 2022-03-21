const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellsElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cellsElement.forEach(cells => {
        cells.classList.remove(X_CLASS);
        cells.classList.remove(CIRCLE_CLASS);
        cells.addEventListener('click', handleClick, {
            once: true
        })
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw()
{
    return [...cellsElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellsElement[index].classList.contains(currentClass)
        });
    });
}