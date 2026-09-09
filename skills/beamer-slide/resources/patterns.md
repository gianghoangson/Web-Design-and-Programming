# Slide Pattern Library

Nine reusable frame patterns. Each block is copy-paste ready. Replace `⟨…⟩` placeholders with real content.

**Model slides split three ways.** Sets / parameters / variables go in **Pattern 4** (glossary). Mathematical constraints go in **Pattern 9** (linear list, never a boxed `align`). The problem statement's worded H/S list goes in **Pattern 5**. Do not put dense constraint notation in a `tcolorbox`.

---

## Pattern 1 — Two-column content
*Text + bullet list left, TikZ diagram right. The workhorse.*

```latex
\begin{frame}[label=slide⟨Label⟩]{⟨Frame Title⟩}
  \framesubtitle{⟨Optional subtitle — italic amber⟩}

  \begin{columns}[c]
    \begin{column}{0.62\textwidth}
      \begin{itemize}
        \item ⟨Main point with \textbf{bold key term}⟩
        \item ⟨Second point with \alert{alert text}⟩
        \begin{itemize}
          \item ⟨Sub-point⟩
        \end{itemize}
      \end{itemize}

      \vspace{0.5em}
      \begin{center}
        \begin{dlepbox}[width=9cm]{⟨Callout title⟩}
          \small ⟨Callout body text — a key takeaway or fact.⟩
        \end{dlepbox}
      \end{center}
    \end{column}

    \begin{column}{0.34\textwidth}
      \centering
      \begin{tikzpicture}[
        node distance=0.6cm,
        dbox/.style={draw=thBlue, rounded corners=3pt,
                     minimum width=3.2cm, minimum height=0.7cm,
                     align=center, font=\small, fill=thLight, line width=0.8pt},
        sarr/.style={-{Stealth[length=4pt]}, thick, thBlue!60},
      ]
        \node[dbox] (A) {⟨Node A⟩};
        \node[dbox, below=0.9cm of A] (B) {⟨Node B⟩};
        \node[dbox, below=0.9cm of B] (C) {⟨Node C⟩};
        \draw[sarr] (A) -- (B) node[midway, right, font=\scriptsize, text=thGrey]{⟨edge label⟩};
        \draw[sarr] (B) -- (C) node[midway, right, font=\scriptsize, text=thGrey]{⟨edge label⟩};
      \end{tikzpicture}
    \end{column}
  \end{columns}
\end{frame}
```

---

## Pattern 2 — Two-column info (blocks)
*Two parallel `block` environments side by side. Use for comparisons, challenges, dual concepts.*

```latex
\begin{frame}[label=slide⟨Label⟩]{⟨Frame Title⟩}
  \vspace{0.3em}
  \begin{columns}[T]
    \begin{column}{0.48\textwidth}
      \begin{block}{⟨Block A Title⟩}
        \begin{itemize}
          \item ⟨Point 1⟩
          \item ⟨Point 2 with \alert{alert}⟩
          \item ⟨Point 3⟩
        \end{itemize}
      \end{block}
    \end{column}
    \begin{column}{0.48\textwidth}
      \begin{block}{⟨Block B Title⟩}
        \begin{itemize}
          \item ⟨Point 1⟩
          \item ⟨Point 2⟩
          \item ⟨Point 3⟩
        \end{itemize}
      \end{block}
    \end{column}
  \end{columns}

  \vspace{0.5em}
  \begin{center}
    {\color{thGrey}$\downarrow$}\\[0.3em]
    {\color{thBlue}\bfseries ⟨Synthesis or conclusion sentence.⟩}
  \end{center}
\end{frame}
```

---

## Pattern 3 — Figure slide
*Full-width or large figure, minimal text. For screenshots, charts, output visualisations.*

