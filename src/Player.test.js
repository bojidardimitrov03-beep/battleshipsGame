import Gameboard from "./Gameboard";
import Player from "./Player";

describe("Player", () => {
  test("has its own gameboard", () => {
    const player = new Player();
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });
});

test("attack sends receiveAttack to enemy gameboard", () => {
  const player1 = new Player();
  const player2 = new Player();
  player1.attack(player2.gameboard, [0, 0]);
  expect(player2.gameboard.missedAttacks).toEqual([[0, 0]]);
});
test("never attacks the same coordinate twice", () => {
  const player1 = new Player();
  const computer = new Player("computer");
  computer.computerAttack(player1.gameboard);
  computer.computerAttack(player1.gameboard);
  computer.computerAttack(player1.gameboard);
  const missedAttacks = player1.gameboard.missedAttacks;
  const unique = new Set(missedAttacks.map((coord) => coord.toString()));
  expect(unique.size).toBe(3);
});
