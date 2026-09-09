---
name: clean-context
description: Periodic context-hygiene pass across .claude/memory/, .specs/, docs/, .history/, and TODO.md — finds stale headers, contradicted statuses, orphaned files, and superseded notes, then fixes the mechanical ones immediately and asks before touching anything judgment-call-shaped. Use when the user wants to "clean up", "trim", or "consolidate" project context, or it's been a while since the last pass. Takes an optional scope argument (e.g. "specs", "memory", "docs") to target one surface; with no argument, sweeps all of them.
---

<what-to-do>

## Step 0 — Resolve scope

If the user passed an argument (`specs`, `memory`, `docs`, `history`, or some combination), only run the Explore agent(s) for those surfaces in Step 1. With no argument, run all of them. `docs`, `.history/`, `TODO.md`, and `.claude/rules/` travel together as one surface (they cross-reference each other constantly), so a `docs` or `history` scope argument pulls in that whole group.

## Step 1 — Explore in parallel

Launch one Explore agent per in-scope surface, in a single message (parallel tool calls). Each agent is read-only research; it does not edit anything.

**Agent A — `.claude/memory/`**: read `MEMORY.md` in full, then every file it indexes. Report, per file: is it current, stale (superseded by a later decision but still informative), or duplicate/overlapping with another note? Flag files not referenced in `MEMORY.md` (orphans), broken `[[links]]` to non-existent notes, and content that contradicts the project's current stage as described in `CLAUDE.md`.

**Agent B — `.specs/`**: read `INDEX.md` in full, then every investigation folder's `spec.md`, `tasks.md`, and `verdict.md` (where present). For each folder, report whether `spec.md`'s own status header agrees with `INDEX.md`'s row, whether `tasks.md`'s checkbox completion matches the claimed status, and whether the investigation's findings are already fully folded into `docs/` (making the folder pure historical record, a candidate for leaving alone but never needing revisiting). Flag any folder where these three signals disagree.

