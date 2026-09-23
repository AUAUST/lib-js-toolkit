import { readonly } from "@auaust/toolkit/readonly";

/**
 * A utility for measuring elapsed time since the timer was started.
 * It exposes extra helpers to track laps.
 */
export interface Stopwatch<Identifier = unknown> {
  (): number;

  /**
   * The timestamp when the timer was started, used to calculate elapsed time.
   */
  readonly start: number;
  /**
   * All laps that have been recorded on the timer.
   */
  readonly laps: readonly Lap<Identifier>[];
  /**
   * Records a new lap and returns the elapsed time since the last lap.
   */
  lap(key?: Identifier): number;
  /**
   * Clears all recorded laps.
   */
  clear(): void;
  /**
   * Restarts the timer and clears all recorded laps.
   */
  restart(): void;
  /**
   * Reads a given lap by position in the laps array.
   */
  at(index: number): Lap<Identifier> | undefined;
}

export type Lap<Identifier = unknown> = {
  /**
   * A key identifying the lap.
   */
  readonly name: Identifier | undefined;
  /**
   * The relative time since the last lap or the start of the timer.
   */
  readonly duration: number;
  /**
   * The absolute time since the start of the timer.
   */
  readonly timestamp: number;
};

export type StopwatchOptions = {
  /**
   * Whether to use `Date.now()` instead of `performance.now()` for measuring time.
   */
  useDate?: boolean;
};

export function stopwatch<Identifier>(
  options: StopwatchOptions = {},
): Stopwatch<Identifier> {
  const { useDate = false } = options;

  const now = useDate ? Date.now : performance.now.bind(performance);

  let start = now();

  let previous = start;

  const laps: Lap<Identifier>[] = [];

  function stopwatch() {
    return now() - start;
  }

  function clear() {
    laps.length = 0;
  }

  function restart() {
    previous = start = now();

    clear();
  }

  function lap(key?: Identifier): number {
    const current = now();

    const duration = current - previous;

    previous = current;

    laps.push(
      Object.freeze({
        name: key,
        duration,
        timestamp: current - start,
      }),
    );

    return duration;
  }

  function at(index: number): Lap<Identifier> | undefined {
    return laps.at(index);
  }

  return Object.freeze(
    Object.assign(stopwatch, {
      get start() {
        return start;
      },
      get laps() {
        return readonly(laps);
      },
      clear,
      restart,
      lap,
      at,
    }),
  );
}
