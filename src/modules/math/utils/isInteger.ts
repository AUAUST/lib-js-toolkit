export const isInteger = Number.isInteger as {
  (number: number): boolean;
  (number: unknown): number is number;
};
