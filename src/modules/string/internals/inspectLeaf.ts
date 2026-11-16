import { isNaN } from "#modules/number/guards/isNaN";
import { isString } from "#modules/string/guards/isString";
import { inspectPrimitive } from "#modules/string/internals/inspectPrimitive";
import { inspectProbe } from "#modules/string/internals/inspectProbe";
import { ownGetter } from "#modules/string/internals/ownGetter";

const regExpFlags = [
  ["hasIndices", "d"],
  ["global", "g"],
  ["ignoreCase", "i"],
  ["multiline", "m"],
  ["dotAll", "s"],
  ["unicode", "u"],
  ["unicodeSets", "v"],
  ["sticky", "y"],
] as const;

/**
 * Renders the built-ins `inspect` shows as one token (dates, regular expressions,
 * boxed primitives, weak collections, promises, errors), each recognised by a
 * brand-checking built-in method; `undefined` for others.
 */
export function inspectLeaf(
  value: object,
  maxStringLength: number,
): string | undefined {
  return (
    inspectDate(value) ??
    inspectRegExp(value) ??
    inspectBoxed(value, maxStringLength) ??
    inspectOpaque(value) ??
    inspectError(value)
  );
}

function inspectDate(value: object) {
  const time = inspectProbe(Date.prototype.getTime, value);

  if (!time) {
    return;
  }

  const iso = (
    !isNaN(time.result) && inspectProbe(Date.prototype.toISOString, value)
  );

  return iso && isString(iso.result) ? `Date(${iso.result})` : "Date(Invalid)";
}

function inspectRegExp(value: object) {
  const source = inspectProbe(ownGetter(RegExp.prototype, "source"), value);

  if (!source || !isString(source.result)) {
    return;
  }

  let flags = "";

  for (const [property, flag] of regExpFlags) {
    const set = inspectProbe(ownGetter(RegExp.prototype, property), value);

    if (set && set.result === true) {
      flags += flag;
    }
  }

  return `/${source.result}/${flags}`;
}

function inspectBoxed(value: object, maxStringLength: number) {
  for (const [name, method] of [
    ["Number", Number.prototype.valueOf],
    ["String", String.prototype.valueOf],
    ["Boolean", Boolean.prototype.valueOf],
    ["BigInt", BigInt.prototype.valueOf],
    ["Symbol", Symbol.prototype.valueOf],
  ] as const) {
    const primitive = inspectProbe(method, value);

    if (primitive) {
      return `${name}(${inspectPrimitive(primitive.result, maxStringLength) ?? ""})`;
    }
  }
}

function inspectOpaque(value: object) {
  const witness = {};

  for (const [name, method, args] of [
    ["WeakMap", WeakMap.prototype.has, [witness]],
    ["WeakSet", WeakSet.prototype.has, [witness]],
    ["WeakRef", WeakRef.prototype.deref, []],
  ] as const) {
    if (inspectProbe(method, value, args)) {
      return name;
    }
  }

  // @debt `then` is the only brand check for promises: it reads `constructor` and marks a rejected promise as handled.
  return inspectProbe(Promise.prototype.then, value, [noop, noop])
    ? "Promise"
    : undefined;
}

function inspectError(value: object) {
  if (!inheritsError(value)) {
    return;
  }

  const name = inheritedDataValue(value, "name");
  const message = inheritedDataValue(value, "message");
  const label = isString(name) && name ? name : "Error";

  return isString(message) && message ? `${label}: ${message}` : label;
}

function inheritsError(value: object) {
  for (
    let current = Reflect.getPrototypeOf(value);
    current !== null;
    current = Reflect.getPrototypeOf(current)
  ) {
    if (current === Error.prototype) {
      return true;
    }
  }

  return false;
}

function inheritedDataValue(value: object, key: PropertyKey) {
  for (
    let current: object | null = value;
    current !== null;
    current = Reflect.getPrototypeOf(current)
  ) {
    const descriptor = Reflect.getOwnPropertyDescriptor(current, key);

    if (descriptor) {
      return "value" in descriptor ? descriptor.value : undefined;
    }
  }
}

function noop() {}
