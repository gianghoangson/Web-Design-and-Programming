# Project Review Lens

How to review this specific paper, the esd-research EETP paper, against its single headlight. Apply this after the generic rubric (`~/.claude/skills/review-paper/`) and the venue standards ([VENUE-REVIEW-STANDARDS.md](VENUE-REVIEW-STANDARDS.md)). This file checks whether the draft delivers the one idea it promises.

The settled formulation is `docs/01-problem-description.md`; the CP model authority is `docs/02-cp-model.md`; the current direction is `.claude/memory/reformalization-phase.md`. Check the draft against those, not against memory of an earlier version of the project.

---

## The headlight test (apply first, weight highest)

State the paper's core idea in one sentence. It must be the dominant-enrolment proctor coupling: in each room the department with the most students supplies the proctor, ties broken by department code, and that rule couples the timeslot, room, and proctor decisions. If the draft reads as a generic three-model timetabling paper and the coupling is not the spine that every section serves, that is the most serious finding in the review, ahead of any technical detail. Severity: Critical.

Sub-checks:

- **Does the abstract lead with the coupling, or with "we propose three models"?** Leading with the method inventory instead of the contribution is a major framing flaw.
- **Is the coupling stated as a modelling novelty (an enumerated "first to" claim), per EJOR taste?** If the contribution is phrased vaguely, flag it; VENUE-REVIEW-STANDARDS.md explains why EJOR penalises diffuse novelty.
- **Does every section earn its place against the one idea?** Material that does not serve the proctor coupling (a tangential constraint, an unused method) is Chekhov's gun; flag for cutting or moving.

## Positioning against the proctor literature

The corpus proctor/invigilator papers all decouple, and the draft must position against them correctly.

- **Does the draft anchor the timeslot/room/proctor triad and place itself in the proctor cell?** If it does not cite and contrast the 2026 invigilator assignment paper (fixed timetable, post-assignment), the 2021 web-based DSS (sequential ETP then supervisor assignment), and the 2025 cut-and-branch (two-examiner staffing inside the MILP, niche variant), the positioning is incomplete. Major.
- **Is the gap stated as missing integration?** The differentiator is that existing work decouples or post-assigns, while this paper makes the attribution a coupling constraint. If the draft claims novelty without naming what prior work did differently, that is the "dismissive or vague positioning" failure the rubric warns about.
- **Does the draft route the contribution through the per-session staffing constraint (H5)?** The proctor rule should be presented as the mechanism linking room occupancy to proctor load, the way the 2025 cut-and-branch derives its structure from per-session examiner counts. A proctor rule presented in isolation, not tied to H5, weakens the modelling argument.

## The three-model arc (MILP to CP to decomposition)

Each model must be motivated by the limits of the previous one.

- **Is the MILP presented as the natural first formulation, and is its intractability frontier evidenced, not asserted?** The MILP exists to anchor where exact formulation stops scaling. If the paper claims intractability without the data (instance sizes, time-limit hits, gaps), that is a major experimental flaw; the venues demand honest failure tokens.
- **Is the CP model shown to capture the same coupling more naturally, with optimality on small-to-medium instances?** Check the claim against `docs/02-cp-model.md`. A CP section that merely restates the MILP in CP syntax, with no argument for why CP suits the coupling, is thin.
- **Is the decomposition's surrogate justified by domain structure?** The student-count surrogate decouples the proctor rule so the decomposition optimises at exam level. The draft must explain why a stage-1 solution stays feasible and near-optimal downstream, the way the applied-tier exemplars justify their decompositions (which resource is non-critical). An unjustified surrogate is a methodology flag.
- **Is the head-to-head a single fair table?** Rows = instances, columns = methods, bold = best, asterisk = optimal/best-found, plus a lower-bound or gap column, with matched time budgets and reported variance. Anything less fails the C&OR fairness bar.

## Formulation correctness against the glossary

Check the draft's constraints against `docs/01-problem-description.md` labels, and watch for the known discrepancies flagged in `reformalization-phase.md`:

- **Proctor tie-break wording**: the rule breaks ties by department code, not "exam codes". If the draft says exam codes, that is a correctness error, not a typo. Major.
- **H5 is per-slot, not per-horizon**: it caps the per-timeslot proctor count per department. A draft that sums it over the horizon mis-states a hard constraint. Major.
- **Soft-constraint numbering (post-2026-06-30 de-bloat)**: the canonical soft set is S1–S8 — S6 is student travel, S7 is room-count economy, S8 is same-department room sharing. The earlier "S6 student-spread vs room-economy" collision and the low-room-load side constraint were resolved by removing the institution-specific side constraints (D-SIMPLIFY). A draft that revives a side-constraint section or mis-numbers S6/S7/S8 is out of sync with `docs/01`. Major.

## The travel-time objective

- **Is the student-travel-time term defined precisely** (`w_travel * sum_u span_u`, span over the atoms each student sits, encoded per enrolment-pattern equivalence class)? A vague "we minimise travel" without the span definition is underspecified.
- **Is the tension with S3 (departmental compactness) acknowledged and hedged?** Travel pulls each student's exams together; S3 pulls each department's together. The weight balance is an experiment, so a draft that claims a clean win for travel without showing the trade-off is over-claiming.

## Exam splitting

- **Is splitting correctly demoted to infeasibility repair, not presented as a headline contribution?** Since the 2026-06-27 pivot, splitting is a short subsection repairing open-enrolment structural infeasibility. A draft that still frames it as a primary contribution is stale and should be flagged against the current direction.

## Holistic question specific to this paper

Beyond "the decomposition scales", does the paper offer the insight that proctor attribution, though formally coupling the three decision layers, can be decoupled in practice for instances of this structure via the surrogate? That is the "so what?" the conclusion should reach. A conclusion that only reports the scaling result, without this reflection, leaves the paper's lasting contribution unstated.
