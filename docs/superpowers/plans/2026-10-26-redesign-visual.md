# Blog visual redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the Only Learn blog the logo's look:
- the logo in the header and footer;
- a palette taken from the logo;
- a glassmorphism hero on every page;
- reel posters in the article list;
- a navy footer that shows the logo on a white badge.

Content flow and schema stay untouched.

**Architecture:**
- **Tokens:** come from DESIGN.md (v2.0) through the existing `npm run tokens`.
- **Shared components:** `TopBar`, `Footer`, a new `GlassHero`, and a `Wordmark`.
- **Pages:** each page is rebuilt from those components plus the existing list and research components, restyled.
- **Rendering:** stays static (SSG). No new dependencies.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS 4 (`@theme` tokens), React 19, `@google/design.md` CLI, `next/og`.

**Spec:** `docs/superpowers/specs/2026-10-26-redesign-visual-design.md` (this repo)

## Global Constraints

- **Repo:** `/Users/babylast/projects/only-learn/.worktrees/redesign-visual`, a git worktree on branch `redesign-visual`.
  - Never touch `/Users/babylast/projects/only-learn` itself: it's the main checkout, and its `next dev` is running.
  - Stage explicit paths only.
  - Commit messages end with a blank line, then `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Dependencies:** no new npm dependencies. Tailwind classes and the existing tokens only. Fonts are unchanged: Plus Jakarta Sans for UI, Literata for article body.
- **Palette (exact):** `primary #0E314D`, `primary-strong #0A2539`, `primary-soft #E3F1F5`, `accent #2F6B8D`, `brand-teal #3B87A6`, `brand-cyan #ADDFE5`, `ink #14283A`, `ink-muted #5B6B78`, `paper #FFFFFF`, `surface #F1F7F9`, `line #E3EBF0`, `on-dark #CFE3EA`. Unchanged: `highlight #FFE066`, `on-highlight`, `correction #A8261C`, `correction-surface #FCEDEB`, `on-primary #FFFFFF`.
- **Color rules:**
  - `brand-teal` is used only for the "Learn" wordmark and the filled evidence-meter segments. It is never small text (4.0:1 contrast).
  - Links and small accent text use `accent`.
  - Yellow is only on `mark.klaim`. Red is only in corrections.
- **Gradients** appear only in the hero background (`#E3F3F6` → `#F5FAFB`, plus the two decorative circles) and in the poster fallback (`brand-cyan` → `brand-teal`).
- **Shadows** appear only on the hero glass card (`0 8px 24px rgba(14,49,77,.08)`) and the source sheet.
- **Copy:**
  - Indonesian, sentence case.
  - No uppercase eyebrow labels.
  - Meta items are separated by spacing, never by middle dots.
  - The evidence meter always shows its text label.
- **Brand assets** (already created in the worktree, untracked; the first task commits them):
  - `public/brand/ol-mark.png`: monogram, 164×96, transparent.
  - `design/brand/ol-logo.png` (sumber, tidak disajikan): full logo, 600×600, transparent.
  - `src/app/icon.png` (512×512) and `src/app/apple-icon.png` (180×180).
  - `public/reels/sunday-scaries.jpg`: a 360×640 poster.
- **Visual reference** (approved mockups) is in `/Users/babylast/projects/only-learn/.superpowers/brainstorm/98404-1792989462/content/`:
  - `struktur-v3.html`: the home page, the "Hero · Glassmorphism" option;
  - `artikel-v1.html`: the article page;
  - `footer-v1.html`: the "Footer navy, logo di lencana putih" option.

  Match their layout, spacing and colours, adapted to the tokens above.
- **Screenshot check**, used in every task's verification:
  1. Start the dev server in the worktree: `npx next dev -p 3201` (in the background). Stop it at the end of the task.
  2. Take shots with `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=390,2600 --screenshot=<file> http://localhost:3201<path>` for mobile, and `--window-size=1280,2000` for desktop.
  3. Save the shots under `/Users/babylast/projects/only-learn/.worktrees/redesign-visual/.superpowers/sdd/2026-10-26-redesign-visual/shots/` as `t<N>-<page>-<m|d>.png`.
  4. Look at each shot with the Read tool and compare it to the mockup.

## Review Focus

