import type {
  CallParameters,
  CallReturnType,
  CallSignature,
} from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { assertType, describe, expectTypeOf, test } from "vitest";

type Accepts<Signature, Arguments extends any[]> = [Signature] extends [
  (...args: Arguments) => any,
]
  ? true
  : false;

describe("CallSignature", () => {
  test("preserves native function signatures", () => {
    type Guard = (input: unknown) => input is string;

    expectTypeOf<CallSignature<Guard>>().toEqualTypeOf<Guard>();
  });

  test("extracts protocol function signatures", () => {
    type Protocol = {
      [callable](input: unknown): input is string;
    };

    expectTypeOf<CallSignature<Protocol>>().toEqualTypeOf<
      (input: unknown) => input is string
    >();
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
