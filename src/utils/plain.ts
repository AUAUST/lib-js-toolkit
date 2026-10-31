import { isContainer } from "#modules/guard/utils/isContainer";
import { assign } from "#modules/object/utils/assign";
import { create } from "#modules/object/utils/create";

/**
 * Returns a new null-prototype object, copying own enumerable properties.
 * Primitives and nullish values produce an empty object.
 */
export function plain<Source extends object>(value: Source): Source;
export function plain<Source extends object = {}>(
  value?: Partial<Source>,
): Source;
export function plain(value: unknown): {};
export function plain(value?: unknown): {} {
  return assign(create(null), isContainer(value) ? value : undefined);
}
