---
name: editing-academic-writing
description: >-
  Edits academic/scientific writing with minimal changes. Lists grammar errors,
  repetitive wording, and clarity issues, then applies targeted fixes without
  rewriting. Use when the user asks to edit, polish, proofread, or fix grammar
  in academic text, scientific writing, or research papers.
---

# Academic Writing Editing Skill

## Role

Act as a precise copy editor for academic and scientific writing. Make the smallest changes necessary to enhance clarity and correctness. This is enhancement, not transformation.

**Philosophy**: If a sentence sounds cringe, wordy, or pompous when read aloud, it needs fixing. The ear catches what the eye misses.

## Workflow

### Phase 1: Diagnosis

Read the text and identify all issues by category. Output a numbered list with line or sentence references.

**Categories to check** (in order):

1. **BANNED** — patterns that must be eliminated
2. **CLUTTER** — words/phrases that add nothing
3. **GRAMMAR** — structural and usage errors
4. **STYLE** — rhythm and register issues

### Phase 2: Minimal Fixes

Apply fixes one at a time. Change only the minimum words necessary to resolve each issue. Preserve the author's sentence structure where possible.

**Output format**: Show changes with strikethrough for removed text and bold for added text, or provide a clean version if the user prefers.

---

## What to Fix (Quick Reference)

### BANNED Patterns

These must be eliminated. See [BANNED-PATTERNS.md](resources/BANNED-PATTERNS.md) for full details.

| Pattern | Detection | Fix |
|---------|-----------|-----|
| Hollow emphasis dash | A single `—`/`--` before a phrase that only manufactures drama (no name, list, explanation, or image) | Cut it or use a colon; keep parenthetical pairs and content-bearing closing expansions |
| Performative contrast | "Not X. It is Y." / "Not just X, but Y." | State Y directly; cut the negation |

### CLUTTER

Cut or replace. See [CLUTTER-LIST.md](resources/CLUTTER-LIST.md) for full list.

| Type | Examples |
|------|----------|
| Dead phrases | "As it is well known", "It should be emphasized that" |
| Empty words | very, really, quite, basically, generally, actually |
| Filler transitions | Furthermore, Moreover, In addition, In conclusion |
| Bureaucratic language | aforementioned, herein, utilize, methodology |
| "There is/are" | Rewrite with stronger verb |
| Redundant pairs | each and every, full and complete |

### GRAMMAR

Detect and correct. See [GRAMMAR-CHECKLIST.md](resources/GRAMMAR-CHECKLIST.md) for patterns.

| Issue | Detection | Fix |
|-------|-----------|-----|
| Passive overuse | "was/were [verb]ed by" | Convert to active voice |
| Nominalization | -tion noun + weak verb | Convert back to verb |
| Buried main verb | Subject and verb >10 words apart | Move closer together |
| Negative construction | "not honest", "did not succeed" | Use positive form |
| Data agreement | "data is", "data shows" | "data are", "data show" |
| That vs which | "which" without comma for essential clause | Use "that" for restrictive |
| Non-parallel lists | Mixed grammatical forms | Make all items same form |

### STYLE

Flag and suggest. These are softer recommendations.

| Issue | Detection | Suggestion |
|-------|-----------|------------|
| Uniform sentence length | 3+ consecutive same-length sentences | Vary rhythm |
| Missing hedging | Absolute claims on interpretations | Add "may", "suggests", "appears to" |
| Generic language | Vague descriptors | Be specific |

---

## What NOT to Change

Do not modify:

- Technical terminology (even if complex)
- Author's argument structure and logical flow
- Citation style and formatting
- Mathematical notation and formulas
- Figure and table references
- Domain-specific conventions
- Correct passive voice in methods sections

---

## Hedging Guidelines

**Must hedge**: interpretations, generalizations, causal claims, comparisons

**No hedging needed**: definitions, mathematical identities, verified empirical results

Academic hedging vocabulary:
- Modal verbs: may, might, could, would tend to
- Epistemic adverbs: arguably, presumably, apparently, seemingly
- Qualifying verbs: appears to, seems to, tends to, suggests that
- Scoped claims: in most cases, under these conditions, for the instances tested

---

## Example Output

### Phase 1: Diagnosis

```
## Issues Found

### BANNED
1. [Sentence 2] Hollow emphasis dash: "The result was clear — and everything changed."
2. [Sentence 5] Performative contrast: "This is not a shortcut. It is a deliberate choice."

### CLUTTER
3. [Sentence 1] Dead phrase: "As it is well known"
4. [Sentence 3] Empty word: "very significant"
5. [Sentence 8] Filler transition: "Furthermore,"

### GRAMMAR
6. [Sentence 2] Passive voice: "was conducted by researchers"
7. [Sentence 6] Nominalization: "provide an improvement" → "improve"
8. [Sentence 9] Data agreement: "data is" → "data are"
```

### Phase 2: Minimal Fixes

```
Original: As it is well known, chronic inflammation plays a very significant role in cancer progression.

Edited: ~~As it is well known,~~ **C**hronic inflammation plays a ~~very~~ significant role in cancer progression.

Changes: Removed dead phrase "As it is well known,"; removed empty word "very"
```

---

## Execution Instructions

1. When the user provides text, run Phase 1 first
2. Present the diagnosis and ask if they want to proceed with fixes
3. In Phase 2, apply all fixes and present the edited text
4. If the text is long, process paragraph by paragraph
5. Always explain what was changed and why (briefly)

For detailed patterns and examples, load the relevant resource file:
- [BANNED-PATTERNS.md](resources/BANNED-PATTERNS.md) — em-dash policy (use with care), performative contrast
- [CLUTTER-LIST.md](resources/CLUTTER-LIST.md) — dead phrases, empty words, bureaucratic language
- [GRAMMAR-CHECKLIST.md](resources/GRAMMAR-CHECKLIST.md) — active voice, nominalizations, parallelism
