<!-- @reference @auaust/engrenage/agents/rules/debt-markers.md -->

# Debt markers

- Mark code that could be better and that you are not fixing with a comment starting `@debt <statement>`, one marker per comment, within the task in which you notice it.
- Mark a concern even when you cannot say how to resolve it: a vague marker beats a dropped concern. State what could be better as you see it, and add a fix only when you already know one.
- Debt is any gap between the code as it is and the code as it would be with complete knowledge and no limits of time, scope or instructions. That includes code that holds only while something outside it stays true, and any change that makes a tool or check accept the code instead of making the code right.
- Judge against that ideal, never against the task: code that follows an issue, a decision, an instruction or the only option within your scope is still debt when it falls short.
- Doubt settles the question: if you wonder whether something is debt, it is.
- Mark debt you notice wherever it is, in files you change or only read. Never search for it or investigate it beyond what your task already shows you: noticing is enough.
- Debt never fails a check. Remove a marker only when your change resolves it.

<!-- @end -->
