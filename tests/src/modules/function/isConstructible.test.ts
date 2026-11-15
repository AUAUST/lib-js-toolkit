import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { isConstructible } from "@auaust/toolkit/function";
import type { Constructor } from "@auaust/toolkit";

describe("isConstructible", () => {
  test("recognizes a class without running its body", () => {
    const body = vi.fn();

    expect(
      isConstructible(
        class {
          constructor() {
            body();
          }

          method() {}
        },
      ),
    ).toBe(true);

    expect(body).not.toHaveBeenCalled();
    expect(isConstructible(function () {})).toBe(true);
  });

  test("rejects arrows, methods, async functions and non-functions", () => {
    expect(isConstructible(() => {})).toBe(false);
    expect(isConstructible({ method() {} }.method)).toBe(false);
    expect(isConstructible(async function () {})).toBe(false);
    expect(isConstructible({})).toBe(false);
  });

  test("narrows on both branches", () => {
    const candidate = class {
      field = 1;
    } as Constructor | string;

    if (isConstructible(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<Constructor>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    }
  });
});
