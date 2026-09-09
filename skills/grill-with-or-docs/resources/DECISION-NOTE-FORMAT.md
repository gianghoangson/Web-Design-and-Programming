# Decision Note Format (`.claude/memory/`)

This project has no `docs/adr/`. Durable decisions live as notes under `.claude/memory/`, checked into the repo so they travel between the user's machines. `.claude/memory/MEMORY.md` is the index, loaded at the start of every session. A memory note is the EETP project's ADR equivalent: record *that* a decision was made and *why*, so a future session does not relitigate it.

Per-session narrative ("what changed today and why") goes in a separate `.history/YYYYMMDD-HH_MM.md` work log, not in a memory note. Keep the two distinct: memory notes are durable single facts, history logs are dated narratives.

## Format

Each note is one file, one fact, with frontmatter:

```md
---
name: short-kebab-slug
description: One sentence stating the fact, readable on its own.
metadata:
  type: project        # project = a decision/state of the work; feedback = a user working preference
---

Body: the decision, the reason, and how to apply it. Link related notes with [[other-note-slug]].
Keep each paragraph on a single physical line (repo writing rule). Em-dash used sparingly, no performative contrast.
```

Then add a one-line entry to `.claude/memory/MEMORY.md`:

```md
- [Readable title](short-kebab-slug.md) — the same fact, compressed to one line for the index.
```

Keep the index entry in sync with the note's `description`. A stale index is the most common rot here; if you revise a note, revise its index line in the same edit.

## When to write a memory note

Write one when the decision is **durable and would otherwise be relitigated**. Concretely, when both hold:

1. **Cross-session relevance** — a future session (possibly on another machine, after a compaction) needs this to avoid redoing work or repeating a mistake.
2. **Not already captured** — it is not fully stated in `docs/` or the code. If it is a formulation fact, it belongs in `docs/01-problem-description.md` instead; if it is pipeline behaviour, in `docs/06-cp-pipeline.md`.

Mark superseded content rather than deleting it when the provenance matters (the project keeps a 2026-06-04 design block under a 2026-06-05 pivot header for exactly this reason).

## What qualifies in this project

- **A modelling-direction pivot.** "MILP abandoned, single full CP model adopted" (archived in `archive.md`). Hard to reverse, surprising without context.
- **A formulation design decision settled by grilling.** "The dominant rule aggregates per department, tie broken by department code" (`cp-model-design-decisions`). Records the chosen alternative and why.
- **An empirical tractability result.** "The per-atom faithful encoding is intractable; the lean dept-aggregate model is the only executable exact one" (`exact-model-performance`). Stops a future session re-running a dead probe.
- **A solver gotcha that cost real time.** "CP-SAT `repair_hint=True` ignores `max_time_in_seconds`" (`cpsat-repair-hint-timer-bug`). A war story worth not repeating.
- **A user working preference** (`type: feedback`). "Model in markdown first, sync LaTeX later"; "edit one subsection at a time". Shapes how to approach the work.

## What does not qualify

- A formulation fact that belongs in `docs/01-problem-description.md`.
- Pipeline behaviour that belongs in `docs/06-cp-pipeline.md` or a code comment.
- A flag value or solver parameter (tuning, not a decision).
- A constraint label (`H#`, `S#`) — that is naming, recorded in the glossary.
- The day's narrative — that goes in `.history/`.
