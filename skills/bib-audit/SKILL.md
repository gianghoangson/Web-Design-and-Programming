---
name: bib-audit
description: Many-agent audit of paper/mybibliography.bib. Verifies entries against canonical sources (DOI, journal landing pages), detects duplicate keys and near-duplicate entries, and reconciles the bib against the literature corpus (sample/paper/ frontmatter and cited_in back-edges) and against the citations actually used in paper/main.tex. Use when the user wants to check the bibliography, find duplicate or wrong entries, or confirm every corpus paper and every \cite is covered.
---

<what-to-do>

Audit the existing bibliography. The bib is mature (~75 entries); this skill verifies and reconciles it, it does not rebuild it. Never overwrite `paper/mybibliography.bib` wholesale; propose fixes as targeted edits and let the user approve.

Run the audit in four passes. The verification pass fans out to narrow per-entry agents (the bibcheck pattern); the rest are local.

1. **Duplicate pass (local, do first, cheapest).** Scan `paper/mybibliography.bib` for repeated citation keys and for near-duplicate entries (same title/authors under different keys). BibTeX silently keeps the last definition of a repeated key, so duplicates are real bugs. Known offenders at last check: `guler2020spreadsheet` (three copies), `arbaoui2015preprocessing` and `lei2018memetic` (two each). Report every collision with line numbers and a proposed resolution (keep one, delete the rest, or merge fields).
2. **Corpus reconciliation (local).** For each of the 16 papers in `sample/paper/` (read `sample/paper/INDEX.md` and frontmatter), confirm a matching bib entry exists; flag corpus papers with no entry. Then read each paper's `cited_in` frontmatter: a paper marked cited should have its key actually used in `paper/main.tex`. Report corpus-vs-bib gaps both ways.
3. **Citation reconciliation (local).** Extract every `\cite*{...}` key from `paper/main.tex`. Flag keys cited but absent from the bib (compile-breaking) and entries in the bib never cited (dead weight, report only, do not delete unless asked).
4. **Verification pass (fan-out, opt-in, slowest).** Only when the user asks to verify correctness: spawn one narrow agent per entry (or per shortlisted entry) that checks the entry against a canonical source via the entry's DOI or a web search of the exact title, confirming authors, year, venue, volume/pages. Each agent returns a verdict (match / mismatch with the corrected fields / not found). Batch the agents; keep each one's scope to a single entry so context stays small.

Produce a findings report grouped by pass, each finding tagged Critical (duplicate key, missing-but-cited, wrong DOI), Major (corpus paper absent, metadata mismatch), or Minor (uncited entry, formatting). Apply only the fixes the user approves.

</what-to-do>

<supporting-info>

## Domain awareness

This is the **esd-research** EETP project. The bibliography is `paper/mybibliography.bib`, cited from `paper/main.tex` (compiled with `latexmk -pdf main.tex` from inside `paper/`). The literature corpus is `sample/paper/` (16 papers with YAML frontmatter; `cited_in` is the back-edge to our writing) and `sample/model/`. The corpus and the bib overlap but are not identical: the bib is broader (it includes references never deep-read into the corpus), and a few corpus papers may not yet have entries.

## Why these passes, in this order

The local passes are cheap and catch the highest-severity defects (duplicate keys break silently, missing-but-cited keys break the build), so they run first and always. The fan-out verification pass is expensive (one agent per entry, network-bound) and is opt-in, because confirming 75 entries against canonical sources is only worth it before a submission, not on every check.

## Reconciliation, not bootstrap

Earlier project notes assumed the bib did not exist; it does, and it is substantial. So the job is reconciliation: keep the bib as the source of truth for citation keys, use the corpus frontmatter (`doi`, `title`, `authors`, `year`, `venue`) as a cross-check, and surface disagreements rather than regenerating either side. If a corpus paper genuinely lacks an entry, propose a new entry built from its frontmatter, appended, not a rewrite.

## Editing discipline

Targeted edits only. Removing a duplicate key means deleting the redundant blocks and keeping the most complete one; say which you kept and why. Do not reorder or reformat the whole file. After any edit that touches keys, re-run pass 3 to confirm no `\cite` was orphaned, and have the user recompile.

## Fan-out hygiene (verification pass)

One entry per agent. Give each agent the entry text and ask it to confirm or correct the bibliographic fields against the DOI or the exact title, returning a compact verdict. Do not let an agent edit the bib; agents report, the main session proposes edits. This keeps the adversarial-check property (a fresh, narrow context per citation) that makes the audit trustworthy.

</supporting-info>
