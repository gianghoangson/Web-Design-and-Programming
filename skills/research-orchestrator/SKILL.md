---
name: research-orchestrator
description: Runs the project's base research workflow end to end (spec, explore, decision-batch, plan, execute, conditional audit) with one batched decision gate. Drives the existing skills rather than reimplementing them; runs autonomously through exploration and a draft plan, pauses once to put every genuine decision to the user in a single AskUserQuestion pass, then continues to execution and a conditional adversarial audit. Use when the user hands over a research or model task and wants it carried as far as possible from a single instruction, e.g. "research and implement X", "take this all the way", "do the whole thing".
---

<what-to-do>

Carry a research task through the project's base workflow from one instruction, stopping only where a decision is genuinely the user's. The value of this skill is the single batched decision gate and the conditional audit; it orchestrates the existing skills, it does not duplicate them.

Run these phases in order.

1. **Spec (log first).** Locate or open the `.specs/NN-slug/` folder for this task: `spec.md` (research question, hypothesis, scope, decisions) and `tasks.md` (the checklist), and add the row to `.specs/INDEX.md`. This matches the project rule "open a spec before starting new work" and gives the run a home. If a spec already owns the task, use it.
2. **Explore (autonomous).** Run the `explore-plan` bootstrap (read `MEMORY.md`, `docs/README.md`, `.specs/INDEX.md`, `TODO.md`, and the task-specific documents). For a literature-shaped task, also run `literature-review` synthesise. Produce the short context summary. No user input here.
3. **Decision-batch (the one gate).** Collect every genuine decision the task turns on, the branches that `grill-me` or `grill-with-or-docs` would walk, and put them to the user in a single `AskUserQuestion` pass, each with a recommended default. Decisions you can resolve from the code, the docs, or a sensible default you resolve yourself and state; only the irreducible ones go to the user. This is the only mandatory interruption. For a modelling task, stress the decisions against `docs/01-problem-description.md` (the H/S/A glossary) the way `grill-with-or-docs` does.
4. **Plan.** Write the plan (the `explore-plan` full-mode document, or a `.specs/NN-slug/plan.md`). Reflect the gate's answers. If the user amends, iterate the plan, do not jump to execution.
5. **Execute (after approval).** Implement, following the path-scoped rules in `.claude/rules/` (`01-code.md` for Python/CP-SAT, `02-write.md` for prose, `03-build.md` for the pipeline). Keep `tasks.md` ticked as you go.
6. **Audit (conditional).** Run the adversarial check only for high-risk work, and run it with fresh eyes. For paper prose, invoke `reviewing-or-paper`. For model or eval code, re-derive the result from a clean reading and confirm it against the test protocol in the spec (paper compiles; the model still solves the anchor; docs and code agree). Trivial or reversible work skips this phase; say that it was skipped and why.

Close by writing the session log under `.history/` and, if the spec is done, its `verdict.md`.

</what-to-do>

<supporting-info>

## Domain awareness

This is the **esd-research** EETP project. The base workflow the user already runs is: spec to log, then research/decision, then plan (iterate until ok), then execute, then audit if high-risk. This skill automates the autonomous stretches of that chain and concentrates the interaction into one decision gate. Read `.claude/CLAUDE.md` (the spine), `.claude/memory/MEMORY.md`, and `.specs/INDEX.md` before acting; the active work is governed by the open specs there.

## The honest limit: one gate, not zero

A research task cannot run fully unattended, because some choices (which objective to add, which surface a constraint belongs to, which instance to trust) are the user's to make and the wrong default wastes a session. So this skill does not pretend to need no input. It needs input exactly once, at the decision-batch gate, and it earns that by resolving everything else (file locations, conventions, reversible defaults) on its own and stating what it assumed. If you find yourself wanting a second gate, the first one was incomplete; prefer to over-collect at the single gate.

## Which skills this drives

- `explore-plan` for the bootstrap and the plan document.
- `literature-review` when the task touches related work or positioning.
- `grill-with-or-docs` / `grill-me` as the source of the decision-batch questions (collected, not run interactively one-at-a-time).
- The `.claude/rules/` path-scoped rules during execution.
- `reviewing-or-paper` for the prose audit; a fresh-context re-derivation for code/eval.

It does not reimplement any of these. If a phase maps cleanly to one skill, defer to that skill.

## Plan-mode interaction

When the harness is in plan mode, the gate is the `AskUserQuestion` pass and the plan is surfaced with `ExitPlanMode`; do not execute before approval. The decision gate (clarify requirements) and the plan-approval gate (`ExitPlanMode`) are different events: ask decisions first, write the plan, then request approval.

## Audit is adversarial on purpose

The audit phase is worth running only if it reads the work cold. Re-deriving the result you just produced, from the artifact rather than from memory of building it, is what catches the error the building session was blind to. If you cannot read it cold, say the audit is weak rather than rubber-stamping it.

</supporting-info>
