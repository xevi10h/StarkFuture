/**
 * Returns the nth license plate in the DMV sequence
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function getNthLicensePlate(n: number): string {
  if (n < 0) throw new Error("Index must be non-negative");

  // Determine the group: numbers only (0), 1 letter, 2 letters, etc.
  let letterCount = 0;
  let remainingIndex = n;

  for (let letters = 0; letters <= 6; letters++) {
    const digits = 6 - letters;
    const groupSize = Math.pow(10, digits) * Math.pow(26, letters);

    if (remainingIndex < groupSize) {
      letterCount = letters;
      break;
    }

    remainingIndex -= groupSize;
  }

  const numDigits = 6 - letterCount;

  // Within this group, extract numeric and letter parts
  // Each letter combination has 10^numDigits number combinations
  const numbersPerLetterCombo = Math.pow(10, numDigits);
  const letterIndex = Math.floor(remainingIndex / numbersPerLetterCombo);
  const numberIndex = remainingIndex % numbersPerLetterCombo;

  // Build the numeric part
  const numericPart = numberIndex.toString().padStart(numDigits, '0');

  // Build the letter part (base-26 representation)
  let letterPart = '';
  let tempLetterIndex = letterIndex;

  for (let i = 0; i < letterCount; i++) {
    letterPart = String.fromCharCode(65 + (tempLetterIndex % 26)) + letterPart;
    tempLetterIndex = Math.floor(tempLetterIndex / 26);
  }

  return numericPart + letterPart;
}

// Test cases
function testLicensePlate() {
  const testCases = [
    { n: 0, expected: "000000" },
    { n: 1, expected: "000001" },
    { n: 999999, expected: "999999" },
    { n: 1000000, expected: "00000A" },
    { n: 1000001, expected: "00001A" },
    { n: 1099999, expected: "99999A" },
    { n: 1100000, expected: "00000B" },
    { n: 3599999, expected: "99999Z" },
    { n: 3600000, expected: "0000AA" },
    { n: 3600001, expected: "0001AA" },
    { n: 3609999, expected: "9999AA" },
    { n: 3610000, expected: "0000AB" },
    { n: 3619999, expected: "9999AB" },
    { n: 3620000, expected: "0000AC" },
    { n: 3859999, expected: "9999AZ" },
    { n: 3860000, expected: "0000BA" },
    { n: 10359999, expected: "9999ZZ" },
    { n: 10360000, expected: "000AAA" },
    { n: 10360001, expected: "001AAA" },
  ];

  console.log("Running license plate tests...\n");

  let passed = 0;
  let failed = 0;

  for (const { n, expected } of testCases) {
    const result = getNthLicensePlate(n);
    if (result === expected) {
      console.log(`✓ n=${n}: ${result}`);
      passed++;
    } else {
      console.log(`✗ n=${n}: expected ${expected}, got ${result}`);
      failed++;
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`);
}

// Run test if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testLicensePlate();
}

export { getNthLicensePlate, testLicensePlate };