<!-- @reference @auaust/engrenage/agents/rules/discarded-solutions.md -->

# Discarded solutions

- Append one line to `.ai/discarded.md` for each solution you considered and set aside because its cost exceeded what the task or your role allows: a pattern, an abstraction, a refactor, a library or a tool.
- Log within the task in which you set it aside, without asking first.
- Write each line as `- <subject>: <need> — <reason set aside>`, a few words each, naming a library by its package name so repeated mentions match.
- Create the file when absent, under a `# Discarded solutions` heading.
- Before weighing a solution, search the log for its subject; when it holds earlier lines, report the solution as a candidate with the needs they record.
- Remove a subject's lines when a backlog entry, an issue or a change adopts it.
- Record work someone should do in the backlog and gaps in existing code as debt markers; the log holds only solutions not adopted.

<!-- @end -->
