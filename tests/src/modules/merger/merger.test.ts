import { describe, expect, test } from "vitest";

import { merge, merger } from "@auaust/toolkit/merger";

const createSources = () => {
  return [
    {
      a: { x: 1 },
      b: 1,
      plugins: ["first"],
    },
    {
      a: { y: 2 },
      b: { z: 3 },
      plugins: ["second"],
    },
  ];
};

describe("merger", () => {
  test("reproduces Object.assign with the last value", () => {
    const merged = merger((values) => values.at(-1));

    expect(merged({ c: 0 }, ...createSources())).toEqual(
      Object.assign({ c: 0 }, ...createSources()),
    );
  });

  test("defers to the default rule through its context", () => {
    const merged = merger((values, { merge: mergeValues, path }) => {
      return path.length === 1 && path[0] === "plugins"
        ? values.flatMap((value) => {
            return value;
          })
        : mergeValues(values);
    });

    const result = merged({}, ...createSources());

    expect(result).toEqual({
      ...merge({}, ...createSources()),
      plugins: ["first", "second"],
    });
  });

  test("returns its target", () => {
    const target = {
      a: { x: 0 },
    };

    const merged = merger((values, context) => context.merge(values));

    const result = merged(target, {
      a: { y: 1 },
    });

    expect(result).toBe(target);

    expect(result).toEqual({
      a: { x: 0, y: 1 },
    });

    expect(merged.call({ other: true }, target, { b: 1 })).toBe(target);
  });
});
