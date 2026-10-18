import { frozen } from "@auaust/toolkit/frozen";
import { isNumber } from "@auaust/toolkit/isNumber";
import { isUndefined } from "@auaust/toolkit/isUndefined";
import { isNaN } from "@auaust/toolkit/math";
import { defineGetters, finalize, freeze } from "@auaust/toolkit/object";
import { plain } from "@auaust/toolkit/plain";
import { readonly } from "@auaust/toolkit/readonly";
import { StateError } from "../errors/StateError";

/**
 * A utility for measuring elapsed time across one or more running periods.
 */
export interface Stopwatch<Identifier = unknown> {
  (): number;

  /**
   * The timestamp when the timer was started, on the selected clock's timeline.
   */
  readonly start: number;
  /**
   * Whether the timer is currently running.
   */
  readonly running: boolean;
  /**
   * All laps that have been recorded on the timer.
   */
  readonly laps: readonly Lap<Identifier>[];
  /**
   * The non-contiguous periods during which the timer has been running.
   */
  readonly periods: readonly Period[];
  /**
   * Records a new lap and returns the elapsed time since the last lap.
   * Throws an `StateError` while the timer is paused or stopped.
   */
  lap(key?: Identifier): number;
  /**
   * Clears all recorded laps.
   */
  clear(): void;
  /**
   * Pauses the timer. Calling this on an already paused timer has no effect.
   */
  pause(): void;
  /**
   * Resumes a paused or stopped timer. Calling this on a running timer has no effect.
   */
  resume(): void;
  /**
   * Stops the timer and clears its elapsed time, periods, and laps.
   */
  stop(): void;
  /**
   * Restarts the timer and clears its elapsed time, periods, and laps.
   */
  restart(): void;
}

export type Lap<Identifier = unknown> = {
  /**
   * The position of the lap in the sequence of recorded laps.
   */
  readonly index: number;
  /**
   * A key identifying the lap.
   */
  readonly name: Identifier | undefined;
  /**
   * The relative time since the last lap or the start of the timer.
   */
  readonly duration: number;
  /**
   * The absolute elapsed time since the start of the timer, excluding pauses.
   */
  readonly timestamp: number;
};

export type Period = {
  /**
   * The position of the period in the sequence of recorded periods.
   */
  readonly index: number;
  /**
   * The timestamp when this running period started.
   */
  readonly start: number;
  /**
   * The timestamp when this running period ended, or `undefined` while it is active.
   */
  readonly end: number | undefined;
  /**
   * The duration of this running period.
   */
  readonly duration: number;
};

export type StopwatchOptions = {
  /**
   * Whether to use `performance.now()` instead of `Date.now()` for measuring time.
   * Defaults to `true`, except when `start` is a `Date` and this option is omitted.
   */
  usePerformance?: boolean;

  /**
   * The timestamp to use as the start time for the stopwatch, if different than the current time.
   */
  startAt?: Date | number;
};

type PeriodState = {
  start: number;
  end: number | undefined;
};

function resolveOptions(options: StopwatchOptions) {
  const usePerformance =
    options.usePerformance ??
    (!isUndefined(globalThis.performance) &&
      !(options.startAt instanceof Date));

  const now = usePerformance
    ? performance.now.bind(performance)
    : Date.now.bind(Date);

  let { startAt = now() } = options;

  if (startAt instanceof Date) {
    if (usePerformance) {
      return {
        now,
        startAt: now() - (Date.now() - startAt.getTime()),
      };
    }

    return {
      now,
      startAt: startAt.getTime(),
    };
  }

  if (isNaN((startAt = Number(startAt)))) {
    throw new TypeError(`Invalid startAt value: '${options.startAt}'`);
  }

  return {
    now,
    startAt,
  };
}

export function stopwatch<Identifier>(
  options: StopwatchOptions | Date | number = {},
): Stopwatch<Identifier> {
  const { now, startAt } = resolveOptions(
    isNumber(options) || options instanceof Date
      ? {
          startAt: options,
        }
      : options,
  );

  let start = startAt;
  let running = true;
  let elapsed = 0;
  let previousLap = 0;
  let activePeriod: PeriodState | undefined;

  const laps: Lap<Identifier>[] = [];
  const periods: Period[] = [];

  function openPeriod(at: number) {
    const state: PeriodState = {
      start: at,
      end: undefined,
    };

    const period = plain<Period>({
      index: periods.length,
      start: state.start,
    });

    defineGetters(period, {
      end: () => {
        return state.end;
      },
      duration: () => {
        return (state.end ?? now()) - state.start;
      },
    });

    activePeriod = state;

    periods.push(freeze(period));
  }

  function elapsedSinceStart(at = now()): number {
    return elapsed + (running && activePeriod ? at - activePeriod.start : 0);
  }

  function reset(at: number, shouldRun: boolean) {
    if (running && activePeriod) {
      activePeriod.end = at;
    }

    laps.length = 0;
    periods.length = 0;

    elapsed = 0;
    previousLap = 0;
    start = at;
    running = shouldRun;
    activePeriod = undefined;

    if (shouldRun) {
      openPeriod(at);
    }
  }

  function clear() {
    laps.length = 0;
  }

  function pause() {
    if (running && activePeriod) {
      const current = now();

      elapsed += current - activePeriod.start;
      activePeriod.end = current;
      activePeriod = undefined;
      running = false;
    }
  }

  function resume() {
    if (!running) {
      running = true;

      openPeriod(now());
    }
  }

  function stop() {
    reset(now(), false);
  }

  function restart() {
    reset(now(), true);
  }

  function lap(key?: Identifier): number {
    if (!running) {
      throw new StateError(
        "Cannot record a lap while the stopwatch is not running",
      );
    }

    const current = elapsedSinceStart();

    const duration = current - previousLap;

    previousLap = current;

    laps.push(
      frozen({
        index: laps.length,
        name: key,
        duration,
        timestamp: current,
      }),
    );

    return duration;
  }

  function stopwatch() {
    return elapsedSinceStart();
  }

  defineGetters(stopwatch, {
    start: () => start,
    running: () => running,
    laps: () => readonly(laps),
    periods: () => readonly(periods),
  });

  openPeriod(start);

  return finalize(stopwatch, {
    clear,
    pause,
    resume,
    stop,
    restart,
    lap,
  }) as Stopwatch<Identifier>;
}
