import Ship from './ship';

describe('Ship', () => {
  test('has the correct length', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
  });
});

describe('hits', () => {
    test('starts at 0', () => {
      const ship = new Ship(3);
      expect(ship.hits).toBe(0);
    });
  
    test('increases after hit()', () => {
      const ship = new Ship(3);
      ship.hit();
      expect(ship.hits).toBe(1);
    });
  });

  describe('isSunk', () => {
    test('returns false if not enough hits', () => {
      const ship = new Ship(3);
      ship.hit();
      expect(ship.isSunk()).toBe(false);
    });
  
    test('returns true when hits equal length', () => {
      const ship = new Ship(3);
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
  });