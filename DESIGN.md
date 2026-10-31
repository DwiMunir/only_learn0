---
version: alpha
name: Only Learn
description: Research notes behind every @only_learn0 Instagram reel. A mobile-first magazine-style reading site for Indonesian readers in their twenties, where every research claim is highlighted and tied to a numbered source.
colors:
  primary: "#2563EB"
  primary-strong: "#1D4ED8"
  primary-soft: "#E8F0FE"
  on-primary: "#FFFFFF"
  navy: "#131B3A"
  on-navy: "#D5DBF2"
  on-dark: "#D5DBF2"
  ink: "#1E2440"
  ink-muted: "#5E6582"
  paper: "#FFFFFF"
  surface: "#F6F7FB"
  line: "#E7E9F2"
  hero-peach: "#FDE8D7"
  hero-lavender: "#EEE6FB"
  hero-sky: "#DCEAFE"
  hero-pink: "#F9E0EC"
  scribble: "#F5C542"
  tag-psikologi-bg: "#EFE9FC"
  tag-psikologi-fg: "#6B46C1"
  tag-uang-bg: "#E3F6EA"
  tag-uang-fg: "#1E7A4C"
  tag-karier-bg: "#E6EEFF"
  tag-karier-fg: "#1F4FBF"
  meter-filled: "#2563EB"
  meter-empty: "#C9D3EA"
  highlight: "#FFE066"
  on-highlight: "#1E2440"
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
  xl: 24px
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
    height: 64px
  nav-pill-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 8px
    height: 36px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 14px
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 14px
    height: 44px
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
    backgroundColor: "{colors.meter-filled}"
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
    rounded: "{rounded.lg}"
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
  article-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.item-title}"
    rounded: "{rounded.xl}"
    padding: 12px
  topic-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 8px
    height: 40px
  topic-chip-active:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-primary}"
  tag-psikologi:
    backgroundColor: "{colors.tag-psikologi-bg}"
    textColor: "{colors.tag-psikologi-fg}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 4px
  tag-uang:
    backgroundColor: "{colors.tag-uang-bg}"
    textColor: "{colors.tag-uang-fg}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 4px
  tag-karier:
    backgroundColor: "{colors.tag-karier-bg}"
    textColor: "{colors.tag-karier-fg}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 4px
  hero:
    backgroundColor: "{colors.hero-lavender}"
    textColor: "{colors.navy}"
    typography: "{typography.display}"
    padding: 40px
  hero-wave-peach:
    backgroundColor: "{colors.hero-peach}"
  hero-wave-sky:
    backgroundColor: "{colors.hero-sky}"
  hero-wave-pink:
    backgroundColor: "{colors.hero-pink}"
  scribble-underline:
    backgroundColor: "{colors.scribble}"
    rounded: "{rounded.full}"
    height: 4px
  subscribe-card:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-navy}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: 24px
  footer:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-dark}"
    typography: "{typography.caption}"
    padding: 40px
  link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
  poster-fallback:
    backgroundColor: "{colors.hero-lavender}"
    textColor: "{colors.navy}"
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

Document version 3.0, 31 October 2026. Visual reference: `design/referensi/redesign-v3.jpg`.

Only Learn is the research companion of the Instagram account @only_learn0. Each viral reel (money, careers, everyday psychology for Indonesians in their twenties) gets one page of notes that shows where every claim comes from. Most visitors arrive from the Instagram bio link on a phone, seconds after watching a reel. The site has two jobs: get them to the notes for that reel in one tap, and make the research visibly real.

The visual idea is a lively magazine or insight blog: a pastel wavy hero with a 3D illustration, articles as rounded cards with pictures, and a sidebar with the email card and popular categories. Blue (primary) carries action, deep navy carries structure and weight, white cards sit on a pale grey-blue page. The yellow highlighter on research claims stays the single loudest mark inside article text, and the trust signals (highlight, footnote number, evidence meter with label, "Dicek" date, source count) stay on every page.

Voice: Bahasa Indonesia, casual and direct. The reader is "kamu", the author is "aku". Plain verbs, sentence case, no filler. The only English label is the hero badge "Blog & Insight". Button text says exactly what happens ("Buka sumber asli", "Follow").

