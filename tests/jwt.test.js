const { generateAccessToken } = require("../src/utils/jwt");

test("generateAccessToken should return a string", () => {
  expect(typeof generateAccessToken).toBe("function");
});
