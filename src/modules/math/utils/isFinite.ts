export const isFinite = Number.isFinite as {
  (number: number): boolean;
  (number: unknown): number is number;
};
