import { validateForm } from '../src/11-jugaad-form-validator.js';

describe('11 - Jugaad Form Validator (9 pts)', () => {

  const validForm = {
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    age: 20,
    pincode: "400001",
    state: "Maharashtra",
    agreeTerms: true
  };

  describe('All valid input', () => {
    test('Completely valid form returns isValid true with empty errors', () => {
      expect(validateForm(validForm)).toEqual({ isValid: true, errors: {} });
    });
  });

  describe('Name validation', () => {
    test('Empty name gives error', () => {
      const result = validateForm({ ...validForm, name: "" });
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe("Name must be 2-50 characters");
    });

    test('Single character name gives error', () => {
      const result = validateForm({ ...validForm, name: "R" });
      expect(result.errors.name).toBe("Name must be 2-50 characters");
    });

    test('Name with only spaces (after trim) gives error', () => {
      const result = validateForm({ ...validForm, name: "   " });
      expect(result.errors.name).toBe("Name must be 2-50 characters");
    });

    test('Name with exactly 2 characters is valid', () => {
      const result = validateForm({ ...validForm, name: "AB" });
      expect(result.errors.name).toBeUndefined();
    });

    test('Name with 50 characters is valid', () => {
      const result = validateForm({ ...validForm, name: "A".repeat(50) });
      expect(result.errors.name).toBeUndefined();
    });

    test('Name with 51 characters gives error', () => {
      const result = validateForm({ ...validForm, name: "A".repeat(51) });
      expect(result.errors.name).toBe("Name must be 2-50 characters");
    });
  });

  describe('Email validation', () => {
    test('Email without @ gives error', () => {
      const result = validateForm({ ...validForm, email: "rahulgmail.com" });
      expect(result.errors.email).toBe("Invalid email format");
    });

    test('Email without . after @ gives error', () => {
      const result = validateForm({ ...validForm, email: "rahul@gmailcom" });
      expect(result.errors.email).toBe("Invalid email format");
    });

    test('Valid email passes', () => {
      const result = validateForm({ ...validForm, email: "test@example.co.in" });
      expect(result.errors.email).toBeUndefined();
    });

    test('Email with multiple @ gives error', () => {
      const result = validateForm({ ...validForm, email: "test@@example.com" });
      expect(result.errors.email).toBe("Invalid email format");
    });
  });

  describe('Phone validation', () => {
    test('Phone with less than 10 digits gives error', () => {
      const result = validateForm({ ...validForm, phone: "98765" });
      expect(result.errors.phone).toBe("Invalid Indian phone number");
    });

    test('Phone starting with 5 gives error', () => {
      const result = validateForm({ ...validForm, phone: "5876543210" });
      expect(result.errors.phone).toBe("Invalid Indian phone number");
    });

    test('Phone starting with 9 is valid', () => {
      const result = validateForm({ ...validForm, phone: "9876543210" });
      expect(result.errors.phone).toBeUndefined();
    });

    test('Phone starting with 6 is valid', () => {
      const result = validateForm({ ...validForm, phone: "6123456789" });
      expect(result.errors.phone).toBeUndefined();
    });

    test('Phone with letters gives error', () => {
      const result = validateForm({ ...validForm, phone: "98765abcde" });
      expect(result.errors.phone).toBe("Invalid Indian phone number");
    });

    test('Phone with 11 digits gives error', () => {
      const result = validateForm({ ...validForm, phone: "98765432101" });
      expect(result.errors.phone).toBe("Invalid Indian phone number");
    });
  });

  describe('Age validation (with jugaad)', () => {
    test('Age as string number gets converted via parseInt', () => {
      const result = validateForm({ ...validForm, age: "22" });
      expect(result.errors.age).toBeUndefined();
    });

    test('Age 15 (too young) gives error', () => {
      const result = validateForm({ ...validForm, age: 15 });
      expect(result.errors.age).toBe("Age must be an integer between 16 and 100");
    });

    test('Age 16 is valid', () => {
      const result = validateForm({ ...validForm, age: 16 });
      expect(result.errors.age).toBeUndefined();
    });

    test('Age 100 is valid', () => {
      const result = validateForm({ ...validForm, age: 100 });
      expect(result.errors.age).toBeUndefined();
    });

    test('Age 101 gives error', () => {
      const result = validateForm({ ...validForm, age: 101 });
      expect(result.errors.age).toBe("Age must be an integer between 16 and 100");
    });

    test('Age "abc" gives error (isNaN)', () => {
      const result = validateForm({ ...validForm, age: "abc" });
      expect(result.errors.age).toBe("Age must be an integer between 16 and 100");
    });

    test('Age 25.5 (not integer) gives error', () => {
      const result = validateForm({ ...validForm, age: 25.5 });
      expect(result.errors.age).toBe("Age must be an integer between 16 and 100");
    });
  });

  describe('Pincode validation', () => {
    test('Pincode starting with 0 gives error', () => {
      const result = validateForm({ ...validForm, pincode: "012345" });
      expect(result.errors.pincode).toBe("Invalid Indian pincode");
    });

    test('Valid pincode "400001" passes', () => {
      const result = validateForm({ ...validForm, pincode: "400001" });
      expect(result.errors.pincode).toBeUndefined();
    });

    test('Pincode with 5 digits gives error', () => {
      const result = validateForm({ ...validForm, pincode: "12345" });
      expect(result.errors.pincode).toBe("Invalid Indian pincode");
    });

    test('Pincode with letters gives error', () => {
      const result = validateForm({ ...validForm, pincode: "40abc1" });
      expect(result.errors.pincode).toBe("Invalid Indian pincode");
    });
  });

  describe('State validation (nullish operators)', () => {
    test('null state gives error', () => {
      const result = validateForm({ ...validForm, state: null });
      expect(result.errors.state).toBe("State is required");
    });

    test('undefined state gives error', () => {
      const result = validateForm({ ...validForm, state: undefined });
      expect(result.errors.state).toBe("State is required");
    });

    test('Empty string state gives error', () => {
      const result = validateForm({ ...validForm, state: "" });
      expect(result.errors.state).toBe("State is required");
    });

    test('Valid state passes', () => {
      const result = validateForm({ ...validForm, state: "Karnataka" });
      expect(result.errors.state).toBeUndefined();
    });
  });

  describe('agreeTerms (truthy/falsy)', () => {
    test('false gives error', () => {
      const result = validateForm({ ...validForm, agreeTerms: false });
      expect(result.errors.agreeTerms).toBe("Must agree to terms");
    });

    test('0 (falsy) gives error', () => {
      const result = validateForm({ ...validForm, agreeTerms: 0 });
      expect(result.errors.agreeTerms).toBe("Must agree to terms");
    });

    test('"" (falsy) gives error', () => {
      const result = validateForm({ ...validForm, agreeTerms: "" });
      expect(result.errors.agreeTerms).toBe("Must agree to terms");
    });

    test('null (falsy) gives error', () => {
      const result = validateForm({ ...validForm, agreeTerms: null });
      expect(result.errors.agreeTerms).toBe("Must agree to terms");
    });

    test('"yes" (truthy) is valid', () => {
      const result = validateForm({ ...validForm, agreeTerms: "yes" });
      expect(result.errors.agreeTerms).toBeUndefined();
    });

    test('1 (truthy) is valid', () => {
      const result = validateForm({ ...validForm, agreeTerms: 1 });
      expect(result.errors.agreeTerms).toBeUndefined();
    });
  });

  describe('Multiple errors', () => {
    test('Multiple invalid fields produce multiple errors', () => {
      const result = validateForm({
        name: "", email: "bad", phone: "123", age: 10,
        pincode: "0123", state: null, agreeTerms: false
      });
      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors).length).toBe(7);
    });
  });
});
