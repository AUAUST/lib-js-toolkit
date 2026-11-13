import { expect, test } from "vitest";

import * as toolkit from "@auaust/toolkit";
import * as array from "@auaust/toolkit/array";
import * as boolean from "@auaust/toolkit/boolean";
import * as number from "@auaust/toolkit/number";
import * as parse from "@auaust/toolkit/parse";
import * as string from "@auaust/toolkit/string";

test("parse re-exports each module's parser under its type name", () => {
  expect(parse.string).toBe(string.parseString);
  expect(parse.number).toBe(number.parseNumber);
  expect(parse.boolean).toBe(boolean.parseBoolean);
  expect(parse.array).toBe(array.parseArray);
});

test("the root exports each converter and its shorthand", () => {
  expect(toolkit.toString).toBe(string.toString);
  expect(toolkit.s).toBe(string.toString);
  expect(toolkit.toNumber).toBe(number.toNumber);
  expect(toolkit.n).toBe(number.toNumber);
  expect(toolkit.toBoolean).toBe(boolean.toBoolean);
  expect(toolkit.b).toBe(boolean.toBoolean);
  expect(toolkit.toArray).toBe(array.toArray);
  expect(toolkit.a).toBe(array.toArray);
});

test("each parser converts its input", () => {
  expect(parse.boolean("false")).toBe(false);
  expect(parse.number("42")).toBe(42);
  expect(parse.string(42)).toBe("42");
  expect(parse.array([1])).toEqual([1]);
});
