/**
 * 📦 Pincode Type Checker - Type Checking
 *
 * India Post ka naya system bana! Har parcel mein alag alag data types
 * aate hain. Tujhe check karna hai — yeh number hai ya string? Integer
 * hai ya float? Valid hai ya nahi? Type checking ka masala!
 *
 * Methods to explore: typeof, Number.isInteger(), Number.isFinite(),
 *   Number.isNaN(), Array.isArray(), Boolean()
 *
 * Functions:
 *
 *   1. getDataType(value)
 *      - typeof use karo, LEKIN special cases handle karo:
 *        - typeof null === "object" (JS ka famous bug!) → return "null"
 *        - typeof [] === "object" (Array bhi object hai) → return "array"
 *        - Baaki sab ke liye typeof ki value return karo
 *      - Example: getDataType(42) => "number"
 *      - Example: getDataType("hello") => "string"
 *      - Example: getDataType(null) => "null"
 *      - Example: getDataType([1,2]) => "array"
 *
 *   2. isValidParcelWeight(weight)
 *      - Number.isFinite() se check karo ki weight valid finite number hai
 *      - Weight positive bhi hona chahiye (> 0)
 *      - Infinity, NaN, ya non-number ke liye return false
 *      - Example: isValidParcelWeight(2.5) => true
 *      - Example: isValidParcelWeight(Infinity) => false
 *      - Example: isValidParcelWeight("5") => false (string hai, number nahi!)
 *
 *   3. isWholeNumber(value)
 *      - Number.isInteger() se check karo ki value whole number hai
 *      - Example: isWholeNumber(42) => true
 *      - Example: isWholeNumber(42.5) => false
 *      - Example: isWholeNumber("42") => false
 *
 *   4. isNotANumber(value)
 *      - Number.isNaN() se check karo ki value specifically NaN hai
 *      - NOTE: Number.isNaN() alag hai global isNaN() se!
 *        - Number.isNaN("hello") => false (string hai, NaN nahi)
 *        - isNaN("hello") => true (pehle convert karta hai)
 *      - Example: isNotANumber(NaN) => true
 *      - Example: isNotANumber("hello") => false
 *      - Example: isNotANumber(undefined) => false
 *
 *   5. isTruthy(value)
 *      - Boolean(value) se check karo ki value truthy hai ya nahi
 *      - JS mein Falsy values: false, 0, "", null, undefined, NaN
 *      - Sab kuch aur truthy hai (including [], {}, "0", "false")!
 *      - Example: isTruthy("hello") => true
 *      - Example: isTruthy(0) => false
 *      - Example: isTruthy([]) => true (haan, empty array truthy hai!)
 *
 * @example
 *   getDataType(null)            // => "null"
 *   getDataType([1,2,3])         // => "array"
 *   isValidParcelWeight(2.5)     // => true
 *   isTruthy("")                 // => false
 */
export function getDataType(value) {
  // Your code here
}

export function isValidParcelWeight(weight) {
  // Your code here
}

export function isWholeNumber(value) {
  // Your code here
}

export function isNotANumber(value) {
  // Your code here
}

export function isTruthy(value) {
  // Your code here
}
