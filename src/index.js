import Player from './Player';
import Ship from './Ship';
import { renderBoard, setupAttackListeners } from './DOM';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const player = new Player('human');
  const computer = new Player('computer');

  const playerShip1 = new Ship(3);
  const computerShip = new Ship(3);

  player.gameboard.placeShip(playerShip1, [0, 0]);
  computer.gameboard.placeShip(computerShip, [5, 5]);

  const renderAll = () => {
    renderBoard(player.gameboard, 'player-board', false);
    renderBoard(computer.gameboard, 'enemy-board', true);
    setupAttackListeners(computer.gameboard, (row, col) => {
      player.attack(computer.gameboard, [row, col]);
      computer.computerAttack(player.gameboard);
      renderAll();
    });
  };

  renderAll();
});