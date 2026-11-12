import { describe, expect, expectTypeOf, test } from "vitest";

import {
  keyMapper,
  type KeyMap,
  type KeyMapper,
  type KeyMapping,
  type NormalizedKey,
  type NormalizedKeyMapping,
} from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocol";

describe("keyMapper", () => {
  test("keeps keys by default", () => {
    const mapper = keyMapper();

    expect(mapper("key", 42)).toBe(true);
    expectTypeOf(mapper).toExtend<KeyMapper>();
  });

  test("maps own entries and keeps missing or inherited entries", () => {
    const inherited = {
      inherited: "renamed",
    };

    const map = Object.assign(Object.create(inherited), {
      renamed: "result" as const,
      removed: false as const,
    }) as {
      renamed: "result";
      removed: false;
      inherited: "renamed";
    };

    const mapper = keyMapper(map);

    expect(mapper("renamed", null)).toBe("result");
    expect(mapper("removed", null)).toBe(false);
    expect(mapper("inherited", null)).toBe(true);
    expect(mapper("missing" as keyof typeof map, null)).toBe(true);
  });

  test("preserves function mapper types and their value argument", () => {
    const input = (key: "value", value: number) => {
      return value > 0 ? (`${key}-positive` as const) : false;
    };

    const mapper = keyMapper(input);

    expect(mapper("value", 1)).toBe("value-positive");
    expectTypeOf(mapper).toEqualTypeOf<typeof input>();
  });

  test("normalizes numeric property keys from maps and functions", () => {
    const fromMap = keyMapper({
      value: 1 as const,
    } satisfies KeyMap<"value", 1>);

    const fromFunction = keyMapper(
      (_key: PropertyKey, _value: unknown) => 2 as const,
    );

    expect(fromMap("value", null)).toBe("1");
    expect(fromFunction("value", null)).toBe("2");

    expectTypeOf(fromMap("value", null)).toEqualTypeOf<
      KeyMapping<NormalizedKey<1>>
    >();

    expectTypeOf(fromFunction("value", null)).toEqualTypeOf<
      NormalizedKeyMapping<2>
    >();
  });

  test("resolves retained callable mappers and normalizes numeric keys", () => {
    const callback = {
      offset: 2,
      [callable](key: "entry", value: number) {
        return value + this.offset;
      },
    };

    const mapper = keyMapper(callback);

    callback[callable] = () => 99;

    expectTypeOf(mapper).parameter(0).toEqualTypeOf<"entry">();
    expectTypeOf(mapper("entry", 4)).toEqualTypeOf<`${number}`>();
    expect(mapper("entry", 4)).toBe("6");
  });
});
