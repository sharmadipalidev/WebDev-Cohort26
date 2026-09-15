import { generateLocalPass } from '../src/05-mumbai-local-pass.js';

describe('05 - Mumbai Local Train Pass (8 pts)', () => {

  describe('Basic pass generation', () => {
    test('First class pass generated correctly', () => {
      const result = generateLocalPass({
        name: "rahul sharma", from: "dadar", to: "andheri", classType: "first"
      });
      expect(result).toBe(
        "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
      );
    });

    test('Second class pass generated correctly', () => {
      const result = generateLocalPass({
        name: "priya patel", from: "cst", to: "thane", classType: "second"
      });
      expect(result).toBe(
        "MUMBAI LOCAL PASS\n---\nName: PRIYA PATEL\nFrom: Cst\nTo: Thane\nClass: SECOND\nPass ID: SCSTTHA"
      );
    });

    test('Single word name', () => {
      const result = generateLocalPass({
        name: "amit", from: "borivali", to: "churchgate", classType: "first"
      });
      expect(result).toContain("Name: AMIT");
      expect(result).toContain("Pass ID: FBORCHU");
    });
  });

  describe('Name formatting', () => {
    test('Name is converted to uppercase', () => {
      const result = generateLocalPass({
        name: "vikram singh", from: "dadar", to: "cst", classType: "first"
      });
      expect(result).toContain("Name: VIKRAM SINGH");
    });
  });

  describe('Station Title Case', () => {
    test('From and To are in Title Case', () => {
      const result = generateLocalPass({
        name: "test", from: "DADAR", to: "andheri", classType: "first"
      });
      expect(result).toContain("From: Dadar");
      expect(result).toContain("To: Andheri");
    });
  });

  describe('Pass ID generation', () => {
    test('Pass ID uses first char of classType + first 3 of from + first 3 of to', () => {
      const result = generateLocalPass({
        name: "test", from: "mumbai", to: "pune", classType: "second"
      });
      expect(result).toContain("Pass ID: SMUMPUN");
    });

    test('Pass ID letters are all uppercase', () => {
      const result = generateLocalPass({
        name: "test", from: "dadar", to: "andheri", classType: "first"
      });
      expect(result).toContain("Pass ID: FDADAND");
    });
  });

  describe('Case insensitivity for classType', () => {
    test('"FIRST" works same as "first"', () => {
      const result = generateLocalPass({
        name: "test", from: "dadar", to: "cst", classType: "FIRST"
      });
      expect(result).toContain("Class: FIRST");
    });

    test('"Second" works same as "second"', () => {
      const result = generateLocalPass({
        name: "test", from: "dadar", to: "cst", classType: "Second"
      });
      expect(result).toContain("Class: SECOND");
    });
  });

  describe('Template literal format', () => {
    test('Output starts with MUMBAI LOCAL PASS', () => {
      const result = generateLocalPass({
        name: "test", from: "dadar", to: "cst", classType: "first"
      });
      expect(result.startsWith("MUMBAI LOCAL PASS")).toBe(true);
    });

    test('Output contains \\n line breaks', () => {
      const result = generateLocalPass({
        name: "test", from: "dadar", to: "cst", classType: "first"
      });
      const lines = result.split("\n");
      expect(lines.length).toBe(7);
      expect(lines[1]).toBe("---");
    });
  });

  describe('Validation', () => {
    test('null input returns INVALID PASS', () => {
      expect(generateLocalPass(null)).toBe("INVALID PASS");
    });

    test('Non-object input returns INVALID PASS', () => {
      expect(generateLocalPass("passenger")).toBe("INVALID PASS");
    });

    test('Missing name returns INVALID PASS', () => {
      expect(generateLocalPass({ from: "dadar", to: "cst", classType: "first" }))
        .toBe("INVALID PASS");
    });

    test('Empty name returns INVALID PASS', () => {
      expect(generateLocalPass({ name: "", from: "dadar", to: "cst", classType: "first" }))
        .toBe("INVALID PASS");
    });

    test('Missing from returns INVALID PASS', () => {
      expect(generateLocalPass({ name: "test", to: "cst", classType: "first" }))
        .toBe("INVALID PASS");
    });

    test('Invalid classType returns INVALID PASS', () => {
      expect(generateLocalPass({ name: "test", from: "dadar", to: "cst", classType: "third" }))
        .toBe("INVALID PASS");
    });

    test('undefined input returns INVALID PASS', () => {
      expect(generateLocalPass(undefined)).toBe("INVALID PASS");
    });
  });
});
