<!-- @reference @auaust/engrenage/agents/rules/git.md -->

# Git and GitHub

## Commits

- Don't push.
- When your work covers several tasks, commit each task's changes separately; commit at each checkpoint an issue marks; otherwise leave your changes uncommitted with the suggested commit message in your report.
- Avoid committing changes you did not make; stage paths by name, never `.ai/issues/`, whose drafts stay local.
- Write every commit message, suggested or committed, with the subject `<type>: <summary>`, where `<type>` is the type below that matches the commit's main purpose.
- Write the summary as the label a reader would use to recall the commit's main change, starting lowercase, with no trailing period and no verb the type already carries.
- Leave the change's parts, reasons and mechanics out of the commit message.
- When the summary needs "and" to cover several changes, name what they have in common instead.
- Limit the message body to one `Closes #<n>` consecutive line per issue the commit resolves and one `Towards #<n>` line per issue it advances without resolving, on consecutive lines.

| Type      | Main purpose                                                 |
| --------- | ------------------------------------------------------------ |
| `feat`    | New feature                                                  |
| `fix`     | Bug fix                                                      |
| `imp`     | Improvement to something that exists                         |
| `cq`      | Code change that keeps behavior                              |
| `docs`    | Comments and documentation for human readers                 |
| `brain`   | Agentic programming: what steers agents and what they record |
| `css`     | Styling and layout                                           |
| `tests`   | Tests                                                        |
| `update`  | Dependency updates                                           |
| `content` | Content a CMS stores in git                                  |
| `assets`  | Images and other files the code uses, other than content     |
| `files`   | Adding, renaming or moving files and directories             |
| `snap`    | Checkpoint of unfinished work                                |
| `config`  | Configuration and environment files, other than agents'      |
| `debug`   | Temporary experiment, to be reverted                         |
| `meta`    | Repository matters other than code: license, CI              |

## GitHub

- Write to GitHub only in repositories owned by the AUAUST organization.
- Read an issue with `gh issue view <n> --repo <owner>/<repo> --json title,body,state,labels,comments`; plain `--comments` fails on some repositories.
- List an issue's sub-issues in order with `gh api repos/{owner}/{repo}/issues/<n>/sub_issues --jq '.[] | "\(.number) \(.state) \(.title)"'`.

<!-- @end -->
