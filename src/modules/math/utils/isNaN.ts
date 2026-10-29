export const isNaN = Number.isNaN as {
  (number: number): boolean;
  (number: unknown): number is number;
};
