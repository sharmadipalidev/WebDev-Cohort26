import { calculateGST } from '../src/04-gst-calculator.js';

describe('04 - GST Calculator (8 pts)', () => {

  describe('GST rate by category', () => {
    test('Essential items have 0% GST', () => {
      expect(calculateGST(500, "essential")).toEqual({
        baseAmount: 500, gstRate: 0, gstAmount: 0, totalAmount: 500
      });
    });

    test('Food items have 5% GST', () => {
      expect(calculateGST(1000, "food")).toEqual({
        baseAmount: 1000, gstRate: 5, gstAmount: 50, totalAmount: 1050
      });
    });

    test('Standard items have 12% GST', () => {
      expect(calculateGST(1000, "standard")).toEqual({
        baseAmount: 1000, gstRate: 12, gstAmount: 120, totalAmount: 1120
      });
    });

    test('Electronics have 18% GST', () => {
      expect(calculateGST(1000, "electronics")).toEqual({
        baseAmount: 1000, gstRate: 18, gstAmount: 180, totalAmount: 1180
      });
    });

    test('Luxury items have 28% GST', () => {
      expect(calculateGST(1000, "luxury")).toEqual({
        baseAmount: 1000, gstRate: 28, gstAmount: 280, totalAmount: 1280
      });
    });
  });

  describe('Decimal precision', () => {
    test('GST amount rounded to 2 decimals', () => {
      const result = calculateGST(999.99, "food");
      expect(result.gstAmount).toBe(50);
      expect(result.totalAmount).toBe(1049.99);
    });

    test('Small amount with electronics GST', () => {
      const result = calculateGST(33.33, "electronics");
      expect(result.gstAmount).toBe(6);
      expect(result.totalAmount).toBe(39.33);
    });

    test('Precision with luxury rate', () => {
      const result = calculateGST(75.50, "luxury");
      expect(result.gstAmount).toBe(21.14);
      expect(result.totalAmount).toBe(96.64);
    });
  });

  describe('Case insensitivity', () => {
    test('"ELECTRONICS" works same as "electronics"', () => {
      expect(calculateGST(100, "ELECTRONICS")).toEqual({
        baseAmount: 100, gstRate: 18, gstAmount: 18, totalAmount: 118
      });
    });

    test('"Luxury" works same as "luxury"', () => {
      expect(calculateGST(100, "Luxury")).toEqual({
        baseAmount: 100, gstRate: 28, gstAmount: 28, totalAmount: 128
      });
    });

    test('"FOOD" works same as "food"', () => {
      expect(calculateGST(200, "FOOD")).toEqual({
        baseAmount: 200, gstRate: 5, gstAmount: 10, totalAmount: 210
      });
    });
  });

  describe('Unknown category', () => {
    test('Unknown category returns null', () => {
      expect(calculateGST(100, "custom")).toBeNull();
    });

    test('Empty string category returns null', () => {
      expect(calculateGST(100, "")).toBeNull();
    });
  });

  describe('Validation', () => {
    test('Negative amount returns null', () => {
      expect(calculateGST(-100, "food")).toBeNull();
    });

    test('Zero amount returns null', () => {
      expect(calculateGST(0, "food")).toBeNull();
    });

    test('String amount returns null', () => {
      expect(calculateGST("thousand", "food")).toBeNull();
    });

    test('Infinity returns null', () => {
      expect(calculateGST(Infinity, "food")).toBeNull();
    });

    test('NaN amount returns null', () => {
      expect(calculateGST(NaN, "food")).toBeNull();
    });

    test('Category as number returns null', () => {
      expect(calculateGST(100, 18)).toBeNull();
    });

    test('null amount returns null', () => {
      expect(calculateGST(null, "food")).toBeNull();
    });
  });
});
