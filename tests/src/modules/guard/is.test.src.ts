import { describe, expect, test } from "vitest";

import { otherObjectsLeaf, typeParents } from "#modules/guard/constants";
import { is } from "#modules/guard/guards/is";
import { typeLeafOf } from "#modules/guard/internals/typeLeafOf";
import { keys } from "#modules/object/utils/keys";
import { createTypeLeafValues } from "#tests/fixtures/values";
import type { TypeName } from "#types/TypeName";

function chainOf(candidate: unknown): readonly string[] {
  const chain: string[] = [];

  for (
    let node: keyof typeof typeParents | null = typeLeafOf(candidate);
    node !== null;
    node = typeParents[node]
  ) {
    chain.push(node);
  }

  return chain;
}

const typeNames = keys(typeParents).filter(
  (name): name is TypeName => name !== otherObjectsLeaf,
);

describe("is", () => {
  test.for(createTypeLeafValues())(
    "matches the ancestor chain of case %# (%s)",
    (value) => {
      const chain = chainOf(value);

      for (const name of typeNames) {
        expect(is(value, name), name).toBe(chain.includes(name));
      }
    },
  );
});
