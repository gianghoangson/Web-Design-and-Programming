---
name: explore-plan
description: >
  Two-mode skill for context loading and planning. In explore mode (/explore-plan explore),
  runs the bootstrap exploration protocol and outputs a short context summary, then stands
  ready to answer questions or make changes directly. In full mode (default, /explore-plan),
  runs the same exploration then produces a full planning document. Use when the user says
  "explore", "make a plan", "planning doc", "plan mode", "spec this out", or asks to plan
  a code change before writing code.
---

## Invocation

- `/explore-plan` (default) → **explore protocol** then **planning protocol** (full plan document)
- `/explore-plan explore` → **explore protocol only** (short context summary, no plan)

The user's task description comes from the invoking message. Read it to know what to focus on.

---

## Explore protocol (runs in both modes)

### Step 1 — Bootstrap reads (always, in this order)

1. `.claude/memory/MEMORY.md` — index of durable decisions and current findings
2. `docs/README.md` — navigation compass; routes you to the relevant doc for each aspect
3. `src/README.md` — module map; tells you which packages and scripts exist
4. `.specs/INDEX.md` — investigation status table; tells you what is active, frozen, or closed
5. `TODO.md` — open work dashboard; shows what is actively blocked or waiting

### Step 2 — Task-specific reads

Use the five index files to identify which `.claude/memory/` notes, `.claude/rules/` files, source scripts, and `docs/` documents the task touches. Read those before proposing anything. The plan and any direct changes must be grounded in what the documents and code actually say, not in assumptions.

Rules that apply by file type: `01-code.md` for any `*.py`, `02-write.md` for any `*.tex` / `*.md`, `03-build.md` when touching `src/pipeline/`. For model code, `01-code.md` Part 3 (CP-SAT model-building discipline) is mandatory.

### Step 3 — Explore output

Write a flat bullet list (no section headers), covering:

- Which files were loaded and why (one line each)
- What is relevant to the stated task: the seam in the code, the authority document, the active spec if any
- Any ambiguities or divergences found (code vs doc, open question in a spec, conflicting TODO items)

After the list, stop. In explore mode, the user directs what happens next. In full mode, proceed immediately to the planning protocol.

---

## Planning protocol (full mode only)

Produce a planning document. The plan is the deliverable; no code is written during planning. If the user is in plan mode, the plan goes to the plan file and you exit plan mode for approval. Otherwise write it inline; if the task has an open spec in `.specs/`, save it to `.specs/NN-slug/plan.md`. If not, save inline only.

### Anchoring to docs

Name the closest existing pattern the change should imitate (for example "mirror the per-session dept-load block in `src/pipeline/model_stage2.py`") and the `file:line` that is the natural seam. The document is the authority: code reflects the document, not the other way around. When code and docs diverge, that divergence is a debt, not a resolution: log it in `debt.md` in the relevant spec folder, or directly in the markdown file that owns that code's documentation, then plan the implementation against the document's intent.

If a modelling decision is ambiguous after research, use the `grill-with-or-docs` skill to sharpen it against `docs/01-problem-description.md` and the stage docs before committing to it in the plan.

### Required plan structure

The plan document must include, in order:

1. **Objective** — one paragraph stating what the implementation achieves and how it maps to the input documents.
2. **Assumptions** — every assumption about the codebase state, environment, or external dependencies that is not explicitly stated in the input documents.
3. **Dependencies** — every external tool, library, or module the implementation will require. Flag anything not already present in the codebase (check `requirements.txt`).
4. **Execution order** — a flat ordered list of steps. For each step, state what must already exist or have completed before it can begin. If two steps are independent, say so explicitly.
5. **Implementation steps** — for each step: what it does, what a successful outcome looks like, and a risk tag (low / medium / high). Include code snippets only for non-obvious decisions: custom structures, solver configuration, anything where the correct approach is not the obvious first attempt. Skip boilerplate.
6. **Interpretation flags** — any requirement from the input documents with more than one reasonable interpretation. For each, state which interpretation was chosen and why.

### Self-audit (mandatory)

Before finalising the plan, run an internal consistency check:

- Does each step's assumed inputs match what the previous step actually produces?
- Are there steps where a failure would silently corrupt downstream results rather than throw a visible error? (This pipeline is prone to it: wrong DataFrame axis on `hp`, suffix stripping, session-boundary mismatch, double-booking.)
- Are all high-risk steps accompanied by a stated fallback or detection mechanism?

Include the audit results as a final section. If the audit finds nothing, say so explicitly. Do not omit this section.

### Verification

Name how the change is tested end-to-end. There are no automated tests in the repo at this stage, so success conditions are checked by running the relevant command and inspecting its output. CLI recipes are in `CLAUDE.md` and `workflow-command.md`.
