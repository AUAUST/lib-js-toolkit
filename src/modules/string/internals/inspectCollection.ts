import { min } from "#modules/math/utils/min";
import { isString } from "#modules/string/guards/isString";
import { inspectList } from "#modules/string/internals/inspectList";
import { inspectProbe } from "#modules/string/internals/inspectProbe";
import { ownGetter } from "#modules/string/internals/ownGetter";
import type { InspectContext } from "#modules/string/internals/InspectContext";

/**
 * Renders a map, set or typed array for `inspect`, collapsed to its type and
 * size when `collapsed`; `undefined` for any other object.
 */
export function inspectCollection(
  value: object,
  level: number,
  collapsed: boolean,
  context: InspectContext,
): string | undefined {
  return (
    inspectKeyed(value, Map.prototype, "Map", level, collapsed, context) ??
    inspectKeyed(value, Set.prototype, "Set", level, collapsed, context) ??
    inspectTypedArray(value, level, collapsed, context)
  );
}

function inspectKeyed(
  value: object,
  prototype: Map<unknown, unknown> | Set<unknown>,
  name: string,
  level: number,
  collapsed: boolean,
  context: InspectContext,
) {
  const probed = inspectProbe(ownGetter(prototype, "size"), value);

  if (!probed) {
    return;
  }

  const size = Number(probed.result);
  const label = `${name}(${size})`;

  if (collapsed) {
    return label;
  }

  const items: string[] = [];
  const map = prototype === Map.prototype;

  Reflect.apply(prototype.forEach, value, [
    (entry: unknown, key: unknown) => {
      if (items.length >= context.maxItems) {
        return;
      }

      const rendered = context.render(entry, level + 1);

      items.push(
        map ? `${context.render(key, level + 1)} => ${rendered}` : rendered,
      );
    },
  ]);

  return `${label} ${inspectList(items, size - items.length, true)}`;
}

function inspectTypedArray(
  value: object,
  level: number,
  collapsed: boolean,
  context: InspectContext,
) {
  const prototype = Reflect.getPrototypeOf(Uint8Array.prototype);

  if (!prototype) {
    return;
  }

  const tag = inspectProbe(ownGetter(prototype, Symbol.toStringTag), value);

  if (!tag || !isString(tag.result)) {
    return;
  }

  const length = inspectProbe(ownGetter(prototype, "length"), value);
  const size = length ? Number(length.result) : 0;
  const label = `${tag.result}(${size})`;

  if (collapsed) {
    return label;
  }

  const shown = min(size, context.maxItems);
  const items: string[] = [];

  for (let index = 0; index < shown; index++) {
    items.push(context.render(Reflect.get(value, index), level + 1));
  }

  return `${label} ${inspectList(items, size - shown, false)}`;
}
