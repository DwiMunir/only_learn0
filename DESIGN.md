---
version: alpha
name: Only Learn
description: Research notes behind every @only_learn0 Instagram reel. A mobile-first reading site for Indonesian readers in their twenties, where every research claim is highlighted and tied to a numbered source.
colors:
  primary: "#0E314D"
  primary-strong: "#0A2539"
  primary-soft: "#E3F1F5"
  accent: "#2F6B8D"
  brand-teal: "#3B87A6"
  brand-cyan: "#ADDFE5"
  on-primary: "#FFFFFF"
  on-dark: "#CFE3EA"
  ink: "#14283A"
  ink-muted: "#5B6B78"
  paper: "#FFFFFF"
  surface: "#F1F7F9"
  line: "#E3EBF0"
  meter-empty: "#C3D6DE"
  highlight: "#FFE066"
  on-highlight: "#14283A"
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
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.footnote}"
    rounded: "{rounded.full}"
    size: 20px
  evidence-meter-filled:
    backgroundColor: "{colors.brand-teal}"
    rounded: "{rounded.full}"
    width: 14px
    height: 6px
  evidence-meter-empty:
    backgroundColor: "{colors.meter-empty}"
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
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 8px
    height: 36px
  topic-chip-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  glass-hero:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.lg}"
    padding: 24px
  footer:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark}"
    typography: "{typography.caption}"
    padding: 40px
  link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
  poster-fallback:
    backgroundColor: "{colors.brand-cyan}"
    rounded: "{rounded.lg}"
  divider:
    backgroundColor: "{colors.line}"
    height: 1px
  correction-note:
    backgroundColor: "{colors.correction-surface}"
    textColor: "{colors.correction}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 16px
---

## Overview

Document version 2.0, 26 October 2026.

Only Learn is the research companion of the Instagram account @only_learn0. Each viral reel (money, careers, everyday psychology for Indonesians in their twenties) gets one page of notes that shows where every claim comes from. Most visitors arrive from the Instagram bio link on a phone, seconds after watching a reel. The site has two jobs: get them to the notes for that reel in one tap, and make the research visibly real.

The visual idea is a clean research lab drawn from the logo: deep navy for action and structure, a teal and cyan family for the brand mark and the evidence meter, white paper for reading, and a frosted glass hero at the top of every page. The yellow highlighter on research claims inside article text stays the single loudest mark on the page. Everything else stays calm and flat; the only soft depth is the glass card in the hero.

Voice: Bahasa Indonesia, casual and direct. The reader is "kamu", the author is "aku". Plain verbs, sentence case, no filler. Button text says exactly what happens ("Buka sumber asli", "Follow @only_learn0").

## Colors

Palette taken from the logo.

