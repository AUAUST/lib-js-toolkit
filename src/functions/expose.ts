let defaultTarget: Record<PropertyKey, any> | undefined;

interface Expose extends Function {
  <T extends Record<PropertyKey, any>>(
    pairs: T,
    when?: boolean,
    target?: Record<PropertyKey, any>,
  ): T;
  <T>(
    name: PropertyKey,
    value: T,
    when?: boolean,
    target?: Record<PropertyKey, any>,
  ): T;

  target(target: Record<PropertyKey, any>): void;
}

function doExpose<T extends Record<PropertyKey, any>>(
  pairs: T,
  when?: boolean,
  target?: Record<PropertyKey, any>,
): T;
function doExpose<T>(
  name: PropertyKey,
  value: T,
  when?: boolean,
  target?: Record<PropertyKey, any>,
): T;
function doExpose(
  nameOrRecord: PropertyKey | Record<PropertyKey, any>,
  valueOrWhen: unknown,
  whenOrTarget?: boolean | Record<PropertyKey, any>,
  target?: any,
): unknown {
  if (nameOrRecord && typeof nameOrRecord === "object") {
    for (const [k, v] of Object.entries(nameOrRecord)) {
      doExpose(
        k,
        v,
        valueOrWhen as boolean,
        typeof whenOrTarget === "object" ? whenOrTarget : undefined,
      );
    }

    return nameOrRecord;
  }

  if (whenOrTarget ?? true) {
    const receiver = target ?? defaultTarget ?? globalThis;

    receiver[nameOrRecord] = valueOrWhen;
  }

  return valueOrWhen;
}

export const expose: Expose = Object.assign(doExpose, {
  target(target: Record<PropertyKey, any>) {
    defaultTarget = target;
  },
});
