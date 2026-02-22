const SIZE = 10;
const NEIGHBORS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

class Gameboard {
  constructor() {
    this.missedAttacks = [];
    this.hitAttacks = [];
    this.board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  }

  isValidShipPlacement(row, col, length, isVertical = false) {
    for (let i = 0; i < length; i++) {
      const r = isVertical ? row + i : row;
      const c = isVertical ? col : col + i;
      if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) return false;
      if (this.board[r][c] !== null) return false;
      for (const [dr, dc] of NEIGHBORS) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && this.board[nr][nc] !== null) {
          return false;
        }
      }
    }
    return true;
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
