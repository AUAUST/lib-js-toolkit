import { map } from "#modules/array/utils/map";
import { getOwn } from "#modules/object/utils/getOwn";
import {
  combiningMarkPattern,
  unaccentLigatures,
} from "#modules/string/constants";
import type { Maybe } from "#types/Maybe";

/**
 * Removes diacritics by decomposing the string to NFD and dropping combining
 * marks, and spells out ligatures such as `Œ` and `ß`; nullish input is
 * returned as is.
 *
 * @native variant String.prototype.normalize
 */
export function unaccent(string: string): string;
export function unaccent<Value extends null | undefined>(string: Value): Value;
export function unaccent(string: Maybe<string>): Maybe<string>;
export function unaccent(string: Maybe<string>): Maybe<string> {
  if (string == null) {
    return string;
  }

  const characters = [...string.normalize("NFD")];

  return map(characters, (character) => {
    return combiningMarkPattern.test(character)
      ? ""
      : (getOwn<string>(unaccentLigatures, character) ?? character);
  }).join("");
}
