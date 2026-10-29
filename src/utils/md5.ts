import { isString } from "#utils/isString";

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/**
 * @see https://github.com/enyo/md5/blob/master/index.js
 */
export function md5(input: string): string {
  if (!isString(input)) {
    throw new TypeError("Input must be a string");
  }

  return rstr2hex(rstrMd5(string2rstrUtf8(input)));
}

function rstrMd5(s: string): string {
  return binl2rstr(binlMd5(rstr2binl(s), s.length * 8));
}

function rstr2hex(input: string): string {
  const hex = "0123456789abcdef";

  let output = "";
  let x;

  for (let index = 0; index < input.length; index++) {
    x = input.charCodeAt(index);
    output += hex.charAt((x >>> 4) & 0x0f) + hex.charAt(x & 0x0f);
  }

  return output;
}

function string2rstrUtf8(input: string): string {
  let output = "";
  let index = -1;
  let x, y;

  while (++index < input.length) {
    x = input.charCodeAt(index);
    y = index + 1 < input.length ? input.charCodeAt(index + 1) : 0;

    if (0xd800 <= x && x <= 0xdbff && 0xdc00 <= y && y <= 0xdfff) {
      x = 0x10000 + ((x & 0x03ff) << 10) + (y & 0x03ff);
      index++;
    }

    if (x <= 0x7f) {
      output += String.fromCharCode(x);
    } else if (x <= 0x7ff) {
      output += String.fromCharCode(
        0xc0 | ((x >>> 6) & 0x1f),
        0x80 | (x & 0x3f),
      );
    } else if (x <= 0xffff) {
      output += String.fromCharCode(
        0xe0 | ((x >>> 12) & 0x0f),
        0x80 | ((x >>> 6) & 0x3f),
        0x80 | (x & 0x3f),
      );
    } else if (x <= 0x1fffff) {
      output += String.fromCharCode(
        0xf0 | ((x >>> 18) & 0x07),
        0x80 | ((x >>> 12) & 0x3f),
        0x80 | ((x >>> 6) & 0x3f),
        0x80 | (x & 0x3f),
      );
    }
  }

  return output;
}

function rstr2binl(input: string): number[] {
  const output = Array.from<number>({
    length: input.length >> 2,
  });

  for (let index = 0; index < output.length; index++) {
    output[index] = 0;
  }

  for (let index = 0; index < input.length * 8; index += 8) {
    output[index >> 5] |= (input.charCodeAt(index / 8) & 0xff) << (index % 32);
  }

  return output;
}

function binl2rstr(input: number[]): string {
  let output = "";

  for (let index = 0; index < input.length * 32; index += 8) {
    output += String.fromCharCode((input[index >> 5] >>> (index % 32)) & 0xff);
  }

  return output;
}

