import { capitalizeFirstLetter } from "../helpers";

describe("capitalizeFirstLetter", () => {
  it("returns the same string when input is empty", () => {
    const input = "";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe("");
  });

  it("lowercases all characters except the first one", () => {
    const input = "HELLO";
    const expected = "Hello";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe(expected);
  });

  it("handles strings starting with non-alphabetic characters", () => {
    const input = "123ABC";
    const expected = "123abc";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe(expected);
  });

  it("returns the same string when the rest is already lowercase", () => {
    const input = "Hello";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe("Hello");
  });
});
