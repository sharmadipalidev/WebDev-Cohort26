import { buildZomatoOrder } from '../src/09-zomato-order-builder.js';

describe('09 - Zomato Order Builder (9 pts)', () => {

  describe('Item calculation', () => {
    test('Single item, no addons', () => {
      const result = buildZomatoOrder([{ name: "Dal Rice", price: 150, qty: 1, addons: [] }]);
      expect(result.items[0]).toEqual({
        name: "Dal Rice", qty: 1, basePrice: 150, addonTotal: 0, itemTotal: 150
      });
    });

    test('Single item with addons', () => {
      const result = buildZomatoOrder([
        { name: "Biryani", price: 300, qty: 1, addons: ["Raita:30", "Extra Masala:20"] }
      ]);
      expect(result.items[0]).toEqual({
        name: "Biryani", qty: 1, basePrice: 300, addonTotal: 50, itemTotal: 350
      });
    });

    test('Item with quantity > 1', () => {
      const result = buildZomatoOrder([
        { name: "Naan", price: 40, qty: 3, addons: ["Butter:10"] }
      ]);
      // (40 + 10) * 3 = 150
      expect(result.items[0].itemTotal).toBe(150);
    });

    test('Multiple items calculated correctly', () => {
      const result = buildZomatoOrder([
        { name: "A", price: 100, qty: 1, addons: [] },
        { name: "B", price: 200, qty: 2, addons: ["X:50"] }
      ]);
      expect(result.subtotal).toBe(100 + (200 + 50) * 2); // 100 + 500 = 600
    });

    test('Item with qty 0 is skipped', () => {
      const result = buildZomatoOrder([
        { name: "A", price: 100, qty: 1, addons: [] },
        { name: "B", price: 200, qty: 0, addons: [] }
      ]);
      expect(result.items.length).toBe(1);
      expect(result.subtotal).toBe(100);
    });

    test('Item with no addons property defaults to empty', () => {
      const result = buildZomatoOrder([{ name: "Chai", price: 20, qty: 2 }]);
      expect(result.items[0].addonTotal).toBe(0);
      expect(result.items[0].itemTotal).toBe(40);
    });
  });

  describe('Delivery fee tiers', () => {
    test('Subtotal < 500 => delivery Rs 30', () => {
      const result = buildZomatoOrder([{ name: "A", price: 200, qty: 1, addons: [] }]);
      expect(result.deliveryFee).toBe(30);
    });

    test('Subtotal 500-999 => delivery Rs 15', () => {
      const result = buildZomatoOrder([{ name: "A", price: 500, qty: 1, addons: [] }]);
      expect(result.deliveryFee).toBe(15);
    });

    test('Subtotal >= 1000 => free delivery', () => {
      const result = buildZomatoOrder([{ name: "A", price: 1000, qty: 1, addons: [] }]);
      expect(result.deliveryFee).toBe(0);
    });
  });

  describe('GST calculation', () => {
    test('GST is 5% of subtotal rounded to 2 decimals', () => {
      const result = buildZomatoOrder([{ name: "A", price: 333, qty: 1, addons: [] }]);
      // 333 * 0.05 = 16.65
      expect(result.gst).toBe(16.65);
    });
  });

  describe('Coupon codes', () => {
    test('FIRST50 applies 50% off subtotal, capped at 150', () => {
      const result = buildZomatoOrder(
        [{ name: "A", price: 500, qty: 2, addons: [] }],
        "FIRST50"
      );
      // subtotal 1000, 50% = 500, capped at 150
      expect(result.discount).toBe(150);
    });

    test('FIRST50 when 50% is less than 150', () => {
      const result = buildZomatoOrder(
        [{ name: "A", price: 100, qty: 1, addons: [] }],
        "FIRST50"
      );
      // subtotal 100, 50% = 50, less than 150
      expect(result.discount).toBe(50);
    });

    test('first50 works (case-insensitive)', () => {
      const result = buildZomatoOrder(
        [{ name: "A", price: 100, qty: 1, addons: [] }],
        "first50"
      );
      expect(result.discount).toBe(50);
    });

    test('FLAT100 applies flat Rs 100 off', () => {
      const result = buildZomatoOrder(
        [{ name: "A", price: 300, qty: 1, addons: [] }],
        "FLAT100"
      );
      expect(result.discount).toBe(100);
    });

    test('FREESHIP makes delivery 0 (discount = delivery fee)', () => {
      const result = buildZomatoOrder(
        [{ name: "A", price: 200, qty: 1, addons: [] }],
        "FREESHIP"
      );
      // subtotal 200 < 500, delivery would be 30
      expect(result.discount).toBe(30);
      expect(result.deliveryFee).toBe(0);
    });

    test('No coupon => discount 0', () => {
      const result = buildZomatoOrder([{ name: "A", price: 200, qty: 1, addons: [] }]);
      expect(result.discount).toBe(0);
    });

    test('Invalid coupon string => discount 0', () => {
      const result = buildZomatoOrder(
        [{ name: "A", price: 200, qty: 1, addons: [] }],
        "INVALID"
      );
      expect(result.discount).toBe(0);
    });
  });

  describe('Grand total', () => {
    test('grandTotal = subtotal + deliveryFee + gst - discount', () => {
      const result = buildZomatoOrder(
        [{ name: "Biryani", price: 300, qty: 1, addons: ["Raita:30"] }],
        "FLAT100"
      );
      // subtotal: 330, delivery: 30, gst: 16.5, discount: 100
      // grandTotal: 330 + 30 + 16.5 - 100 = 276.5
      expect(result.grandTotal).toBe(276.5);
    });

    test('grandTotal never goes below 0', () => {
      const result = buildZomatoOrder(
        [{ name: "A", price: 50, qty: 1, addons: [] }],
        "FLAT100"
      );
      // subtotal: 50, delivery: 30, gst: 2.5, discount: 100
      // 50 + 30 + 2.5 - 100 = -17.5 => clamped to 0
      expect(result.grandTotal).toBe(0);
    });
  });

  describe('Validation', () => {
    test('Empty cart returns null', () => {
      expect(buildZomatoOrder([])).toBeNull();
    });

    test('Non-array cart returns null', () => {
      expect(buildZomatoOrder("cart")).toBeNull();
    });

    test('null cart returns null', () => {
      expect(buildZomatoOrder(null)).toBeNull();
    });
  });
});
