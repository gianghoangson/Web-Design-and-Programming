---
name: review-prev-session
description: Catch-up briefing from the most recent working session. Supports two modes: catch_up (default, full structured report) and context (silent orientation, short bullets). Use at the start of a new session to recover full context without re-reading everything yourself.
---

<what-to-do>

## Invocation syntax

- `/review-prev-session` or `/review-prev-session catch_up` → **catch_up mode** (default)
- `/review-prev-session context` → **context mode**, base file set
- `/review-prev-session context model` → **context mode**, with model files loaded

---

## catch_up mode

Produce a structured catch-up briefing from the most recent working session. The output should let me resume work immediately without re-reading the raw session log myself.

### Step 1 — Find and read the latest session log

List `.history/` and read the file with the most recent timestamp in its name (the `YYYYMMDD-HH_MM.md` naming convention). This is the primary source.

### Step 2 — Cross-reference the current state of the project

Read these documents to check what the session log changed and whether anything has drifted since:

- `docs/02-cp-model.md` — the single authority for the CP model (design + as-built)
- `docs/01-problem-description.md` — the settled problem formulation
- `.claude/memory/MEMORY.md` — the decision index (check for notes added or updated in the session)
- `.claude/CLAUDE.md` — the project orientation (check the Stage section for consistency)
- `.specs/INDEX.md` — the active-investigations tracker (check for open and blocked investigations)

If the session log mentions changes to other specific files (e.g. `docs/07-solution-quality.md`, a `src/pipeline/` module, the paper), spot-check those too.

### Step 3 — Produce the briefing

Write the output as a single structured response (not an artifact) with these sections:

#### 1. Session summary (2–3 sentences)
What was the session about? What was the main pivot, decision, or accomplishment?

#### 2. What was done
A bullet list of concrete deliverables: documents rewritten, decisions locked, code written, bugs found, experiments run. Reference file paths as clickable links.

#### 3. What is pending
A table with columns: Task | Status (✅ done / ❌ not started / 🔧 in progress / ❓ open question) | Notes. Pull this from the session log's "future directions" or equivalent, cross-referenced against the model document's future-work section (§8 of `02-cp-model.md`) and the active investigations in `.specs/INDEX.md`. For any active or blocked investigation, note what the next concrete task in its `tasks.md` is.

#### 4. How to proceed
A short narrative (3–5 bullets) recommending what to do next, in dependency order. Flag any blockers or open questions that need a decision before work can start.

#### 5. Decisions and gotchas to remember
Any non-obvious decisions, refuted approaches, or bugs discovered in the session that would be easy to forget. These are the things that, if forgotten, would waste time re-discovering. Pull from the session log and from any `.claude/memory/` notes created or updated during the session.

### Tone and format

- Be concise but complete. The point is to save me time, not to produce a long document.
- Use clickable file links for every path you mention.
- If the session log and the current plan disagree on anything, flag it explicitly as a drift warning.
- Do not editorialize on whether the decisions were good; just report them.

---

## context mode

This mode is for internal orientation before doing work or writing a plan. The output is for me to verify you have loaded the right state, not a full briefing.

### Step 1 — Find and read the latest session log

Same as catch_up: list `.history/`, read the most recent `YYYYMMDD-HH_MM.md`.

### Step 2 — Read the base file set

Always read these:

- `.claude/memory/MEMORY.md` — decision index
- `.specs/INDEX.md` — active investigations
- `TODO.md` — open work dashboard

Then identify files mentioned in **all three** of: the session log, `TODO.md`, and the relevant open spec's `spec.md` (if one is active). Read those intersection files only; skip files mentioned in only one or two of the three sources.

If invoked as `context model`, also read:

- `docs/01-problem-description.md`
- `docs/02-cp-model.md` (if the active work is on the exact model)
- `docs/06-cp-pipeline.md` (if the active work is on the pipeline)
- Both if unclear

### Step 3 — Output a short orientation summary

Write a flat bullet list, no section headers, capped at 8–10 bullets. Cover exactly three things:

1. What the last session accomplished (1–2 bullets)
2. What is actively open right now (from `.specs/INDEX.md` and `TODO.md`)
3. Any locked decisions or gotchas that would redirect work if forgotten

No "how to proceed" narrative, no drift warnings, no task tables. State what is true; let me direct the work.

</what-to-do>

<supporting-info>

## Project structure

This is the **esd-research** EETP project. Session logs live in `.history/YYYYMMDD-HH_MM.md`. The project's decision memory lives in `.claude/memory/`. The single model authority is `docs/02-cp-model.md` (design + as-built; the former `02-cp-model-plan.md` and `08-current-cp.md` were consolidated into it on 2026-06-10).

### Key documents to cross-reference

| Document | Role |
|---|---|
| `.history/*.md` | Per-session work logs (the primary input) |
| `docs/02-cp-model.md` | Single authority for the CP model (design + as-built) |
| `docs/01-problem-description.md` | Settled problem formulation (entities, H1–H5, S1–S8, A1–A3) |
| `docs/06-cp-pipeline.md` | The decomposed reference pipeline the exact model is compared against |
| `.claude/memory/MEMORY.md` | Decision index — check for notes added/updated in the session |
| `.claude/CLAUDE.md` | Project orientation and current stage |
| `docs/07-solution-quality.md` | The shared audit yardstick |
| `.specs/INDEX.md` | Active investigations — status and next task for each open thread |
| `TODO.md` | Open work dashboard |

### What counts as "drift" (catch_up mode only)

Flag a drift warning if:
- The session log says a decision was made but the plan document doesn't reflect it
- The session log marks something as done but the file on disk still has the old content
- The `.claude/CLAUDE.md` Stage section doesn't match the session log's conclusions
- A `.claude/memory/` note referenced in the session log is missing or has different content

</supporting-info>
