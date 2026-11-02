<!-- @reference @auaust/engrenage/agents/rules/git.md -->

# Git and GitHub

## Commits

- Don't push.
- When your work covers several tasks, commit each task's changes separately; otherwise leave your changes uncommitted and give the suggested commit message in your report.
- Avoid committing changes you did not make.
- Write every commit message, suggested or committed, with the subject `<type>: <summary>`, where `<type>` is the type below that matches the commit's main purpose.
- Write the summary as the label a reader would use to recall the commit's main change, starting lowercase, with no trailing period and no verb the type already carries.
- Leave the change's parts, reasons and mechanics out of the commit message.
- When the summary needs "and" to cover several changes, name what they have in common instead.
- Limit the message body to one `Closes #<n>` line per issue the commit resolves and one `Towards #<n>` line per issue it advances without resolving.

| Type      | Main purpose                                                              |
| --------- | ------------------------------------------------------------------------- |
| `feat`    | New feature                                                               |
| `fix`     | Bug fix                                                                   |
| `imp`     | Improvement to something that exists, or any change to agent instructions |
| `cq`      | Code change that keeps behavior                                           |
| `docs`    | Comments, markers, documentation, backlog and scratchpad files            |
| `css`     | Styling and layout                                                        |
| `tests`   | Tests                                                                     |
| `update`  | Dependency updates                                                        |
| `content` | Content a CMS stores in git                                               |
| `assets`  | Images and other files the code uses, other than content                  |
| `files`   | Adding, renaming or moving files and directories                          |
| `snap`    | Checkpoint of unfinished work                                             |
| `config`  | Configuration and environment files                                       |
| `debug`   | Temporary experiment, to be reverted                                      |
| `meta`    | Repository matters other than code: license, CI                           |

## GitHub

- Write to GitHub only in repositories owned by the AUAUST organization.

<!-- @end -->
