export const isSafeInteger = Number.isSafeInteger as {
  (number: number): boolean;
  (number: unknown): number is number;
};
