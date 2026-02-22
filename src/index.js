import Player from './Player';
import Ship from './Ship';
import { renderBoard, setupAttackListeners } from './DOM';
import { setupPlacement } from './placement';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const player = new Player('human');
  const computer = new Player('computer');

  // Place computer ships randomly (with 1-cell spacing between ships)
  const computerShips = [new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
  computerShips.forEach(ship => {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const vertical = Math.random() > 0.5;
      if (computer.gameboard.isValidShipPlacement(row, col, ship.length, vertical)) {
        computer.gameboard.placeShip(ship, [row, col], vertical);
        placed = true;
      }
    }
  });

  // Setup phase
  setupPlacement(player.gameboard, () => {
    document.getElementById('setup-phase').style.display = 'none';
    document.getElementById('game-phase').style.display = 'block';
    startGame();
  });

  const startGame = () => {
    const gameOverEl = document.getElementById('game-over');
    const gameOverMessage = document.getElementById('game-over-message');
    const replayBtn = document.getElementById('replay-btn');

    const showGameOver = (message) => {
      gameOverMessage.textContent = message;
      gameOverEl.classList.remove('hidden');
    };

    replayBtn.addEventListener('click', () => {
      location.reload();
    });

    const renderAll = () => {
      renderBoard(player.gameboard, 'player-board', false);
      renderBoard(computer.gameboard, 'enemy-board', true);
      setupAttackListeners(computer.gameboard, (row, col) => {
        const alreadyMissed = computer.gameboard.missedAttacks.some(
          ([r, c]) => r === row && c === col
        );
        const alreadyHit = computer.gameboard.hitAttacks.some(
          ([r, c]) => r === row && c === col
        );

        if (alreadyMissed || alreadyHit) return;

        player.attack(computer.gameboard, [row, col]);
        computer.computerAttack(player.gameboard);
        renderAll();

        if (computer.gameboard.areAllShipsSunk()) {
          showGameOver('You win!');
        } else if (player.gameboard.areAllShipsSunk()) {
          showGameOver('Computer wins!');
        }
      });
    };
    renderAll();
  };
});