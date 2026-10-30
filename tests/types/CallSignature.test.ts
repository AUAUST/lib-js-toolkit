import { assertType, describe, expectTypeOf, test } from "vitest";

import { callable } from "@auaust/toolkit/protocol";
import type {
  CallParameters,
  CallReturnType,
  CallSignature,
} from "@auaust/toolkit";

type Accepts<Signature, Arguments extends readonly any[]> = [
  Signature,
] extends [(...args: Arguments) => any]
  ? true
  : false;

describe("CallSignature", () => {
  test("preserves native function signatures", () => {
    type Guard = (input: unknown) => input is string;

    expectTypeOf<CallSignature<Guard>>().toEqualTypeOf<Guard>();
  });

  test("extracts protocol function signatures", () => {
    interface Protocol {
      [callable](input: unknown): input is string;
    }

    expectTypeOf<CallSignature<Protocol>>().toEqualTypeOf<
      (input: unknown) => input is string
    >();
  });

  test("extracts readonly protocol parameters with optional and rest entries", () => {
    interface Protocol {
      [callable](name: string, count?: number, ...flags: boolean[]): string;
    }

    expectTypeOf<CallParameters<Protocol>>().toEqualTypeOf<
      readonly [name: string, count?: number | undefined, ...flags: boolean[]]
    >();

    expectTypeOf<CallParameters<Protocol | (() => number)>>().toEqualTypeOf<
      | readonly [name: string, count?: number | undefined, ...flags: boolean[]]
      | readonly []
    >();
  });

  test("prefers protocol parameters over a native function signature", () => {
    type Hybrid = (() => number) & {
      [callable](name: string): string;
    };

    expectTypeOf<CallParameters<Hybrid>>().toEqualTypeOf<
      readonly [name: string]
    >();

    expectTypeOf<CallReturnType<Hybrid>>().toEqualTypeOf<string>();
  });

  test("preserves shared call constraints across unions", () => {
    type Target =
      | (() => number)
      | ((name: string) => string)
      | ((thing: unknown) => number)
      | ((input: number | string, condition: boolean) => number);

    type Signature = CallSignature<Target>;

    assertType<Accepts<Signature, [string, boolean]>>(true);

    assertType<Accepts<Signature, [string | number, boolean]>>(false);

    assertType<Accepts<Signature, []>>(false);

    assertType<Accepts<Signature, [number]>>(false);

    expectTypeOf<CallParameters<Target>>().toEqualTypeOf<
      | readonly []
      | readonly [name: string]
      | readonly [thing: unknown]
      | readonly [input: number | string, condition: boolean]
    >();

    expectTypeOf<CallReturnType<Target>>().toEqualTypeOf<number | string>();
  });
});
