import { describe, expect, test } from "vitest";

import { lazyMerge, toMerged } from "@auaust/toolkit/merger";

const createSources = () => {
  return [
    {
      a: { x: 1 },
      b: 1,
      c: [1],
    },
    {
      a: { y: 2 },
      b: { z: 3 },
      d: "d",
    },
    {
      a: 1,
      c: [2],
    },
  ] as const;
};

describe("lazyMerge", () => {
  test("holds what toMerged would", () => {
    expect(lazyMerge(...createSources())).toEqual(toMerged(...createSources()));
  });

  test("caches resolved values", () => {
    const lazy = lazyMerge(...createSources());

    expect(lazy.a).toBe(lazy.a);
  });

  test("throws on assignment", () => {
    const lazy: Record<string, unknown> = lazyMerge({ a: 1 });

    expect(() => {
      lazy.a = 2;
    }).toThrow(TypeError);
  });

  test("exposes the merged keys to spread and Object.keys", () => {
    const lazy = lazyMerge({ a: 1 }, { b: 2 });

    expect({ ...lazy }).toEqual({ a: 1, b: 2 });
    expect(Object.keys(lazy)).toEqual(["a", "b"]);
  });

  test("runs a source getter only once its key is read", () => {
    let reads = 0;

    const lazy = lazyMerge({
      get a() {
        reads += 1;

        return 1;
      },
    });

    expect(reads).toBe(0);
    expect(lazy.a).toBe(1);
    expect(reads).toBe(1);
  });
});