```latex
\begin{frame}[label=slide⟨Label⟩]{⟨Frame Title⟩}
  \framesubtitle{⟨Optional context note⟩}

  \begin{figure}
    \centering
    \includegraphics[width=\linewidth]{⟨figure/filename.png⟩}
    {\small ⟨Figure caption or source note.⟩}
  \end{figure}
\end{frame}
```
> For a half-width figure alongside a text column, use Pattern 1 and replace the TikZ diagram with `\includegraphics`.

---

## Pattern 4 — Math model slide (sets / parameters / variables)
*`tcolorbox` or two-column glossary: symbol table one side, a compact objective or variable list the other. Use this for the sets/parameters/variables slide. For the model's **constraints**, use Pattern 9 instead — never a boxed `align` of constraints.*

```latex
\begin{frame}[label=slide⟨Label⟩]{⟨Frame Title⟩}

  \begin{columns}[c]
    \begin{column}{0.46\textwidth}
      \begin{tcolorbox}[colframe=thBlue!40, colback=white,
                        arc=4pt, boxrule=0.4pt,
                        top=1mm, bottom=1mm, left=1mm, right=1mm]
        \small
        \textbf{\color{thBlue}⟨Section heading, e.g. Decision Variables:⟩}\\
        ⟨$x_{i} \in \{0,1\}$ — brief description⟩

        \vspace{0.8em}
        \textbf{\color{thBlue}⟨Section heading, e.g. Objective \& Constraints:⟩}
        \vspace{-0.5em}
        \begin{align*}
          \min \quad & ⟨\text{objective expression}⟩ \\[3pt]
          \text{s.t.} \quad
          & ⟨\text{constraint 1}⟩ && \forall\, ⟨\text{index}⟩ \\
          & ⟨\text{constraint 2}⟩ && \forall\, ⟨\text{index}⟩
        \end{align*}
      \end{tcolorbox}
    \end{column}

    \begin{column}{0.50\textwidth}
      \small
      \renewcommand{\arraystretch}{1.6}
      \begin{tabularx}{\linewidth}{@{} l X @{}}
        \toprule
        \textbf{Symbol} & \textbf{Meaning} \\
        \midrule
        $⟨\text{sym}⟩$ & ⟨description⟩ \\
        $⟨\text{sym}⟩$ & ⟨description⟩ \\
        \midrule
        \multicolumn{2}{@{}l}{\textit{⟨Sub-group heading⟩}} \\[2pt]
        $⟨\text{sym}⟩$ & ⟨description⟩ \\
        \bottomrule
      \end{tabularx}

      \vspace{0.6em}
      \begin{block}{\small ⟨Sidebar note title⟩}
        ⟨One or two sentences of context or interpretation.⟩
      \end{block}
    \end{column}
  \end{columns}
\end{frame}
```

---

## Pattern 5 — Constraint table slide (worded H/S list)
*`tabularx` with `\hbadge`/`\sbadge` labels, constraints described in **words**. This is the problem-statement H1–H5 / S1–S8 list, not the model's equations. For the mathematical constraints of a MILP / CP / stage model, use Pattern 9. Split into two columns when there are many.*

```latex
\begin{frame}[label=slide⟨Label⟩]{⟨Frame Title⟩}
  \vspace{0.5em}
  \begin{columns}[T]
    \begin{column}{0.51\textwidth}
      \renewcommand{\arraystretch}{1.4}
      \begin{tabularx}{\linewidth}{@{} l X @{}}
        \multicolumn{2}{@{}l}{\textbf{\large\color{thBlue}⟨Column heading, e.g. Hard Constraints⟩}} \\
        \toprule[1.2pt]
        \hbadge{H1} & ⟨Constraint description⟩ \\
        \hbadge{H2} & ⟨Constraint description⟩ \\
        \hbadge{H3} & ⟨Constraint description⟩ \\
        \bottomrule[1.2pt]
      \end{tabularx}
    \end{column}

    \begin{column}{0.44\textwidth}
      \renewcommand{\arraystretch}{1.4}
      \begin{tabularx}{\linewidth}{@{} l X @{}}
        \multicolumn{2}{@{}l}{\textbf{\large\color{thBlue}⟨Column heading, e.g. Soft Constraints⟩}} \\
        \toprule[1.2pt]
        \sbadge{S1} & ⟨Constraint description⟩ \\
        \sbadge{S2} & ⟨Constraint description⟩ \\
        \bottomrule[1.2pt]
      \end{tabularx}
    \end{column}
  \end{columns}
\end{frame}
```

