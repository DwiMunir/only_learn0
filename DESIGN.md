---
version: alpha
name: Only Learn
description: Research notes behind every @only_learn0 Instagram reel. A mobile-first reading site for Indonesian readers in their twenties, where every research claim is highlighted and tied to a numbered source.
colors:
  primary: "#1F3FAF"
  primary-strong: "#18328C"
  primary-soft: "#E8EDFB"
  on-primary: "#FFFFFF"
  ink: "#1B2430"
  ink-muted: "#5A6472"
  paper: "#FFFFFF"
  surface: "#F2F4F6"
  line: "#DCE1E7"
  highlight: "#FFE066"
  on-highlight: "#1B2430"
  correction: "#A8261C"
  correction-surface: "#FCEDEB"
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.3
  item-title:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.0625rem
    fontWeight: 700
    lineHeight: 1.35
  body-article:
    fontFamily: Literata
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.3
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.4
  footnote:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
components:
  top-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: 56px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 14px
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 14px
    height: 48px
  button-secondary-hover:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
  claim-highlight:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.on-highlight}"
    typography: "{typography.body-article}"
  footnote-marker:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.footnote}"
    rounded: "{rounded.full}"
    size: 20px
  evidence-meter-filled:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
    width: 14px
    height: 6px
  evidence-meter-empty:
    backgroundColor: "{colors.line}"
    rounded: "{rounded.full}"
    width: 14px
    height: 6px
  source-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 16px
  source-sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  meta-text:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption}"
  reel-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.item-title}"
    padding: 12px
  topic-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 8px
    height: 36px
  topic-chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  lead-magnet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  correction-note:
    backgroundColor: "{colors.correction-surface}"
    textColor: "{colors.correction}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 16px
---

## Overview

Document version 1.0, 25 October 2026.

Only Learn is the research companion of the Instagram account @only_learn0. Each viral reel (money, careers, everyday psychology for Indonesians in their twenties) gets one page of notes that shows where every claim comes from. Most visitors arrive from the Instagram bio link on a phone, seconds after watching a reel. The site has two jobs: get them to the notes for that reel in one tap, and make the research visibly real.

The visual idea comes from a student's study notes: black ink on white paper, a blue ballpoint pen for links and actions, a yellow highlighter on the sentences that matter, and a red pen for corrections. The boldness is spent in one place only: the yellow highlighter marks research claims inside article text. Everything around it stays quiet, flat and disciplined.

Voice: Bahasa Indonesia, casual and direct. The reader is "kamu", the author is "aku". Plain verbs, sentence case, no filler. Button text says exactly what happens ("Buka sumber asli", "Ambil kit gratis").

## Colors

