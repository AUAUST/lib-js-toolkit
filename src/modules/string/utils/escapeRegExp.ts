import type { Maybe } from "#types/Maybe";

const syntaxCharacters = new Set("^$\\.*+?()[]{}|/");

const controlEscapes = new Map([
  ["\t", "\\t"],
  ["\n", "\\n"],
  ["\v", "\\v"],
  ["\f", "\\f"],
  ["\r", "\\r"],
]);

const otherPunctuators = new Set(",-=<>#&!%:;@~'`\"");

const whitespacePattern = /^\s$/u;

const loneSurrogatePattern = /^[\uD800-\uDFFF]$/u;

const leadingAlphanumericPattern = /^[\dA-Za-z]/u;

/**
 * Escapes a string for literal use in a `RegExp`, with the output of
 * `RegExp.escape`.
 */
export function escapeRegExp(string: string): string;
/**
 * Returns `undefined` for `null` or `undefined`.
 */
export function escapeRegExp(string: Maybe<string>): string | undefined;
export function escapeRegExp(string: Maybe<string>): string | undefined {
  if (string == null) {
    return;
  }

  // @debt `RegExp.escape` replaces this implementation once the runtime baseline includes it.
  let result = "";
  let first = true;

  for (const character of string) {
    result += first && leadingAlphanumericPattern.test(character)
      ? unicodeEscape(character)
      : escapeCharacter(character);

    first = false;
  }

  return result;
}

function escapeCharacter(character: string): string {
  if (syntaxCharacters.has(character)) {
    return `\\${character}`;
  }

  const controlEscape = controlEscapes.get(character);

  if (controlEscape !== undefined) {
    return controlEscape;
  }

  if (
    otherPunctuators.has(character) ||
    whitespacePattern.test(character) ||
    loneSurrogatePattern.test(character)
  ) {
    return unicodeEscape(character);
  }

  return character;
}

function unicodeEscape(character: string): string {
  const codeUnit = character.charCodeAt(0);

  if (codeUnit <= 0xff) {
    return String.raw`\x${codeUnit.toString(16).padStart(2, "0")}`;
  }

  let result = "";

  for (let index = 0; index < character.length; index++) {
    result += String.raw`\u${character.charCodeAt(index).toString(16).padStart(4, "0")}`;
  }

  return result;
}
