import Gameboard from "./Gameboard";
import Ship from "./ship";

describe("Gameboard", () => {
  test("starts with empty missed attacks", () => {
    const gameboard = new Gameboard();
    expect(gameboard.missedAttacks).toEqual([]);
  });
});

test("places a ship at the correct coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, [0, 0]);
  expect(gameboard.board[0][0]).toBe(ship);
});

describe("receiveAttack", () => {
  test("hits a ship at the given coordinates", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0]);
    gameboard.receiveAttack([0, 0]);
    expect(ship.hits).toBe(1);
  });

  test("records a missed attack", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.missedAttacks).toEqual([[0, 0]]);
  });
});

describe("areAllShipsSunk", () => {
  test("returns false if not all ships are sunk", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0]);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.areAllShipsSunk()).toBe(false);
  });

  test("returns true if all ships are sunk", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(1);
    gameboard.placeShip(ship, [0, 0]);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.areAllShipsSunk()).toBe(true);
  });
});
