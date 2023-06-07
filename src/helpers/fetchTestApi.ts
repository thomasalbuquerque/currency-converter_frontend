import apiResponseTest from './apiResponseTest.json';

export async function fetchTestApi() {
  // Simulate the latency of an actual call.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return apiResponseTest;
}
