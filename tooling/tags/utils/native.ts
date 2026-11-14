import { createTagPreset } from "@auaust/engrenage/docs";

import { createPatternSchema } from "#tooling/tags/utils/createPatternSchema";

/**
 * Declares `@native`: the builtin a helper relates to, as `equal`, `nullsafe` or
 * `variant` then the builtin's dotted global path.
 */
export const native = createTagPreset({
  name: "native",
  body: "inline",
  scope: "export",
  multiple: false,
  output: "public",
  schema: createPatternSchema(
    /^(?:equal|nullsafe|variant) [A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*$/u,
    "`<equal|nullsafe|variant> <builtin path>`, such as `equal Array.prototype.map`",
  ),
});
