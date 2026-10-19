export type ForwardAs<
  Property extends PropertyKey,
  Alias extends PropertyKey,
> = {
  property: Property;
  as: Alias;
};

export function forwardAs<
  const Property extends PropertyKey,
  const Alias extends PropertyKey,
>(property: Property, as: Alias): ForwardAs<Property, Alias> {
  return {
    property,
    as,
  };
}
