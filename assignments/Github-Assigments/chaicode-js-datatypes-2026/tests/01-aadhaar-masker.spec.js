import { maskAadhaar } from '../src/01-aadhaar-masker.js';

describe('01 - Aadhaar Number Masker (7 pts)', () => {

  describe('Basic masking', () => {
    test('Standard 12-digit input masks correctly', () => {
      expect(maskAadhaar("123456781234")).toBe("XXXX-XXXX-1234");
    });

    test('Leading zeros preserved in last 4', () => {
      expect(maskAadhaar("987654320012")).toBe("XXXX-XXXX-0012");
    });

    test('All same digits', () => {
      expect(maskAadhaar("111111111111")).toBe("XXXX-XXXX-1111");
    });

    test('All zeros', () => {
      expect(maskAadhaar("000000000000")).toBe("XXXX-XXXX-0000");
    });

    test('Another valid input', () => {
      expect(maskAadhaar("567890123456")).toBe("XXXX-XXXX-3456");
    });
  });

  describe('Output format', () => {
    test('Output has exactly 14 characters (XXXX-XXXX-1234)', () => {
      expect(maskAadhaar("123456789012").length).toBe(14);
    });

    test('Dashes at correct positions (index 4 and 9)', () => {
      const result = maskAadhaar("123456789012");
      expect(result[4]).toBe("-");
      expect(result[9]).toBe("-");
    });

    test('First 8 masked characters are all X', () => {
      const result = maskAadhaar("123456789012");
      expect(result.slice(0, 4)).toBe("XXXX");
      expect(result.slice(5, 9)).toBe("XXXX");
    });
  });

  describe('Validation - invalid inputs', () => {
    test('Too short (4 digits) returns INVALID', () => {
      expect(maskAadhaar("1234")).toBe("INVALID");
    });

    test('Too long (13 digits) returns INVALID', () => {
      expect(maskAadhaar("1234567890123")).toBe("INVALID");
    });

    test('Contains letters returns INVALID', () => {
      expect(maskAadhaar("12345678abcd")).toBe("INVALID");
    });

    test('Contains dashes returns INVALID', () => {
      expect(maskAadhaar("1234-5678-1234")).toBe("INVALID");
    });

    test('Contains spaces returns INVALID', () => {
      expect(maskAadhaar("1234 5678 1234")).toBe("INVALID");
    });

    test('Number input (not string) returns INVALID', () => {
      expect(maskAadhaar(123456789012)).toBe("INVALID");
    });

    test('null returns INVALID', () => {
      expect(maskAadhaar(null)).toBe("INVALID");
    });

    test('undefined returns INVALID', () => {
      expect(maskAadhaar(undefined)).toBe("INVALID");
    });

    test('Empty string returns INVALID', () => {
      expect(maskAadhaar("")).toBe("INVALID");
    });
  });
});
