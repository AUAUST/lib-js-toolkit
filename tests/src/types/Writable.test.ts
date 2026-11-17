import { describe, expectTypeOf, test } from "vitest";

import type { Writable } from "@auaust/toolkit/types";

describe("Writable", () => {
  test("makes readonly keys writable", () => {
    expectTypeOf<Writable<{ readonly a: number; b?: string }>>().toEqualTypeOf<{
      a: number;
      b?: string;
    }>();
  });

  test("keeps tuples and arrays", () => {
    expectTypeOf<Writable<readonly [1, "a"]>>().toEqualTypeOf<[1, "a"]>();
    expectTypeOf<Writable<readonly string[]>>().toEqualTypeOf<string[]>();
  });

  test("leaves nested members readonly", () => {
    expectTypeOf<
      Writable<{ readonly a: { readonly b: number } }>
    >().toEqualTypeOf<{ a: { readonly b: number } }>();
  });
});
