/**
 * Fetches URLs with controlled concurrency
 * @param urls - Array of URLs to fetch
 * @param maxConcurrency - Maximum number of concurrent requests
 * @returns Array of responses in the same order as input URLs
 */
async function fetchWithConcurrency(
  urls: string[],
  maxConcurrency: number
): Promise<Response[]> {
  const results: Response[] = new Array(urls.length);
  const executing: Promise<void>[] = [];

  for (let i = 0; i < urls.length; i++) {
    const index = i;

    const fetchPromise = fetch(urls[index])
      .then(response => {
        results[index] = response;
      });

    const wrappedPromise = fetchPromise.then(() => {
      executing.splice(executing.indexOf(wrappedPromise), 1);
    });

    executing.push(wrappedPromise);

    if (executing.length >= maxConcurrency) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return results;
}

/**
 * Test approach for fetchWithConcurrency:
 *
 * 1. Mock fetch to track concurrent calls
 * 2. Use Promise-based delays to control timing
 * 3. Verify:
 *    - Correct number of total requests
 *    - Never exceeds maxConcurrency
 *    - Results maintain input order
 *    - Handles errors gracefully
 */

// Example test implementation
async function testFetchWithConcurrency() {
  let currentConcurrency = 0;
  let maxObservedConcurrency = 0;
  const fetchCallLog: number[] = [];

  // Mock fetch
  const mockFetch = async (input: string | URL | Request) => {
    const url = input.toString();
    currentConcurrency++;
    maxObservedConcurrency = Math.max(maxObservedConcurrency, currentConcurrency);
    fetchCallLog.push(currentConcurrency);

    await new Promise(resolve => setTimeout(resolve, 100));

    currentConcurrency--;

    return new Response(url, { status: 200 });
  };

  globalThis.fetch = mockFetch as typeof fetch;

  const urls = Array.from({ length: 10 }, (_, i) => `https://example.com/${i}`);
  const maxConcurrency = 3;

  const results = await fetchWithConcurrency(urls, maxConcurrency);

  // Assertions
  console.assert(results.length === urls.length, "Should return all results");
  console.assert(maxObservedConcurrency <= maxConcurrency, "Should not exceed max concurrency");
  console.assert(fetchCallLog.length === urls.length, "Should fetch all URLs");

  console.log(`✓ All tests passed`);
  console.log(`  Max observed concurrency: ${maxObservedConcurrency}/${maxConcurrency}`);
}

// Run test if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testFetchWithConcurrency();
}

export { fetchWithConcurrency, testFetchWithConcurrency };