1. **Glass card readability without `backdrop-filter`** (older browsers, some Android WebViews). Expected: a `@supports not (backdrop-filter: blur(1px))` fallback to `rgba(255,255,255,.85)` keeps the text readable. Owned by Task 2.
2. **Article without a reel poster, or without a reel URL.** Expected: the list row shows the gradient + OL fallback, the article shows no "Tonton reelnya" row when there is no URL, and nothing breaks. Owned by Tasks 3 and 4.
3. **A long hook title** (2 or 3 lines at 360px) in the list and the article hero. Expected: the list clamps to 2 lines, and the hero wraps without overflow. Checked by screenshots in Tasks 3 and 4.
4. **Text contrast.** Expected: `npm run tokens` passes the DESIGN.md lint (WCAG check), and no small text uses `brand-teal`. Owned by Task 1.
5. **Draft badge and correction notes** still render under the new styles. Checked by the Task 4 screenshot with a temporary draft copy.

---

### Task 1: Design tokens v2, brand assets, remove the lead magnet

**Files:**
- Modify: `DESIGN.md`
  - Front matter:
    - Set `version` so that it reads 2.0, inside the Overview text.
    - Replace the `colors:` block with the Global Constraints palette.
    - Components: update `top-bar`, `footnote-marker` (bg `primary`, text `on-primary`), `evidence-meter-filled` (bg `brand-teal`), `topic-chip` (bg `primary-soft`) and `topic-chip-active` (bg `primary`, text `on-primary`).
    - Components: add `glass-hero` and `footer` entries, and delete `lead-magnet`.
  - Prose: rewrite the Overview visual idea, Colors, Shapes, Elevation, Components and Do's and Don'ts so they describe the v2 rules in Global Constraints and the spec (keep the yellow, red and meter-label rules).
