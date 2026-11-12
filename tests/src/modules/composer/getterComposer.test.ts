import { describe, expect, expectTypeOf, test } from "vitest";

import { compose, getterComposer } from "@auaust/toolkit/composer";

describe("getterComposer", () => {
  test("stays lazy and produces a readonly property", () => {
    let reads = 0;

    const entry = getterComposer("value", () => {
      reads += 1;

      return "value" as const;
    });

    const result = compose(entry);

    expect(reads).toBe(0);
    expect(result.value).toBe("value");
    expect(reads).toBe(1);
    expectTypeOf(result).toEqualTypeOf<{ readonly value: "value" }>();

    if (false) {
      // @ts-expect-error Getter-only properties are readonly.
      result.value = "value";
    }
  });
});
