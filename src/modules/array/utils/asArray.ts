import { isArray } from "#modules/array/guards/isArray";
import { copyIterable } from "#modules/array/internals/copyIterable";

/**
 * Reads a non-string iterable as an array: an array is returned as is, any other
 * iterable is copied. The result may be the input itself, so never mutate it.
 * Unlike `toArray`, it never wraps scalars or strings nor maps nullish to `[]`.
 *
 * @throws {TypeError} when the input is a string or not iterable.
 * @root
 */
export function asArray<Input extends readonly unknown[]>(
  iterable: Input,
): Input;
export function asArray<Item>(
  iterable: Iterable<Item> & object,
): readonly Item[];
export function asArray<Item>(
  iterable: Iterable<Item> & object,
): readonly Item[] {
  return isArray(iterable) ? iterable : copyIterable(iterable);
}
