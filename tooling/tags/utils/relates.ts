import { createTagPreset } from "@auaust/engrenage/docs";

import { createPatternSchema } from "#tooling/tags/utils/createPatternSchema";

/**
 * Declares `@relates`, repeatable: a toolkit helper the export relates to, as an
 * optional `specialises`, `variant` or `inverse` then `<module>.<helper>`.
 */
export const relates = createTagPreset({
  name: "relates",
  body: "inline",
  scope: "export",
  multiple: true,
  output: "public",
  schema: createPatternSchema(
    /^(?:(?:specialises|variant|inverse) )?[a-z][a-z\d]*\.[A-Za-z_$][\w$]*$/u,
    "`[specialises|variant|inverse] <module>.<helper>`, such as `specialises array.map`",
  ),
});
