import { MD5 } from "crypto-js";

export function md5(input: string): string {
  if (typeof input !== "string") {
    throw new TypeError("Input must be a string");
  }

  return MD5(input).toString();
}
