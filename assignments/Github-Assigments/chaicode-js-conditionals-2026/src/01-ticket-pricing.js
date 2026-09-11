/**
 * 🎬 The Starlight Cinema
 *
 * You've just been hired at Starlight Cinema! Your first task is to build
 * the automated ticket pricing system. The manager hands you a sticky note
 * with the pricing rules scribbled on it:
 *
 * Age Groups:
 *   - Children (0–12): $8
 *   - Teens (13–17): $12
 *   - Adults (18–59): $15
 *   - Seniors (60+): $10
 *
 * Weekend Surcharge:
 *   - Add $3 on weekends (when isWeekend is true)
 *
 * Rules:
 *   - If age is negative or not a number, return -1
 *   - isWeekend is a boolean
 *
 * @param {number} age - The customer's age
 * @param {boolean} isWeekend - Whether it's a weekend
 * @returns {number} The ticket price, or -1 for invalid input
 */
export function getTicketPrice(age, isWeekend) {
  if (age < 0 || typeof age !== "number") {
  return -1;
  }
  
  let price;
  if (age <= 12) {
  price = 8;
} else if (age >= 13 && age <= 17) {
  price = 12;
} else if (age >= 18 && age <= 59) {
  price = 15;
} else if (age >= 60) {
  price = 10;
}

if (isWeekend) {
  price += 3;
}
return price;
}

 
