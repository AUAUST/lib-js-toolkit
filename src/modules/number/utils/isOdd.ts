import { isBigInt } from "#modules/guard/guards/isBigInt";
import { isInteger } from "#modules/number/guards/isInteger";

/**
 * Returns whether the value is an odd integer; `false` for `NaN`, `±Infinity`
 * and non-integers.
 */
export function isOdd(value: number): boolean;
export function isOdd(value: bigint): boolean;
export function isOdd(value: number | bigint): boolean {
  return isBigInt(value)
    ? value % 2n !== 0n
    : isInteger(value) && value % 2 !== 0;
}