---

## Pattern 6 — Flowchart slide
*Full-height standalone TikZ flowchart, `resizebox`-scaled. Use for pipelines, algorithms, decision trees.*

```latex
\begin{frame}[label=slide⟨Label⟩]{⟨Frame Title⟩}
  \begin{center}
  \resizebox{!}{0.82\textheight}{%
  \begin{tikzpicture}[
    node distance=0.5cm and 0cm,
    iobox/.style={draw, rounded corners=4pt,
                  minimum width=110mm, minimum height=6mm,
                  align=center, font=\small, line width=1pt,
                  fill=gray!10, draw=gray!60},
    stagebox/.style={draw, rounded corners=5pt,
                     minimum width=110mm, align=center,
                     font=\small\bfseries, line width=1.2pt,
                     inner sep=6pt, minimum height=7mm},
    arr/.style={-{Stealth[length=7pt]}, thick},
    dasharr/.style={-{Stealth[length=5pt]}, thick, dashed, gray},
  ]
    \node[iobox] (input) {⟨Input description⟩};

    \node[stagebox, fill=blue!5, draw=blue!60, below=0.9cm of input]
      (s1) {⟨Stage 1 name⟩\\\normalfont\small ⟨Stage 1 detail⟩};

    \node[stagebox, fill=orange!5, draw=orange!60, below=0.8cm of s1]
      (s2) {⟨Stage 2 name⟩\\\normalfont\small ⟨Stage 2 detail⟩};

    \node[stagebox, fill=purple!5, draw=purple!60, below=0.8cm of s2]
      (s3) {⟨Stage 3 name⟩\\\normalfont\small ⟨Stage 3 detail⟩};

    \node[iobox, below=0.5cm of s3] (output) {⟨Output description⟩};

    \draw[arr] (input) -- (s1);
    \draw[arr] (s1)    -- node[right=0.15cm, font=\scriptsize]{⟨edge label⟩} (s2);
    \draw[arr] (s2)    -- node[right=0.15cm, font=\scriptsize]{⟨edge label⟩} (s3);
    \draw[arr] (s3)    -- (output);
  \end{tikzpicture}%
  }
  \end{center}
\end{frame}
```

---

## Pattern 7 — Outline slide
*Horizontal act-nodes with arrows. Use for the opening roadmap of any multi-section talk.*

```latex
\begin{frame}{⟨Outline title, e.g. The Outline⟩}
  \centering
  \begin{tikzpicture}
    \node[act=thAccent, text width=3cm, minimum height=1.8cm] (a1) at (0,0)
      {{\bfseries\textcolor{thAccent}{⟨Act I⟩}}\\[3pt]⟨Topic⟩\\{\scriptsize\textcolor{thGrey}{⟨Subtitle⟩}}};

    \node[act=thOrange, text width=3.1cm, minimum height=1.8cm, right=0.6cm of a1] (a2)
      {{\bfseries\textcolor{thOrange}{⟨Act II⟩}}\\[3pt]⟨Topic⟩\\{\scriptsize\textcolor{thGrey}{⟨Subtitle⟩}}};

    \node[act=thBlue, text width=3.1cm, minimum height=1.8cm, right=0.6cm of a2] (a3)
      {{\bfseries\textcolor{thBlue}{⟨Act III⟩}}\\[3pt]⟨Topic⟩\\{\scriptsize\textcolor{thGrey}{⟨Subtitle⟩}}};

    \node[act=thGreen, text width=3.1cm, minimum height=1.8cm, right=0.6cm of a3] (a4)
      {{\bfseries\textcolor{thGreen!70!black}{⟨Act IV⟩}}\\[3pt]⟨Topic⟩\\{\scriptsize\textcolor{thGrey}{⟨Subtitle⟩}}};

    \draw[arr] (a1) -- (a2);
    \draw[arr] (a2) -- (a3);
    \draw[arr] (a3) -- (a4);
  \end{tikzpicture}

  \vspace{1.2em}
  \small ⟨Optional one-liner summary of the talk.⟩
\end{frame}
```