- **Ink (#1B2430):** all primary text and headings. A blue-black like pen ink, never pure black.
- **Ink muted (#5A6472):** meta lines, dates, source counts, helper text.
- **Paper (#FFFFFF):** page background.
- **Surface (#F2F4F6):** source cards, the lead-magnet block, inactive chips.
- **Line (#DCE1E7):** 1px dividers between list rows and the empty segments of the evidence meter.
- **Primary, ballpoint blue (#1F3FAF):** links, primary buttons, footnote numbers, filled segments of the evidence meter. Hover uses primary-strong (#18328C).
- **Primary soft (#E8EDFB):** footnote marker circles and secondary button hover.
- **Highlight, yellow highlighter (#FFE066):** only behind research claims in article text. Never on buttons, headings, backgrounds, icons or decoration.
- **Correction, red pen (#A8261C on #FCEDEB):** only for correction notes and the correction log.

## Typography

- **Plus Jakarta Sans** (by the Indonesian foundry Tokotype) for headings, navigation, buttons, labels and meta text. Headlines are ExtraBold (800) with slightly tight tracking so reel hooks read like the reel itself.
- **Literata** only for article paragraphs, at 18px with 1.7 line height, because the notes are meant to be read, not skimmed.
- Article measure: 60 to 68 characters per line.
- Sentence case everywhere. No uppercase labels, no italic or colored single words inside headlines.
- Footnote numbers use Plus Jakarta Sans Bold 12px inside a 20px circle.

## Layout

- Mobile first (360 to 430px wide): single column, 16px side gutters, everything left aligned.
- Spacing on a 4px base: 8px inside components, 16px between related items, 40px between sections, 64px before the footer.
- Lists (reels, articles) are rows separated by 1px line dividers, not cards.
- Article column max width 680px. On desktop (1024px and up) the container is 1080px: a 680px article column plus a 240px right margin for sidenotes, with a 160px gap. Footnotes become sidenotes aligned with their highlighted claim.
- The reel embed is 9:16, full column width on mobile and 360px wide on desktop.

## Elevation & Depth

Flat by default. No shadows on rows, cards, chips or buttons. Only two things lift off the page:
- The source bottom sheet: shadow 0 -8px 24px rgba(27, 36, 48, 0.12), over a 40% ink overlay.
- The sticky top bar gains a 1px line divider at its bottom edge once the page scrolls.

## Shapes

- 4px corners on reel thumbnails.
- 8px corners on buttons, source cards, correction notes and the reel embed.
- 16px corners on the bottom sheet (top corners only) and the lead-magnet block.
- Full pills for topic chips, footnote markers and evidence meter segments.
- The highlighter is a marker stroke, not a box: it covers the lower 70% of the text line height with 2px of horizontal overhang, so it looks drawn over the text.

## Components

- **Top bar:** 56px, white. Wordmark "only learn" in lowercase Plus Jakarta Sans ExtraBold on the left; a text button "Follow" in primary blue on the right linking to Instagram. Inner pages show a back chevron with "Semua catatan" instead of the wordmark.
- **Reel row:** 48x64px vertical video thumbnail on the left; on the right the reel hook as the title (max two lines) and a meta line in ink muted with the topic, then a small document icon and the source count ("4 sumber"). The source count is required on every row; it is the first trust signal.
- **Claim highlight + footnote marker:** a research claim in article text sits on the yellow marker stroke, followed directly by a footnote marker (blue number in a pale blue circle). Every highlight has a marker; every marker matches a numbered source in the "Sumber" list.
- **Source bottom sheet (mobile):** opens when a footnote marker is tapped. Shows "Sumber 1 dari 4", the source title, author or publisher and year, the evidence meter with its label and one helper line, a "Yang didukung sumber ini" sentence, the primary button "Buka sumber asli", and "Dicek" with the check date. The highlighted claim stays visible above the sheet.
- **Sidenote (desktop):** the same content as the sheet, condensed, placed in the right margin next to its claim.
- **Evidence meter:** four 14x6px pill segments; filled segments in primary blue, empty in line grey, followed by a text label. Never rely on color alone: the label is always shown.

| Level | Filled | Label | Use for |
|---|---|---|---|
| 4 | 4 of 4 | Bukti kuat | Meta-analyses and systematic reviews |
| 3 | 3 of 4 | Bukti sedang | A single peer-reviewed study (experiment, cohort, large observational) |
| 2 | 2 of 4 | Data survei | Surveys and institutional reports; show patterns, not causes |
| 1 | 1 of 4 | Masih dugaan | Hypotheses, expert opinion, preliminary findings |

  Laws and regulations (for example PP 35/2021) use an outlined tag "Aturan resmi" instead of the meter.
- **Claim block ("Apa kata riset" section):** the claim sentence, the evidence meter with label below it, then a muted source line. Blocks are separated by line dividers.
- **Source list ("Sumber" section):** numbered to match the footnotes. Each item: title, author or publisher and year, a primary link "Buka sumber asli", and "Dicek 25 Okt 2026" in ink muted.
- **Topic chip:** pill, surface background, ink text; active chip is ink background with white text. Topics: "Uang", "Karier", "Psikologi sehari-hari".
- **Buttons:** primary is ballpoint blue with white text; secondary is white with blue text and a 1px line border. 48px tall, full width on mobile. No arrows or icons appended to button text.
- **Lead magnet:** surface block with a title, one sentence, and a primary button (for example "Kit jawaban interview HRD" with "Ambil kit gratis").
- **Correction note:** red-pen text on the light red surface, with the correction date on its own line. Shown only when a correction exists; otherwise the article ends with one muted line inviting corrections by DM.

## Do's and Don'ts

- Do keep yellow exclusively for highlighted research claims.
- Do pair every highlight with a footnote number, and every footnote with an entry in the source list.
- Do show the source count on every list row and the "Dicek" date on every article.
- Do use real copy in Bahasa Indonesia; reel hooks are used verbatim as titles.
- Do keep text left aligned and readable at 360px width.
- Don't use gradients, glow, stock illustrations, emoji or decorative icons.
- Don't use uppercase labels, eyebrow text above headings, or a single accented word in a headline.
- Don't wrap list items in shadowed cards.
- Don't join meta items with middle dots; space them as separate items.
- Don't use red for anything except corrections.
