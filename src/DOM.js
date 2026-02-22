const renderBoard = (gameboard, containerId, isEnemy = false) => {
    const container = document.getElementById(containerId);
    console.log("container",container);
    console.log("board",gameboard.board)
    container.innerHTML = '';
  
    const boardDiv = document.createElement('div');
    boardDiv.classList.add('board');
  
    gameboard.board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = colIndex;
  
        if (cell !== null && !isEnemy) {
          cellDiv.classList.add('ship');
        }
  
        gameboard.missedAttacks.forEach(([r, c]) => {
          if (r === rowIndex && c === colIndex) {
            cellDiv.classList.add('miss');
          }
        });
  
        if (cell !== null && cell.hits > 0 ) {
          cellDiv.classList.add('hit');
        }
  
        boardDiv.appendChild(cellDiv);
      });
    });
  
    container.appendChild(boardDiv);
  };

  const setupAttackListeners = (enemyGameboard, onAttack)=>{
    const cells = document.querySelectorAll('#enemy-board .cell')
    cells.forEach(cell=>{
      cell.addEventListener('click',()=>{
        const row = parseInt(cell.dataset.row)
        const col = parseInt(cell.dataset.col)
        onAttack(row, col)
      })
    })
  }
  
  export { renderBoard, setupAttackListeners};