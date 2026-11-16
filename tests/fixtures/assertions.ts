import { expect, test } from "vitest";

import { AssertionError } from "@auaust/toolkit";
import { inspect } from "@auaust/toolkit/string";

import { createValues } from "#tests/fixtures/values";

type Guard = (candidate: any) => boolean;

type Assertion = (candidate: any, message?: string) => void;

type Ensurer = (candidate: any, message?: string) => unknown;

function expectAssertionError(run: () => unknown, message: string): void {
  try {
    run();
  } catch (error) {
    expect(error).toBeInstanceOf(AssertionError);
    expect(error).toBeInstanceOf(TypeError);
    expect(error).toHaveProperty("message", message);

    return;
  }

  expect.unreachable("Expected an AssertionError.");
}

function receivedMessage(expectation: string, value: unknown): string {
  return `${expectation}, received ${inspect(value)}.`;
}

export function testAssertion(
  assertion: Assertion,
  guard: Guard,
  expectation: string,
): void {
  test.for(createValues())("matches its guard on case %# (%s)", (value) => {
    if (guard(value)) {
      expect(() => assertion(value)).not.toThrow();
    } else {
      expectAssertionError(
        () => assertion(value),
        receivedMessage(expectation, value),
      );

      expectAssertionError(() => assertion(value, "custom"), "custom");
    }
  });
}

export function testEnsure(
  ensurer: Ensurer,
  guard: Guard,
  expectation: string,
): void {
  test.for(createValues())("matches its guard on case %# (%s)", (value) => {
    if (guard(value)) {
      expect(ensurer(value)).toBe(value);
    } else {
      expectAssertionError(
        () => ensurer(value),
        receivedMessage(expectation, value),
      );

      expectAssertionError(() => ensurer(value, "custom"), "custom");
    }
  });
}
