export const isFinite = Number.isFinite as {
  (candidate: number): boolean;
  (candidate: unknown): candidate is number;
};
