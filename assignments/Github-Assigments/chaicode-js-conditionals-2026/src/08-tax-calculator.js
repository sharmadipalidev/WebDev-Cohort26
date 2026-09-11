/**
 * 💰 Sam's Tax Calculator
 *
 * Sam is a freelance graphic designer who dreads tax season every year.
 * Help Sam by building a tax calculator that uses progressive tax brackets.
 *
 * How progressive tax works:
 *   You don't pay the same rate on ALL your income. Each "slice" of income
 *   is taxed at its own rate:
 *
 *   Bracket 1: $0 – $10,000        → 0%  (tax-free!)
 *   Bracket 2: $10,001 – $30,000   → 10% (only on the amount ABOVE $10,000)
 *   Bracket 3: $30,001 – $70,000   → 20% (only on the amount ABOVE $30,000)
 *   Bracket 4: Over $70,000        → 30% (only on the amount ABOVE $70,000)
 *
 * Examples:
 *   - Income $8,000   → Tax = $0 (all in bracket 1)
 *   - Income $20,000  → Tax = 10% of ($20,000 - $10,000) = $1,000
 *   - Income $50,000  → Tax = $2,000 + 20% of ($50,000 - $30,000) = $6,000
 *   - Income $100,000 → Tax = $2,000 + $8,000 + 30% of ($100,000 - $70,000) = $19,000
 *
 * Rules:
 *   - If income is 0 or negative, return 0
 *
 * @param {number} income - Annual income in dollars
 * @returns {number} Total tax amount owed
 */
export function calculateTax(income) {
  if (income <= 0) return 0;

  if (income <= 10000) {
    return 0;
  }
  if (income > 10000 && income <= 30000) {
    let updateIncome = income - 10000;
    let tax = updateIncome * 0.1;
    return tax;
  }
  if (income > 30000 && income <= 70000) {
    let updateIncome = income - 30000;
    let tax = updateIncome * 0.2;
    return tax + 2000;
  }
  if (income > 70000) {
    let updateIncome = income - 70000;
    let tax = updateIncome * 0.3;
    return tax + 2000 + 8000;
  }
}
