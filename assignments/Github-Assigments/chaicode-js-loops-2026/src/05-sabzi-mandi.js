/**
 * 🥬 Amma ki Sabzi Mandi Shopping
 *
 * Amma subah subah sabzi mandi gayi hain. Unke paas ek shopping list hai
 * (kaunsi sabzi, kitne kg) aur mandi mein har sabzi ka rate alag hai.
 * Amma smart hain - agar koi sabzi Rs 80/kg se zyada hai, toh nahi leni!
 *
 * Rules (use for...of loop):
 *   - shoppingList is an array of objects: [{ name: "aloo", qty: 2 }, ...]
 *   - priceList is an object: { aloo: 30, tamatar: 40, ... }
 *   - Loop through each item in shoppingList using for...of
 *   - Skip the item if:
 *     (a) sabzi ka naam priceList mein nahi hai (not available in mandi)
 *     (b) price per kg > Rs 80 (too expensive, Amma says "bahut mehenga hai!")
 *   - For valid items, add to bill and build items array
 *
 * @param {Array<{name: string, qty: number}>} shoppingList - Amma ki list
 * @param {Object<string, number>} priceList - Mandi ke rates (per kg)
 * @returns {{ items: Array<{name: string, qty: number, cost: number}>, totalBill: number }}
 *
 * @example
 *   sabziMandiBill(
 *     [{ name: "aloo", qty: 2 }, { name: "shimla mirch", qty: 1 }],
 *     { aloo: 30, tamatar: 40, shimla_mirch: 90 }
 *   )
 *   // shimla mirch not in priceList (key mismatch), shimla_mirch > 80
 *   // => { items: [{ name: "aloo", qty: 2, cost: 60 }], totalBill: 60 }
 *
 *   sabziMandiBill([], { aloo: 30 })
 *   // => { items: [], totalBill: 0 }
 */
export function sabziMandiBill(shoppingList, priceList) {
  // Your code here
}
