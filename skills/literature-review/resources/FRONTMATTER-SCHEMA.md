# Frontmatter schema (the corpus keying contract)

The corpus is folder-based. Each paper is a directory `sample/paper/<name>/` containing `<name>.md` (the paper text, filename equals the folder name) and an optional `images/` subdirectory of figure PNGs. The YAML block goes at the very top of `<name>.md`, above the title. It is the source of truth for `sample/paper/INDEX.md`. Keep fields in this order.

```yaml
---
title: <paper title, plain text; quote it if it contains a colon>
authors: <surnames, comma-separated; e.g. Arbaoui, Boufflet, Moukrim>
year: <integer>
venue: <journal or conference; quote if it contains a colon or comma>
method_family: [<one or more from the controlled vocabulary below>]
problem_variant: <one line; the problem the paper actually solves>
contribution: <one line; what the paper does, not what it is about>
relevance: <one line; how it relates to OUR proctor-coupling gap and/or travel-time objective>
tags: [<freeform keywords; lowercase-hyphenated>]
related: [<folder-name>, ...]   # 3-6 nearest-neighbour papers (the graph edges)
figures: <integer>              # count of PNGs in this paper's images/ (0 if none)
doi: <DOI if present, else leave blank>
cited_in: []   # back-edge: our docs/paper sections that cite it; filled as we cite
---
```

## Controlled vocabulary for `method_family`

Use these labels so the catalogue column stays scannable. A paper may list several.

| Label | Means |
|---|---|
| `MIP/ILP` | Mixed-integer or integer linear programming, solved exactly (CPLEX/Gurobi/SCIP) |
| `CP` | Constraint programming (CP-SAT, MiniZinc, etc.) |
| `column-generation` | Column generation / branch-and-price |
| `decomposition` | Multi-phase or multi-stage decomposition (the method, distinct from the solver) |
| `metaheuristic` | Simulated annealing, tabu, local search, evolutionary, hyper-heuristic |
| `hybrid` | Matheuristic or any deliberate combination of exact + heuristic |
| `survey` | Review / survey / taxonomy paper |
| `exact-other` | Exact methods that are not MIP/CP (network flow, complexity proofs, p-median exact) |

## The two graph fields

`related` is what makes the corpus navigable rather than a flat list. It records 3-6 nearest-neighbour papers, keyed by their verbatim folder name (the same string used as an `INDEX.md` row key, so an edge always resolves to a real folder). Choose neighbours by shared `method_family` first, then shared `problem_variant`, then overlapping `tags`. The edges are not symmetric by construction; the index pass reconciles them. Think of it as the `[[wikilink]]` graph the project memory uses: an edge that points to a sensible neighbour earns its place, a filler edge does not.

`figures` records how many PNGs live in the paper's `images/` directory. It is the signal a synthesiser reads to know whether a figure-level claim (an algorithm diagram, a results plot) can be supported by opening an image at Layer 2. Set it to the actual count; `0` when there is no `images/` directory.

## Field discipline

- `contribution` states what the paper *does* ("two CG algorithms that allow multiple exam versions"), not its topic ("a paper about exam spreading").
- `relevance` is the positioning field and the one that earns its keep. It must name the connection to our work: a shared objective (travel/spread/proctor workload), a shared method (decomposition staging, MILP frontier), or the gap (assigns proctors to a fixed timetable, where we couple attribution in). If a paper is only breadth context, say so plainly ("breadth reference only").
- Write `method_family` and `relevance` against `docs/01-problem-description.md`. These are the two judgement-heavy fields; the rest are transcription.
- Duplicates (same paper, different source format) get a `duplicate` tag and a `relevance` that points to the canonical version.

## Positioning anchors (surviving corpus papers)

The corpus is folder-based and these anchors all exist as folders. Position `relevance` against them:

- **Proctor / invigilator (the gap anchor):** `2026 The (a)social exam invigilator assignment problem` assigns proctors to a *fixed* timetable; we couple attribution *into* the timetabling. `2026 Data-driven university examination timetabling with consideration of student stress` minimises invigilator workload alongside student burden.
- **Student spread / travel (our new objective):** `2016 A column generation approach for solving the examination-timetabling problem` (per-student spreading) and `2019 Lower bounds and compact mathematical formulations for spacing soft constraints for university examination timetabling problems` (spacing soft constraints) are the spread/spacing precedents.
- **MIP/CP frontier and decomposition:** `2020 A practical three-phase ILP approach for solving the examination timetabling problem` and `2020 Local Search and Constraint Programming for a Real-World Examination Timetabling Problem` anchor the MIP→CP→decomposition arc.

Note: a primary positioning survey (`2023 Educational timetabling`) and a dedicated travel paper (`2024 The exam location problem`) are not in the folder corpus. If a synthesis needs them, re-extract them to folders and re-run `index` mode.
