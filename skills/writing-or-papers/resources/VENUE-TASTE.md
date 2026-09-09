# Venue Taste: EJOR and Computers & Operations Research

How an exam-timetabling paper should read for the project's two target venues, distilled from a deep-read of corpus exemplars. EJOR and Computers & Operations Research (C&OR) are primary; Journal of Scheduling, Annals of Operations Research, and ITOR calibrate the wider applied-OR tier. Generic craft is in the `~/.claude/skills/write-paper/` skeleton; this file is the venue overlay. When a venue norm here conflicts with a skeleton craft rule, the venue norm wins for this paper, and you should flag the tension.

The exemplars named below are real corpus papers in `sample/paper/`. Cite them when justifying a structural choice.

---

## What both venues demand (non-negotiable)

These hold across every research paper in the sample, EJOR and C&OR alike.

- **A full, explicitly notated formulation.** Separate labelled blocks for sets/indices, parameters, decision variables, and constraints, with constraint-by-constraint verbal justification. This is present in every paper except the survey, and even the pure-metaheuristic C&OR paper (Bellio 2021, two-stage SA) includes a complete MIP to map the boundary of exact solvability. The model is treated as a first-class object, not an appendix afterthought. Where the constraint set is large, restate it in full in an appendix (Almeida 2024, thesis-defence MOMILP).
- **Positioning against shared benchmarks, or a new public one.** Carter/Toronto, ITC2007, and Yeditepe are the shared exam-timetabling benchmarks. A paper that introduces a new problem introduces a fresh public benchmark with a data URL or DOI (Çalık 2024 exam location; Lai 2026 student stress; Bellio 2021).
- **Honest scalability and failure reporting.** State where the method fails, with concrete tokens: Woumans 2016 reports a 400-hour non-solve of YOR83; Arbaoui 2019 uses NF (not found) and OOM (out of memory); Çalık 2024 reports CPLEX time-limit feasibility failures; Lai 2026 marks entries over 3600 seconds. A table with no failures reads as cherry-picked.
- **Open data and reproducibility.** Now standard. Release instances, best solutions, and ideally a solution checker. The 2023 Educational Timetabling invited review (Ceschia 2023, EJOR) makes reproducibility and result validation an explicit field expectation.
- **Contribution stated in the introduction, never buried.** As prose or an enumerated list, frequently with "to the best of our knowledge, the first to ...". Reviewers will not hunt for it.
- **Conflict density as the instance-complexity proxy.** Recurs across both venues as the standard difficulty axis to sweep.

Citation counts on the sample are unremarkable: research papers cluster around 30 to 65 references (Woumans ~52, Almeida ~30-45, Arbaoui ~33, Bellio ~36, Lai ~64, Çalık ~28); the invited review runs ~105. Aim for thorough coverage of the formulation/benchmark lineage plus the relevant method families, not a target count.

## EJOR taste

EJOR treats the model and the problem framing as the primary object of interest.

- **Lead with a modelling novelty and build the whole paper around it.** Woumans 2016 leads with the exam-version/spreading trade-off that nobody had formalised; Almeida 2024 leads with a role-aware decision variable and the option of not scheduling every defence. The solution method is the means to exploit the model, not the headline.
- **Enumerated "first to" contribution claims tied to concrete modelling devices.** Almeida 2024 organises its novelty under three levels (decision variable, constraints, objectives), each a "we are the first to ..." claim about a specific modelling choice. This is the strongest EJOR-rewarded signal.
- **Generalise beyond one institution.** EJOR rewards a model that escapes one university's regulations and aims to be "applicable to a broader set of cases" (Almeida 2024). State the generalisation explicitly.
- **Multi-objective and decision-maker-facing framing is welcome.** Pareto sets, trade-off curves, epsilon-constraint methods, and "valuable to the decision-maker" language are in-genre.
- **Decomposition machinery at full mathematical depth.** Woumans 2016 writes dual variables beside each master constraint in a column-generation model. EJOR accommodates heavy mathematical-programming presentation when the model is the contribution.

