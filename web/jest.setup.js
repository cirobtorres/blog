// Global fetch mock - tests override per file
global.fetch = jest.fn();

// Suppress console.error in tests (services log on non-production)
const originalError = console.error;
beforeAll(() => {
  console.error = () => {};
});
afterAll(() => {
  console.error = originalError;
});
