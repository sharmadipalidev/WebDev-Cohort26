# JavaScript Data Types Lab

Master JavaScript data types and their built-in methods through **12 desi, story-based challenges**! From Aadhaar masking to IRCTC PNR checking, each problem puts you in a real Indian scenario where you work with strings, numbers, arrays, objects, booleans, and type coercion.

**Total: 100 points across 12 challenges**

---

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

---

## Getting Started

### 1. Accept the assignment

Click the GitHub Classroom invitation link shared by your instructor. This will create a **personal copy** of this repository under your GitHub account.

### 2. Clone your repository

```bash
git clone <your-repo-url>
cd js-datatypes-lab
```

Replace `<your-repo-url>` with the URL from your GitHub Classroom repo (the green **Code** button).

### 3. Install dependencies

```bash
npm install
```

### 4. Verify everything works

```bash
npm test
```

You should see **all tests failing** — that's expected! Your job is to make them pass.

> **Windows users:** If `npm test` gives errors, use `npm run test:win` instead.

---

## How to Solve the Challenges

### Step 1 — Open a challenge file

All challenges live in the `src/` folder. Start with `src/01-aadhaar-masker.js` and work your way up.

```
src/
├── 01-aadhaar-masker.js          ← Start here
├── 02-chai-dukaan-menu.js
├── 03-bollywood-title-fixer.js
├── 04-gst-calculator.js
├── 05-mumbai-local-pass.js
├── 06-whatsapp-parser.js
├── 07-school-report-card.js
├── 08-ipl-auction-purse.js
├── 09-zomato-order-builder.js
├── 10-upi-transaction-log.js
├── 11-jugaad-form-validator.js
└── 12-railway-pnr-system.js
```

### Step 2 — Read the story and rules

Each file has a detailed JSDoc comment at the top that explains:
- The **kahani** (story — a real Indian scenario)
- The **rules** your function must follow
- The **parameters** and **return values**
- Which **built-in methods** to use

Read it carefully — every edge case and requirement is described there.

### Step 3 — Write your solution

Replace `// Your code here` with your implementation:

```js
// Before
export function maskAadhaar(aadhaarNumber) {
  // Your code here
}

// After (example)
export function maskAadhaar(aadhaarNumber) {
  if (typeof aadhaarNumber !== 'string' || aadhaarNumber.length !== 12) {
    return "INVALID";
  }
  // ... your logic using slice, repeat, etc.
}
```

### Step 4 — Run the test for that challenge

```bash
npm test -- 01-aadhaar
```

You can use any part of the filename to match:

```bash
npm test -- 02-chai
npm test -- 03-bollywood
npm test -- gst
npm test -- whatsapp
npm test -- zomato
```

### Step 5 — Fix and repeat

If tests fail, read the error messages — they tell you exactly what was expected vs. what your function returned. Fix your code and run the test again.

### Step 6 — Move to the next challenge

Once all tests pass for a challenge, move on to the next one. They get progressively harder.

### Run all tests at once

```bash
npm test
```

### Watch mode (auto re-run on save)

```bash
npm run test:watch
```

This re-runs tests every time you save a file — very handy while working.

---

## Challenges

