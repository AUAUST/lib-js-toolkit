import { join } from "#modules/array/utils/join";
import { map } from "#modules/array/utils/map";
import { getOwn } from "#modules/object/utils/getOwn";
import {
  combiningMarkPattern,
  unaccentLigatures,
} from "#modules/string/constants";
import type { Maybe } from "#types/Maybe";

/**
 * Removes diacritics by decomposing the string to NFD and dropping combining
 * marks, and spells out ligatures such as `Œ` and `ß`; a nullish string
 * returns `undefined`.
 *
 * @native variant String.prototype.normalize
 */
export function unaccent(string: string): string;
export function unaccent(string: null | undefined): undefined;
export function unaccent(string: Maybe<string>): string | undefined;
export function unaccent(string: Maybe<string>): string | undefined {
  if (string == null) {
    return;
  }

  const characters = [...string.normalize("NFD")];

  const unaccented = map(characters, (character) => {
    return combiningMarkPattern.test(character)
      ? ""
      : (getOwn<string>(unaccentLigatures, character) ?? character);
  });

  return join(unaccented, "");
}
