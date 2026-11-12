export const isNaN = Number.isNaN as {
  (candidate: number): boolean;
  (candidate: unknown): candidate is number;
};
