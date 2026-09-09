# Special Slides

These two patterns are deliberately excluded from the main library because they contain project-specific or one-off content. Copy and adapt manually.

---

## Title slide

A three-zone TikZ overlay: navy top (~62 %), amber gold stripe (~7 %), off-white bottom (~31 %).

```latex
\begin{frame}[plain]
  \begin{tikzpicture}[remember picture, overlay]

    %% ── BACKGROUNDS ─────────────────────────────────────────
    \fill[thBlue] (current page.north west)
        rectangle ([yshift=-0.62\paperheight]current page.north east);
    \fill[thLight] ([yshift=-0.62\paperheight]current page.north west)
        rectangle (current page.south east);
    \fill[thAccent] ([yshift=-0.58\paperheight]current page.north west)
        rectangle ([xshift=\paperwidth, yshift=-0.65\paperheight]current page.north west);

    %% ── INSTITUTION / PROGRAMME ─────────────────────────────
    \node[anchor=north, inner sep=0pt]
      at ([yshift=-0.04\paperheight]current page.north) {%
        \begin{minipage}{0.85\paperwidth}
          \centering
          {\color{white!70!thBlue}\scriptsize ⟨PROGRAMME NAME · INSTITUTION TYPE⟩}\\[0.3em]
          {\color{white!70!thBlue}\footnotesize ⟨Faculty / Department⟩}
        \end{minipage}};

    %% ── LOGO ────────────────────────────────────────────────
    \node[anchor=center, inner sep=0pt]
      at ([yshift=-0.24\paperheight]current page.north) {%
        \includegraphics[width=18mm]{⟨figure/logo.png⟩}};

    %% ── TITLE ───────────────────────────────────────────────
    \node[anchor=north, inner sep=0pt]
      at ([yshift=-0.35\paperheight]current page.north) {%
        \begin{minipage}{0.88\paperwidth}
          \centering
          {\color{white}\Large\bfseries ⟨Title Line 1⟩}\\[0.4em]
          {\color{white}\Large\bfseries ⟨Title Line 2⟩}
        \end{minipage}};

    %% ── AUTHOR — centred on gold stripe ────────────────────
    \node[anchor=center, inner sep=0pt]
      at ([yshift=-0.615\paperheight]current page.north) {%
        {\color{thBlue}\bfseries ⟨Author Name⟩}
        {\color{thGrey}\small$\cdot$ ⟨ID / Cohort⟩}};

    %% ── SUPERVISOR + DATE — light zone ─────────────────────
    \node[anchor=center, inner sep=0pt]
      at ([yshift=0.18\paperheight]current page.south) {%
        \begin{minipage}{0.6\paperwidth}
          \centering
          {\color{thGrey}\small ⟨Supervisor line⟩}\\[5.5em]
          {\color{thGrey}\small ⟨Month Year⟩}
        \end{minipage}};

  \end{tikzpicture}
\end{frame}
```

**Colour zones at a glance:**

| Zone | Colour | Content |
|---|---|---|
| Top 62 % | `thBlue` | Institution, logo, title |
| Stripe 58–65 % | `thAccent` | Author name |
| Bottom 35 % | `thLight` | Supervisor, date |

---

## Appendix multi-frame (`allowframebreaks`)

Deep-dive annex slides that break across multiple Beamer frames automatically. Always place after `\appendix`.

```latex
\begin{frame}[allowframebreaks, label=app⟨Label⟩]{⟨Appendix Section Title⟩}

  %%────────────────────────────────────────────
  %% FRAME 1
  %%────────────────────────────────────────────
  \textbf{⟨Sub-heading for frame 1⟩}

  \vspace{0.3em}
  ⟨Content: equations, itemize, tabularx, etc.⟩

  \vspace{0.4em}
  \begin{flushright}
    \backbtn{⟨targetLabel⟩}{Back to ⟨Slide Name⟩}
  \end{flushright}

\framebreak

  %%────────────────────────────────────────────
  %% FRAME 2
  %%────────────────────────────────────────────
  \textbf{⟨Sub-heading for frame 2⟩}

  \vspace{0.3em}
  ⟨More content⟩

  \begin{flushright}
    \backbtn{⟨targetLabel⟩}{Back to ⟨Slide Name⟩}
  \end{flushright}

\end{frame}
```

**Notes:**
- `\framebreak` manually forces a new physical frame without a new `\begin{frame}`.
- Each physical frame inherits the same `label`; navigation works via `appLabel.1`, `appLabel.2`, etc.
- Back-buttons must appear on every sub-frame — add one `\backbtn` per `\framebreak` block.
- Use `\footnotesize` or `\scriptsize` body text; annex frames are typically denser than main slides.
