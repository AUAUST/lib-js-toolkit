import { describe, expect, expectTypeOf, test } from "vitest";

import {
  hasProperty,
  instanceOf,
  propertyEquals,
} from "@auaust/toolkit/predicate";

describe("hasProperty", () => {
  test("accepts a key holding undefined", () => {
    expect(hasProperty("a")({ a: undefined })).toBe(true);
    expect(hasProperty("a")({})).toBe(false);
  });
});

describe("propertyEquals", () => {
  test("compares with ===", () => {
    expect(propertyEquals("a", 1)({ a: 1 })).toBe(true);
    expect(propertyEquals("a", NaN)({ a: NaN })).toBe(false);
  });
});

describe("instanceOf", () => {
  test("narrows to the instance type", () => {
    const items: unknown[] = [new Date(0), 0];
    const dates = items.filter(instanceOf(Date));

    expect(dates).toEqual([new Date(0)]);
    expectTypeOf(dates).toEqualTypeOf<Date[]>();
  });
});
