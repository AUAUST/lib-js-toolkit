import ts from "typescript";

import type { LoadedConfig } from "@auaust/engrenage/extensions";

function declaresBinding(statement: ts.Statement, binding: string): boolean {
  if (ts.isFunctionDeclaration(statement)) {
    return statement.name?.text === binding;
  }

  if (ts.isVariableStatement(statement)) {
    return statement.declarationList.declarations.some((declaration) => {
      return (
        ts.isIdentifier(declaration.name) && declaration.name.text === binding
      );
    });
  }

  return false;
}

// @debt Shorthands and other barrel metadata are read from JSDoc with the TypeScript compiler API inside toolkit; engrenage should own this metadata reading (AUAUST/lib-js-engrenage#438).
// @debt Each caller reads and parses `file` again; the shorthand and root contributions both read every converter.
/**
 * Reads the JSDoc tags on the top-level declarations of `binding` in `file`, mapping each tag name to its distinct comments.
 * A tag without a comment yields an empty string; overloads repeating a tag yield its comment once.
 */
export async function readJsdocTags(
  config: LoadedConfig,
  file: string,
  binding: string,
): Promise<ReadonlyMap<string, readonly string[]>> {
  const content = await config.context.filesystem.read(file);

  if (content == null) {
    throw new Error(`Cannot read ${file}`);
  }

  const source = ts.createSourceFile(
    file,
    content,
    ts.ScriptTarget.Latest,
    true,
  );

  const tags = new Map<string, Set<string>>();

  for (const statement of source.statements) {
    if (!declaresBinding(statement, binding)) {
      continue;
    }

    for (const jsdocTag of ts.getJSDocTags(statement)) {
      const name = jsdocTag.tagName.text;
      const comment = (ts.getTextOfJSDocComment(jsdocTag.comment) ?? "").trim();

      tags.set(name, (tags.get(name) ?? new Set()).add(comment));
    }
  }

  return new Map(
    [...tags].map(([name, comments]) => {
      return [name, [...comments]];
    }),
  );
}
