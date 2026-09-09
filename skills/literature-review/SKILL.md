---
name: literature-review
description: Reads and synthesises the project's paper corpus (sample/paper/) into grounded related-work prose, and maintains the corpus index. Two modes. synthesise (default) navigates the corpus graph lazily (catalogue, then related-edge neighbourhoods, then frontmatter+abstract, then full text+figures) and produces a method-family-grouped related-work draft with a comparison table and an explicit gap statement positioning our proctor-coupling contribution. index ingests new or changed paper folders into frontmatter, builds the related-edge graph, and regenerates the catalogue. Use when drafting or revising related work, positioning the contribution, surveying what peers have done, or adding a paper to the corpus.
---

<what-to-do>

Two modes. If the user says "index", "ingest", "add this paper", or "regenerate the index", run **index mode**. Otherwise run **synthesise mode** (the default).

## synthesise mode (default)

Produce grounded related-work prose for a target section or question, spending tokens only where they pay. Never read the whole corpus.

1. **Read Layer 0 only first.** Open `sample/paper/INDEX.md`. Scan the `Method family`, `Problem variant`, and `Relevance to our gap` columns plus the neighbourhood block. State the target (the section being written, or the question asked) and pick a seed set (2-4 papers) closest to it.
2. **Expand along the graph.** For each seed, follow its `related:` edges to pull in the neighbours the target needs, then settle a final shortlist of 3-6 papers. Say which ones and why. The graph is the point: seeds surface their own neighbourhood, so you reach the right papers without re-scanning the whole table.
3. **Read Layer 1 for the shortlist.** For each shortlisted paper, read only its frontmatter + abstract (the top of the folder's `<name>.md`). Confirm or drop it. A paper whose abstract does not actually support the claim gets dropped here, not carried.
4. **Drill to Layer 2 only on demand.** Open the full `<name>.md`, and only the specific `##` section, when a concrete claim needs the detail (an equation, a result number, a constraint definition). When the paper carries figures (`figures: > 0`), Read the relevant `images/*.png` directly to ground a figure-level claim. Most syntheses never reach this layer for most papers.
5. **Synthesise, do not list.** Group by methodology family, never by chronology. Follow the lit-review strategy in the generic skeleton `~/.claude/skills/write-paper/resources/PAPER-STRUCTURE.md` (group by method family, build a comparison table, state the gap, synthesise rather than enumerate); do not restate that guidance, apply it. For venue-specific positioning, the `writing-or-papers` skill's `resources/VENUE-TASTE.md` carries how EJOR and Computers & Operations Research expect related work framed.
6. **Land the gap.** End with an explicit gap statement that positions our contribution (the dominant-enrolment proctor-attribution rule coupling timeslot/room/proctor, plus student travel time). The `relevance` field on each paper is the raw material; the `2026 The (a)social exam invigilator assignment problem` paper is the cleanest anchor (it assigns proctors to a *fixed* timetable; we couple attribution *into* the timetabling).

See [resources/SYNTHESIS-PROTOCOL.md](resources/SYNTHESIS-PROTOCOL.md) for the traversal rules, the comparison-table format, and the gap-statement template.

## index mode

Ingest or refresh corpus metadata. The corpus is folder-based markdown, so this is direct extraction, no PDF handling. Run it in two passes, because the `related:` edges need every paper's frontmatter to exist first.

**Pass 1 — per-paper frontmatter.** For each new or changed paper folder `sample/paper/<name>/`:
1. Deep-read its `<name>.md`: abstract, intro, the method/model section, and conclusion. Count the PNGs in its `images/` directory (0 if absent).
2. Derive the frontmatter from the paper's own content. Fill `method_family` from the controlled vocabulary, write `relevance` against `docs/01-problem-description.md` (how the paper relates to our proctor-coupling gap and travel objective), and set `figures` to the PNG count. These judgement-heavy fields (`method_family`, `relevance`) are done carefully, not mechanically. Leave `related: []` for now.
3. Inject the frontmatter block at the very top of `<name>.md`, above the title.

**Pass 2 — graph edges + catalogue.** Once every paper has frontmatter:
1. With all papers' one-line summaries in view (title, year, `method_family`, `problem_variant`, `tags`), assign each paper 3-6 `related:` neighbours: shared `method_family` first, then `problem_variant`, then overlapping `tags`. Edge keys are the verbatim folder names. Write the `related:` list into each paper's frontmatter.
2. Regenerate `sample/paper/INDEX.md` from the frontmatter across all papers: one row per paper grouped by method family (a flat 80+-row table is unreadable; group it), plus a neighbourhood/cluster block derived from the `related:` edges. Keep the layer-drill convention in the header.
3. If a model file changed, refresh `sample/model/INDEX.md` (a thin pointer table, no frontmatter rewrite).

For a large ingest (many folders at once), batch the Pass-1 folders across subagents working on disjoint folder sets, then do Pass 2 centrally once all frontmatter exists.

See [resources/FRONTMATTER-SCHEMA.md](resources/FRONTMATTER-SCHEMA.md) for the exact field contract, the `related`/`figures` fields, and the `method_family` vocabulary.

</what-to-do>

<supporting-info>

## Domain awareness

This is the **esd-research** EETP project. The corpus lives in `sample/paper/` (~86 paper folders, each `sample/paper/<name>/<name>.md` plus an optional `images/` of figure PNGs) and `sample/model/` (extracted models). Each paper folder carries YAML frontmatter at the top of its markdown; `sample/paper/INDEX.md` is the Layer-0 catalogue and the per-paper frontmatter is its source of truth. Figures are extracted alongside the text, so figure-level claims can be grounded at Layer 2. Our single contribution (the gap everything is positioned against) is the dominant-enrolment proctor-attribution rule that couples timeslot, room, and proctor decisions, presented as MILP → CP → decomposition, with a student-travel-time soft objective. Read `docs/01-problem-description.md` for the canonical problem, and `.claude/memory/MEMORY.md` for current state, before positioning anything.

## The corpus is a navigable graph

- **Layer 0** — `sample/paper/INDEX.md`. Cheap; the whole corpus fits here, grouped by method family. Always read first.
- **Edges** — each paper's `related:` field links it to 3-6 nearest neighbours. Follow edges from a seed to reach its neighbourhood instead of re-scanning the table.
- **Layer 1** — a paper's frontmatter + abstract (top of its `<name>.md`). Read for the shortlist.
- **Layer 2** — the full `<name>.md` by section, plus its `images/*.png`. Read only for a specific claim.

The point of the graph is that you decide what to read in depth from Layer 0 plus a few edge hops, instead of loading every paper. If you find yourself reading full papers before consulting the index, stop and go back to Layer 0.

## When the index and the corpus disagree

The frontmatter is the source of truth; `INDEX.md` is generated. If a row contradicts a paper's frontmatter, fix the frontmatter, then regenerate the row. If a paper folder has no frontmatter, run index mode on it before using it in a synthesis. A `related:` edge must resolve to an existing folder name; a dangling edge is a bug, fix it in Pass 2.

## Output placement

A synthesis is draft prose for the user to place; do not write it into `paper/main.tex` unprompted. If the user wants it landed in the paper, follow `writing-or-papers` and the `.claude/rules/02-write.md` conventions (markdown one-line-per-paragraph, em-dash used sparingly, no performative contrast). When a paper is actually cited in our writing, record it in that paper's `cited_in` frontmatter field so the back-edge stays live for `bib-audit`.

</supporting-info>