- **Ink (#14283A):** all primary text and headings. A deep blue-black, never pure black.
- **Ink muted (#5B6B78):** meta lines, dates, source counts, helper text.
- **Paper (#FFFFFF):** page background.
- **Surface (#F1F7F9):** source cards and neutral blocks.
- **Line (#E3EBF0):** 1px dividers between list rows and borders of pills and boxes.
- **Meter empty (#C3D6DE):** the empty segments of the evidence meter, darker than line so they stay visible on white.
- **Primary, navy (#0E314D):** primary buttons, footnote markers (white number on navy), the active topic chip, the footer. Hover uses primary-strong (#0A2539).
- **Primary soft (#E3F1F5):** inactive topic chips, the secondary button hover, the source-jump flash.
- **Accent (#2F6B8D):** links and small accent text such as the back link and "Buka sumber asli".
- **Brand teal (#3B87A6):** never text except the "Learn" wordmark. Besides the wordmark and the meter it appears only as decoration (the hero circle, the poster fallback tile, the OG image). Contrast on white is about 4.0:1.
- **Brand cyan (#ADDFE5):** the top-left decorative circle in the hero and the start of the poster fallback gradient.
- **On dark (#CFE3EA):** secondary text on the navy footer.
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

## Elevation & Depth

Flat by default. No shadows on rows, cards, chips or buttons. Gradients appear only in the hero background (#E3F3F6 to #F5FAFB with two decorative circles) and in the poster fallback (brand cyan to brand teal). Only two things lift off the page:
- The hero glass card: 0 8px 24px rgba(14, 49, 77, 0.08), white at 55% with a 14px backdrop blur.
- The source bottom sheet: shadow 0 -8px 24px rgba(14, 49, 77, 0.12), over a 40% ink overlay.

The sticky top bar always has a 1px line divider at its bottom edge.

## Shapes

- 12px corners on reel thumbnails.
- 8px corners on buttons, source cards and correction notes.
- 22px on the hero block and 18px on the glass card.
- 16px (`rounded-2xl`) on boxes such as the summary, empty states and the method boxes, and on the bottom sheet (top corners only).
- Full pills for topic chips, the Follow button, footnote markers and evidence meter segments.
- The highlighter is a marker stroke, not a box: it covers the lower 70% of the text line height with 2px of horizontal overhang, so it looks drawn over the text.

## Components

- **Top bar:** 56px, white. The logo mark plus "Only Learn" in sentence case on the left ("Only" in primary, "Learn" in brand teal, Plus Jakarta Sans ExtraBold); the wordmark is always shown. On the right a "Follow" pill (`text-primary`, line border) linking to Instagram, or on inner pages a back link in accent.
- **Reel row:** 54x76px vertical video thumbnail on the left; on the right the reel hook as the title (max two lines) and a meta line in ink muted with the topic, then a small document icon and the source count ("4 sumber"). The source count is required on every row; it is the first trust signal.
- **Claim highlight + footnote marker:** a research claim in article text sits on the yellow marker stroke, followed directly by a footnote marker (white number in a navy circle). Every highlight has a marker; every marker matches a numbered source in the "Sumber" list.
- **Source bottom sheet (mobile):** opens when a footnote marker is tapped. Shows "Sumber 1 dari 4", the source title, author or publisher and year, the evidence meter with its label and one helper line, a "Yang didukung sumber ini" sentence, the primary button "Buka sumber asli", and "Dicek" with the check date. The highlighted claim stays visible above the sheet.
- **Sidenote (desktop):** the same content as the sheet, condensed, placed in the right margin next to its claim.
- **Evidence meter:** four 14x6px pill segments; filled segments in brand teal, empty in meter-empty grey-blue, followed by a text label. Never rely on color alone: the label is always shown.

| Level | Filled | Label | Use for |
|---|---|---|---|
| 4 | 4 of 4 | Bukti kuat | Meta-analyses and systematic reviews |
| 3 | 3 of 4 | Bukti sedang | A single peer-reviewed study (experiment, cohort, large observational) |
| 2 | 2 of 4 | Data survei | Surveys and institutional reports; show patterns, not causes |
| 1 | 1 of 4 | Masih dugaan | Hypotheses, expert opinion, preliminary findings |

  Laws and regulations (for example PP 35/2021) use an outlined tag "Aturan resmi" instead of the meter.
- **Claim block ("Apa kata riset" section):** the claim sentence, the evidence meter with label below it, then a muted source line. Blocks are separated by line dividers.
- **Source list ("Sumber" section):** numbered to match the footnotes. Each item: title, author or publisher and year, an accent link "Buka sumber asli", and "Dicek 25 Okt 2026" in ink muted.
- **Topic chip:** pill, primary-soft background, ink text; active chip is navy (primary) background with white text. Topics: "Uang", "Karier", "Psikologi sehari-hari".
- **Buttons:** primary is navy with white text; secondary is white with navy text and a 1px line border. 48px tall, full width on mobile. No arrows or icons appended to button text.
- **Glass hero:** every page opens with a hero: a rounded block on a pale teal gradient (#E3F3F6 to #F5FAFB) with two static decorative circles (brand cyan at top-left, brand teal at 55% opacity at bottom-right), holding one frosted glass card (white at 55% opacity, 14px backdrop blur, 1px white border). The card holds the topic chip, the title and the meta line. It falls back to 85% white where backdrop blur is unsupported.
- **Footer:** navy (primary) block with the Wordmark on a white badge, links in paper (white), and the tagline and copyright in on-dark. No newsletter or lead-magnet block.
- **Correction note:** red-pen text on the light red surface, with the correction date on its own line. Shown only when a correction exists; otherwise the article ends with one muted line inviting corrections by DM.

## Do's and Don'ts

- Do keep yellow exclusively for highlighted research claims.
- Do keep brand teal to the "Learn" wordmark and the filled meter segments (plus decoration); use accent for links and small text.
- Do pair every highlight with a footnote number, and every footnote with an entry in the source list.
- Do show the source count on every list row and the "Dicek" date on every article.
- Do use real copy in Bahasa Indonesia; reel hooks are used verbatim as titles.
- Do keep text left aligned and readable at 360px width.
- Don't use gradients outside the hero background and the poster fallback, and no glow, stock illustrations, emoji or decorative icons.
- Don't put shadows anywhere except the hero glass card and the source sheet.
- Don't use uppercase labels, eyebrow text above headings, or a single accented word in a headline.
- Don't wrap list items in shadowed cards.
- Don't join meta items with middle dots; space them as separate items.
- Don't use red for anything except corrections.
- Don't add a lead magnet or free-kit block anywhere.
