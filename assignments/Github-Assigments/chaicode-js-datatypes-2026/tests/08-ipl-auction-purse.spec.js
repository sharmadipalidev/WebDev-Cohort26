import { iplAuctionSummary } from '../src/08-ipl-auction-purse.js';

describe('08 - IPL Auction Purse Manager (8 pts)', () => {

  describe('Basic calculations', () => {
    test('Total spent is correct sum of prices', () => {
      const result = iplAuctionSummary(
        { name: "CSK", purse: 9000 },
        [{ name: "Dhoni", role: "wk", price: 1200 }, { name: "Jadeja", role: "ar", price: 1600 }]
      );
      expect(result.totalSpent).toBe(2800);
    });

    test('Remaining = purse - totalSpent', () => {
      const result = iplAuctionSummary(
        { name: "CSK", purse: 9000 },
        [{ name: "Dhoni", role: "wk", price: 1200 }]
      );
      expect(result.remaining).toBe(7800);
    });

    test('playerCount matches array length', () => {
      const result = iplAuctionSummary(
        { name: "CSK", purse: 9000 },
        [{ name: "A", role: "bat", price: 100 }, { name: "B", role: "bowl", price: 200 }]
      );
      expect(result.playerCount).toBe(2);
    });

    test('averagePrice is correctly rounded', () => {
      const result = iplAuctionSummary(
        { name: "CSK", purse: 9000 },
        [{ name: "A", role: "bat", price: 100 }, { name: "B", role: "bowl", price: 201 }]
      );
      // (100 + 201) / 2 = 150.5, Math.round = 151
      expect(result.averagePrice).toBe(151);
    });

    test('teamName is taken from team object', () => {
      const result = iplAuctionSummary(
        { name: "MI", purse: 5000 },
        [{ name: "Rohit", role: "bat", price: 1600 }]
      );
      expect(result.teamName).toBe("MI");
    });
  });

  describe('Player stats', () => {
    test('costliestPlayer has highest price', () => {
      const result = iplAuctionSummary(
        { name: "CSK", purse: 9000 },
        [
          { name: "Dhoni", role: "wk", price: 1200 },
          { name: "Jadeja", role: "ar", price: 1600 },
          { name: "Raina", role: "bat", price: 800 }
        ]
      );
      expect(result.costliestPlayer.name).toBe("Jadeja");
      expect(result.costliestPlayer.price).toBe(1600);
    });

    test('cheapestPlayer has lowest price', () => {
      const result = iplAuctionSummary(
        { name: "CSK", purse: 9000 },
        [
          { name: "Dhoni", role: "wk", price: 1200 },
          { name: "Jadeja", role: "ar", price: 1600 },
          { name: "Raina", role: "bat", price: 800 }
        ]
      );
      expect(result.cheapestPlayer.name).toBe("Raina");
      expect(result.cheapestPlayer.price).toBe(800);
    });

    test('Single player is both costliest and cheapest', () => {
      const result = iplAuctionSummary(
        { name: "CSK", purse: 9000 },
        [{ name: "Dhoni", role: "wk", price: 1200 }]
      );
      expect(result.costliestPlayer.name).toBe("Dhoni");
      expect(result.cheapestPlayer.name).toBe("Dhoni");
    });
  });

  describe('Role grouping', () => {
    test('byRole correctly counts each role', () => {
      const result = iplAuctionSummary(
        { name: "CSK", purse: 9000 },
        [
          { name: "A", role: "bat", price: 100 },
          { name: "B", role: "bat", price: 200 },
          { name: "C", role: "bowl", price: 150 },
          { name: "D", role: "wk", price: 300 }
        ]
      );
      expect(result.byRole).toEqual({ bat: 2, bowl: 1, wk: 1 });
    });

    test('All same role', () => {
      const result = iplAuctionSummary(
        { name: "CSK", purse: 9000 },
        [
          { name: "A", role: "bowl", price: 100 },
          { name: "B", role: "bowl", price: 200 }
        ]
      );
      expect(result.byRole).toEqual({ bowl: 2 });
    });
  });

  describe('Budget check', () => {
    test('Under budget => isOverBudget false', () => {
      const result = iplAuctionSummary(
        { name: "CSK", purse: 9000 },
        [{ name: "A", role: "bat", price: 1000 }]
      );
      expect(result.isOverBudget).toBe(false);
    });

    test('Over budget => isOverBudget true, remaining negative', () => {
      const result = iplAuctionSummary(
        { name: "RCB", purse: 500 },
        [{ name: "Kohli", role: "bat", price: 1700 }]
      );
      expect(result.isOverBudget).toBe(true);
      expect(result.remaining).toBe(-1200);
    });

    test('Exactly at budget => isOverBudget false, remaining 0', () => {
      const result = iplAuctionSummary(
        { name: "MI", purse: 1000 },
        [{ name: "A", role: "bat", price: 1000 }]
      );
      expect(result.isOverBudget).toBe(false);
      expect(result.remaining).toBe(0);
    });
  });

  describe('Validation', () => {
    test('null team returns null', () => {
      expect(iplAuctionSummary(null, [{ name: "A", role: "bat", price: 100 }])).toBeNull();
    });

    test('Empty players array returns null', () => {
      expect(iplAuctionSummary({ name: "CSK", purse: 9000 }, [])).toBeNull();
    });

    test('Non-array players returns null', () => {
      expect(iplAuctionSummary({ name: "CSK", purse: 9000 }, "players")).toBeNull();
    });

    test('Negative purse returns null', () => {
      expect(iplAuctionSummary({ name: "CSK", purse: -100 }, [{ name: "A", role: "bat", price: 100 }])).toBeNull();
    });

    test('Missing purse returns null', () => {
      expect(iplAuctionSummary({ name: "CSK" }, [{ name: "A", role: "bat", price: 100 }])).toBeNull();
    });
  });
});
