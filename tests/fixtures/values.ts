export const nullishValues = [null, undefined] as const;

export const falsyValues = [...nullishValues, false, 0, -0, 0n, "", NaN] as const;

export const truthyPrimitives = [
  true,
  1,
  -1,
  Infinity,
  -Infinity,
  1n,
  "value",
  " \t\n\u00a0\ufeff",
  Symbol("value"),
  Symbol.for("value"),
] as const;

export const primitiveValues = [...falsyValues, ...truthyPrimitives] as const;

export function createInstances() {
  class Instance {
    value = 1;
  }

  return [
    new Instance(),
    new Map<string, number>(),
    new Map([["value", 1]]),
    new Set<number>(),
    new Set([1, 2]),
    new WeakMap<object, number>(),
    new WeakSet<object>(),
    new ArrayBuffer(8),
    new DataView(new ArrayBuffer(8)),
    new Uint8Array(),
    new Uint8Array([1, 2]),
    new Date(0),
    /pattern/,
    new Error("fixture"),
    Promise.resolve(1),
    new Boolean(false),
    new Number(0),
    new String("value"),
    new URL("https://example.com/path"),
    new URLSearchParams("key=value"),
    new Headers({
      "content-type": "text/plain",
    }),
    new Blob(["value"]),
    new File(["value"], "fixture.txt"),
  ] as const;
}

export function createObjects() {
  return [
    {},
    {
      value: 1,
    },
    [],
    [1, 2, 3],
    ...createInstances(),
  ] as const;
}

export function createFunctions() {
  return [
    () => {},
    function regular() {},
    async function asynchronous() {},
    function* generator() {},
    async function* asyncGenerator() {},
    class Constructor {},
  ] as const;
}

export function createValues() {
  return [...primitiveValues, ...createObjects(), ...createFunctions()] as const;
}

export type FixtureValue = ReturnType<typeof createValues>[number];

export function createEmptyValues() {
  return [
    ...nullishValues,
    "",
    " ",
    " \t\n\u00a0\ufeff",
    [],
    {},
    new Map<string, number>(),
    new Set<number>(),
    new Uint8Array(),
    new URLSearchParams(),
    new Blob(),
    new File([], "empty.txt"),
  ] as const;
}

export function createFilledValues() {
  return [
    false,
    0,
    NaN,
    0n,
    42,
    "value",
    "\u200b",
    Symbol("value"),
    [undefined],
    [1, 2, 3],
    {
      key: "value",
    },
    new Map([["key", "value"]]),
    new Set([1, 2, 3]),
    new Uint8Array([1]),
    new URLSearchParams("key=value"),
    new Blob(["value"]),
    new File(["value"], "filled.txt"),
    new Date(0),
    () => {},
  ] as const;
}

export function createKeyedCollections() {
  return [
    new Map([["key", "value"]]),
    new URLSearchParams("key=value"),
    new Headers({
      key: "value",
    }),
  ] as const;
}
