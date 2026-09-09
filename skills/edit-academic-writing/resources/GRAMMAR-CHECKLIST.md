# Grammar Checklist

Detect and correct these grammar and structure issues.

---

## 1. Passive Voice Overuse

**Rule**: Use active voice by default. Reserve passive for methods sections or when the actor is unknown/unimportant.

### Detection

- "was/were [verb]ed by"
- "has/have been [verb]ed"
- "is/are [verb]ed"
- "it was found that"
- "it was concluded that"
- "it has been shown that"

### Conversion

Ask: "WHO does what to whom?" Then rewrite with the actor as subject.

| Passive | Active |
|---------|--------|
| A recommendation was made by the committee that the study be halted. | The committee recommended halting the study. |
| It was concluded by the editors that the data had been falsified by the authors. | The editors concluded the authors falsified their data. |
| Major differences in reaction times were found. | We found major differences in reaction times. |
| The first snapshot has been taken by NASA's Hubble. | NASA's Hubble has taken the first snapshot. |

### When Passive Is Acceptable

- **Methods section**: "Samples were centrifuged at 3000 rpm." (Actor is obvious)
- **Unknown actor**: "The manuscript was lost in the fire."
- **Deliberate de-emphasis**: When the action matters more than the actor

---

## 2. Nominalizations

**Rule**: Don't turn verbs into nouns. Convert back to verb form.

### Detection

Look for -tion, -ment, -ance, -ence nouns paired with weak verbs:
- "perform an analysis" → analyze
- "make a decision" → decide
- "provide an improvement" → improve
- "give consideration to" → consider

### Common Nominalizations

| Nominalized | Better |
|-------------|--------|
| obtain estimates of | estimate |
| has seen an expansion in | expanded |
| provides a methodologic emphasis | emphasizes methodology |
| offer confirmation of | confirm |
| make a decision | decide |
| perform an analysis | analyze |
| provide an improvement | improve |
| provide a description of | describe |
| give consideration to | consider |
| make an adjustment | adjust |
| reach a conclusion | conclude |
| have a discussion | discuss |

### Examples

```
BAD:  We performed an analysis of the data.
GOOD: We analyzed the data.

BAD:  The method provides an improvement in accuracy.
GOOD: The method improves accuracy.

BAD:  During DNA damage, recognition of H3K4me3 by ING2 results in recruitment of Sin3/HDAC.
GOOD: During DNA damage, H3K4me3 recruits ING2 and Sin3/HDAC.
```

---

## 3. Buried Main Verbs

**Rule**: Keep subject and main verb close together. Don't let more than 10 words separate them.

### Detection

Long modifying phrases between subject and verb. The reader loses track of the sentence structure.

### Fix Strategy

1. Identify the subject and main verb
2. Move them closer together
3. Push modifiers after the verb or into a separate clause

### Examples

```
BAD:  One study of 500 patients across 12 hospitals over a three-year period found...
GOOD: One study found that among 500 patients across 12 hospitals over three years...

BAD:  Dysregulation of physiologic microRNA activity has been shown to play an important role in cancer.
GOOD: MicroRNA dysregulation plays a role in cancer.
```

**Exception**: With dashes, you may violate this rule because the dash clearly marks the interruption and the verb appears immediately after.

---

## 4. "Data" Agreement

**Rule**: "Data" is plural. Use plural verb forms.

| Wrong | Correct |
|-------|---------|
| data is | data are |
| data shows | data show |
| data indicates | data indicate |
| data suggests | data suggest |
| data was | data were |
| data has | data have |

### Examples

```
BAD:  The data shows a clear trend.
GOOD: The data show a clear trend.

BAD:  Our data indicates that X causes Y.
GOOD: Our data indicate that X causes Y.
```

---

## 5. That vs. Which

**Rule**:
- "That" is restrictive (essential, no comma)
- "Which" is non-restrictive (non-essential, with comma)

### Test

Remove the clause. If the sentence loses essential meaning, use "that" (no comma). If the sentence remains complete, use "which" (with comma).

### Examples

