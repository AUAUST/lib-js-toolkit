import { isContainer } from "#modules/guard/guards/isContainer";
import { assign } from "#modules/object/utils/assign";
import { create } from "#modules/object/utils/create";

/**
 * Returns a new null-prototype object, copying own enumerable properties.
 * Primitives and nullish values produce an empty object.
 *
 * @shorthand plain
 */
export function toNullPrototype<Source extends object>(value: Source): Source;
export function toNullPrototype<Source extends object = {}>(
  value?: Partial<Source>,
): Source;
export function toNullPrototype(value: unknown): {};
export function toNullPrototype(value?: unknown): {} {
  return assign(create(null), isContainer(value) ? value : undefined);
}
