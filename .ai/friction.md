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
- `gh issue list --json issueType`: listed issue types with it — field unsupported; used `gh api graphql` with `issueType{name}`
- zsh: `grep -r --include=*.js` and a `*.ts` path glob unquoted — `nomatch` aborted both; dropped the globs
- zsh: `echo ======` as a separator — `=word` expansion failed the command; used `----`
- engrenage gate --worktree: run with agent worktrees under `.claude/worktrees/` — ESLint linted them too (31 errors from trial code); filtered the log by path
- `engrenage planning issue publish`: looked up the new issue number with `gh issue list --search` — publish prints no number for a created issue and search lags; listed `issues?sort=created` instead
- `engrenage planning issue publish`: retyped #120 Plan → Resource — merge re-adds the old type's fields from GitHub and refuses; set the type with GraphQL `updateIssue`, re-claimed, restored the draft
- `engrenage planning issue publish`: moved sub-issues whose old parent was outside the set (#138 under #130) — GitHub refused "only one parent" after half the writes; detached with `DELETE …/sub_issue`, re-claimed the partly written issues, published again
- `engrenage planning issue publish`: published drafts whose base copy had been Prettier-formatted — formatting-only differences read as GitHub changes; replaced the base bodies with GitHub's
- `engrenage planning issue publish`: re-parented old-format trackers — publish requires claiming every issue whose ancestors change and their bodies to pass the contract; demoted their extra sections to `###` under Context