function binlMd5(x: number[], length: number): number[] {
  x[length >> 5] |= 0x80 << (length % 32);
  x[(((length + 64) >>> 9) << 4) + 14] = length;

  let a = 1_732_584_193;
  let b = -271_733_879;
  let c = -1_732_584_194;
  let d = 271_733_878;

  for (let index = 0; index < x.length; index += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;

    a = md5Ff(a, b, c, d, x[index + 0], 7, -680_876_936);
    d = md5Ff(d, a, b, c, x[index + 1], 12, -389_564_586);
    c = md5Ff(c, d, a, b, x[index + 2], 17, 606_105_819);
    b = md5Ff(b, c, d, a, x[index + 3], 22, -1_044_525_330);
    a = md5Ff(a, b, c, d, x[index + 4], 7, -176_418_897);
    d = md5Ff(d, a, b, c, x[index + 5], 12, 1_200_080_426);
    c = md5Ff(c, d, a, b, x[index + 6], 17, -1_473_231_341);
    b = md5Ff(b, c, d, a, x[index + 7], 22, -45_705_983);
    a = md5Ff(a, b, c, d, x[index + 8], 7, 1_770_035_416);
    d = md5Ff(d, a, b, c, x[index + 9], 12, -1_958_414_417);
    c = md5Ff(c, d, a, b, x[index + 10], 17, -42_063);
    b = md5Ff(b, c, d, a, x[index + 11], 22, -1_990_404_162);
    a = md5Ff(a, b, c, d, x[index + 12], 7, 1_804_603_682);
    d = md5Ff(d, a, b, c, x[index + 13], 12, -40_341_101);
    c = md5Ff(c, d, a, b, x[index + 14], 17, -1_502_002_290);
    b = md5Ff(b, c, d, a, x[index + 15], 22, 1_236_535_329);

    a = md5Gg(a, b, c, d, x[index + 1], 5, -165_796_510);
    d = md5Gg(d, a, b, c, x[index + 6], 9, -1_069_501_632);
    c = md5Gg(c, d, a, b, x[index + 11], 14, 643_717_713);
    b = md5Gg(b, c, d, a, x[index + 0], 20, -373_897_302);
    a = md5Gg(a, b, c, d, x[index + 5], 5, -701_558_691);
    d = md5Gg(d, a, b, c, x[index + 10], 9, 38_016_083);
    c = md5Gg(c, d, a, b, x[index + 15], 14, -660_478_335);
    b = md5Gg(b, c, d, a, x[index + 4], 20, -405_537_848);
    a = md5Gg(a, b, c, d, x[index + 9], 5, 568_446_438);
    d = md5Gg(d, a, b, c, x[index + 14], 9, -1_019_803_690);
    c = md5Gg(c, d, a, b, x[index + 3], 14, -187_363_961);
    b = md5Gg(b, c, d, a, x[index + 8], 20, 1_163_531_501);
    a = md5Gg(a, b, c, d, x[index + 13], 5, -1_444_681_467);
    d = md5Gg(d, a, b, c, x[index + 2], 9, -51_403_784);
    c = md5Gg(c, d, a, b, x[index + 7], 14, 1_735_328_473);
    b = md5Gg(b, c, d, a, x[index + 12], 20, -1_926_607_734);

    a = md5Hh(a, b, c, d, x[index + 5], 4, -378_558);
    d = md5Hh(d, a, b, c, x[index + 8], 11, -2_022_574_463);
    c = md5Hh(c, d, a, b, x[index + 11], 16, 1_839_030_562);
    b = md5Hh(b, c, d, a, x[index + 14], 23, -35_309_556);
    a = md5Hh(a, b, c, d, x[index + 1], 4, -1_530_992_060);
    d = md5Hh(d, a, b, c, x[index + 4], 11, 1_272_893_353);
    c = md5Hh(c, d, a, b, x[index + 7], 16, -155_497_632);
    b = md5Hh(b, c, d, a, x[index + 10], 23, -1_094_730_640);
    a = md5Hh(a, b, c, d, x[index + 13], 4, 681_279_174);
    d = md5Hh(d, a, b, c, x[index + 0], 11, -358_537_222);
    c = md5Hh(c, d, a, b, x[index + 3], 16, -722_521_979);
    b = md5Hh(b, c, d, a, x[index + 6], 23, 76_029_189);
    a = md5Hh(a, b, c, d, x[index + 9], 4, -640_364_487);
    d = md5Hh(d, a, b, c, x[index + 12], 11, -421_815_835);
    c = md5Hh(c, d, a, b, x[index + 15], 16, 530_742_520);
    b = md5Hh(b, c, d, a, x[index + 2], 23, -995_338_651);

    a = md5Ii(a, b, c, d, x[index + 0], 6, -198_630_844);
    d = md5Ii(d, a, b, c, x[index + 7], 10, 1_126_891_415);
    c = md5Ii(c, d, a, b, x[index + 14], 15, -1_416_354_905);
    b = md5Ii(b, c, d, a, x[index + 5], 21, -57_434_055);
    a = md5Ii(a, b, c, d, x[index + 12], 6, 1_700_485_571);
    d = md5Ii(d, a, b, c, x[index + 3], 10, -1_894_986_606);
    c = md5Ii(c, d, a, b, x[index + 10], 15, -1_051_523);
    b = md5Ii(b, c, d, a, x[index + 1], 21, -2_054_922_799);
    a = md5Ii(a, b, c, d, x[index + 8], 6, 1_873_313_359);
    d = md5Ii(d, a, b, c, x[index + 15], 10, -30_611_744);
    c = md5Ii(c, d, a, b, x[index + 6], 15, -1_560_198_380);
    b = md5Ii(b, c, d, a, x[index + 13], 21, 1_309_151_649);
    a = md5Ii(a, b, c, d, x[index + 4], 6, -145_523_070);
    d = md5Ii(d, a, b, c, x[index + 11], 10, -1_120_210_379);
    c = md5Ii(c, d, a, b, x[index + 2], 15, 718_787_259);
    b = md5Ii(b, c, d, a, x[index + 9], 21, -343_485_551);

    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}

function md5Cmn(
  q: number,
  a: number,
  b: number,
  x: number,
  s: number,
  t: number,
): number {
  return safeAdd(bitRol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5Ff(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
): number {
  return md5Cmn((b & c) | (~b & d), a, b, x, s, t);
}

function md5Gg(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
): number {
  return md5Cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function md5Hh(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
) {
  return md5Cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5Ii(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
): number {
  return md5Cmn(c ^ (b | ~d), a, b, x, s, t);
}

function safeAdd(x: number, y: number): number {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);

  return (msw << 16) | (lsw & 0xffff);
}

function bitRol(number: number, cnt: number): number {
  return (number << cnt) | (number >>> (32 - cnt));
}
