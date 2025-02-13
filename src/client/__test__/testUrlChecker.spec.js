const { checkForUrl } = require("../js/urlChecker");

describe("Testing the checkForUrl functionality", () => {
      test('valid URL should return true', () => {
            expect(checkForUrl('https://www.example.com')).toBe(true);
      });

      test('invalid URL should return false', () => {
            expect(checkForUrl('invalid-url')).toBe(false);
      });

      test('empty string should return false', () => {
            expect(checkForUrl('')).toBe(false);
      });

      test('URL with spaces should return false', () => {
            expect(checkForUrl('https://www.ex ample.com')).toBe(false);
      })
});