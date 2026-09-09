# EETP Writing Conventions

Domain conventions for writing the esd-research EETP paper. This file carries what is specific to this project: the headlight, the three-model narrative, the constraint glossary, the travel objective, and worked good/bad excerpts about this paper. Generic craft lives in the `~/.claude/skills/write-paper/` skeleton; venue taste lives in [VENUE-TASTE.md](VENUE-TASTE.md).

---

## The single headlight

The paper has exactly one core idea. State it the same way everywhere (abstract, introduction contribution list, conclusion):

> In each room, the department with the most enrolled students supplies the proctor (ties broken by department code). This dominant-enrolment proctor rule couples the timeslot, room, and proctor decisions, which makes the problem harder than standard examination timetabling.

Write the contribution as the coupling, not as a generic "we schedule exams." Standard examination timetabling assigns exams to timeslots and rooms; the proctor is an afterthought or a separate post-assignment. Here the proctor attribution rule is a constraint that links the three decision layers, so they cannot be solved in sequence without loss. That is the ping the reader must hear.

Target title framing: *Examination Timetabling with Proctor Optimization Constraints*.

## How to frame the contribution against the literature

The proctor/invigilator papers in the corpus decouple: they fix the timetable first, then assign proctors as a second stage (the 2026 invigilator assignment paper assumes a fixed timetable; the 2021 web-based DSS feeds the ETP solution into a separate supervisor-assignment model; the 2025 cut-and-branch keeps two-examiner staffing inside the core MILP but only for a niche external-candidates variant). Position the contribution as the missing integration: existing work decouples or post-assigns; we make the dominant-enrolment attribution a coupling constraint, so timeslot, room, and proctor are decided jointly.

Route the contribution through the per-session staffing constraint, which is the standard hook these venues reward. The dominant-enrolment rule determines which department a room's proctor is charged to; H5 caps the per-slot proctor count per department. Frame the rule as the mechanism linking room occupancy to proctor load. See VENUE-TASTE.md "framing a proctor-coupling contribution" for the vocabulary (base definition, variant, structural constraint, benchmark).

## The three-model narrative: MILP to CP to decomposition

Present three models in sequence, each motivated by the limits of the previous one. This is the spine of the paper.

1. **MILP** (comparison baseline). Department-aggregate, the dominant rule linearised with a big-M (`M = Q`). Small instances only; it exists to anchor the intractability frontier, not to scale. Write it as the natural first formulation a reader would reach for, then show where it stops.
2. **CP** (the joint model). The lean department-aggregate constraint-programming model (`src/exact/exact_model.py`, authority `docs/02-cp-model.md`). It captures the same coupling more naturally and solves small to medium instances to optimality. Presentation is being beautified; the model is not being redesigned.
3. **Decomposition** (the scalable method). The three-stage pipeline (`src/pipeline/`), bridged from the joint model by a proctor-decoupling surrogate (a student-count surrogate that lets the decomposition optimise at exam level). This is the method that scales to real instances.

When you present them, justify the decomposition by domain structure the way the corpus exemplars do: explain which resource is non-critical and why a stage-1 solution stays feasible downstream. Report the head-to-head as a single wide table (rows = instances, columns = methods, bold = best, asterisk = optimal/best-found, plus a lower-bound or gap column). See VENUE-TASTE.md.

## Constraint and objective glossary (reuse verbatim)

The formulation is settled in `docs/01-problem-description.md`. Reuse its labels exactly; do not rename. When in doubt, sharpen with the `grill-with-or-docs` skill rather than inventing wording.

- **Entities and sets**: exam, atom (a post-split exam part), department (Khoa), room, timeslot, session, campus. Vietnamese column names stay raw (`Mã HP`, `Mã SV`, `Khoa giảng dạy`).
- **Dominant-enrolment proctor rule**: in each room the proctor comes from the department with the most students in that room (aggregate per-department count), ties broken by department code. State it in exactly these terms; this is the contribution.
- **Hard constraints H1-H5**: must hold. H5 is the per-slot proctor-count cap (per timeslot, not per horizon).
- **Soft constraints S1-S8**: penalised, scored by the shared audit in `docs/07-solution-quality.md`. S1 is proctor balance, S5 is minimum-room occupancy, S6 is student travel, S7 is room-count economy, S8 is the same-department room-sharing penalty.
- **Assumptions A1-A3**.

