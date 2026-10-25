import {
  createEslintConfig,
  filesIn,
  restrictSyntax,
  sourceSyntaxRestrictions,
  syntaxRestrictions,
  type SyntaxRestriction,
} from "@auaust/engrenage/eslint";
import { defineConfig } from "eslint/config";

const helperImplementations = [
  "src/modules/object/**/*.ts",
  "src/utils/is*.ts",
  "src/utils/compare.ts",
];

function isTypeofRestriction({ selector }: SyntaxRestriction): boolean {
  return selector.includes("operator='typeof'");
}

const restrictionsAllowingTypeof = syntaxRestrictions.filter(
  (restriction) => !isTypeofRestriction(restriction),
);

export default defineConfig([
  createEslintConfig({
    root: new URL("./", import.meta.url),
    sourceDirectories: ["src", "codegen", "scripts"],
  }),
  {
    files: helperImplementations,
    rules: {
      "no-restricted-properties": "off",
      ...restrictSyntax(
        ...restrictionsAllowingTypeof,
        ...sourceSyntaxRestrictions,
      ),
    },
  },
  {
    files: [filesIn("codegen"), filesIn("scripts")],
    rules: {
      "no-restricted-properties": "off",
    },
  },
  {
    files: [filesIn("tests")],
    rules: {
      "no-constant-condition": "off",
      "no-restricted-properties": "off",
      ...restrictSyntax(...restrictionsAllowingTypeof),
    },
  },
]);
