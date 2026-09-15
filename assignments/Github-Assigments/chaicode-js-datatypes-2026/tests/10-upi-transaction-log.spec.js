import { analyzeUPITransactions } from '../src/10-upi-transaction-log.js';

describe('10 - UPI Transaction Log Analyzer (9 pts)', () => {

  const sampleTransactions = [
    { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
    { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
    { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" },
    { id: "T4", type: "debit", amount: 1500, to: "Rent", category: "housing", date: "2025-01-05" },
    { id: "T5", type: "credit", amount: 300, to: "Rahul", category: "refund", date: "2025-01-06" }
  ];

  describe('Credit/Debit calculations', () => {
    test('totalCredit sums only credit transactions', () => {
      const result = analyzeUPITransactions(sampleTransactions);
      expect(result.totalCredit).toBe(5300); // 5000 + 300
    });

    test('totalDebit sums only debit transactions', () => {
      const result = analyzeUPITransactions(sampleTransactions);
      expect(result.totalDebit).toBe(1800); // 200 + 100 + 1500
    });

    test('netBalance = totalCredit - totalDebit', () => {
      const result = analyzeUPITransactions(sampleTransactions);
      expect(result.netBalance).toBe(3500);
    });

    test('netBalance can be negative', () => {
      const result = analyzeUPITransactions([
        { id: "T1", type: "debit", amount: 5000, to: "Rent", category: "housing", date: "2025-01-01" },
        { id: "T2", type: "credit", amount: 1000, to: "Refund", category: "refund", date: "2025-01-02" }
      ]);
      expect(result.netBalance).toBe(-4000);
    });
  });

  describe('Statistics', () => {
    test('transactionCount is correct', () => {
      const result = analyzeUPITransactions(sampleTransactions);
      expect(result.transactionCount).toBe(5);
    });

    test('avgTransaction correctly rounded', () => {
      const result = analyzeUPITransactions(sampleTransactions);
      // (5000 + 200 + 100 + 1500 + 300) / 5 = 1420
      expect(result.avgTransaction).toBe(1420);
    });

    test('highestTransaction is the one with max amount', () => {
      const result = analyzeUPITransactions(sampleTransactions);
      expect(result.highestTransaction.id).toBe("T1");
      expect(result.highestTransaction.amount).toBe(5000);
    });
  });

  describe('Category breakdown', () => {
    test('Categories sum correctly', () => {
      const result = analyzeUPITransactions(sampleTransactions);
      expect(result.categoryBreakdown.income).toBe(5000);
      expect(result.categoryBreakdown.food).toBe(300);
      expect(result.categoryBreakdown.housing).toBe(1500);
      expect(result.categoryBreakdown.refund).toBe(300);
    });

    test('Single category totals correctly', () => {
      const result = analyzeUPITransactions([
        { id: "T1", type: "debit", amount: 200, to: "A", category: "food", date: "2025-01-01" },
        { id: "T2", type: "debit", amount: 150, to: "B", category: "food", date: "2025-01-02" }
      ]);
      expect(result.categoryBreakdown).toEqual({ food: 350 });
    });
  });

  describe('Frequent contact', () => {
    test('Most frequent contact returned', () => {
      const result = analyzeUPITransactions(sampleTransactions);
      expect(result.frequentContact).toBe("Swiggy"); // appears 2 times
    });

    test('Single transaction - that contact is frequent', () => {
      const result = analyzeUPITransactions([
        { id: "T1", type: "debit", amount: 500, to: "Zomato", category: "food", date: "2025-01-01" }
      ]);
      expect(result.frequentContact).toBe("Zomato");
    });
  });

  describe('Boolean checks', () => {
    test('allAbove100 is true when every amount > 100', () => {
      const result = analyzeUPITransactions([
        { id: "T1", type: "credit", amount: 500, to: "A", category: "a", date: "2025-01-01" },
        { id: "T2", type: "debit", amount: 200, to: "B", category: "b", date: "2025-01-02" }
      ]);
      expect(result.allAbove100).toBe(true);
    });

    test('allAbove100 is false when any amount <= 100', () => {
      const result = analyzeUPITransactions(sampleTransactions);
      expect(result.allAbove100).toBe(false); // T3 has 100
    });

    test('hasLargeTransaction is true when some amount >= 5000', () => {
      const result = analyzeUPITransactions(sampleTransactions);
      expect(result.hasLargeTransaction).toBe(true); // T1 has 5000
    });

    test('hasLargeTransaction is false when no amount >= 5000', () => {
      const result = analyzeUPITransactions([
        { id: "T1", type: "debit", amount: 200, to: "A", category: "a", date: "2025-01-01" }
      ]);
      expect(result.hasLargeTransaction).toBe(false);
    });
  });

  describe('Skipping invalid transactions', () => {
    test('Skips transactions with negative amount', () => {
      const result = analyzeUPITransactions([
        { id: "T1", type: "credit", amount: 500, to: "A", category: "a", date: "2025-01-01" },
        { id: "T2", type: "debit", amount: -100, to: "B", category: "b", date: "2025-01-02" }
      ]);
      expect(result.transactionCount).toBe(1);
      expect(result.totalDebit).toBe(0);
    });

    test('Skips transactions with invalid type', () => {
      const result = analyzeUPITransactions([
        { id: "T1", type: "credit", amount: 500, to: "A", category: "a", date: "2025-01-01" },
        { id: "T2", type: "transfer", amount: 200, to: "B", category: "b", date: "2025-01-02" }
      ]);
      expect(result.transactionCount).toBe(1);
    });

    test('All invalid transactions returns null', () => {
      expect(analyzeUPITransactions([
        { id: "T1", type: "transfer", amount: 500, to: "A", category: "a", date: "2025-01-01" },
        { id: "T2", type: "debit", amount: -100, to: "B", category: "b", date: "2025-01-02" }
      ])).toBeNull();
    });
  });

  describe('Validation', () => {
    test('Empty array returns null', () => {
      expect(analyzeUPITransactions([])).toBeNull();
    });

    test('Non-array returns null', () => {
      expect(analyzeUPITransactions("transactions")).toBeNull();
    });

    test('null returns null', () => {
      expect(analyzeUPITransactions(null)).toBeNull();
    });
  });
});
