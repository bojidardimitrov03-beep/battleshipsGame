class Gameboard {
  constructor() {
    this.missedAttacks = [];
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
  }
  placeShip(ship, [row, col]) {
    this.board[row][col] = ship;
  }
  receiveAttack([row, col]) {
    if (this.board[row][col] !== null) {
      this.board[row][col].hit();
    } else {
      this.missedAttacks.push([row, col]);
    }
  }
  areAllShipsSunk() {
    const ships = this.board.flat().filter(cell => cell !== null);
    return ships.every(ship => ship.isSunk());
  }
}
export default Gameboard;
