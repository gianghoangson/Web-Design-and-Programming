# Synthesis protocol (lazy drill + related-work output)

How to turn the indexed corpus into related-work prose without reading everything. The corpus is a navigable graph: a Layer-0 catalogue plus `related:` edges between papers. Navigate the graph; do not scan all 86 papers.

## Traversal

1. **Target.** Name the section or question precisely. "Related work on decomposition approaches" and "where does our travel objective sit against the literature" pull different shortlists.
2. **Layer 0 pass.** Read `sample/paper/INDEX.md`. From the `Method family`, `Problem variant`, and `Relevance` columns plus the neighbourhood block, pick a seed set (2-4 papers) closest to the target. Write down the seeds and the one-line reason each is in.
3. **Edge expansion.** For each seed, look at its `related:` edges (in the seed's frontmatter, or the neighbourhood block) and pull in neighbours the target needs. This is how the graph earns its keep: the seeds surface their own neighbourhood, so you reach the right 3-6 papers without re-scanning the whole table. Settle the final shortlist here.
4. **Layer 1 pass.** For each shortlisted paper, read its frontmatter + abstract only (the top of the folder's `<name>.md`). Keep or drop. A paper survives only if its abstract substantiates the role you assigned it.
5. **Layer 2 pass (conditional).** Open the full `<name>.md`, and only the relevant `##` section, when you need a specific number, equation, or constraint definition. When the paper has figures (`figures: > 0`), Read the relevant `images/*.png` directly (the Read tool renders PNGs) to ground a figure-level claim, an algorithm diagram, or a results plot. Record what you pulled and from which section/figure. If a synthesis reaches Layer 2 for every paper, the shortlist was too broad.

## Output shape

Group by methodology family, never by year. For each family: one short paragraph synthesising what the family does and its limitation for our setting, then the comparison table row(s). Close with the gap statement.

### Comparison table

A compact table keyed to what matters for our positioning. Suggested columns (drop any that do not discriminate):

| Paper | Method family | Proctor / invigilator handling | Student spread / travel | Scale solved | Real-world data |
|---|---|---|---|---|---|

The columns are chosen so our contribution stands out: most rows will read "fixed timetable" or "not modelled" under proctor handling, and "spread only" or "not modelled" under travel. That contrast is the argument.

### Gap statement template

State the positive claim directly (no "unlike prior work" throat-clearing). The shape:

> Existing exam-timetabling models treat proctor (invigilator) assignment as a downstream step on a fixed timetable [IAP anchor], and handle the student horizon as exam spread or spacing rather than cross-day travel [spread/spacing refs]. We couple proctor attribution into the timetabling decision through the dominant-enrolment rule, and add per-student travel time as a direct objective.

Fill the bracketed refs from the shortlist. Anchors that exist in the folder corpus:

- **Proctor (IAP anchor):** `2026 The (a)social exam invigilator assignment problem`; secondary `2026 Data-driven … student stress` (invigilator workload).
- **Spread / spacing (travel precedents):** `2016 A column generation approach …` and `2019 Lower bounds and compact mathematical formulations for spacing soft constraints …`.
- **MIP/CP/decomposition baseline:** `2020 A practical three-phase ILP approach …`, `2020 Local Search and Constraint Programming …`, `2015 Preprocessing and an improved MIP model …`.

Note: the former primary positioning survey (`2023 Educational timetabling`) and the dedicated travel paper (`2024 The exam location problem`) are not in the folder corpus. If a synthesis needs the "standard formulation" baseline or a pure-travel analogue, re-extract those to folders and re-run `index`; until then position against the survivors above.

## Style

Follow `.claude/rules/02-write.md`: one physical line per paragraph, em-dash used sparingly, no performative contrast, hedge interpretive claims. This is draft prose for the user to place, not a direct write into `paper/main.tex`. When a paper ends up cited, set its `cited_in` frontmatter field.
