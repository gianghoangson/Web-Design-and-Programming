---
name: beamer-slide
description: Generate Beamer slide frame code in the user's personal presentation style. Encodes a 7-colour theme (`th*` prefix), custom frametitle, TikZ global styles, 9 reusable slide patterns, and the deck's tone/register rules (serious academic register, no theatrics, em-dash discipline, short colon-free titles, examples over notation) plus the linear-constraint layout for dense model math. Use when asked to create, write, add, or revise a slide, frame, or presentation content in LaTeX/Beamer. Do NOT produce full `.tex` files: output frame code only (ready to drop into an existing preamble). The agent picks the most suitable slide pattern based on content; the user does not need to specify it.
---

# Beamer Slide Skill

## Quick start

User asks: *"Make a slide about the three-stage decomposition framework."*
→ Read [resources/patterns.md](resources/patterns.md), pick the best pattern (here: flowchart or two-column content), emit frame code using the conventions below.

---

## Core rules

1. **Frame code only**: no `\documentclass`, no preamble, no `\begin{document}`.
2. **Agent picks pattern**: infer from content; see [resources/patterns.md](resources/patterns.md).
3. **Use `th*` colour names**: see palette below; never write raw hex values.
4. **Match font sizes**: `\small` for body, `\footnotesize`/`\scriptsize` for dense material, `\large\bfseries` for callout headings.
5. **Keep slides uncluttered**: one strong idea per frame; move detail to a `dlepbox` or a follow-up frame.
6. **Serious academic register by default.** Plain, direct, informative. Personality is a budget of at most one slide per deck; spend it on the title or spend it nowhere. See [Tone and register](#tone-and-register).
7. **Constraints render as a linear list, never a boxed `align`.** Explanation left, constraint middle, number right, one logical constraint per row. See [Representing constraints and dense math](#representing-constraints-and-dense-math).
8. **Examples over notation on problem/context slides.** Lead with the concrete number, keep the symbol in parentheses. Reserve bare symbols for the formal model slides.

---

## Tone and register

Academic decks are read by an expert who may not share the niche. The writing must be clear first: the content can be hard, the prose cannot. Bury nothing under metaphor or mood. This section is the part reviewers of the deck complain about most, so treat it as load-bearing.

**State facts, not moods, in every heading and callout title.** A `dlepbox` title names what the box contains. Rename any title that reads as drama or self-narration. Real renames from this project:

| Instead of | Write |
|---|---|
| The design bet | Design choice: the seat is the only primary variable |
| The price tag | Relaxation cost |
| The wall is the argument | Reading the frontier |
| Why this vindicates the architecture | What this shows |
| Read it | Reading the table |
| The one-line diagnosis | Summary |
| The sentence to leave the room with | One-sentence summary |
| Role, and a fairness debt | Role, and remaining work |
| Two landmines, both defusable now | Two known weaknesses, both fixable before submission |
| Read the three models as a fidelity ladder, never a horse race | Three models: increasing fidelity, decreasing tractability |

**Cut theatrical framing outright.** No "landmine / defuse", "horse race", "trench coat", "the mirror", "X embodies the thesis", "where the truth stops being solvable", "fidelity ladder" as a marquee. The plain statement carries the same idea without the costume, and an expert trusts it more.

**No performative contrast.** "Not X, it's Y", "never as a contribution", "not a shortcut" are scaffolding. State Y directly. Keep a negation only to correct a real, named misreading ("presented as method, not as a contribution"), then move on.

**Em-dash, sparingly.** Slide *body* text is already short and coherent, so the hollow-emphasis dash almost never earns its place, and two per slide reads as a tic. Convert `---` to a colon, comma, period, or arrow. Two uses survive in body text: a matched pair around a parenthetical aside, and a glossary `term --- definition` inside a symbol table. Frame titles follow their own rule (next).

**Frame titles are short content labels, with no colons.** A title names what the slide is, and stops: `Hard constraints`, `Gap matrix`, `Model design decisions`, `Methodology`, `Pipeline results`. Do not dress it with a colon and a descriptor (`Two problems: modelling and scaling` → `Modelling and scaling`) and do not trail a clause (`Evidence versus claims, line by line` → `Evidence versus claims`). Any genuine detail goes in the `\framesubtitle`, and the subtitle is cut if it is not a fact. The only `---` allowed in a title is a namespacing prefix that disambiguates otherwise-identical titles across models or benchmarks: `ITC2007 --- Constraints`, `MILP --- Soft terms`, `Stage 3 --- Room packing`. Use it only when several slides would collide without it; otherwise the bare label is enough.

**Cut empty subtitles.** Keep a `\framesubtitle` only when it adds a fact the title does not. Delete self-reference ("the slide I keep forgetting exists") and mood ("the question is only how politely"). Plainify what remains into a claim.

**Examples over notation (problem/context slides).** "at most $H$ rooms per department per timeslot" reads as algebra; "at most 10 rooms per department per timeslot (cap $H$, HN)" reads as a fact. Lead with the number, keep the symbol in parentheses. On the formal model slides the symbols *are* the content, so there they stay bare.

**One personality slide, at most.** A deck may carry a single light touch, usually the title. Everything else stays serious. When in doubt, spend nothing.

---

## Representing constraints and dense math

The single biggest readability lever in a model-heavy deck. A `tcolorbox` wrapping an `align` of dense notation looks tidy but reads badly: the eye gets equations with no anchor. A linear list with a per-constraint explanation reads at a glance.

**The rule:** sets, parameters, and variables may sit in a two-sided glossary (Pattern 4). **Constraints must be a linear list**, one logical constraint per row, in a three-column `tabularx`:

- **left** (`>{\raggedright\arraybackslash}X`, widest): the plain-English explanation, one clause;
- **middle** (`l`): the constraint itself, `$\textstyle\sum …$` or `$\displaystyle …$`;
- **right** (`r`): the equation number.

Widen the rows (`\renewcommand{\arraystretch}{1.5}`–`1.9`), drop the `tcolorbox`, and let the H/S badges (`\hbadge{H5}`) sit at the start of the explanation cell. Full template: Pattern 9 in [resources/patterns.md](resources/patterns.md).

**Why `{X l r}` (explanation-X, math-l), not `{l X}`:** `tabularx` stretches the `X` column to fill whatever the fixed-width math and number columns leave, so each explanation auto-aligns to its constraint and the math keeps its natural width. If a math cell grows so wide it squeezes `X`, that is the signal to fold a clause out of the math and into the explanation (below).

**Handling the awkward cases** (each is a real fix from this project):

- **Paired sub-constraints** (a `≥1` and a `≤1` on one variable) share a row and a number range: `$\sum_r X^R_{ir}\ge 1,\ \le 1 \quad \forall i$` … `(11--12)`.
- **The `∀` quantifier** goes inline in the middle cell, never a fourth column: `$\sum_t x_{i,t}=1 \quad \forall i$`.
- **A constraint too wide for the cell** (a big-M implication with a `∀ d': code(d')<code(d)` side clause) folds the side clause into the explanation ("every smaller-code dept sits strictly below $M$, the tie-break") and keeps only the core expression in the math cell.
- **Very dense slides** (a soft block with 10+ auxiliary lines) show **one headline constraint per term** — the penalised quantity — and push the envelope/reification auxiliaries into a single grey note below: *"Each term self-clamps: an envelope plus a $\ge$-difference, zero when inactive."* Do not try to fit every mechanical line; name what is dropped.
- **Objectives are not constraints.** Show them unboxed as a labelled display, breaking long sums across two lines:
  `{\scriptsize\textbf{\color{thBlue}Objective} \hfill {\color{thGrey}(24)}}` then `\[ \begin{aligned} \min\ &… \\ &… \end{aligned} \]`.

**When a slide is genuinely too tall** for one linear list plus its note, split the constraints across the two slide columns (each a `{X l r}` mini-table) rather than shrinking the font past `\scriptsize` or re-boxing. Two linear columns still obey the rule; a `tcolorbox` does not.

---

## Colour palette (`th*` prefix)

| Name | Hex | Role |
|---|---|---|
| `thBlue` | `#1E3A6E` | Primary navy — titles, borders, text |
| `thAccent` | `#F4A300` | Amber — highlights, rules, badges |
| `thLight` | `#F0F4F8` | Off-white — block/box backgrounds |
| `thGrey` | `#6B7280` | Muted — subtitles, captions |
| `thOrange` | `#D35400` | Warning/emphasis |
| `thGreen` | `#27AE60` | Success/positive |
| `thDeepOrange` | `#D05D11` | Alert text |

> **Mapping note:** In the source preamble these are defined as `dlep*`. When generating frames, write `th*` everywhere; the preamble will alias them (`\colorlet{thBlue}{dlepBlue}` etc.). See [assets/preamble-alias.tex](assets/preamble-alias.tex).

---

## Reusable components

### `dlepbox` — callout / highlighted box
```latex
\begin{dlepbox}[width=9cm]{Box Title}
  \small Body text here.
\end{dlepbox}
```

### `\hbadge` / `\sbadge` — inline constraint badges
```latex
\hbadge{H2}  % navy fill — hard constraint
\sbadge{S1}  % amber fill — soft constraint
```

### `\jumpbtn` / `\backbtn` — navigation buttons
```latex
\jumpbtn{targetLabel}{Button text}   % go-to
\backbtn{sourceLabel}{Back to X}     % return
```

### TikZ global styles
| Style | Use |
|---|---|
| `pbox` | Rounded box node (diagrams) |
| `arr` | Solid arrow (`-{Stealth}`) |
| `darr` | Dashed grey arrow |
| `lbl` | Small caption label |
| `act=<colour>` | Act/chapter node (outlined, lightly filled) |

---

## Choosing a pattern

See **[resources/patterns.md](resources/patterns.md)** for the full template library.

| Content type | Pattern |
|---|---|
| Bullet points + one supporting diagram | Two-column content (1) |
| Two parallel concepts / challenges | Two-column info blocks (2) |
| Process, pipeline, algorithm flow | Flowchart (6) |
| Model: sets / parameters / variables (glossary) | Math model (4) |
| Model: constraints (dense notation) | **Linear constraint list (9)** |
| Model: objective | Unboxed labelled display (see Pattern 9) |
| Constraints described in words (problem statement H/S list) | Constraint table (5) |
| Screenshot, figure, chart | Figure (3) |
| Chapter / act transition | Section divider (in resources/special-slides.md) |

Two house-style defaults. For a **content** slide, prefer the layout that puts the visual on the right and the text on the left. For a **model** slide, the math is the visual: keep the explanation on the left and the constraint on the right (Pattern 9). One clean chart beats a bullet list, so replace text with a figure or a compact table whenever the figure is genuinely clearer, but do not manufacture a diagram where a trimmed table already reads well.

---

## Workflow

1. **Identify content type** → pick pattern from table above.
2. **Open [resources/patterns.md](resources/patterns.md)** → copy the template for that pattern.
3. **Fill in content**, respecting colour names, font sizes, and component conventions.
4. **Add `\label{slideXxx}`** to any frame that may be a navigation target.
5. Return **only the frame block(s)** — no preamble, no `\end{document}`.
