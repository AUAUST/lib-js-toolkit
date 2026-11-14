import { describe, expect, it } from "vitest";

// @debt source-only because the dist guard rejects tooling's transitive source imports (engrenage.4)

import { native, relates } from "#tooling/tags/index";

function validate(declaration: ReturnType<typeof native>, body: string) {
  return declaration.schema?.["~standard"].validate(body);
}

describe("native", () => {
  it("accepts a modifier and a builtin path", () => {
    expect(validate(native(), "equal Array.prototype.map")).toStrictEqual({
      value: "equal Array.prototype.map",
    });
  });

  it("rejects a body without a modifier", () => {
    expect(validate(native(), "Array.prototype.map")).toHaveProperty("issues");
  });
});

describe("relates", () => {
  it("accepts a modifier and a qualified helper", () => {
    expect(validate(relates(), "specialises array.map")).toStrictEqual({
      value: "specialises array.map",
    });
  });

  it("rejects an unqualified helper", () => {
    expect(validate(relates(), "specialises map")).toHaveProperty("issues");
  });
});