- Regenerate: `src/styles/tokens.css` via `npm run tokens`
- Modify: `src/app/globals.css`:
  - `.fn`: background `var(--color-primary)`, colour `var(--color-on-primary)`, hover `var(--color-accent)`.
  - `.flash`: background `var(--color-primary-soft)`.
  - `.prose-artikel a`: colour `var(--color-accent)`.
  - `dialog.sheet` shadow colour: rgba(14,49,77,.12).
  - Add `.glass` (the glass card; see Task 2's Interfaces) together with its `@supports not (backdrop-filter: blur(1px))` fallback.
- Delete: `src/components/lead-magnet.tsx`
- Modify: `src/lib/site.ts` (remove `leadMagnet`), `src/app/page.tsx` (remove the `LeadMagnet` import and usage only; the full redesign of this page is Task 3)
- Modify: `docs/05-desain-dan-token.md`: remove the lead-magnet row from the component table, and add rows for `glass-hero` → `src/components/hero.tsx` and `footer` → `src/components/footer.tsx`.
- Modify: `design/stitch-prompts.md`: drop the lead-magnet mention.
- Add (already on disk): `public/brand/ol-mark.png`, `design/brand/ol-logo.png` (sumber, tidak disajikan), `src/app/icon.png`, `src/app/apple-icon.png`

**Interfaces:**
- Produces these Tailwind token classes, used by later tasks: `bg-primary`, `bg-primary-soft`, `text-accent`, `text-brand-teal`, `bg-brand-teal`, `bg-brand-cyan`, `text-on-dark`, `bg-surface`, `border-line`, `text-ink-muted`.
- Produces the `.glass` CSS class.

- [ ] **Step 1: Edit DESIGN.md as listed, then run `npm run tokens`**

Expected: the lint passes with no errors, and `src/styles/tokens.css` contains `--color-brand-teal: #3b87a6` and `--color-accent: #2f6b8d`. If the lint reports a contrast failure, fix the offending component pair. Lowering the contrast rule is not a fix.

- [ ] **Step 2: Edit `globals.css`, remove the lead magnet, update the docs**

- [ ] **Step 3: Run the checks**

Run: `npm run typecheck && npm test && npm run cek && npx next build`
Expected: all pass, and the build lists the routes plus `/icon.png` and `/apple-icon.png`.

- [ ] **Step 4: Take the screenshot check of `/` (mobile)**

The page is not redesigned yet, but it must render with the new navy and teal colours and no lead magnet.

- [ ] **Step 5: Commit**

```bash
git add DESIGN.md src/styles/tokens.css src/app/globals.css src/components/lead-magnet.tsx src/lib/site.ts src/app/page.tsx docs/05-desain-dan-token.md design/stitch-prompts.md public/brand src/app/icon.png src/app/apple-icon.png
git commit -m "desain v2: palet dari logo, aset logo, hapus kit gratis"
```

### Task 2: Shell — Wordmark, TopBar, GlassHero, Footer

**Files:**
- Modify: `src/components/ui.tsx`. Add `Wordmark`.
- Create: `src/components/hero.tsx` (`GlassHero`)
- Modify: `src/components/top-bar.tsx`, `src/components/footer.tsx`

**Interfaces:**
- **`Wordmark({ className?: string })`:**
  - Renders `<img src="/brand/ol-mark.png" alt="" width=38 height=22>`, then `<span>` containing `<span class="text-primary">Only</span> <span class="text-brand-teal">Learn</span>`.
  - Text: Plus Jakarta Sans ExtraBold, 16px, tracking -0.01em.
  - The whole thing carries `aria-label="Only Learn"`.
- **`GlassHero({ children: ReactNode })`:**
  - A section with margins `mx-4 mt-4`, and on desktop centred inside 1080px.
  - `rounded-[22px]`, `overflow-hidden`, a `bg-gradient-to-br from-[#E3F3F6] to-[#F5FAFB]` background, padding `px-4 py-5` (desktop `lg:px-10 lg:py-12`).
  - Two `aria-hidden` circles:
    - top-left: 170px, `bg-brand-cyan`, offset `-left-12 -top-14`;
    - bottom-right: 150px, `bg-brand-teal` at 55% opacity, offset `-right-10 -bottom-16`.

    Desktop may scale both circles up.
  - Inside sits a `div.glass` (`relative rounded-[18px] p-4 lg:p-8 lg:max-w-[680px]`) that wraps `children`.
- **`.glass`** (in `globals.css`, from Task 1):
  - background `rgba(255,255,255,.55)`;
  - `backdrop-filter` and `-webkit-backdrop-filter` set to `blur(14px)`;
  - border `1px solid rgba(255,255,255,.8)`;
  - shadow `0 8px 24px rgba(14,49,77,.08)`;
  - `@supports not (backdrop-filter: blur(1px))` → background `rgba(255,255,255,.85)`.
- **`TopBar({ back?: { href: string; label: string } })`:**
  - Becomes a server component: drop `"use client"` and the scroll sentinel.
  - Sticky, `bg-paper`, `border-b border-line`, 56px tall, content inside the 1080px container.
  - Left: `<Link href="/"><Wordmark/></Link>`.
  - Centre (lg only): the topic links and "Cara aku riset", in `text-ink`, hover `text-accent`.
  - Right: with `back`, a chevron plus `back.label` in `text-accent`. Without it, a "Follow" pill (`rounded-full border border-line px-3.5 py-1.5 text-label font-label text-primary hover:bg-primary-soft`) linking to Instagram.
- **`Footer()`:**
  - `mt-16 bg-primary text-on-dark`, with a container `py-8`.
  - A white badge: `inline-flex rounded-xl bg-paper px-3 py-1.5` wrapping `<Link href="/"><Wordmark/></Link>`.
  - A `<p>` with "Riset di balik setiap reel @only_learn0." (handle from `site.instagram.handle`).
  - A row of links ("Cara aku riset", "Tentang", "Instagram") in `text-paper font-label`, with hover underline.
  - `© {year} {site.name}` in `opacity-70`.

- [ ] **Step 1: Implement `Wordmark`, `GlassHero`, `TopBar` and `Footer` as specified**

- [ ] **Step 2: Temporarily wrap the home page's existing hero text in `<GlassHero>`**

Task 3 rebuilds the page. Then run `npm run typecheck && npx next build`.

- [ ] **Step 3: Take the screenshot check of `/`, mobile and desktop**

Compare the header, hero and footer to `struktur-v3.html` and `footer-v1.html`. Then check the fallback:
1. Temporarily add `.glass{background:rgba(255,255,255,.85)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}` to `globals.css`.
2. Shoot `/` again, and confirm the hero text stays readable.
3. Remove the temporary rule.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui.tsx src/components/hero.tsx src/components/top-bar.tsx src/components/footer.tsx src/app/page.tsx
git commit -m "kerangka: wordmark, hero kaca, header dan footer baru"
```

### Task 3: Article list, topic filter, home, all notes and topic pages

**Files:**
- Modify: `src/components/reel-row.tsx` (`ReelThumb`, `ReelRow`), `src/components/topic-chips.tsx`
- Modify: `src/app/page.tsx`, `src/app/catatan/page.tsx`, `src/app/topik/[slug]/page.tsx`
- Modify: `content/catatan/sunday-scaries.mdx`. Add `poster: /reels/sunday-scaries.jpg` under `reel:`.
- Add: `public/reels/sunday-scaries.jpg` (already on disk)

**Interfaces:**
- **`ReelThumb({ poster?: string; className?: string })`:**
  - With a poster: an `<img>`, `rounded-xl object-cover`.
  - Without one: a span with `bg-gradient-to-br from-brand-cyan to-brand-teal`, `rounded-xl`, the grid centred, containing `<img src="/brand/ol-mark.png" alt="">` about 60% wide with `brightness-0 invert` (white). It is `aria-hidden`.
- **`ReelRow`:**
  - `<li>` with `border-t border-line first:border-t-0`.
  - The link is `flex items-center gap-3 py-3`.
  - Thumb: `h-[76px] w-[54px]`.
  - Title: `line-clamp-2 text-item-title font-item-title`, hover `text-accent`.
  - Meta line: `text-caption text-ink-muted` with `gap-x-3`. It holds the topic name or date, the DocIcon plus "N sumber", and the Draft badge.
- **`TopicChips({ active?: "semua" | TopicSlug })`:**
  - Chip order: "Semua" (→ `/catatan`), then the topics (→ `/topik/<slug>`).
  - Active chip: `bg-primary text-on-primary`, `aria-current="page"`.
  - Inactive chip: `bg-primary-soft text-ink hover:bg-line`.
  - All chips: `h-8 rounded-full px-3.5 text-label font-label`.
- **Home `/`:**
  1. `TopBar`.
  2. `GlassHero` with `h1` = `site.tagline` (`text-headline font-headline text-primary lg:text-display`) and `p` = `site.intro` (`text-body text-ink-muted`).
  3. A section inside a 680px column with an `h2` "Catatan terbaru" (`text-title font-title text-primary`).
  4. `TopicChips active="semua"`.
  5. `ReelList` of the latest 6.
  6. If there are more than 6 articles, a text link "Lihat semua catatan" in `text-accent` to `/catatan`.
  7. The empty state stays: a `bg-surface rounded-2xl` box with the Instagram button.
- **`/catatan`:** `TopBar back={Beranda}`, then `GlassHero` (h1 "Semua catatan", p "N catatan, terbaru dulu."), then `TopicChips active="semua"`, then `ReelList showDate`.
- **`/topik/[slug]`:** the same pattern, with `GlassHero` (h1 `topic.name`, p `topic.description`), `TopicChips active={slug}`, and either the list or the existing empty state (restyled: `bg-surface rounded-2xl`).

- [ ] **Step 1: Implement the interfaces above**

- [ ] **Step 2: Run the checks**

Run: `npm run typecheck && npm test && npm run cek && npx next build`
Expected: all pass, and `cek` reports 0 errors (the sunday-scaries poster exists).

- [ ] **Step 3: Take the screenshot check of `/`, `/catatan` and `/topik/karier` (mobile), plus `/` (desktop)**

Also test the poster fallback:
1. Temporarily copy `content/catatan/sunday-scaries.mdx` to `content/catatan/uji-tanpa-poster.mdx` with `reel.poster` removed and a 3-line title.
2. Shoot `/`, and confirm the fallback tile and the 2-line clamp.
3. Delete the copy, and confirm `git status` shows it gone.

- [ ] **Step 4: Commit**

```bash
git add src/components/reel-row.tsx src/components/topic-chips.tsx src/app/page.tsx src/app/catatan/page.tsx "src/app/topik/[slug]/page.tsx" content/catatan/sunday-scaries.mdx public/reels/sunday-scaries.jpg
git commit -m "daftar: poster reel, filter topik, beranda dan halaman daftar baru"
```

### Task 4: Article page, research components, OG image

**Files:**
- Modify: `src/app/catatan/[slug]/page.tsx`
- Modify: `src/components/reel-embed.tsx`. Replace `ReelEmbed` with `ReelLink`.
- Modify: `src/components/research.tsx`, `src/components/evidence-meter.tsx`, `src/components/source-dialog.tsx` (colour and shape only)
- Modify: `src/app/catatan/[slug]/opengraph-image.tsx`

**Interfaces:**
- **`ReelLink({ url?: string; poster?: string })`:**
  - Returns `null` when there is no `url`.
  - Otherwise an external `<a>` (`target=_blank rel=noopener`): `flex items-center gap-3 rounded-2xl border border-line p-2.5 hover:bg-surface`.
  - The thumb is `ReelThumb` at `h-[74px] w-[52px]`, with a centred white ▶ (PlayIcon) over it.
  - Text: "Tonton reelnya" (`text-label font-label text-primary`), then "Instagram @{handle}" (`text-caption text-ink-muted`).
- **Article page layout:**
  1. `TopBar back={{href:"/catatan",label:"Semua catatan"}}`.
  2. `GlassHero` containing:
     - the topic chip: a link with `bg-paper text-accent rounded-full px-3 h-7 text-label`;
     - the Draft chip, when the article is a draft;
     - the `h1` title: `text-headline font-headline text-primary lg:text-[2.25rem]`;
     - the meta row: "Dicek {date}", "{n} sumber" and "{m} menit baca", spaced with `gap-x-4`, in `text-caption text-ink-muted`.
  3. A 680px column (desktop keeps the 1080px container, so the sidenotes stay in the right margin), containing:
     - `ReelLink`, with `mt-4`;
     - "Ringkasan": an `h2` plus a `ul` inside `rounded-2xl bg-surface p-4`;
     - the MDX content (`prose-artikel`), unchanged;
     - `SourceList`;
     - corrections;
     - the DM line;
     - the closing CTA (the Follow `ButtonLink`, which is navy through the tokens).
  - Metadata and JSON-LD are unchanged.
- **`research.tsx`:**
  - `StaticNumber`: `bg-primary text-on-primary`.
  - Claim blocks and the source list: keep the structure; links in `text-accent`.
  - `CorrectionNote`: unchanged.
- **`evidence-meter.tsx`:** filled segments use `bg-brand-teal`, empty ones use `bg-line`. The label stays.
- **`source-dialog.tsx`:** the "Buka sumber asli" button uses `bg-primary hover:bg-primary-strong`, and the "Tutup" link uses `text-accent`.
- **OG image:**
  - White background.
  - Top-left: the monogram (read `public/brand/ol-mark.png` with `fs` into a base64 data URL), 40px tall, followed by "Only" in `#0E314D` and "Learn" in `#3B87A6`, 32px ExtraBold.
  - Title: unchanged stabilo style, colour `#14283A`.
  - Bottom row: the topic and "{n} sumber" in `#5B6B78`, and "@handle" in `#2F6B8D`.
  - Optional: one soft `#ADDFE5` circle, partly off-canvas, in the top-right.

- [ ] **Step 1: Implement the interfaces above**

Delete `ReelEmbed`. Nothing else imports it.

- [ ] **Step 2: Run the checks**

Run: `npm run typecheck && npm test && npm run cek && npx next build`
Expected: all pass.

- [ ] **Step 3: Take the screenshot check of `/catatan/sunday-scaries`, mobile and desktop**

Compare with `artikel-v1.html`. The desktop sidenotes must sit in the right margin.

Then render the OG image: `curl -s -o <shots>/t4-og.png http://localhost:3201/catatan/sunday-scaries/opengraph-image` and view it.

Then the draft and correction check:
1. Temporarily copy the article to `uji-draft.mdx` with `draft: true` and one `corrections` entry.
2. Shoot `/catatan/uji-draft`, and confirm the Draft chip and the correction note.
3. Delete the copy.

- [ ] **Step 4: Commit**

```bash
git add "src/app/catatan/[slug]/page.tsx" "src/app/catatan/[slug]/opengraph-image.tsx" src/components/reel-embed.tsx src/components/research.tsx src/components/evidence-meter.tsx src/components/source-dialog.tsx
git commit -m "artikel: hero kaca, baris reel, warna riset baru, gambar preview"
```

### Task 5: About, Method and 404 pages; final pass

**Files:**
- Modify: `src/app/tentang/page.tsx`, `src/app/cara-aku-riset/page.tsx`, `src/app/not-found.tsx`
- Modify: `README.md` if it describes the old look (one line at most). Leave `docs/img` screenshots alone.

**Interfaces:**
- Each page gets `TopBar` (with back → Beranda, except the 404, which has no back), then a `GlassHero` holding its title `h1` (`text-headline font-headline text-primary`) and the first intro sentence where one exists, then the existing body inside the 680px column.
- Cara aku riset: the step list, the evidence-level table and the corrections are restyled to tokens (`rounded-2xl` boxes on `bg-surface`). Its content is unchanged.
- 404: hero "Catatan ini tidak ditemukan", plus the existing sentence and the `ButtonLink` to `/catatan`.

- [ ] **Step 1: Implement**

- [ ] **Step 2: Run the checks**

Run: `npm run typecheck && npm test && npm run cek && npx next build`
Expected: all pass.

- [ ] **Step 3: Take the final screenshot set (mobile + desktop)**

Pages: `/`, `/catatan`, `/topik/karier`, `/catatan/sunday-scaries`, `/tentang`, `/cara-aku-riset`, and `/halaman-tidak-ada` (the 404). Save them as `final-<page>-<m|d>.png`.

- [ ] **Step 4: Commit**

```bash
git add src/app/tentang/page.tsx src/app/cara-aku-riset/page.tsx src/app/not-found.tsx README.md
git commit -m "halaman tentang, cara aku riset, 404 ikut desain baru"
```
