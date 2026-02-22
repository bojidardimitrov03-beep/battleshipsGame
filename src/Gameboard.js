class Gameboard {
  constructor() {
    this.missedAttacks = [];
    this.hitAttacks = [];
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
  }
  placeShip(ship, [row, col], isVertical = false) {
    for (let i = 0; i < ship.length; i++) {
      if (isVertical) {
        this.board[row + i][col] = ship;
      } else {
        this.board[row][col + i] = ship;
      }
    }
  }
  receiveAttack([row, col]) {
    if (this.board[row][col] !== null) {
      this.board[row][col].hit();
      this.hitAttacks.push([row, col]);
    } else {
      this.missedAttacks.push([row, col]);
    }
  }
  areAllShipsSunk() {
    const ships = this.board.flat().filter((cell) => cell !== null);
    return ships.every((ship) => ship.isSunk());
  }
}
export default Gameboard;