```
The vial that contained her RNA was lost.
[Identifies WHICH vial of many — essential]

The vial, which contained her RNA, was lost.
[Only one vial exists — additional info, non-essential]

The algorithm that runs fastest wins.
[Essential: specifies which algorithm]

The GRASP algorithm, which runs in O(n²), outperforms competitors.
[Non-essential: adds info about only algorithm mentioned]
```

### Common Error

Using "which" without a comma for restrictive clauses:
```
BAD:  The method which we propose achieves high accuracy.
GOOD: The method that we propose achieves high accuracy.
```

---

## 6. Parallelism

**Rule**: Items joined by "and", "or", or "but" must have the same grammatical structure. Lists must use consistent forms.

### Detection

Mixed forms in lists:
- Mixing nouns and verbs
- Mixing -ing and infinitive forms
- Mixing active and passive

### Fix

Choose one grammatical form and apply it consistently.

### Examples

```
BAD:  The method involves (1) collecting data, (2) analysis, and (3) to report findings.
GOOD: The method involves (1) collecting data, (2) analyzing results, and (3) reporting findings.

BAD:  If you want to be a good researcher, you must study hard, critically think about literature, and you should be a good listener.
GOOD: If you want to be a good researcher, you must study hard, think critically, and listen well.

BAD:  Establishing instruments, pattern measurement, developing interventions, and the dissemination of results.
GOOD: Establishing instruments, measuring patterns, developing interventions, and disseminating results.
```

---

## 7. Affect vs. Effect

**Rule**:
- **Affect** = verb (to influence)
- **Effect** = noun (the result)

| Wrong | Correct |
|-------|---------|
| The treatment had a large affect. | The treatment had a large effect. |
| The drug effects blood pressure. | The drug affects blood pressure. |

### Memory Aid

- **A**ffect = **A**ction (verb)
- **E**ffect = **E**nd result (noun)

---

## 8. Compare To vs. Compare With

**Rule**:
- **Compare to** = point out similarities between different things
- **Compare with** = point out differences between similar things

### Examples

```
Scientists compared the new method to existing approaches.
[Showing similarity: both are methods]

We compared the 2023 results with the 2022 results.
[Showing differences between similar measurements]
```

---

## 9. Singular Antecedents

**Rule**: Don't use "they/their" with singular subjects. Convert to plural to avoid gender issues.

### Examples

```
BAD:  Each student worries about their grade.
GOOD: All students worry about their grades.

BAD:  The researcher must cite their sources.
GOOD: Researchers must cite their sources.
```

---

## 10. Sentence Rhythm

**Rule**: Vary sentence length. Uniform medium-length sentences flatten the prose.

### Detection

Three or more consecutive sentences of similar length (all 15-25 words, or all 8-12 words).

### Fix

Alternate between short sentences (8-12 words) that land with impact and longer sentences (20-30 words) that build and accumulate.

### The Hemingway Principle

Short sentences punch. Long ones develop. Mix them.

```
BAD:  The algorithm converges quickly. It requires minimal memory. The results are reproducible. The implementation is straightforward.

GOOD: The algorithm converges quickly and requires minimal memory. The results are reproducible. Implementation is straightforward, making deployment practical even in resource-constrained environments.
```

---

## 11. Hedging for Interpretive Claims

**Rule**: Hedge interpretations, generalizations, and causal claims. Don't hedge definitions or verified results.

### What Needs Hedging

- Interpretations of results
- Generalizations beyond the data
- Causal claims
- Comparisons with implicit value judgments
- Predictions

### Hedging Vocabulary

| Type | Examples |
|------|----------|
| Modal verbs | may, might, could, would tend to |
| Epistemic adverbs | arguably, presumably, apparently, seemingly |
| Qualifying verbs | appears to, seems to, tends to, suggests that |
| Scoped claims | in most cases, under these conditions, for the instances tested |
| Attribution | the evidence suggests, the results indicate, this may imply |

### Examples

```
BAD:  This proves that X causes Y.
GOOD: This suggests that X may cause Y.

BAD:  The method is superior to all alternatives.
GOOD: The method appears to outperform the tested alternatives.

OK (no hedge needed): The algorithm runs in O(n log n) time.
[Verified mathematical fact]
```
