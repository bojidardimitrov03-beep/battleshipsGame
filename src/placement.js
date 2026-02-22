import Ship from './Ship';
import { renderBoard } from './DOM';

let isVertical = false;
let currentDragLength = null;
let draggedShip = null;
let draggedShipCells = [];
let dropSucceeded = false;

const setupPlacement = (gameboard, onComplete) => {
  const rotateBtn = document.getElementById('rotate-btn');
  const dockShips = document.querySelectorAll('.dock-ship');
  const shipsToPlace = [4, 3, 3, 2];
  let placedCount = 0;

  rotateBtn.addEventListener('click', () => {
    isVertical = !isVertical;
    rotateBtn.textContent = isVertical
      ? 'Rotate (Vertical)'
      : 'Rotate (Horizontal)';
  });

  dockShips.forEach(ship => {
    ship.addEventListener('dragstart', () => {
      currentDragLength = parseInt(ship.dataset.length);
      draggedShip = null;
      draggedShipCells = [];
      dropSucceeded = false;
    });
  });

  const attachCellListeners = () => {
    const cells = document.querySelectorAll('#placement-board .cell');

    cells.forEach(cell => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      const hasShip = gameboard.board[row]?.[col] !== null;
      cell.draggable = hasShip;

      cell.addEventListener('dragstart', (e) => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const ship = gameboard.board[row][col];
        if (!ship) { e.preventDefault(); return; }

        draggedShip = ship;
        currentDragLength = ship.length;
        dropSucceeded = false;
        draggedShipCells = [];

        for (let r = 0; r < 10; r++) {
          for (let c = 0; c < 10; c++) {
            if (gameboard.board[r][c] === ship) {
              draggedShipCells.push([r, c]);
              // Just hide visually, don't re-render
              const el = document.querySelector(
                `#placement-board .cell[data-row="${r}"][data-col="${c}"]`
              );
              if (el) el.style.opacity = '0.3';
            }
          }
        }

        // Temporarily clear from board so isValidPlacement works correctly
        draggedShipCells.forEach(([r, c]) => {
          gameboard.board[r][c] = null;
        });
      });

      cell.addEventListener('dragend', () => {
        if (draggedShip && !dropSucceeded) {
          // Restore ship to original position
          draggedShipCells.forEach(([r, c]) => {
            gameboard.board[r][c] = draggedShip;
          });
          draggedShip = null;
          draggedShipCells = [];
          renderBoard(gameboard, 'placement-board', false);
          attachCellListeners();
        }
        dropSucceeded = false;
      });

      cell.addEventListener('dragover', (e) => {
        e.preventDefault();
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        highlightCells(row, col, currentDragLength, isVertical, gameboard);
      });

      cell.addEventListener('dragleave', () => {
        clearHighlights();
      });

      cell.addEventListener('drop', (e) => {
        e.preventDefault();
        clearHighlights();
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (!isValidPlacement(row, col, currentDragLength, isVertical, gameboard)) {
          // Restore if invalid drop
          if (draggedShip) {
            draggedShipCells.forEach(([r, c]) => {
              gameboard.board[r][c] = draggedShip;
            });
            draggedShip = null;
            draggedShipCells = [];
            renderBoard(gameboard, 'placement-board', false);
            attachCellListeners();
          }
          return;
        }

        dropSucceeded = true;

        if (draggedShip) {
          // Moving existing ship - reuse same object
          gameboard.placeShip(draggedShip, [row, col], isVertical);
          draggedShip = null;
          draggedShipCells = [];
        } else {
          // New ship from dock
          const ship = new Ship(currentDragLength);
          gameboard.placeShip(ship, [row, col], isVertical);

          let removed = false;
          dockShips.forEach(s => {
            if (!removed && parseInt(s.dataset.length) === currentDragLength && !s.dataset.placed) {
              s.dataset.placed = 'true';
              s.style.opacity = '0.3';
              s.draggable = false;
              removed = true;
            }
          });
          placedCount++;
        }

        renderBoard(gameboard, 'placement-board', false);
        attachCellListeners();

        if (placedCount >= shipsToPlace.length) {
          onComplete();
        }
      });
    });
  };

  renderBoard(gameboard, 'placement-board', false);
  attachCellListeners();
};

const highlightCells = (row, col, length, vertical, gameboard) => {
  clearHighlights();
  const valid = isValidPlacement(row, col, length, vertical, gameboard);
  for (let i = 0; i < length; i++) {
    const r = vertical ? row + i : row;
    const c = vertical ? col : col + i;
    const cell = document.querySelector(
      `#placement-board .cell[data-row="${r}"][data-col="${c}"]`
    );
    if (cell) cell.classList.add(valid ? 'highlight' : 'invalid');
  }
};

const clearHighlights = () => {
  document.querySelectorAll('#placement-board .cell').forEach(cell => {
    cell.classList.remove('highlight', 'invalid');
  });
};

const isValidPlacement = (row, col, length, vertical, gameboard) => {
  for (let i = 0; i < length; i++) {
    const r = vertical ? row + i : row;
    const c = vertical ? col : col + i;
    if (r >= 10 || c >= 10) return false;
    if (gameboard.board[r][c] !== null) return false;
  }
  return true;
};

export { setupPlacement };