## C&OR taste

C&OR treats algorithmic and experimental rigour as the primary object, often with a sharper, narrower technical contribution.

- **A narrow, measurable technical contribution.** Arbaoui 2019 contributes tighter lower bounds and more compact formulations, and measures the contribution by asymptotic equation count (O(exams) versus O(exams squared)) and by memory behaviour (OOM events). Engineering metrics that EJOR papers here do not foreground are valued.
- **Experimental-methodology ceremony is the clearest C&OR fingerprint.** Bellio 2021 tunes parameters with F-Race on separate artificial training instances to avoid over-tuning on the benchmark, runs running-time-equalised and CPU-speed-scaled one-to-one matches rather than one optimistic table, runs a full factorial ablation to isolate which components matter, and refuses to report results from known-corrupted instance files. Reproduce this rigour: matched time budgets, ablation, run-to-run variance (best and average over N runs, standard deviation).
- **Problem-structure taxonomies that place "this paper" in an explicit cell.** Lai 2026 uses a 2x2 share/split classification table; Çalık 2024 positions against the location-science lineage (p-median and its capacitated variants). Locate the contribution in a stated taxonomy.
- **Large real-world scale with operationally legible payoffs.** Lai 2026 reports "536 invigilation hours saved" and per-student stress histograms, and beats the manual schedule in administratively meaningful units, on instances with over 3 million variables. Translate the win into units an administrator understands.
- **Opening a new problem with a clean IP plus a family of variants.** Çalık 2024 introduces the exam location problem, proves NP-hardness as a generalisation of capacitated p-median, gives a base IP, then a family of principled variants with exact Pareto analysis, carried by solution-map visualisations.

## One-line distinction

An EJOR exam-timetabling paper asks "is the model new, general, and well-justified, and does it advance the field's shared formulations?". The matched C&OR paper asks "is the method rigorously tuned and fairly compared, does it produce new best-known or proven-optimal results, and does it scale to real instances with honest variance and failure reporting?". Both then demand the same underlying competence.

Implication for this paper: the proctor-coupling contribution is a modelling novelty, which plays to EJOR. The MILP-to-CP-to-decomposition tractability argument and the head-to-head computational study play to C&OR. The paper can satisfy both by stating the coupling as an enumerated "first to" modelling claim (EJOR) and backing it with a fair, ablation-style, honest-failure computational study (C&OR).

---

## Structural template for a real-world case-study exam-timetabling paper

The dominant section skeleton across the applied-OR tier (2023 portfolio in Journal of Scheduling, 2020 three-phase ILP in ITOR, 2021 DSS in ESWA, 2015 preprocessing in Annals of OR, plus the EJOR/C&OR papers above):

