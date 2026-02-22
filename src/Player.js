import Gameboard from "./Gameboard";

class Player {
  constructor(type = "human") {
    this.type = type;
    this.attackedCoordinates = [];
    this.gameboard = new Gameboard();
  }
  attack(enemyGameboard, [row, col]) {
    enemyGameboard.receiveAttack([row, col]);
  }
  computerAttack(enemyGameboard) {
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (this.attackedCoordinates.some(([r, c]) => r === row && c === col));

    this.attackedCoordinates.push([row, col]);
    enemyGameboard.receiveAttack([row, col]);
  }
}

export default Player;
