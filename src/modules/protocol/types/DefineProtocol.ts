export type DefineProtocol<
  Marker extends symbol,
  Implementation extends Record<Marker, unknown>,
> = {
  [Protocol in Marker]: Implementation;
};
