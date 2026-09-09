# Venue Review Standards: EJOR and Computers & Operations Research

How a reviewer at the project's target venues judges an exam-timetabling paper, distilled from a deep-read of corpus exemplars in `sample/paper/`. Use this to calibrate severity on top of the generic rubric in the `~/.claude/skills/review-paper/` skeleton. The calibration rule: a weakness that the exemplars at these venues consistently avoid is a serious finding; a weakness many of them share is minor.

EJOR and C&OR are primary; Journal of Scheduling, Annals of Operations Research, and ITOR set the wider applied-OR bar.

---

## Checks both venues apply (fail any and the paper is in trouble)

- **Is the formulation fully and explicitly notated?** Sets/indices, parameters, decision variables, and constraints in labelled blocks, each constraint justified in one line of plain English. Every research paper in the sample does this; even the metaheuristic paper (Bellio 2021) includes a complete MIP. A draft that gives constraints as a wall of prose, or omits a notation block, fails a baseline these venues do not relax. Critical if the model is the contribution.
- **Is there a shared benchmark, or a properly released new one?** Carter/Toronto, ITC2007, or Yeditepe for established problems; a new public benchmark with a URL or DOI for a new problem. A paper validated only on one private instance, for a problem where shared benchmarks exist, draws a major flag (the 2015 and 2019 papers use ITC2007 + Yeditepe; Bellio uses Carter). For a genuinely new problem, releasing the instances is expected (Çalık 2024, Lai 2026).
- **Is scalability reported honestly, including failures?** Look for concrete failure tokens: non-solves within a time/limit, NF, OOM, gaps over the cap. A results table with no failures on hard instances reads as cherry-picked, which is a major credibility finding. The exemplars report failure openly (Woumans's 400-hour non-solve; Arbaoui's NF/OOM; Çalık's CPLEX feasibility failures).
- **Are data and code available?** Open instances, best solutions, and ideally a checker. The 2023 EJOR invited review makes reproducibility an explicit field norm. Absence is increasingly penalised; flag it as minor-to-major depending on venue and recency.
- **Is the contribution stated up front?** Prose or an enumerated list in the introduction, ideally with a "to the best of our knowledge, the first to ..." claim. A contribution the reviewer must reconstruct from the body is a real writing flaw at these venues.
- **Is run-to-run variance reported for stochastic methods?** Best and average over N runs, standard deviation. C&OR especially expects this; a single run per instance for a stochastic method is a major experimental flaw (Bellio 2021 is the calibration point).

## EJOR-specific severity calibration

EJOR judges the model and problem framing first.

- **Is there a real modelling novelty, stated as such?** EJOR research papers lead with one (Woumans's version/spreading trade-off; Almeida's role-aware variable and partial-schedule option). A paper that applies a standard model to a slightly new instance, with no modelling novelty, is a contribution-significance flag at EJOR even if the experiments are clean.
- **Is the novelty enumerated and tied to concrete devices?** Almeida's three-level "first to" list is the model. Vague novelty claims ("we propose a comprehensive model") without a specific device draw a major positioning flag.
- **Does the model generalise beyond one institution?** EJOR rewards escaping one university's regulations. A formulation hard-wired to local rules, with no generalisation discussion, is a scope weakness.
- **For multi-objective work, is the trade-off analysed (Pareto, epsilon-constraint), not just weighted-summed?** EJOR expects decision-maker-facing trade-off analysis when objectives conflict.

## C&OR-specific severity calibration

C&OR judges algorithmic and experimental rigour first.

- **Is the experimental methodology rigorous?** The Bellio 2021 ceremony is the bar: parameter tuning on separate training instances (not the test benchmark), running-time-equalised and hardware-scaled comparisons, ablation isolating which components matter, and refusal to use corrupted instance files. A paper that tunes on the test set, compares against default-parameter or obsolete baselines, or gives no ablation, draws major experimental flags at C&OR.
- **Are new best-known or proven-optimal results delivered, or honest gaps?** C&OR rewards measurable advances on shared benchmarks. Claiming improvement without a fair, time-matched comparison is a major flaw.
- **Is the technical contribution sharp and measurable?** Arbaoui 2019 measures it by equation count and memory. A diffuse "we combined several techniques" with no isolatable, measurable contribution is weaker at C&OR than at EJOR.
- **For an applied paper, does it scale and pay off in legible units?** Lai 2026 reports invigilation hours saved and beats the manual schedule at over 3 million variables. An applied C&OR paper that does not scale to realistic size, or does not translate the win into administrative units, leaves value on the table.

## The one-line test to apply

Ask which venue the draft is written for, then judge by that venue's primary axis. An EJOR submission stands or falls on whether the model is new, general, and well-justified; a C&OR submission on whether the method is rigorously tuned, fairly compared, and scalable with honest variance and failure reporting. A draft that is strong on one axis and silent on the other should be told which venue it actually fits, and what the other venue would demand.