## Colors

Palette taken from the reference image.

- **Primary, blue (#2563EB):** the Follow and send buttons, the active nav pill, footnote markers, primary links (5.2:1 on white). Hover uses primary-strong (#1D4ED8).
- **Primary soft (#E8F0FE):** soft blue backgrounds, secondary button hover, the source-jump flash.
- **Navy (#131B3A):** the first headline line, the active "Semua" chip, the email subscribe card and the footer. On navy, text uses on-navy / on-dark (#D5DBF2).
- **Ink (#1E2440):** all primary text. **Ink muted (#5E6582):** meta lines, dates, source counts (5.6:1 on white).
- **Paper (#FFFFFF):** cards. **Surface (#F6F7FB):** the page background and source cards. **Line (#E7E9F2):** card borders and dividers.
- **Hero pastels (peach #FDE8D7, lavender #EEE6FB, sky #DCEAFE, pink #F9E0EC):** only for the hero gradient, its waves and the card placeholder tile.
- **Scribble (#F5C542):** the hand-drawn underline under "reel." in the hero. Decoration only, never text.
- **Topic tags:** Psikologi sehari-hari #6B46C1 on #EFE9FC, Uang #1E7A4C on #E3F6EA, Karier #1F4FBF on #E6EEFF. Each pair is checked for at least 4.5:1.
- **Meter:** filled #2563EB, empty #C9D3EA (darker than line so empty segments stay visible on white).
- **Highlight, yellow highlighter (#FFE066):** only behind research claims in article text (`mark.klaim`). Never on buttons, headings, backgrounds, icons or decoration.
- **Correction, red pen (#A8261C on #FCEDEB):** only for correction notes and the correction log.

## Typography

- **Plus Jakarta Sans** for headings, navigation, buttons, labels and meta text. Headlines are ExtraBold (800) with slightly tight tracking.
- **Literata** only for article paragraphs, 18px with 1.7 line height.
- Article measure: 60 to 68 characters per line.
- Sentence case everywhere. No uppercase labels or eyebrow text.
- Footnote numbers use Plus Jakarta Sans Bold 12px inside a 20px circle.
- The hero headline is two lines: line one navy, line two primary blue, with the scribble under its last word.

## Layout

- Mobile first (360 to 430px wide): single column, 16px side gutters. The topic menu in the header is a horizontally scrollable row of pills, the hero illustration shrinks above the title, article cards stack with the picture on top, and the sidebar moves below the list.
- Desktop (1024px and up): list column plus a sidebar of about 340px, inside a container of about 1180px.
- Spacing on a 4px base: 8px inside components, 16px between related items, 40px between sections, 64px before the footer.
- Article page: column max width 680px with a right margin for sidenotes on desktop (footnotes become sidenotes aligned with their claim).

## Elevation & Depth

Soft and light. Article cards and the sidebar cards have a hairline line border and a very soft shadow (0 2px 12px rgba(19, 27, 58, 0.06)). Gradients appear in the hero (peach, lavender and sky with wavy edges) and the card placeholder tile. The subscribe card is navy with its mountain illustration blended in by a CSS mask. The source bottom sheet keeps a shadow of 0 -8px 24px rgba(19, 27, 58, 0.12) over a 40% navy overlay. The sticky top bar has a 1px line divider at its bottom edge.

## Shapes

- 24px corners on the subscribe card and the sidebar cards (`rounded-3xl`).
- 16px on article cards (`rounded-2xl`), thumbnails, source cards and the bottom sheet (top corners only).
- 8px on correction notes.
- Full pills for nav items, topic chips, tags, buttons, the search box, footnote markers and meter segments.
- The highlighter is a marker stroke, not a box: it covers the lower 70% of the text line height with 2px of horizontal overhang.

## Components

- **Top bar:** 64px, white. The OL logo (original teal file) plus "Only Learn" in navy on the left; topic links in the middle with the current topic as a blue pill; a search icon (to `/#cari`), a bookmark icon (to `/tersimpan`) and a blue "Follow" pill on the right. On mobile the topic links become a scrollable row of pills below the bar; only the bar itself is sticky, the pill row scrolls away with the page.
- **Hero:** pastel gradient with wavy bottom edge, a "Blog & Insight" badge, a two-tone headline with scribble, one supporting line, a pill search box with a blue send button, and the 3D illustration on the right (on top on mobile).
- **Article card:** white rounded card. A 16:9 picture on the left (thumbnail, else reel poster, else a pastel tile with the OL monogram), then a topic tag, the title (max two lines), a meta row (date, reading time, Simpan) and the source count ("4 sumber"). A round arrow button sits on the right. The source count is required on every card; it is the first trust signal.
- **Topic chip:** white pill with line border and an emoji icon; the active chip is navy with white text ("Semua" is the default). Topics: "Uang", "Karier", "Psikologi sehari-hari". A sort select ("Terbaru", "Terlama") sits at the right. On the home page the chips filter in place and the list starts with 8 cards plus a "Tampilkan semua" button (a search or a topic shows every match); on `/catatan` and `/topik/<slug>` the chips are links to those pages.
- **Subscribe card:** navy card with the night mountain illustration, a title, one line of copy, and a pill email field with a blue send button.
- **Popular categories card:** white card with one row per topic: round emoji icon, name, and a count pill ("12 artikel"). "Cara aku riset" links to its page without a count.
- **Claim highlight + footnote marker:** a research claim in article text sits on the yellow marker stroke, followed directly by a footnote marker (white number in a blue circle). Every highlight has a marker; every marker matches a numbered source in the "Sumber" list.
- **Source bottom sheet (mobile):** opens when a footnote marker is tapped. Shows "Sumber 1 dari 4", the source title, author or publisher and year, the evidence meter with its label and one helper line, a "Yang didukung sumber ini" sentence, the primary button "Buka sumber asli", and "Dicek" with the check date.
- **Sidenote (desktop):** the same content as the sheet, condensed, in the right margin next to its claim.
- **Evidence meter:** four 14x6px pill segments, filled in meter-filled blue, empty in meter-empty, followed by a text label. Never rely on color alone: the label is always shown.

| Level | Filled | Label | Use for |
|---|---|---|---|
| 4 | 4 of 4 | Bukti kuat | Meta-analyses and systematic reviews |
| 3 | 3 of 4 | Bukti sedang | A single peer-reviewed study (experiment, cohort, large observational) |
| 2 | 2 of 4 | Data survei | Surveys and institutional reports; show patterns, not causes |
| 1 | 1 of 4 | Masih dugaan | Hypotheses, expert opinion, preliminary findings |

  Laws and regulations (for example PP 35/2021) use an outlined tag "Aturan resmi" instead of the meter.
- **Claim block ("Apa kata riset" section):** the claim sentence, the evidence meter with label below it, then a muted source line, inside a white rounded card.
- **Source list ("Sumber" section):** numbered to match the footnotes. Each item: title, author or publisher and year, a primary link "Buka sumber asli", and "Dicek 25 Okt 2026" in ink muted.
- **Buttons:** primary is blue with white text; secondary is white with blue text and a 1px line border. Pill shaped, 44px tall.
- **Footer:** navy block with the logo on a white badge, the tagline, links in white, and the copyright in on-dark. No lead magnet block.
- **Correction note:** red-pen text on the light red surface, with the correction date on its own line. Shown only when a correction exists.

## Do's and Don'ts

- Do keep yellow (#FFE066) exclusively for highlighted research claims, and red exclusively for corrections.
- Do pair every highlight with a footnote number, and every footnote with an entry in the source list.
- Do show the source count on every card (the evidence label lives in the article) and the "Dicek" date on every article.
- Do keep small text at 4.5:1 contrast or better; the lint checks the component pairs above.
- Do use real copy in Bahasa Indonesia; reel hooks are used verbatim as titles.
- Do use emoji only for topic icons and Popular Categories.
- Don't use the scribble yellow or the hero pastels for text.
- Don't use uppercase labels or eyebrow text above headings.
- Don't join meta items with middle dots; space them as separate items.
- Don't add a lead magnet or free-kit block anywhere.
