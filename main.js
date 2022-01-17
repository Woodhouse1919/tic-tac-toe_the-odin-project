// Module containing all gameboard information
const gameBoard = (() => {
  const grid = document.querySelectorAll('.grid-item');

  const gameBoardArray = [];

  

  grid.forEach((gridItem) => {
    gridItem.addEventListener('click', (e) => {
      if (gameBoardArray.length === 9) {
        return;
      } else {
        if (gameBoardArray[gameBoardArray.length - 1] === undefined) {
          gameBoardArray.push('X');
        } else if (gameBoardArray[gameBoardArray.length - 1] === 'X') {
          gameBoardArray.push('O');
        } else if (gameBoardArray[gameBoardArray.length - 1] === 'O') {
          gameBoardArray.push('X');
        }
      }

      e.target.textContent = gameBoardArray[gameBoardArray.length -1]

      console.log(gameBoardArray);
    });
  });
})();

// Player factory function
const Player = (name) => {
  return { name };
};
