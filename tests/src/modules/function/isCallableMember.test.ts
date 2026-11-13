import { describe, expect, expectTypeOf, test } from "vitest";

import { applyMethod, call, callMethod, type Callee } from "@auaust/toolkit";
import { isCallableMember } from "@auaust/toolkit/guard";
import { callable } from "@auaust/toolkit/protocol";

import { primitiveValues } from "#tests/fixtures/values";

describe("isCallableMember", () => {
  test("recognizes function and protocol members, own, inherited or symbol-keyed", () => {
    const symbol = Symbol("member");

    const own = {
      member() {},
    };

    expect(isCallableMember(own, "member")).toBe(true);
    expect(isCallableMember(Object.create(own), "member")).toBe(true);
    expect(isCallableMember({ [symbol]() {} }, symbol)).toBe(true);

    expect(
      isCallableMember(
        {
          member: { [callable]: () => {} },
        },
        "member",
      ),
    ).toBe(true);
  });

  test.for([
    ...primitiveValues,
    {},
    {
      member: 42,
    },
  ])("rejects candidates without a callable under the key: %s", (input) => {
    expect(isCallableMember(input, "member")).toBe(false);
  });

  test("narrows unknown to an object holding a callable", () => {
    const object = {
      member(...nums: number[]) {
        return nums.reduce((sum, number_) => sum + number_, 0);
      },
    } as unknown;

    if (!isCallableMember(object, "member")) {
      expect.unreachable("The member should be recognized.");
    }

    expectTypeOf(object.member).toEqualTypeOf<Callee>();
    expect(call(object.member, 1, 2, 3)).toBe(6);
    expect(callMethod(object, "member", 5)).toBe(5);
    expect(applyMethod(object, "member", [1, 2, 3])).toBe(6);
  });
});
