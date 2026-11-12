# Agent friction

- zsh: `grep -rn ... --include=*.ts` unquoted — zsh `nomatch` aborted the command before grep ran; quoted the glob or listed files instead
- gh issue-field-values: clear a multi-select field with an empty array — HTTP 422; DELETE `issues/<n>/issue-field-values/<field id>` instead
- gh issue edit hook: piped the body from a command — the PreToolUse hook requires a heredoc or a `.draft.md` file; wrote the body to a draft first
- engrenage github hook: piped a `.draft.md` path relative to the `cd` target — the hook resolves body paths against the session cwd, not the command's; ran from the drafts directory with a bare file name
- engrenage github hook: piped a draft by path relative to the shell's `cd` — session cwd had moved to `.ai/issues`, so the hook reported the file missing; used absolute paths
- engrenage github hook: ran `rm` on drafts — the hook crashed on a missing `dist/bin/engrenage.mjs` of the linked engrenage, rebuilt meanwhile; retried once it existed
- engrenage github hook: published a Task with Prerequisites after Steps — contract refused the section order; moved Prerequisites before Steps
- engrenage tsdown: compared package exports before and after the structure switch — no command lists each subpath's exported names; wrote a TypeScript checker script over `dist/*.d.mts`
- engrenage tsdown: compared exported names with the last build — HEAD's dist is not kept and no command lists names; built HEAD in a temporary git worktree (frozen install failing on the lockfile, build ran on the published engrenage it had linked) and diffed with a TypeScript checker script
