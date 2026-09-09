---
name: reviewing-or-paper
description: Reviews the esd-research EETP paper as a peer reviewer at EJOR or Computers & Operations Research would. Project-refined layer over the generic review-paper skeleton: it adds venue-specific acceptance standards and a project review lens (does the proctor-coupling headlight carry the paper) on top of the shared rubric. Use when reviewing, critiquing, or stress-testing a draft of this project's paper or any section of it as a reviewer would.
---

<what-to-do>

This is the project-refined review skill for the esd-research EETP paper. It does not restate the generic review rubric. It points at the shared skeleton for that, then layers the venue standards and the project lens.

Work in three passes:

1. **Load the rubric.** Read the generic skeleton at `~/.claude/skills/review-paper/` (its `SKILL.md` drives the six-step workflow over `criteria/` and `patterns/`). That layer governs the review procedure, severity grading, the output format, and the holistic verdict. Do not duplicate it; run it.
2. **Apply the venue standards.** Read [resources/VENUE-REVIEW-STANDARDS.md](resources/VENUE-REVIEW-STANDARDS.md) for what an EJOR or Computers & Operations Research reviewer expects from an exam-timetabling paper, grounded in named corpus exemplars: formulation depth, computational-study rigour (dual real plus benchmark validation, fairness apparatus), and the moves these venues reward or reject.
3. **Apply the project lens.** Read [resources/PROJECT-REVIEW-LENS.md](resources/PROJECT-REVIEW-LENS.md) to review this specific paper against its single headlight: does the dominant-enrolment proctor coupling actually carry the contribution, is the MILP to CP to decomposition arc justified, and is the intractability claim evidenced.

Produce the structured review in the skeleton's output format, with severity labels and a holistic verdict.

</what-to-do>

<supporting-info>

## What this layer owns vs what it delegates

This skill owns venue acceptance standards (EJOR/C&OR) and the project-specific review lens. Everything else comes from the skeleton or the project surfaces.

| Need | Go to |
|---|---|
| The generic review rubric (contribution, methodology, experiments, writing criteria; rejection patterns; reviewer mental model) | `~/.claude/skills/review-paper/` skeleton and its `criteria/` + `patterns/` |
| The settled problem formulation to check the draft against | `docs/01-problem-description.md` (H1-H5, S1-S8, A1-A3, the proctor rule) |
| The CP model authority, for checking formulation claims | `docs/02-cp-model.md` |
| The current direction and the headlight | `.claude/memory/MEMORY.md`, `.claude/memory/reformalization-phase.md` |
| Whether related work is positioned correctly | the `literature-review` skill and `sample/paper/INDEX.md` |

## The one question this review must answer first

Can the reviewer state the paper's single idea in one sentence, and is it the dominant-enrolment proctor coupling? If the draft reads as a generic three-model timetabling paper and the coupling is not the spine, that is the most serious finding, ahead of any technical detail. PROJECT-REVIEW-LENS.md expands the headlight-specific checks.

## Target venues

EJOR and Computers & Operations Research are primary; the wider applied-OR tier (Journal of Scheduling, Annals of Operations Research, ITOR) calibrates severity. A weakness that the corpus exemplars at these venues consistently avoid is more serious than one they often share. VENUE-REVIEW-STANDARDS.md carries the calibration.

</supporting-info>
