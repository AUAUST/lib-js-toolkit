import { describe, expectTypeOf, test } from "vitest";

import type { Merged } from "@auaust/toolkit/types";

describe("Merged", () => {
  test("recurses into plain object types both sides hold", () => {
    expectTypeOf<
      Merged<{ a: { x: number }; b: number }, [{ a: { y: string }; b: string }]>
    >().toEqualTypeOf<{ a: { x: number; y: string }; b: string }>();
  });

  test("keeps the target's type on a mismatch", () => {
    expectTypeOf<
      Merged<{ a: number; b: { x: number } }, [{ a: { y: 2 }; b: string[] }]>
    >().toEqualTypeOf<{ a: number; b: { x: number } }>();
  });
});
