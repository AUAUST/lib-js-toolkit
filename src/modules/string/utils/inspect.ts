import { isArray } from "#modules/array/guards/isArray";
import { isFunction } from "#modules/function/guards/isFunction";
import { isSymbol } from "#modules/guard/guards/isSymbol";
import { isNumber } from "#modules/number/guards/isNumber";
import { isString } from "#modules/string/guards/isString";
import { inspectCollection } from "#modules/string/internals/inspectCollection";
import { inspectLeaf } from "#modules/string/internals/inspectLeaf";
import { inspectList } from "#modules/string/internals/inspectList";
import { inspectPrimitive } from "#modules/string/internals/inspectPrimitive";
import { ownDataValue } from "#modules/string/internals/ownDataValue";
import type { InspectContext } from "#modules/string/internals/InspectContext";
import type { InspectOptions } from "#modules/string/types/InspectOptions";

const identifierPattern = /^[A-Za-z_$][\w$]*$/;

/**
 * Returns a one-line technical representation of any value for error messages.
 * Never throws and never runs user code: getters, conversion hooks and `toJSON`
 * are never invoked; accessors show as `[Getter]`/`[Setter]`, cycles as
 * `[Circular]`, revoked proxies as `Proxy (revoked)` and values whose inspection
 * throws as `[Uninspectable]`. Live proxies are read through their traps.
 */
export function inspect(value: unknown, options: InspectOptions = {}): string {
  const context: InspectContext = {
    depth: options.depth ?? 2,
    maxItems: options.maxItems ?? 10,
    maxStringLength: options.maxStringLength ?? 100,
    seen: new Set(),
    render: (child, level) => render(child, level, context),
  };

  return render(value, 0, context);
}

function render(value: unknown, level: number, context: InspectContext) {
  try {
    return (
      inspectPrimitive(value, context.maxStringLength) ??
      renderObject(value as object, level, context)
    );
  } catch {
    return "[Uninspectable]";
  }
}

function renderObject(value: object, level: number, context: InspectContext) {
  let array: boolean;

  try {
    array = isArray(value);
  } catch {
    return "Proxy (revoked)";
  }

  const leaf = inspectLeaf(value, context.maxStringLength);

  if (leaf !== undefined) {
    return leaf;
  }

  if (context.seen.has(value)) {
    return "[Circular]";
  }

  const collapsed = level > context.depth;

  context.seen.add(value);

  try {
    if (array) {
      return renderArray(value, level, collapsed, context);
    }

    return (
      inspectCollection(value, level, collapsed, context) ??
      renderPlain(value, level, collapsed, context)
    );
  } finally {
    context.seen.delete(value);
  }
}

function renderArray(
  value: object,
  level: number,
  collapsed: boolean,
  context: InspectContext,
) {
  const length = ownDataValue(value, "length");
  const size = isNumber(length) ? length : 0;

  if (collapsed) {
    return `Array(${size})`;
  }

  const shown = Math.min(size, context.maxItems);
  const items: string[] = [];

  for (let index = 0; index < shown; index++) {
    items.push(renderProperty(value, String(index), level, context));
  }

  return inspectList(items, size - shown, false);
}

function renderPlain(
  value: object,
  level: number,
  collapsed: boolean,
  context: InspectContext,
) {
  const prototype = Reflect.getPrototypeOf(value);
  const name = prototype && constructorName(prototype);

  if (collapsed) {
    return prototype ? (name ?? "Object") : "[null prototype]";
  }

  const keys = Reflect.ownKeys(value).filter((key) => {
    return Reflect.getOwnPropertyDescriptor(value, key)?.enumerable;
  });

  const items = keys.slice(0, context.maxItems).map((key) => {
    return `${renderKey(key)}: ${renderProperty(value, key, level, context)}`;
  });

  const list = inspectList(items, keys.length - items.length, true);

  if (!prototype) {
    return `[null prototype] ${list}`;
  }

  return name && name !== "Object" ? `${name} ${list}` : list;
}

function renderProperty(
  target: object,
  key: PropertyKey,
  level: number,
  context: InspectContext,
) {
  try {
    const descriptor = Reflect.getOwnPropertyDescriptor(target, key);

    if (!descriptor) {
      return "<empty>";
    }

    if (descriptor.get && descriptor.set) {
      return "[Getter/Setter]";
    }

    if (descriptor.get) {
      return "[Getter]";
    }

    return descriptor.set
      ? "[Setter]"
      : render(descriptor.value, level + 1, context);
  } catch {
    return "[Uninspectable]";
  }
}

function renderKey(key: PropertyKey) {
  if (isSymbol(key)) {
    return `[Symbol(${key.description ?? ""})]`;
  }

  const text = String(key);

  return identifierPattern.test(text) ? text : JSON.stringify(text);
}

function constructorName(prototype: object) {
  const constructor = ownDataValue(prototype, "constructor");

  if (!isFunction(constructor)) {
    return;
  }

  const name = ownDataValue(constructor, "name");

  return isString(name) && name ? name : undefined;
}
