# Formulation Glossary (`docs/01-problem-description.md`)

The EETP formulation glossary already exists and is **settled**: it is `docs/01-problem-description.md`, the solver-agnostic problem statement that mirrors `paper/main.tex` Section 3. This skill does not create a new glossary. It sharpens proposals against this one and rewords it only when a grilling genuinely resolves an ambiguity.

## How the glossary labels things

The document is the canonical naming surface. Reuse its labels everywhere (chat, code comments, memory notes); renaming a constraint here means renaming it everywhere.

- **Entities and sets** — exam, atom (a post-split exam part), department (Khoa), room, timeslot, session, campus. Vietnamese column names stay raw (`Mã HP`, `Mã SV`, `Khoa giảng dạy`) and the domain abbreviations are first-class (`hp`, `sv`, `cm`, `ts`, `dept`).
- **The dominant-enrolment proctor rule** — in each room the proctor is supplied by the department with the most students in that room (aggregate, per-department count), ties broken by department code. This rule is the paper's single contribution; state it in exactly these terms.
- **Hard constraints `H1`–`H5`** — must hold. H5 is the per-slot proctor-count cap (per timeslot, not per horizon).
- **Soft constraints `S1`–`S8`** — penalised, scored by the shared audit in `docs/07-solution-quality.md`. S1 is proctor balance, S5 is minimum-room occupancy, S6 is student travel, S7 is room-count economy, S8 is the same-department room-sharing penalty.
- **Assumptions `A1`–`A3`**.

## Rules when sharpening or rewording

- **Be opinionated about terms.** When two words name one concept, pick the canonical one from the glossary and name the others as the ones to avoid.
- **Cite the label.** Every constraint has an identifier (`H#`, `S#`, `A#`). Use it in the challenge: "that is H5, the per-slot proctor cap", not "the proctor constraint".
- **Separate hard from soft.** A constraint that is sometimes relaxed is soft; record which audit term scores it.
- **Formulation only.** `docs/01-problem-description.md` is solver-agnostic. No Python names, no flag values, no solver parameters, no stage assignments. Those live in `src/pipeline/`, the rules under `.claude/rules/`, and the pipeline report `docs/06-cp-pipeline.md`.
- **Reword in place, minimally.** If a grilling resolves an ambiguity, edit the relevant H/S/A entry directly and say in chat that you changed it and why. Do not restructure the document. Follow the repo writing rules (`.claude/rules/02-write.md`): em-dash used sparingly, no performative contrast, each paragraph on a single physical line.
- **Do not touch the paper.** `paper/main.tex` Section 3 is the eventual mirror, synced only when the model matures. During a grilling, the markdown glossary is the working surface.

## Example dialogue

> **User**: "I want to add a room constraint that stops a department using too many rooms in a slot."
>
> **Reviewer**: "Which concept do you mean? H5 already caps the per-slot proctor count for a department, and a proctor maps to a room under the dominant rule, so a per-slot room cap may be H5 in disguise. If you mean a distinct bound on opened rooms, that is closer to the S5 room-sharing penalty. Which is it, and is it hard or soft?"
>
> **User**: "A hard per-slot bound on opened rooms, separate from H5."
>
> **Reviewer**: "Then it is a new hard constraint. Before I add it to the glossary: does it ever conflict with H5 on the structurally-infeasible-before-split instances? If a department needs more rooms than the bound in a slot, splitting will not help because splitting raises atom count. Let me check feasibility on the HN instances first."
