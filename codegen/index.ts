import type { ResolvedConfig } from "@auaust/engrenage/config";

export function getCompileTimeVariables({
  packageJson,
}: ResolvedConfig): Record<string, string> {
  const { name, version, license } = packageJson.manifest;

  const variables = {
    __NAME__: name,
    __VERSION__: version,
    __LICENSE__: license,
    __TIMESTAMP__: new Date().toISOString(),
  };

  return Object.fromEntries(
    Object.entries(variables).map(([key, value]) => {
      return [key, JSON.stringify(value)];
    }),
  );
}
