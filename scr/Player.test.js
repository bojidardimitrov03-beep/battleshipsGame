import Player from './Player';
import Gameboard from './Gameboard';

describe('Player', () => {
  test('has its own gameboard', () => {
    const player = new Player();
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });
});

test('attack sends receiveAttack to enemy gameboard', () => {
    const player1 = new Player();
    const player2 = new Player();
    player1.attack(player2.gameboard, [0, 0]);
    expect(player2.gameboard.missedAttacks).toEqual([[0, 0]]);
  });