---

## Pattern 8 — Results / data table slide
*Dense `tabularx` with numeric data. Use for experiment results, benchmark tables, parameter summaries.*

```latex
\begin{frame}[label=slide⟨Label⟩]{⟨Frame Title⟩}
  \framesubtitle{⟨Optional subtitle⟩}

  \vspace{0.3em}
  \small
  \renewcommand{\arraystretch}{1.4}
  \begin{tabularx}{\linewidth}{@{} l ⟨X X X⟩ @{}}   %% adjust column spec as needed
    \toprule
    \textbf{⟨Col 1⟩} & \textbf{⟨Col 2⟩} & \textbf{⟨Col 3⟩} & \textbf{⟨Col 4⟩} \\
    \midrule
    ⟨row data⟩ & ⟨val⟩ & ⟨val⟩ & ⟨val⟩ \\
    ⟨row data⟩ & ⟨val⟩ & \textbf{⟨best val⟩} & ⟨val⟩ \\
    \midrule
    \multicolumn{4}{@{}l}{\textit{⟨Sub-group label⟩}} \\[2pt]
    ⟨row data⟩ & ⟨val⟩ & ⟨val⟩ & ⟨val⟩ \\
    \bottomrule
  \end{tabularx}

  \vspace{0.5em}
  \begin{dlepbox}[width=\linewidth]{⟨Key takeaway⟩}
    \small ⟨One sentence interpreting the most important result.⟩
  \end{dlepbox}
\end{frame}
```

---

## Pattern 9 — Linear constraint list
*The default for any slide stating a model's constraints (MILP, CP, pipeline stage). Explanation left, constraint middle, number right; one logical constraint per row; wide row gaps; no `tcolorbox`. This replaces the old habit of boxing an `align` — dense notation in a box reads badly. Sets/params/vars stay in Pattern 4; the objective goes in the unboxed display at the bottom of this pattern.*

```latex
\begin{frame}[label=slide⟨Label⟩]{⟨Model⟩ --- ⟨constraint group⟩}
  \framesubtitle{⟨Optional: the single constraint worth flagging up front, e.g. ``(2) is the facet form of H2''⟩}

  \vspace{0.2em}
  \scriptsize
  \renewcommand{\arraystretch}{1.7}   %% 1.5–1.9: the notation is heavy, give it air
  \begin{tabularx}{\linewidth}{@{} >{\raggedright\arraybackslash}X l r @{}}
    \toprule
    \hbadge{H1} ⟨plain-English explanation, one clause⟩ & $\textstyle\sum_{t} x_{i,t}=1 \quad \forall i$ & (1) \\
    ⟨paired sub-constraints share a row and a number range⟩ & $\textstyle\sum_{r} X_{ir}^{R}\ge 1,\ \le 1 \quad \forall i$ & (11--12) \\
    ⟨fold a wide $\forall$-side-clause into this explanation⟩ & $\delta_{d,\rho,t}=1 \Rightarrow A_{d,\rho,t}\ge M_{\rho,t}\wedge A_{d',\rho,t}\le M_{\rho,t}{-}1$ & (9) \\
    \hbadge{H5} ⟨explanation⟩ & $p_{d,t}=\textstyle\sum_{\rho}\delta_{d,\rho,t}\le H$ & (11) \\
    \bottomrule
  \end{tabularx}

  \vspace{0.5em}
  {\scriptsize\color{thGrey} ⟨Optional grey note: fold auxiliary reifications / envelopes here on dense slides.⟩}
\end{frame}
```

