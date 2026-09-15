import { formatChaiMenu } from '../src/02-chai-dukaan-menu.js';

describe('02 - Raju ki Chai Dukaan Menu (7 pts)', () => {

  describe('Basic formatting', () => {
    test('Single item formatted correctly', () => {
      expect(formatChaiMenu([{ name: "masala chai", price: 15 }]))
        .toBe("MASALA CHAI - Rs.15");
    });

    test('Two items joined with pipe separator', () => {
      expect(formatChaiMenu([
        { name: "masala chai", price: 15 },
        { name: "samosa", price: 12 }
      ])).toBe("MASALA CHAI - Rs.15 | SAMOSA - Rs.12");
    });

    test('Multiple items all formatted', () => {
      expect(formatChaiMenu([
        { name: "cutting chai", price: 10 },
        { name: "bun maska", price: 20 },
        { name: "vada pav", price: 15 }
      ])).toBe("CUTTING CHAI - Rs.10 | BUN MASKA - Rs.20 | VADA PAV - Rs.15");
    });
  });

  describe('Name transformations', () => {
    test('Already uppercase name stays uppercase', () => {
      expect(formatChaiMenu([{ name: "CHAI", price: 10 }]))
        .toBe("CHAI - Rs.10");
    });

    test('Mixed case becomes full uppercase', () => {
      expect(formatChaiMenu([{ name: "Masala Chai", price: 15 }]))
        .toBe("MASALA CHAI - Rs.15");
    });
  });

  describe('Filtering invalid items', () => {
    test('Skips item with price 0', () => {
      expect(formatChaiMenu([
        { name: "chai", price: 10 },
        { name: "pani", price: 0 },
        { name: "samosa", price: 12 }
      ])).toBe("CHAI - Rs.10 | SAMOSA - Rs.12");
    });

    test('Skips item with negative price', () => {
      expect(formatChaiMenu([
        { name: "chai", price: 10 },
        { name: "expired", price: -5 }
      ])).toBe("CHAI - Rs.10");
    });

    test('Skips item with empty name', () => {
      expect(formatChaiMenu([
        { name: "", price: 10 },
        { name: "chai", price: 15 }
      ])).toBe("CHAI - Rs.15");
    });

    test('All items invalid returns empty string', () => {
      expect(formatChaiMenu([
        { name: "", price: 10 },
        { name: "pani", price: 0 }
      ])).toBe("");
    });

    test('Mix of valid and invalid items', () => {
      expect(formatChaiMenu([
        { name: "chai", price: 10 },
        { name: "", price: 20 },
        { name: "samosa", price: -5 },
        { name: "kachori", price: 8 }
      ])).toBe("CHAI - Rs.10 | KACHORI - Rs.8");
    });
  });

  describe('Validation', () => {
    test('Empty array returns empty string', () => {
      expect(formatChaiMenu([])).toBe("");
    });

    test('Non-array input returns empty string', () => {
      expect(formatChaiMenu("menu")).toBe("");
    });

    test('null returns empty string', () => {
      expect(formatChaiMenu(null)).toBe("");
    });

    test('undefined returns empty string', () => {
      expect(formatChaiMenu(undefined)).toBe("");
    });
  });
});
