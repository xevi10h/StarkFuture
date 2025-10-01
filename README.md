# Stark Future - Technical Assessment

This repository contains solutions to the backend technical assessment exercises.

## 📁 Structure

```
.
├── ConcurrencyExercise.ts    # URL fetching with controlled concurrency
├── LicensePlateProblem.ts    # DMV license plate sequence generator
└── README.md
```

## 🚀 Solutions

### 1. ConcurrencyExercise.ts

**Problem:** Implement asynchronous URL fetching with a maximum concurrency limit.

**Solution Highlights:**
- Uses Promise.race() to maintain exactly MAX_CONCURRENCY active requests
- Preserves input order in the output array
- Efficient resource utilization - starts new requests immediately as slots become available
- Time Complexity: O(n) where n is the number of URLs
- Includes comprehensive test approach with mock implementation

**Key Features:**
- Non-blocking concurrent execution
- Order preservation
- Memory efficient

### 2. LicensePlateProblem.ts

**Problem:** Generate the nth license plate in a specific DMV sequence (000000 to ZZZZZZ).

**Solution Highlights:**
- **O(1) time complexity** - direct calculation without iteration
- **O(1) space complexity** - constant memory usage
- Mathematical approach using positional number systems
- Handles all valid inputs from 0 to 308,915,775 (ZZZZZZ)

**Algorithm:**
1. Determines the group (number of letters: 0-6)
2. Calculates position within that group
3. Converts to base-10 (digits) and base-26 (letters)
4. Formats with appropriate padding

## 🧪 Running the Tests

### Quick Start

```bash
# Install dependencies
npm install

# Run both tests
npm run test:all

# Or run individually
npm run test:license
npm run test:concurrency
```

### Expected Output

**License Plate Test:**
```
✓ n=0: 000000
✓ n=1: 000001
✓ n=999999: 999999
✓ n=1000000: 00000A
...
19 passed, 0 failed
```

**Concurrency Test:**
```
✓ All tests passed
  Max observed concurrency: 3/3
```


**Author:** Xavier Huix Trenco
**Date:** September 30th 2025
**Purpose:** Stark Future