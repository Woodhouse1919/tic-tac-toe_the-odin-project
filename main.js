// Module containing all gameBoard information
const gameBoard = (() => {
  let win = false;
  let grid = document.querySelectorAll('.grid-item');
  let gameBoardArray = [];
  const resetBtn = document.querySelector('.reset');
  const displayMessage = document.querySelector('.message-display');
  const winConditions = [
    [0, 1, 2], // Horizontal Top
    [3, 4, 5], // Horizontal Middle
    [6, 7, 8], // Horizontal Bottom
    [0, 3, 6], // Vertical Left
    [1, 4, 7], // Vertical Middle
    [2, 5, 8], // Vertical Right
    [0, 4, 8], // Diagonal Top Left to Bottom Right
    [2, 4, 6], // Diagonal Top Right to Bottom Left
  ];

  

  // Binds click event for AddXO Function
  grid.forEach((gridItem) => {
    gridItem.addEventListener('click', addXO);
  });

  resetBtn.addEventListener('click', reset);

  // Pushes item to gameBoard Array based on last index, alternating
  function addXO() {
    if (win != true) {
      updateDisplay();
      if (this.textContent === '') {
        if (gameBoardArray[gameBoardArray.length - 1] === undefined) {
          this.textContent = 'X';
          gameBoardArray.push('X');
          checkWin();
        } else if (gameBoardArray[gameBoardArray.length - 1] === 'X') {
          this.textContent = 'O';
          gameBoardArray.push('O');
          checkWin();
        } else if (gameBoardArray[gameBoardArray.length - 1] === 'O') {
          this.textContent = 'X';
          gameBoardArray.push('X');
          checkWin();
        }
      }
    }
  }
  // Loops through winConditions variable checking each combo for a potential win
  function checkWin() {
    for (let i = 0; i <= 9; i++) {
      if (
        grid[winConditions[i][0]].textContent === 'X' &&
        grid[winConditions[i][1]].textContent === 'X' &&
        grid[winConditions[i][2]].textContent === 'X'
      ) {
        win = true;
        let players = gameSetup.generatePlayers();
        displayMessage.textContent = `${players.playerOne.name} Wins!`;
      } else if (
        grid[winConditions[i][0]].textContent === 'O' &&
        grid[winConditions[i][1]].textContent === 'O' &&
        grid[winConditions[i][2]].textContent === 'O'
      ) {
        win = true;
        let players = gameSetup.generatePlayers();
        displayMessage.textContent = `${players.playerTwo.name} Wins!`;
      } else if (gameBoardArray.length === 9) {
        win = true;
        displayMessage.textContent = `Tie Game!`;
      }
    }
  }

  function updateDisplay() {
    let players = gameSetup.generatePlayers();
    if (gameBoardArray[gameBoardArray.length - 1] === undefined) {
      displayMessage.textContent = `${players.playerTwo.name}'s Turn!`;
    } else if (gameBoardArray[gameBoardArray.length - 1] === 'X') {
      displayMessage.textContent = `${players.playerOne.name}'s Turn!`;
    } else if (gameBoardArray[gameBoardArray.length - 1] === 'O') {
      displayMessage.textContent = `${players.playerTwo.name}'s Turn!`;
    }
  }

  function reset() {
    win = false
    let players = gameSetup.generatePlayers();
    displayMessage.textContent = `${players.playerOne.name}'s Turn!`;
    gameBoardArray = [];
    grid.forEach((gridItem) => {
      gridItem.textContent = '';
    });
  }
})();

const gameSetup = (() => {
  const header = document.querySelector('h1');
  const displayMessage = document.querySelector('.message-display');
  const startBtn = document.querySelector('.start');
  const resetBtn = document.querySelector('.reset');
  const playerOneInput = document.querySelector('#player-one');
  const playerTwoInput = document.querySelector('#player-two');
  const startScreen = document.querySelector('.start-screen');
  const gameContainer = document.querySelector('.game-container');
  const playerOneName = document.querySelector('.player-one-name');
  const playerTwoName = document.querySelector('.player-two-name');

  // Player factory function
  const Player = (name, gamePiece) => {
    return { name, gamePiece };
  };

  function generatePlayers() {
    if (playerOneInput.value === '' || playerTwoInput.value === '') {
      return;
    } else {
      let playerOne = Player(playerOneInput.value, 'X');
      let playerTwo = Player(playerTwoInput.value, 'O');

      playerOneName.textContent = playerOne.name;
      playerTwoName.textContent = playerTwo.name;

      gameContainer.style.display = 'flex';
      header.classList.add('hidden');
      startScreen.classList.add('hidden');
      displayMessage.classList.remove('hidden');
      gameContainer.classList.remove('hidden');
      resetBtn.classList.remove('hidden');
      displayMessage.classList.remove('hidden');
      displayMessage.textContent = `${playerOne.name}'s Turn!`;
      return { playerOne, playerTwo };
    }
  }

  startBtn.addEventListener('click', generatePlayers);

  return { generatePlayers };
})();
