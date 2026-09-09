---
name: writing-or-papers
description: Drafts, edits, and formulates mathematical models for the esd-research EETP paper, targeting EJOR and Computers & Operations Research. Project-refined layer over the generic write-paper skeleton: it adds EJOR/C&OR venue taste and exam-timetabling conventions on top of the shared craft. Use when writing or revising any paper section, plan, or model document for this project, formulating constraints or objectives, or turning notes into academic prose, and when the user mentions the paper, the proctor rule, the MILP/CP/decomposition models, timetabling, scheduling, IP/CP/MILP, or a computational study.
---

<what-to-do>

This is the project-refined writing skill for the esd-research EETP paper. It does not restate generic OR-writing craft. It points at the shared skeleton for that, then layers the venue taste and the project's own conventions.

Work in three passes:

1. **Load the craft.** Read the generic skeleton at `~/.claude/skills/write-paper/` (its `SKILL.md` routes to `resources/STYLE-RULES.md`, `STYLE-EXAMPLES.md`, `PAPER-STRUCTURE.md`, `METHODOLOGY-WORKFLOW.md`, `MATH-CONVENTIONS.md`, `BANNED-PATTERNS.md`). That layer governs structure, style, math notation, and the explain-then-formulate workflow. Do not duplicate it here; apply it.
2. **Apply the venue taste.** Read [resources/VENUE-TASTE.md](resources/VENUE-TASTE.md) for how EJOR and Computers & Operations Research expect an exam-timetabling paper to read: section architecture, contribution framing, formulation depth, computational-study norms, and citation conventions, grounded in named corpus exemplars.
3. **Apply the project conventions.** Read [resources/EETP-CONVENTIONS.md](resources/EETP-CONVENTIONS.md) for this paper's headlight (the dominant-enrolment proctor rule), the MILP to CP to decomposition narrative, the student-travel-time soft objective, the H/S/A labelling, and the domain good/bad excerpt pairs.

Then write or edit the requested section, obeying the repo writing rules (`.claude/rules/02-write.md`: single physical line per paragraph, em-dash used sparingly, no performative contrast). Output only the academic text.

</what-to-do>

<supporting-info>

## What this layer owns vs what it delegates

This skill owns venue taste (EJOR/C&OR) and exam-timetabling domain writing. It delegates everything else to the surfaces that already own it. Do not reinvent their content; route to them.

| Need | Go to |
|---|---|
| Generic OR-writing craft (structure, style, notation, abstract formulas, the "so what?" conclusion) | `~/.claude/skills/write-paper/` skeleton and its `resources/` |
| The settled problem formulation (entities, the proctor rule, H1-H5, S1-S8, A1-A3) | `docs/01-problem-description.md`; sharpen against it with the `grill-with-or-docs` skill, never silently invent a constraint |
| Related work, corpus synthesis, the gap statement, the comparison table | the `literature-review` skill (it already reads the `sample/paper/` corpus and positions the proctor-coupling gap) |
| Minimal-change grammar/clarity edits on existing prose | the `edit-academic-writing` skill |
| Bibliography integrity (`paper/mybibliography.bib`) | the `bib-audit` skill |
| The current project direction and the single headlight | `.claude/memory/MEMORY.md` and `.claude/memory/reformalization-phase.md` |

## Craft the skeleton underweights

The skeleton covers structure, style, and contribution-findability. Three emphases from the craft literature (Peyton Jones; Lemire) it states only lightly:

- **Readership funnel.** Far more readers reach the title than the abstract, more the abstract than the introduction, only a handful the details (roughly 1000 -> 100 -> 10 -> 3). Front-load: title, abstract, and introduction must each stand alone and sell the proctor-coupling idea, because most readers never reach the formulation.
- **Kent Beck's four-sentence abstract.** A check on the skeleton's abstract formula: (1) state the problem, (2) say why it is interesting, (3) say what the solution achieves, (4) say what follows. Use it to confirm the abstract sells rather than summarizes.
- **Write to think.** Drafting a section is a way to find what the model or argument actually needs, not only a way to report finished work. When a formulation or claim feels slippery, write the paragraph that explains it; the gaps surface fast.

## The paper in one line

The paper is *Examination Timetabling with Proctor Optimization Constraints*. Its single contribution is the dominant-enrolment proctor rule: in each room the department with the most students supplies the proctor, ties broken by department code. That rule couples timeslot, room, and proctor decisions, which is what makes the problem harder than standard examination timetabling. Every section serves that one idea. See `reformalization-phase.md` and EETP-CONVENTIONS.md.

## Target venues

EJOR and Computers & Operations Research are the primary targets, with the wider applied-OR tier (Journal of Scheduling, Annals of Operations Research, ITOR) as context. VENUE-TASTE.md carries the distilled expectations. When a craft rule from the skeleton and a venue norm appear to conflict, the venue norm wins for this paper, and you should flag the tension.

## Working style

Model and paper work is markdown-first (`docs/`), one subsection at a time, structure settled before prose; LaTeX sync is deferred. Do not batch-edit multiple documents in one go. Respect the H/S/A labels from `docs/01-problem-description.md` verbatim; renaming a constraint means renaming it everywhere.

</supporting-info>