**Column spec is deliberate.** `{X l r}` = explanation (`X`, stretches to fill), constraint (`l`, natural width), number (`r`). `tabularx` sizes `X` to whatever the math and number leave, so each explanation auto-aligns to its row. If the math cell is so wide it starves `X`, that is the cue to move a clause into the explanation (see the `∀ d'` row above).

**Rules baked in:**
- One *logical* constraint per row. A `≥1`/`≤1` pair is one row with a range number `(11--12)`.
- The `∀` quantifier lives inline in the math cell, never a fourth column.
- H/S badges (`\hbadge{H5}`, `\sbadge{S1}`) start the explanation cell.
- Keep `\scriptsize`; do not shrink further. If it will not fit, group (below) or split across two slide columns, each its own `{X l r}` table.

**Dense-slide variant — one headline constraint per term.** When a soft block has 10+ envelope/reification lines, show only the *penalised quantity* for each term and sweep the auxiliaries into one grey note:

```latex
  \begin{tabularx}{\linewidth}{@{} >{\raggedright\arraybackslash}X l r @{}}
    \toprule
    \sbadge{S8} Room mixing two or more departments & $\mathrm{cross}_{\rho,t}\ge\textstyle\sum_{d}\mathrm{pres}_{d,\rho,t}-1$ & (13) \\
    \sbadge{S3} A department's first-to-last day span & $\mathrm{span}_d = \mathrm{en}^{D}_d-\mathrm{st}^{D}_d$ & (16--17) \\
    \sbadge{S6} Per-student first-to-last day (travel) & $\mathrm{travel}_s\ge\mathrm{last}_s-\mathrm{first}_s$ & (22--23) \\
    \bottomrule
  \end{tabularx}
  \vspace{0.5em}
  {\scriptsize\color{thGrey} Each term self-clamps: an envelope ($\mathrm{pres}$, $\mathrm{act}$, $\mathrm{last}/\mathrm{first}$) plus a $\ge$-difference that is zero when inactive. The auxiliary rows (12), (15), (20) build those envelopes.}
```

**The objective is not a constraint.** Show it unboxed, as a labelled display, breaking long sums across lines:

```latex
  {\scriptsize\textbf{\color{thBlue}Objective} \hfill {\color{thGrey}(24)}}
  \vspace{-0.2em}
  \[
  \begin{aligned}
    \min\ & w_1\!\textstyle\sum\!\mathrm{spread} + w_2\!\textstyle\sum\!\mathrm{gap} + w_3\!\textstyle\sum\!\mathrm{span} \\
          &+ w_4\!\textstyle\sum\!\mathrm{short} + w_5\!\textstyle\sum\!\mathrm{cross} + w_6\!\textstyle\sum_{s}\!\mathrm{travel}_s
  \end{aligned}
  \]
```

---

## Notes on mixing patterns

- **Flowchart + blocks:** put a compact block or `dlepbox` below a smaller flowchart instead of `resizebox`-scaling to full height.
- **Math + figure:** use Pattern 4 and replace the `tabularx` column with an `\includegraphics`.
- **Navigation buttons:** add `\jumpbtn` / `\backbtn` in `\begin{flushright}…\end{flushright}` at the frame bottom for any slide that is a deep-dive target.
- **Callout titles:** a `dlepbox`/`block` title states its content, never a mood (see SKILL.md → Tone and register). "Relaxation cost", not "The price tag".
- **Coupling / cascade example:** when a slide asserts an abstract relationship ("X couples Y and Z", "this is the central challenge"), replace the sentence with a small horizontal cascade of `th*`-coloured nodes joined by arrows, plus a dashed feedback arrow if the relationship loops. One worked example (e.g. pick a slot → exams co-occur → room mixes → dominant dept → proctor count vs cap) beats the abstract claim and costs one `\resizebox`ed `tikzpicture`.
- **Examples over notation:** on problem/context slides write "at most 10 rooms (cap $H$, HN)", not "at most $H$ rooms". Number first, symbol in parentheses. Model slides keep bare symbols.
