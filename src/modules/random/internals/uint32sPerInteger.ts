export function uint32sPerInteger(min: number, max: number): 1 | 2 {
  return max - min + 1 <= 2 ** 32 ? 1 : 2;
}
