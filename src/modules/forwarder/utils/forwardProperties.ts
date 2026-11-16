import { forward, type Forwarded } from "#modules/forwarder/utils/forward";
import {
  propertyForwarders,
  type KeyPropertyForwarderFor,
  type PropertyForwarderFor,
} from "#modules/forwarder/utils/propertyForwarders";
import type { PropertyForwardingInput } from "#modules/forwarder/utils/propertyForwarder";
import type { MaybeArray } from "#types/MaybeArray";
import type { MaybeArrayElement } from "#types/MaybeArrayElement";

/**
 * Forwards each property onto `target`, from an object `source` or from the
 * `source` property of `target`, resolved on every access.
 *
 * @throws {StateError} When `target` already owns a forwarded name.
 */
export function forwardProperties<
  Target extends object,
  const Source extends object,
  const Properties extends MaybeArray<
    PropertyForwardingInput<keyof Source, PropertyKey>
  >[],
>(
  target: Target,
  source: Source,
  ...properties: Properties
): Forwarded<
  Target,
  PropertyForwarderFor<
    Source,
    MaybeArrayElement<
      Properties[number],
      PropertyForwardingInput<keyof Source, PropertyKey>
    >
  >[]
>;
export function forwardProperties<
  Target extends object,
  const SourceKey extends keyof Target,
  const Properties extends MaybeArray<
    PropertyForwardingInput<keyof Target[SourceKey], PropertyKey>
  >[],
>(
  target: Target,
  source: SourceKey,
  ...properties: Properties
): Forwarded<
  Target,
  KeyPropertyForwarderFor<
    SourceKey,
    MaybeArrayElement<
      Properties[number],
      PropertyForwardingInput<keyof Target[SourceKey], PropertyKey>
    >
  >[]
>;
// @debt The implementation signature types the source `any`, because no overload accepts an `object | PropertyKey` source; an internal factory taking that union, which the overloads and the plural forms would share, would remove it.
export function forwardProperties(
  target: object,
  source: any,
  ...properties: any[]
): object {
  return forward(target, propertyForwarders(source, ...properties));
}
