import { describe, expect, test } from "vitest";

import { pascal, toPascalCase } from "@auaust/toolkit/string";

describe("toPascalCase", () => {
  test("capitalizes every word", () => {
    expect(toPascalCase("hello_world")).toBe("HelloWorld");
    expect(pascal).toBe(toPascalCase);
  });
});
