import {
  freeze,
  is,
  isExtensible,
  isFrozen,
  isSealed,
  preventExtensions,
  seal,
} from "@auaust/toolkit/object";
import { expect, test } from "vitest";

test("object exposes unmodified native operations", () => {
  expect(freeze).toBe(Object.freeze);
  expect(is).toBe(Object.is);
  expect(isExtensible).toBe(Object.isExtensible);
  expect(isFrozen).toBe(Object.isFrozen);
  expect(isSealed).toBe(Object.isSealed);
  expect(preventExtensions).toBe(Object.preventExtensions);
  expect(seal).toBe(Object.seal);
});
