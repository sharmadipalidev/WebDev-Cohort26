import { generateReportCard } from '../src/07-school-report-card.js';

describe('07 - School Report Card Generator (9 pts)', () => {

  describe('Grade calculation', () => {
    test('Percentage >= 90 gives A+', () => {
      const result = generateReportCard({ name: "Topper", marks: { maths: 95, science: 92, english: 96 } });
      expect(result.grade).toBe("A+");
    });

    test('Percentage >= 80 but < 90 gives A', () => {
      const result = generateReportCard({ name: "Good", marks: { maths: 85, science: 82, english: 80 } });
      expect(result.grade).toBe("A");
    });

    test('Percentage >= 70 but < 80 gives B', () => {
      const result = generateReportCard({ name: "Decent", marks: { maths: 75, science: 72, english: 70 } });
      expect(result.grade).toBe("B");
    });

    test('Percentage >= 60 but < 70 gives C', () => {
      const result = generateReportCard({ name: "Average", marks: { maths: 65, science: 62, english: 60 } });
      expect(result.grade).toBe("C");
    });

    test('Percentage >= 40 but < 60 gives D', () => {
      const result = generateReportCard({ name: "Below", marks: { maths: 45, science: 42, english: 50 } });
      expect(result.grade).toBe("D");
    });

    test('Percentage < 40 gives F', () => {
      const result = generateReportCard({ name: "Fail", marks: { maths: 35, science: 28, english: 30 } });
      expect(result.grade).toBe("F");
    });
  });

  describe('Statistics calculation', () => {
    test('totalMarks is correct sum', () => {
      const result = generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } });
      expect(result.totalMarks).toBe(255);
    });

    test('percentage rounded to 2 decimal places', () => {
      const result = generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } });
      expect(result.percentage).toBe(85);
    });

    test('percentage with decimals', () => {
      const result = generateReportCard({ name: "Priya", marks: { maths: 73, science: 67, english: 81 } });
      // (73+67+81) / 300 * 100 = 73.67
      expect(result.percentage).toBe(73.67);
    });

    test('highestSubject is correct', () => {
      const result = generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } });
      expect(result.highestSubject).toBe("science");
    });

    test('lowestSubject is correct', () => {
      const result = generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } });
      expect(result.lowestSubject).toBe("english");
    });

    test('subjectCount is correct', () => {
      const result = generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } });
      expect(result.subjectCount).toBe(3);
    });

    test('name is preserved', () => {
      const result = generateReportCard({ name: "Rahul", marks: { maths: 85 } });
      expect(result.name).toBe("Rahul");
    });
  });

  describe('Pass/Fail subjects', () => {
    test('All passed subjects (>= 40)', () => {
      const result = generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92 } });
      expect(result.passedSubjects).toEqual(["maths", "science"]);
      expect(result.failedSubjects).toEqual([]);
    });

    test('All failed subjects (< 40)', () => {
      const result = generateReportCard({ name: "Fail", marks: { maths: 20, science: 15 } });
      expect(result.passedSubjects).toEqual([]);
      expect(result.failedSubjects).toEqual(["maths", "science"]);
    });

    test('Mix of passed and failed', () => {
      const result = generateReportCard({ name: "Mix", marks: { maths: 85, science: 30, english: 55 } });
      expect(result.passedSubjects).toContain("maths");
      expect(result.passedSubjects).toContain("english");
      expect(result.failedSubjects).toContain("science");
    });

    test('Exactly 40 marks counts as passed', () => {
      const result = generateReportCard({ name: "Edge", marks: { maths: 40 } });
      expect(result.passedSubjects).toContain("maths");
      expect(result.failedSubjects).not.toContain("maths");
    });
  });

  describe('Edge cases', () => {
    test('Single subject student', () => {
      const result = generateReportCard({ name: "Solo", marks: { maths: 75 } });
      expect(result.totalMarks).toBe(75);
      expect(result.percentage).toBe(75);
      expect(result.highestSubject).toBe("maths");
      expect(result.lowestSubject).toBe("maths");
      expect(result.subjectCount).toBe(1);
    });
  });

  describe('Validation', () => {
    test('null student returns null', () => {
      expect(generateReportCard(null)).toBeNull();
    });

    test('Missing name returns null', () => {
      expect(generateReportCard({ marks: { maths: 85 } })).toBeNull();
    });

    test('Empty name returns null', () => {
      expect(generateReportCard({ name: "", marks: { maths: 85 } })).toBeNull();
    });

    test('Missing marks returns null', () => {
      expect(generateReportCard({ name: "Rahul" })).toBeNull();
    });

    test('Empty marks object returns null', () => {
      expect(generateReportCard({ name: "Rahul", marks: {} })).toBeNull();
    });

    test('Mark out of range (> 100) returns null', () => {
      expect(generateReportCard({ name: "Rahul", marks: { maths: 150 } })).toBeNull();
    });

    test('Negative mark returns null', () => {
      expect(generateReportCard({ name: "Rahul", marks: { maths: -10 } })).toBeNull();
    });

    test('Non-number mark returns null', () => {
      expect(generateReportCard({ name: "Rahul", marks: { maths: "eighty" } })).toBeNull();
    });

    test('Non-object input returns null', () => {
      expect(generateReportCard("student")).toBeNull();
    });
  });
});
