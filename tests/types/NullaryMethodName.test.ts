import type { NullaryMethodName } from "@auaust/toolkit/types";
import { describe, expectTypeOf, test } from "vitest";

describe("NullaryMethodName", () => {
  test("returns the names of methods without arguments", () => {
    expectTypeOf<
      NullaryMethodName<{
        nothing(): void;
        nothingWithThis(this: any): void;
        something(x: number): void;
        somethingWithThis(this: any, x: number): void;
      }>
    >().toEqualTypeOf<"nothing" | "nothingWithThis">();
  });

  test("returns the names of methods with only optional arguments", () => {
    expectTypeOf<
      NullaryMethodName<{
        optional(x?: number): void;
        optionsWithThis(this: any, x?: number): void;
        required(x: any): void;
        requiredWithThis(this: any, x: any): void;
      }>
    >().toEqualTypeOf<"optional" | "optionsWithThis">();
  });

  test("returns the names of methods with a single rest parameter", () => {
    expectTypeOf<
      NullaryMethodName<{
        rest(...args: any[]): void;
        restWithThis(this: any, ...args: any[]): void;
        norest(x: number): void;
        norestWithThis(this: any, x: number): void;
      }>
    >().toEqualTypeOf<"rest" | "restWithThis">();
  });
});
