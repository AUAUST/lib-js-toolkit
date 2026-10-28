import { isContainer } from "@auaust/toolkit/isContainer";
import { assign, create } from "@auaust/toolkit/object";

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
