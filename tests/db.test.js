const { connectDatabase, closeDatabase } = require("../config/database");
const { comparePassword, hashPassword } = require("../src/utils/bcrypt");

beforeAll(async () => await connectDatabase());

afterAll(async () => await closeDatabase());

describe("compare password function", () => {
  it("compare successfully", async () => {
    let dummy = "test";
    let hashed = (await hashPassword(dummy)).toString();
    const result = await comparePassword(dummy, hashed);
    expect(result).toEqual(true);
  });

  it("compare failure", async () => {
    let dummy = "test";
    let hashed = (await hashPassword(dummy)).toString();
    let incorrect_password = "tezt";
    const result = await comparePassword(incorrect_password, hashed);
    expect(result).toEqual(false);
  });
});
