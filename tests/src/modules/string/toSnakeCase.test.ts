import { describe, expect, test } from "vitest";

import { snake, toSnakeCase } from "@auaust/toolkit/string";

describe("toSnakeCase", () => {
  test("joins lowercased words with underscores", () => {
    expect(toSnakeCase("helloWorld2")).toBe("hello_world_2");
    expect(snake).toBe(toSnakeCase);
  });
});
