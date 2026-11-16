import { isPlainObject } from "#modules/object/guards/isPlainObject";
import { hasOwn } from "#modules/object/utils/hasOwn";
import { ownEnumerableKeys } from "#modules/object/utils/ownEnumerableKeys";
import type { MergeRule } from "#types/MergeRule";

type Mergeable = Record<PropertyKey, unknown>;

interface MergeState {
  readonly copies: WeakMap<object, Mergeable>;
  readonly pairs: WeakMap<object, WeakSet<object>>;
  readonly rule: MergeRule | undefined;
}

const absent = Symbol("absent");
const unchanged = Symbol("unchanged");

function mergeableKeys(source: Mergeable): PropertyKey[] {
  return ownEnumerableKeys(source).filter((key) => key !== "__proto__");
}

function copyOf(
  source: Mergeable,
  path: readonly PropertyKey[],
  state: MergeState,
): Mergeable {
  const existing = state.copies.get(source);

  if (existing) {
    return existing;
  }

  const copy: Mergeable = {};

  state.copies.set(source, copy);
  mergeSources(copy, [source], path, state);

  return copy;
}

function unseenSources(
  target: Mergeable,
  sources: readonly unknown[],
  state: MergeState,
): Mergeable[] {
  let seen = state.pairs.get(target);

  if (!seen) {
    seen = new WeakSet();
    state.pairs.set(target, seen);
  }

  const unseen: Mergeable[] = [];

  for (const source of sources) {
    if (!isPlainObject(source) || seen.has(source)) {
      continue;
    }

    seen.add(source);
    unseen.push(source);
  }

  return unseen;
}

function combine(
  current: unknown,
  value: unknown,
  path: readonly PropertyKey[],
  state: MergeState,
): unknown {
  if (current === absent) {
    return isPlainObject(value) ? copyOf(value, path, state) : value;
  }

  if (!isPlainObject(value)) {
    return isPlainObject(current) ? unchanged : value;
  }

  if (isPlainObject(current)) {
    mergeSources(current, [value], path, state);
  }

  return unchanged;
}

function foldValues(
  values: readonly unknown[],
  start: unknown,
  path: readonly PropertyKey[],
  state: MergeState,
): unknown {
  let result = start;

  for (const value of values) {
    const combined = combine(result, value, path, state);

    if (combined !== unchanged) {
      result = combined;
    }
  }

  return result;
}

function mergeKeyByRule(
  target: Mergeable,
  key: PropertyKey,
  sources: readonly Mergeable[],
  path: readonly PropertyKey[],
  rule: MergeRule,
  state: MergeState,
): void {
  const held = hasOwn(target, key);
  const current = held ? target[key] : absent;
  const values: unknown[] = held ? [current] : [];

  for (const source of sources) {
    if (hasOwn(source, key)) {
      values.push(source[key]);
    }
  }

  const keyPath = [...path, key];

  target[key] = rule(values, {
    key,
    path: keyPath,
    target,
    merge: (merged) => {
      return held && merged[0] === current
        ? foldValues(merged.slice(1), current, keyPath, state)
        : foldValues(merged, absent, keyPath, state);
    },
  });
}

function mergeSourcesByRule(
  target: Mergeable,
  sources: readonly Mergeable[],
  path: readonly PropertyKey[],
  rule: MergeRule,
  state: MergeState,
): void {
  const keys = new Set(sources.flatMap(mergeableKeys));

  for (const key of keys) {
    mergeKeyByRule(target, key, sources, path, rule, state);
  }
}

function mergeSources(
  target: Mergeable,
  sources: readonly unknown[],
  path: readonly PropertyKey[],
  state: MergeState,
): void {
  const unseen = unseenSources(target, sources, state);

  if (state.rule) {
    return void mergeSourcesByRule(target, unseen, path, state.rule, state);
  }

  for (const source of unseen) {
    for (const key of mergeableKeys(source)) {
      const current = hasOwn(target, key) ? target[key] : absent;
      const combined = combine(current, source[key], [...path, key], state);

      if (combined !== unchanged) {
        target[key] = combined;
      }
    }
  }
}

/**
 * Merges `sources` into `target` in argument order under the merge rule, or under
 * `rule` for every key at every depth when given, and returns `target`.
 */
export function mergeInto(
  target: Mergeable,
  sources: readonly unknown[],
  rule?: MergeRule,
): Mergeable {
  mergeSources(target, sources, [], {
    copies: new WeakMap(),
    pairs: new WeakMap(),
    rule,
  });

  return target;
}