**Agent C — `docs/`, `.history/`, `TODO.md`, `.claude/rules/`**: read `docs/README.md` and skim every doc it links, checking each doc actually exists at the linked path with the linked description still accurate (a doc-map table pointing at a renamed or deleted file is a known failure mode — check `.claude/rules/00-context.md`'s documentation-map table against the real `docs/` listing, not just against `docs/README.md`). List `.history/` and flag logs that predate the project's last major pivot or architecture change (per `CLAUDE.md`'s narrative) as archive candidates. Read `TODO.md` and flag any item that's actually done (cross-check against `.specs/INDEX.md` and `docs/`) but still sitting in Active.

Each agent should return a structured inventory (current dependable code-and-fact items), not a wall of prose: which files/entries are clean, which are stale, which are contradictory, with the exact evidence (line numbers, quoted text) for each claim.

## Step 2 — Sort findings into two buckets

**Mechanical fixes** — the record disagrees with itself, not with reality. A `spec.md` header says "active" while `INDEX.md` and `verdict.md` both say "closed". A doc-map table cites a filename that was renamed. An orphaned file has zero inbound references anywhere in the repo (grep to confirm before treating anything as an orphan). These don't require deciding what happened, only making the surfaces agree. **Fix these immediately, no need to ask.**

**Judgment calls** — fixing this requires deciding what's true about the project, not just reconciling files. A spec whose `tasks.md` shows implementation despite `spec.md` claiming "proposals only" (did the user actually greenlight that work, or is the checklist itself wrong?). A flagged-but-unresolved decision inside a verdict (e.g. "the user decides this before closing"). Trimming a closed investigation's raw measurement files when they might be the only copy of hard-to-regenerate evidence. Archiving session logs that turn out to still be linked from somewhere load-bearing. **Never guess on these. Bundle them into a single `AskUserQuestion` call (max 4 questions, 2-4 options each, split into more calls if needed) before touching any file they concern.**

If a finding's bucket isn't obvious, default to treating it as a judgment call.

## Step 3 — Track the work

If there are 3 or more distinct fixes (there usually are), create one `TaskCreate` entry per fix before starting, and mark each `in_progress` → `completed` as you go. This keeps a long cleanup pass auditable and resumable.

## Step 4 — Execute

Apply these defaults per surface; they encode what "clean" means here without erasing provenance:

- **Specs.** Never delete a closed investigation's folder. If a status contradiction resolves to "actually closed", write the missing `verdict.md` (match the house style: a one-paragraph resolution, a "what changed" or "what didn't happen" section if relevant, files touched, how to verify), flip the `INDEX.md` row (status + closed date), and fix the `spec.md` header. Sync `TODO.md`: drop the item from Active, add a line to Done (log) under today's date linking the verdict.
- **Memory.** Never delete a memory file that carries provenance, even if stale. Split current content from superseded content: move the superseded block into `archive.md` as a new dated section (follow its existing section format: key facts + an **Authority:** line pointing at whatever now supersedes it), trim the original file to just the current material, and update both the file's frontmatter `description` and its `MEMORY.md` index line. If a closed spec's findings aren't yet retrievable from `MEMORY.md` without opening the spec folder, write a short new memory note for it (match `spec10-save-serialize.md`'s shape: a closed-date headline, what shipped, what didn't, links to dependents via `[[name]]`).
- **Docs.** Delete a doc only when it has zero inbound references anywhere in the repo (grep `docs/`, `.claude/`, `.specs/`, `TODO.md`, `paper/` for its filename first) and is fully superseded by a living surface. Fix doc-map staleness (wrong filename, stale description, missing row for a doc that exists and is linked from `docs/README.md`) on sight, this is always safe since it only changes a pointer, not a fact.
- **History.** Never delete a session log. Move logs that predate the last major pivot into `.history/_archive/` (create it if absent). Before moving anything, grep the whole repo for each filename being moved, since these get linked from `docs/` narrative files; update every relative link found (`../.history/X.md` → `../.history/_archive/X.md`) in the same pass, don't leave it for later.

## Step 5 — Verify

After all edits: re-grep for every old filename/path touched by a move or delete to confirm nothing still points at it. Confirm every `.specs/INDEX.md` row agrees with its folder's `spec.md` header. Confirm `MEMORY.md`'s index and `archive.md`'s sections are mutually consistent (every archived block has exactly one current pointer). Run `git status --short` to see the full diff surface.

## Step 6 — Report

A short summary grouped by surface (what was fixed, what was asked, what's left untouched and why), not an essay. Leave everything uncommitted; this skill never commits on its own.

</what-to-do>

<supporting-info>

## Surface roles (from `CLAUDE.md`)

| Surface | Role | Treat staleness as |
|---|---|---|
| `.claude/memory/` | Durable, cross-machine decision notes (the project's ADR equivalent) | Provenance to preserve via `archive.md`, not delete |
| `.specs/` | Investigation lifecycle tracking (one folder per bound-tightening lever, experiment, or model-change candidate) | A status-consistency bug between `spec.md`/`tasks.md`/`INDEX.md`, fixable once the real status is confirmed |
| `docs/` | Current technical authority (problem description, model design, pipeline report) | Either current (leave alone) or fully superseded (safe to delete if unreferenced) |
| `.history/` | Per-session narrative log | Reference-only once a pivot has passed it by; archive, never delete |
| `TODO.md` | The single live dashboard, pointer-first | Should never lag what `.specs/INDEX.md` and `docs/` already show |

## The two-bucket heuristic is the load-bearing idea

Mechanical fixes make the project's own records agree with each other. Judgment calls change what the records claim happened. The first kind is safe to just do; the second kind requires the user's memory of events the files don't fully capture. When unsure which bucket a finding falls into, that uncertainty is itself the answer: ask.

## Worked example (2026-06-23 round)

A representative pass found: two specs with real status contradictions (one because implementation landed mid-investigation without the header being updated, one because a verification checklist was never finished even though downstream work had already proven it), one memory note mixing current and superseded content, one doc fully replaced by `TODO.md` with zero inbound references, one doc-map table citing a renamed file, and five session logs from before the project's MILP-to-CP pivot still sitting in the live `.history/` listing and linked from a narrative doc. Closing the two specs required a judgment call each (confirmed via `AskUserQuestion`); everything else was mechanical.

</supporting-info>
