import { vi } from "vitest";

export function createSpies() {
  const shared = {};
  let sequence = 0;

  function nextString(..._args: unknown[]) {
    return `value:${++sequence}`;
  }

  function freshObject(..._args: unknown[]) {
    return {};
  }

  function sameObject(..._args: unknown[]) {
    return shared;
  }

  function echo<Value>(value: Value) {
    return value;
  }

  return {
    nextString: vi.fn(nextString),
    freshObject: vi.fn(freshObject),
    sameObject: vi.fn(sameObject),
    echo: vi.fn(echo),
  };
}

export function signature(this: void, key: "entry", count = 1, ...suffixes: string[]) {
  return `!${key}:${count}${suffixes.join("")}`;
}

export function genericIdentity<Value>(this: void, value: Value): Value {
  return value;
}

export function overloaded(key: string): string;
export function overloaded(key: number): number;
export function overloaded(key: string | number): string | number {
  return key;
}

export function contextual(this: { value: number }, key: number) {
  return this.value + key;
}
