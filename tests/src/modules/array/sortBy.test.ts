import { describe, expect, expectTypeOf, test } from "vitest";

import { numeric } from "@auaust/toolkit";
import { sortBy } from "@auaust/toolkit/array";

function createItems(): { name: string; age?: number | null }[] {
  return [
    { name: "a", age: 10 },
    { name: "b", age: null },
    { name: "c", age: 9 },
    { name: "d" },
    { name: "e", age: 30 },
  ];
}

function namesOf(items: readonly { name: string }[]): string[] {
  return items.map(({ name }) => {
    return name;
  });
}

describe("sortBy", () => {
  test("sorts in place by a property numerically", () => {
    const items = createItems();
    const result = sortBy(items, "age", numeric);

    expect(result).toBe(items);
    expect(namesOf(result)).toEqual(["c", "a", "e", "b", "d"]);
    expectTypeOf(result).toEqualTypeOf<typeof items>();
  });

  test("defaults to the string order of the keys", () => {
    expect(namesOf(sortBy(createItems(), "age"))).toEqual([
      "a",
      "e",
      "c",
      "b",
      "d",
    ]);
  });

  test("reverses, keeping nullish keys last", () => {
    expect(
      namesOf(sortBy(createItems(), "age", numeric, { reverse: true })),
    ).toEqual(["e", "a", "c", "b", "d"]);
  });

  test("resolves a callback key once per item", () => {
    let calls = 0;

    const result = sortBy(
      createItems(),
      (item) => {
        calls++;

        return item.name === "c" ? 0 : 1;
      },
      { reverse: true },
    );

    expect(calls).toBe(5);
    expect(namesOf(result)).toEqual(["a", "b", "d", "e", "c"]);
  });

  test("puts undefined items, then holes, last without resolving their keys", () => {
    const keys: unknown[] = [];

    const items: (
      { n: number } | undefined
    )[] = [{ n: 2 }, undefined, { n: 1 }, undefined];

    Reflect.deleteProperty(items, 1);

    const result = sortBy(items, (item) => {
      keys.push(item);

      return item?.n;
    });

    expect(keys).toEqual([{ n: 2 }, { n: 1 }]);
    expect(result).toHaveLength(4);
    expect(result.slice(0, 3)).toEqual([{ n: 1 }, { n: 2 }, undefined]);
    expect(3 in result).toBe(false);
  });

  test("passes nullish through", () => {
    expect(sortBy(null, String)).toBeUndefined();
  });
});
