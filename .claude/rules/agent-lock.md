---
paths:
  - .ai/agent-lock.md
  - .ai/backlog/*.md
---

# Agent lock

`.ai/agent-lock.md` coordinates agents running at the same time. It is a safeguard: agents are not run concurrently on the same module.

- Never take an issue listed in the lock file. Add your issue there when you start working on it and remove it when you stop.
- Before writing to a backlog category, add the category file to the lock file. Re-read the category, write all your entries in one batch, then remove the line.
- When a backlog category is locked, wait, then re-read it before writing.
- Keep one line per lock: `- #<issue>` for an issue, `- .ai/backlog/<category>.md (#<issue>)` for a category, naming the issue you work on.
