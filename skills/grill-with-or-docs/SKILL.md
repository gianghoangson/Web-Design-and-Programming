---
name: grill-with-or-docs
description: Grilling session that stress-tests an OR/scheduling plan against the EETP problem formulation, sharpens constraint and objective language, and records crystallised decisions in the project's own documentation surfaces (docs/, .claude/memory/, .history/). Use when the user wants to challenge a new constraint, objective term, modelling approach, or algorithm design against the documented problem structure.
---

<what-to-do>

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between modelling decisions one by one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing.

If a question can be answered by exploring the codebase, explore the codebase instead of asking.

</what-to-do>

<supporting-info>

## Domain awareness

This is the **esd-research** EETP project (E-Learning Examination Timetabling). The problem is settled and the formulation language already exists; this skill sharpens new ideas against it, it does not invent a glossary from scratch. Read `docs/README.md` (the navigation compass) and `.claude/memory/MEMORY.md` (the decision index) first, then load the specific documents below.

### Where the formulation and decisions already live

```
/
├── docs/
│   ├── 01-problem-description.md   ← the formulation glossary (settled): entities, the dominant-enrolment
│   │                                 proctor rule with dept-code tie-break, hard H1–H5, soft S1–S8,
│   │                                 assumptions A1–A3, instance landscape
│   ├── 02-cp-model.md              ← the single AUTHORITY for the full CP model (lean dept-aggregate exact baseline; design + as-built)
│   └── 06-cp-pipeline.md           ← the src/pipeline/ three-stage reference pipeline, HN-only
├── src/pipeline/*.py                      ← the reference decomposition (Stage 1 / Stage 2 / Stage 3)
├── .claude/memory/*.md             ← durable cross-machine decision notes (the project's ADR equivalent)
└── .history/YYYYMMDD-HH_MM.md      ← per-session work logs
```

`docs/01-problem-description.md` is the canonical glossary. It is settled; treat it as authoritative and reword it only when a grilling genuinely resolves an ambiguity in it (and say so explicitly). Its mirror is `paper/main.tex` Section 3, synced only when the model matures, so do not touch the paper during a grilling.

The two model surfaces are distinct: the **joint full CP model** (authority `docs/02-cp-model.md`) is the executable exact baseline, and the **three-stage decomposition** (`src/pipeline/`, reported in `docs/06-cp-pipeline.md`) is the reference pipeline it is compared against. Pin down which one a proposed constraint belongs to before designing it.

## During the session

### Challenge against the formulation

When the user uses a term that conflicts with `docs/01-problem-description.md`, call it out immediately and cite the constraint label. "Your description defines H5 as a cap on the per-slot proctor count, but you are using it as a per-horizon sum, which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose the precise canonical term and its label. "You are saying 'proctor rule', do you mean the aggregate dominant-enrolment attribution (the room's proctor comes from the department with the most students), the H5 cap on proctor count, or the S1 proctor-balance soft term? Those are different."

### Probe the constraint structure

For every new constraint or objective term proposed (if user ASKED):

1. **Feasibility** — does it risk making the model infeasible on a known instance? Recall that instances can be structurally infeasible before exam splitting; check whether the new term interacts with that.
2. **Interaction** — does it conflict with or duplicate an existing H/S constraint?
3. **Weight calibration** — if soft, which S-tier does it sit in, and does it dominate or get dominated? Both methods are scored by the shared `docs/07-solution-quality.md` audit, so check the new term against that audit.
4. **Solver impact** — does it add reified bools, `add_max_equality`, or argmax structure that weakens the LP relaxation? The tractability probe already showed the per-atom faithful encoding is intractable for exactly this reason; do not re-introduce it.

### Discuss concrete scenarios

Stress-test with specific scenarios from the problem. Invent edge cases that expose boundary behaviour. "What happens when a single atom exceeds H·Q seats, so the true-rule H5 alone forces a split? When a department spans only one active slot? When two departments tie on student count in a room?"

### Cross-reference with code

When the user states how something works, check whether `src/pipeline/` agrees. Surface contradictions. "You said small exams may move in Stage 3, but `model_stage3.py` freezes timeslots and only packs rooms; the timeslot assignment is Stage 1/2 territory."

### Identify the right surface and stage

Before designing a constraint, pin down where it belongs.

First, which model: the joint full CP model (`docs/02-cp-model.md`) or the three-stage pipeline (`src/pipeline/`)?

If the pipeline, which stage owns it (the pipeline is HN-only after the trim; Stage 2 and Stage 3 are the `*_hn.py` modules applied to every campus):

- **Stage 1** (`model_stage1.py`) — timeslot assignment, conflict avoidance, split detection
- **Stage 2** (`model_stage2.py`) — dept load spread, stub-waste, continuity, compactness (extends the Stage 1 model in-place)
- **Stage 3** (`model_stage3.py`) — room packing, proctor balancing, bin assignment (CP-SAT room model; `postprocessing.py` is dormant, replaced by spec 13)

Misplacing a constraint in the wrong surface or stage is a common failure mode. Challenge it explicitly.

### Record decisions where the project keeps them

Capture decisions as they crystallise, do not batch.

- When a grilling **resolves an ambiguity in the formulation**, reword `docs/01-problem-description.md` right there, keeping its H/S/A labelling. See [resources/FORMULATION-GLOSSARY.md](resources/FORMULATION-GLOSSARY.md).
- When a decision is **durable and worth carrying across sessions and machines**, write a note under `.claude/memory/` and add a one-line entry to `.claude/memory/MEMORY.md`. This is the project's ADR equivalent. See [resources/DECISION-NOTE-FORMAT.md](resources/DECISION-NOTE-FORMAT.md) for the format and the bar for writing one.
- When unfinished model or paper work is parked, leave an explicit in-document `TODO` (a `% TODO:` in `.tex`, a `TODO` line in the markdown), because the user relies on these in-document reminders.

Respect the user's working style: model work is done in markdown first (`docs/`), not LaTeX; edits go one subsection at a time, structure settled before prose. Do not batch-edit multiple documents in one go.

</supporting-info>