1. **Abstract** (5 moves): name the real-world setting and institution; state the artifact/contribution in one sentence; enumerate the distinctive real-world features in two or three sentences; name the method(s); close on validation scope and any public release. EJOR abstracts sell the modelling novelty; C&OR abstracts often add the methodology and the manual-schedule beat.
2. **Introduction**: motivate (scale, registrar pain, manual cost), name the specific institution and its peculiarities, state the contribution as prose or an enumerated "first to" list, end with a one-paragraph roadmap. Lower-tier venues (ITOR, ESWA) and several C&OR/EJOR papers fold related work into the intro; Journal of Scheduling, Annals of OR, and some C&OR papers (Bellio 2021, Lai 2026) give it a dedicated section.
3. **Problem description**: entities, then hard constraints as a labelled list (H1..Hk), then soft constraints/objectives as a labelled list (S1..Sk), then a weight table. Flag the differentiating feature here (curriculum-based vs post-enrolment; multi-room; the proctor coupling).
4. **Formulation**: sets table, parameters table, variables table, objective, numbered constraint blocks, each with one line of plain-English justification. Declare notational shorthand once. Show big-M linearisations and absolute-value gadgets in full; this is expected at Journal of Scheduling, Annals of OR, EJOR, and C&OR, not optional.
5. **Method(s)**: one subsection per paradigm. For the MILP-to-CP-to-decomposition arc, present them as a portfolio on one common problem (as the 2023 Journal of Scheduling paper does with five solvers), each with its own modelling subsection, and justify the decomposition by domain structure (which resource is non-critical, why a stage-1 solution stays feasible downstream).
6. **Computational study**: instance-feature table first; then a settings/parameters table (solver, threads, time limit, tuning); then the head-to-head results table (one row per instance, one column per method, bold = best, asterisk = optimal/best-found), plus a lower-bound or optimality-gap column. Report runtime, gap, memory, run-to-run variance, and improvement over a re-run baseline or the manual incumbent. Dual validation (own real instances plus a public benchmark such as ITC2007 or Carter/Toronto) materially strengthens the paper. Release instances and ideally a checker.
7. **Conclusions and future work**: candid summary of which method won where, then concrete hybridisation or extension directions.

Cross-venue rules: the fairness apparatus is mandatory for multi-method papers (same machine, same timeout, multiple runs averaged, independent implementation noted). Practicality is a legitimate headline (feasible-fast beats optimal-slow), but quantify the trade-off (for example 17 hours to shave a few percent versus seconds for an acceptable schedule, as the 2020 ITOR paper does). Model compactness (variables, non-zeros) and memory footprint are reportable contributions in the IP tradition.

---

## Framing a proctor-coupling contribution

The proctor/invigilator papers in the corpus are the closest precedents, and they all decouple, which is exactly the gap this paper fills.

1. **Anchor the triad.** Open the literature framing with the three-subproblem decomposition of exam timetabling: timeslot assignment, classroom (room) assignment, and invigilator/proctor assignment (the 2026 invigilator paper uses Reis and Oliveira 1999 and Ceschia et al. 2022 for this). Give brief subsections to the first two and their integration, then a focused subsection to proctor assignment.
2. **State the gap as missing integration.** The 2026 invigilator paper assigns proctors to a fixed timetable (its Assumption A1); the 2021 DSS feeds the ETP solution into a separate supervisor-assignment model; the 2025 cut-and-branch keeps two-examiner staffing inside the core MILP but only for a niche external-candidates variant. Phrase the differentiator: existing work decouples or post-assigns; this paper makes the dominant-enrolment attribution a coupling constraint, so timeslot, room, and proctor are decided jointly.
3. **Route the contribution through the per-session staffing constraint.** All three proctor papers derive their contribution from the per-session staffing constraint (exactly-two supervisors; two-examiner qualification; per-exam demand). The 2025 cut-and-branch derives its valid inequalities directly from the per-session examiner-count constraints, which is the structural analogue for the dominant-enrolment rule here. Frame the rule as the mechanism linking room occupancy to proctor load (H5, the per-slot proctor cap).
4. **Borrow the contribution vocabulary these venues reward.** "Base problem definition", "variants", "complexity analysis", "combinatorial bounds", "public benchmark" (from the 2026 invigilator paper); "derive structural constraints that yield modelling/polyhedral structure" (from the 2025 cut-and-branch); "a problem-specific structure never studied before that enables an exact decomposition" (from the 2021 DSS).
5. **Keep the human-factor and fairness register available.** Workload min/max bounds, balanced duty counts, availability, preference costs, and even satisfaction surveys are in-genre at Journal of Scheduling and ESWA. Position the student-travel-time soft objective alongside these in the same idiom.
6. **Validation expectation.** Real institutional instances are the credibility core; an ITC2007-derived or Carter-derived artificial benchmark broadens reach (the 2026 invigilator paper samples proctor demand onto ITC2007). Release instances and code.