`docs/01-problem-description.md` is the ground truth for the constraint set; reconcile any draft against it before the prose reaches the paper. The earlier tie-break, S6-collision, and low-room-load discrepancies were resolved in the 2026-06-30 de-bloat (D-SIMPLIFY): proctor ties break on department code, S6 is student travel and S7 is room-count economy, and the institution-specific side constraints were removed.

## The student-travel-time soft objective

A new soft objective added to all three models. E-learning students travel on-site and prefer a short total horizon. Term: `w_travel * sum_u span_u`, where `span_u = last_slot(u) - first_slot(u)` over the atoms student `u` sits. It is a timeslot-level term with no room layer, so it fits the MILP, the CP model, and pipeline Stage 1/2. Encode per enrolment-pattern equivalence class (students with the same atom set share a span). When you write it, note the tension with S3 (departmental compactness): travel pulls each student's exams together, S3 pulls each department's exams together; the weight balance is an experiment, so hedge the trade-off claim.

## Exam splitting: demoted

Exam splitting is now an infeasibility-repair step (`src/utility/split_exam.py`, `docs/03-exam-splitting.md`), not a headline. Open enrolment produces structural infeasibility that splitting repairs. Write it as a short subsection, not a contribution. Its equivalence-class collapse is reused by the travel-time encoding, which is worth one sentence.

---

## Project-specific excerpt pairs

These are good/bad pairs about this paper, complementing the neutral craft examples in the skeleton's STYLE-EXAMPLES.md. They encode the current headlight, so prefer them over anything that reads as the older "conflict resolution and room packing interact minimally" framing, which predates the 2026-06-27 pivot and should not appear.

### Abstract: vague vs headlight-forward

**Bad (generic, hides the contribution)**:
"This paper addresses an examination timetabling problem for an e-learning programme using three models. We propose a MILP, a CP model, and a decomposition. Experiments show the decomposition scales well."

**Good (leads with the coupling)**:
"Examination timetabling for open-enrolment e-learning programmes must assign each room a proctor, and institutional rules charge that proctor to the department with the most students in the room. This dominant-enrolment attribution couples the timeslot, room, and proctor decisions, so the proctor cannot be assigned after the timetable is fixed. We formulate the coupled problem three ways: a comparison MILP that linearises the attribution rule, a constraint-programming model that solves small to medium instances to optimality, and a decomposition that scales to full three-campus instances by way of a student-count surrogate. On real instances from a Vietnamese university, the decomposition produces schedules within [X]% of the CP optimum where the MILP and CP models exceed the time limit beyond [N] exams."

### Introduction: standard ETP vs the coupling

**Bad (states the claim with no scene-setting)**:
"We study examination timetabling with a proctor constraint. The proctor comes from the dominant department. This is harder than usual. We propose three models."

**Good (builds the reader's frame, then lands the coupling)**:
"In standard examination timetabling, the central decisions are when each exam runs and which room holds it; proctoring is handled separately, often by a post-hoc roster. For the open-enrolment e-learning programme we study, that separation breaks. Rooms hold students from several departments at once, and an institutional rule assigns each room's proctor to the department with the most students in it. Because that count depends on which exams share the room and when, the proctor decision is not separable from the timetable: moving an exam can change which department staffs a room, and therefore whether the per-slot proctor cap is met. This coupling is the source of the problem's difficulty and the focus of this paper."

### Conclusion: recitation vs reflection

**Bad (past-tense abstract)**:
"We proposed a MILP, a CP model, and a decomposition for proctor-coupled examination timetabling. The decomposition scaled best. Future work could add more constraints."

**Good (answers "so what?")**:
"The dominant-enrolment proctor rule turns a routine post-assignment into a constraint that couples three decision layers, and the gap between the joint models and the decomposition shows what that coupling costs in tractability. The surrogate that lets the decomposition optimise at exam level recovers most of the joint-model quality while scaling to full instances, which suggests that proctor attribution, though formally coupling, can be decoupled in practice for instances of this structure. Whether that holds when the attribution rule is plurality-based rather than dominant-count is the natural next question."