| #  | File | Kahani | Data Type & Methods | Points |
|----|------|--------|-------------------|--------|
| 01 | `01-aadhaar-masker.js` | Aadhaar Number Masker | **Strings**: slice, repeat, length, padStart | 7 |
| 02 | `02-chai-dukaan-menu.js` | Raju ki Chai Dukaan Menu | **Arrays**: Array.isArray, filter, map, join | 7 |
| 03 | `03-bollywood-title-fixer.js` | Bollywood Title Fixer | **Strings**: trim, split, map, join, charAt, toUpperCase, toLowerCase | 8 |
| 04 | `04-gst-calculator.js` | GST Calculator | **Numbers**: toFixed, parseFloat, Number.isFinite, Math.round | 8 |
| 05 | `05-mumbai-local-pass.js` | Mumbai Local Train Pass | **Strings+Objects**: template literals, slice, toUpperCase, typeof | 8 |
| 06 | `06-whatsapp-parser.js` | WhatsApp Message Parser | **Strings**: indexOf, substring, slice, includes, split, trim | 9 |
| 07 | `07-school-report-card.js` | School Report Card | **Objects+Numbers**: Object.keys/values/entries, reduce, filter, toFixed | 9 |
| 08 | `08-ipl-auction-purse.js` | IPL Auction Purse Manager | **Arrays+Objects**: reduce, filter, sort, find, every, some | 8 |
| 09 | `09-zomato-order-builder.js` | Zomato Order Builder | **Mixed**: map, reduce, split, parseFloat, Math.max, Math.min | 9 |
| 10 | `10-upi-transaction-log.js` | UPI Transaction Log | **Mixed**: filter, reduce, sort, every, some, Object.entries | 9 |
| 11 | `11-jugaad-form-validator.js` | Jugaad Form Validator | **Type coercion**: typeof, Boolean(), parseInt, isNaN, ?., ?? | 9 |
| 12 | `12-railway-pnr-system.js` | Railway PNR Status | **All types**: padEnd, slice, map, every, some, template literals | 9 |

---

## Submitting Your Work

### 1. Check your progress

Run all tests to see how many you've solved:

```bash
npm test
```

### 2. Stage your changes

```bash
git add src/
```

> **Important:** Only add files from `src/`. Do not modify or commit test files.

### 3. Commit your work

```bash
git commit -m "Complete datatypes lab"
```

You can commit as many times as you want — each push triggers a new grading run.

### 4. Push to GitHub

```bash
git push origin main
```

### 5. Check your grade

After pushing, go to your repository on GitHub:

1. Click the **Actions** tab
2. You'll see a workflow run in progress (or completed)
3. Click on it to see which tests passed and your total score out of 100

You can push again to improve your score — GitHub Classroom will always use the latest result.

---

## Tips for Success

- **JSDoc dhyan se padho** — every rule and edge case is described there
- **Built-in methods use karo** — har challenge mein hint diya hai kaunse methods kaam aayenge
- **typeof check karo** — validation mein typeof bahut important hai
- **Return types dhyan se dekho** — kuch functions objects return karte hain, kuch strings, kuch null
- **Don't modify the test files** — only edit files in `src/`
- **Commit often** — don't wait until you've solved everything to push
- **Use `console.log()`** — add temporary logs to debug, then remove them before submitting

---

## Concepts Covered

- **Strings**: length, charAt, indexOf, includes, startsWith, endsWith, slice, substring, split, join, replace, toUpperCase, toLowerCase, trim, repeat, padStart, padEnd, template literals
- **Numbers**: toFixed, parseInt, parseFloat, isNaN, Number.isFinite, Number.isInteger, Math.round, Math.max, Math.min, Math.abs
- **Booleans & Type Coercion**: typeof, truthy/falsy values, Boolean(), Number(), String(), implicit coercion
- **Arrays**: Array.isArray, length, map, filter, reduce, find, findIndex, every, some, sort, join, flat, concat, forEach
- **Objects**: Object.keys, Object.values, Object.entries, Object.assign, spread operator, destructuring
- **null/undefined**: typeof null quirk, nullish coalescing (??), optional chaining (?.), default values
- **Input validation** and edge case handling

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm test` shows "command not found" | Run `npm install` first |
| `npm test` fails on Windows | Use `npm run test:win` instead |
| All tests fail with `undefined` | You haven't written your solution yet — that's expected |
| Tests say "expected X but received Y" | Your logic is close but not matching the rules — re-read the JSDoc |
| `git push` is rejected | Run `git pull origin main` first, then push again |
| Tests pass locally but fail on GitHub | Make sure you pushed all your changes (`git status` to check) |

---

Good luck! Aur haan, built-in methods ka MDN documentation khul ke rakho!
