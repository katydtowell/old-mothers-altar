# Old Mother's Altar — Design System

> *A witchcraft spell journal & tracker.*
> The altar is dark. The candle is lit. Everything you do here, the book remembers.

Old Mother's Altar is a private, ritual-minded app for keeping a practitioner's
working life — spells cast, herbs steeped, candles burned, moons noted, dreams
recorded. It is **not** a wellness app, **not** a social app, and **not** a
shop. It is a journal that takes the work seriously.

The visual language is rooted in **David Palladini's 1970 Aquarian Tarot deck**:
deep cream parchment, vermillion and saffron ribbons, twilight slates, art-nouveau
lettering. We invert the parchment into a **dark altar surface** — near-black ink
warmed by candle-light slate — and reserve the tarot's warm pigments
(ember, saffron, moss, amber, bone) for ritual states, sigils, and the rare
moment that should glow.

---

## Sources of truth

| Source                                                              | Where it lives                          |
| ------------------------------------------------------------------- | --------------------------------------- |
| Figma — *Old Mother's Altar App Design System.fig*                  | Mounted as `.fig` virtual filesystem    |
| Brand fonts                                                         | `fonts/` (Ohno Blazeface + New Kansas)  |
| Wordmark                                                            | `assets/logo.svg`                       |
| Mood-board cards (Palladini *The Lovers*, *The Star*)               | `moodboard/tarot-1.png`, `tarot-2.png`  |

The Figma "Components" page is a clean dark-slate dashboard system; the
"Mood-board" page holds the Aquarian Tarot color references. **The mood-board
sets the soul; the Figma sets the bones.** We obey both.

---

## CONTENT FUNDAMENTALS

### Voice

The book speaks like **a practitioner taking themselves seriously**, never like
a chatbot, app, or aesthetic blog. It is **terse, declarative, slightly archaic**
without being cosplay-mediaeval. Cut every word that doesn't earn its place.

- **Person.** Mostly second-person for instruction (*"Light the candle."*),
  first-person for the practitioner's own entries (*"I let it burn down."*).
  Avoid corporate "we" — the app is a tool, not a company in conversation.
- **Case.** **Title Case** for button labels and headings (*"Seal the
  Working"*, *"Begin a Working"*, *"Cast Now"*). Sentence case for body copy
  and supporting text. Ohno Blazeface is **always rendered in ALL CAPS** via
  CSS `text-transform: uppercase`; write the source string in Title Case so
  it stays legible when edited and stays correct if the font ever changes.
  **Eyebrows / labels** in ALL CAPS with generous tracking (`0.18em`), the way
  a tarot card or a 1970s paperback chapter mark would.
- **Punctuation.** Em-dashes and full stops. No exclamation marks. No emoji,
  ever. Ellipses sparingly, only for genuine suspension.
- **Numbers.** Roman numerals for chapter / phase markers (`I`, `II`, `XVII`),
  Arabic everywhere else.

### Tone

- Quiet, attentive, a little reverent. The app holds your secrets; act like it.
- Never cute. Never coach-y. Never gamified. No streaks, no badges, no
  *"You're on a 7-day roll!"*
- Errors are described, not apologised for: *"The book could not save that
  entry."* — not *"Oops! Something went wrong."*

### Specific examples

| ✅ Yes                                              | 🚫 No                                                |
| --------------------------------------------------- | ---------------------------------------------------- |
| Light the candle.                                   | Get started! 🕯️                                     |
| The waning gibbous returns Friday.                  | Hey, the moon is changing on Friday!                 |
| Sealed — III ingredients, IX minutes.               | Done! ✨ Spell complete in 9 mins                    |
| The book could not save that entry. Try again.      | Oops! Something went wrong 😬                        |
| **Begin a Working** *(button, Title Case)*          | Create new spell                                     |
| Press to seal                                       | Click to confirm                                     |
| LAST CAST · XIII days ago                           | Last used 13 days ago                                |
| She left a note for the next moon.                  | User added a reminder for next lunar event           |

### Lexicon (use these words, not the obvious ones)

- **Working** (not "spell" — unless the user named it one)
- **Seal** (commit / save / confirm)
- **The Book** (the journal itself, capitalised when referred to)
- **Cast** (a recorded instance of a working)
- **Altar** (the home / today view)
- **Wane / wax** (decrease / increase, for energy, charges, etc.)
- **Ingredients** (items, components)
- **Note** (free-text entry)

---

## VISUAL FOUNDATIONS

The system is **dark by default** — that's the altar at night. A full **light
("vellum") mode** lives alongside it for printed journal pages, exports, and
any moment the book should feel like paper instead of slate. Flip by setting
`data-theme="light"` on any container; the semantic tokens (`--bg-page`,
`--fg-1`, `--action-primary-bg`, etc.) re-bind so components don't need
mode-aware code.

### Palette

Three rings of color, tightening inward:

1. **Warm ink + bone-taupe** — the altar. 95% of every screen. Warm near-black
   ink (`#14110D`) under warm taupe (`#BFAA84`) under bone (`#EDE4D2`). This
   was a cool slate-cyan in the original Figma; we shifted it warmer to match
   Palladini's actual parchment-and-sepia palette. The room is candlelit, not
   fluorescent.
2. **Indigo + crimson** — action and binding. Indigo (`#2D4EA6`) for the primary
   verb (cool tension against the warm room); crimson (`#D41840`) only for
   danger or a bound / sealed working.
3. **Tarot warm accents** — ember (`#F35321`), saffron (`#F59823`), amber
   (`#F4AF59`), moss (`#96A560`), bone (`#FDFEEB`), plum (`#764883`).
   **Amber is now promoted into chrome** — used for everyday "active /
   selected" tint (tab underline, side-nav active, filter chip, icon-button
   active). Saffron, ember, moss, plum remain reserved for true ritual
   states (active candle, finished cast, herb tag, dream).

Full tokens in `colors_and_type.css`.

### Type

- **Display: Ohno Blazeface (roman)** — a chunky, slightly art-nouveau headline
  serif in nine optical sizes (12pt → 72pt). The system **always renders
  Blazeface in ALL CAPS** via `text-transform: uppercase` (it's beautiful
  uppercase and harder to read in mixed case). Source strings are written in
  Title Case for editability.
  Choose the optical size near your render size: `Ohno Blazeface 18` for
  list rows, `24` for card titles, `36` for section heads, `48`–`72` for
  hero and chapter marks.
- **Body / UI: New Kansas** — a humanist serif with eight weights (Thin → Heavy).
  This is the journal's hand. Body copy at Regular (400) for long reads,
  Medium (500) for UI rows, SemiBold (600) for buttons, Bold (700) for emphasis.
- **No sans-serif.** The Figma reconstruction shows Fira Sans because Figma
  fell back from the brand fonts — *do not* substitute Fira Sans in real
  surfaces.
- **Mono: JetBrains Mono** (CDN) for tabular data, timestamps, coordinates.

### Spacing & rhythm

4-px grid. Tokens: `--s-1` (4) → `--s-11` (96). Common rhythms:

- Card padding: 24
- Section gap: 32 / 56
- Inline icon-to-text: 8
- Form field gap: 12

### Backgrounds

The page is **flat near-black ink**. No gradients on the page surface — a flat
field reads as candlelit room.

Special backgrounds, used purposefully:

- **Vellum paper** (`--bone`) for printed journal-page exports and the rare
  "open the book" overlay. Receives black ink, ember accents.
- **Tarot frame plates** — full-bleed crops of Palladini's *The Star* /
  *The Lovers* etc., used as decorative banners on chapter intros. Always
  cropped tight, never centred whole (we don't reproduce the deck).
- **Subtle paper grain** — an SVG noise turbulence overlay at 4-6% opacity
  on cards and the page bg, applied via the `.oma-grain` utility. Optional
  per surface.

No gradient page bg. No frosted glass. No mesh.

### Borders, cards, shadows

- Cards are `--bg-surface` (`#182023`) on the `--bg-page` (`#0E0F0E`) and carry
  a hairline `1px` border of `rgba(161,189,198,0.10)` (token: `--line-soft`).
- Radii: `10px` for cards, `8px` for menus / pickers, `6px` for buttons,
  `4px` for inputs, `999px` for tag pills.
- Shadows are **functional, not decorative.** `--shadow-1` for resting cards,
  `--shadow-2` for hover lift, `--shadow-3` for modals / popovers. Glow tokens
  (`--glow-indigo`, `--glow-ember`) for active states only.

### Hover, press, focus

- **Hover** lifts opacity / brightens: secondary surfaces from `rgba(slate,0.08)`
  → `rgba(slate,0.14)`. Primary indigo lightens to `#3760BD`. **No scale on
  hover** — keep the altar still.
- **Press** darkens and *shrinks 0.99* on a `120ms` ease-out — a soft press,
  not a snap. Indigo drops to `--indigo-700`.
- **Focus** is `2px` outline of `--indigo-300` at `2px` offset. Never a soft
  glow alone (a11y).
- **Active candle / cast** — these get a real `--glow-ember`. They are rare.

### Motion

- **Easing.** `--ease-out` (cubic-bezier `0.2, 0.8, 0.2, 1`) for entrances,
  `--ease-candle` (`0.4, 0, 0.2, 1`) for state changes that should feel like a
  flame leaning. No bounce, no overshoot.
- **Durations.** 140ms fast (button press), 220ms base (panel open), 420ms
  slow (page transition).
- **Crossfade > slide.** Slides should feel like turning a page — opacity +
  a 4px Y nudge. Never a hard left-right slide.
- **Candle flicker** is the one allowed "delight" — a slow opacity + filter
  oscillation on the active-cast indicator. ~2.4s loop, very subtle.

### Transparency & blur

- Overlays: `rgba(14,15,14,0.72)` over the page. No backdrop-filter blur on
  the overlay (we want the altar to disappear behind the dialog, not blur).
- Hairline rules: `rgba(slate, 0.10–0.45)` only. Never solid grey lines.

### Layout rules

- Fixed top bar (56px), no shadow at rest — a hairline `--line-soft` underneath.
- Fixed bottom tab bar (mobile only, 64px) — same rule.
- Side nav (desktop) is **272px** when expanded, 64px when icon-only.
- Reading column max 720px. The Book wants long-form room.

### Iconography

See **Iconography** below.

---

## ICONOGRAPHY

The system uses **two icon families**, deliberately separated by purpose.

### 1. Line icons (`assets/icons/oma/`)

The brand's primary set: **hand-drawn in David Palladini's Aquarian Tarot
line style** — bold flat strokes (2px on a 24-px canvas), rounded caps
and joins, **filled center-dots** as the signature Palladini accent,
and **5-point stars in circles** for pentacles. The set leans intentionally
heraldic and a touch art-nouveau; it should feel drawn, not stamped from
a tool.

The library lives in `assets/icons/oma/` (one SVG per glyph). 34 glyphs
in three groups:

- **Core** — `search`, `plus`, `close`, `check`, `back`, `chevron`, `more`,
  `menu`, `edit`, `trash`
- **Surfaces & meta** — `bell`, `calendar`, `settings`, `user`, `tag`,
  `lock`, `info`, `warn`, `sun`, `moonIcon` (the simple-crescent toggle
  variant)
- **Ritual** — `moon` (crescent + companion star, the Palladini moon),
  `flame`, `candle`, `leaf`, `star`, `pentacle`, `eye`, `key`, `book`,
  `altar`, `sparkle`, `hand`, `jar`, `feather`

### Format & usage

- All SVGs are **24×24, `stroke="currentColor"`, `fill="none"`** with
  selected child elements switched to `fill="currentColor"` for the
  filled-dot accents.
- **Default rendering.** 2px stroke. At smaller sizes (16px), scale the
  whole SVG; do not thicken the stroke.
- **States.** Default uses `--fg-2`. Active / selected uses `--fg-1`.
  Disabled uses `--fg-3`. Destructive uses `--crimson-500`. Ritual
  glyphs are typically rendered in their thematic accent: `flame` in
  `--ember`, `leaf` in `--moss`, `moon`/`star`/`candle` in `--amber`,
  `eye` in `--plum`, `pentacle` in `--saffron`.
- **Hit target.** Always pad to a 40 × 40 minimum.

### In React

The `Ico` object in `ui_kits/app/components.jsx` exposes every glyph as
a ready `<Icon>` element. Use `React.cloneElement(Ico.flame, { size: 20 })`
to set size; color inherits from the surrounding `color:` CSS property.

### Unicode / emoji

**No emoji *in chrome*. No unicode characters as line icons.** The book is not
playful in that way. Roman numerals (I, II, V, IX, XVII) and the wordmark's
green dot are the only unicode flourishes in the UI itself.

### 2. Illustrative icons (`assets/illustrations/`)

The brand's **secondary set: full-color illustrative glyphs** for ritual
objects — crystals, candles, teapots, threads, leaves, daggers, jars,
herbs, etc. These are *thematic* and *painted-looking*, not chrome.
They live on ingredient cards, empty states, onboarding plates, and
Book entries — anywhere a ritual object should *feel* like an object.

We use **[OpenMoji](https://openmoji.org)** (CC-BY-SA 4.0) for the set,
loaded from CDN. 36 curated glyphs cover the working vocabulary. See
`assets/illustrations/README.md` for the full codepoint map and license
attribution.

In React, the `<OmaIllo name="crystal" size={48}>` helper in
`ui_kits/app/illustrations.jsx` is the canonical way to use them.

> ⚠ **Poppet is missing.** Unicode has no poppet/voodoo-doll glyph and
> OpenMoji's extras don't include one. I'll draw a single custom one in
> the OpenMoji color style once you confirm.

**Logo.** Two SKUs live in `assets/`:
- `logo-dark.svg` — bone wordmark + green dot, for dark surfaces (default)
- `logo-light.svg` — indigo wordmark + green dot, for vellum / light surfaces
- `logo.svg` — alias of the dark version (back-compat)

Both keep the small **green dot** above the "A" in ALTAR — it reads as a sigil,
a third eye, an offering. Don't recolor or remove it.

**Theme toggle.** The UI kit's top bar has a sun / moon icon that flips
between modes. In production, the toggle lives in Settings.

---

## Project index

```
/
├── README.md                ← you are here
├── SKILL.md                 ← cross-compatible skill definition (Agent Skills)
├── colors_and_type.css      ← all tokens (color + type + spacing + motion)
│
├── fonts/                   ← Ohno Blazeface (9 optical sizes × roman + italic) + New Kansas (8 weights)
├── assets/
│   ├── logo.svg             ← alias of logo-dark.svg
│   ├── logo-dark.svg        ← bone wordmark for dark surfaces
│   ├── logo-light.svg       ← indigo wordmark for vellum surfaces
│   └── icons/               ← (Lucide CDN substitution — see flag)
│
├── moodboard/               ← Palladini Aquarian Tarot reference plates
│
├── preview/                 ← Design System tab cards (21 specimens; see Design System tab)
│
└── ui_kits/
    └── app/                 ← The Altar — mobile app
        ├── README.md
        ├── index.html       ← runnable click-thru kit (open this)
        ├── App.jsx
        ├── components.jsx   ← Btn, Badge, Card, TopBar, TabBar, MoonGlyph, Flame, Ico
        ├── Altar.jsx        ← home / today
        ├── Workings.jsx     ← list of workings
        ├── WorkingDetail.jsx ← single working
        ├── TheBook.jsx      ← journal timeline
        ├── NewWorking.jsx   ← composer sheet
        └── ios-frame.jsx    ← device frame (starter)
```

## How to use this system

- **For mocks / prototypes** → load `colors_and_type.css`, pull JSX components
  out of `ui_kits/app/` and rearrange. The components are intentionally simple
  and cosmetic — fork freely.
- **For production code** → treat `colors_and_type.css` as the canonical token
  set. The JSX components are reference, not a library.
- **For decks / print** → use the dark altar palette for screens, swap to
  `--bone` vellum for printed pages (the only sanctioned light surface).
- **As an Agent Skill** → `SKILL.md` is at the root and can be dropped into a
  Claude Code workspace.

---

## CAVEATS

- The Figma reconstruction shows **Fira Sans** as the only typeface — that's a
  Figma fallback for our brand fonts (which only exist as OTFs you uploaded).
  **All real surfaces** must render in New Kansas + Ohno Blazeface. The Figma
  is correct for layout, geometry, and color; it is **wrong about type**.
- **Icon set** — drawn from scratch in Palladini's flat-line style; lives
  in `assets/icons/oma/`. 34 glyphs cover core UI, surfaces, and ritual
  needs.
- **Illustrative icons** — full-color OpenMoji glyphs loaded from CDN.
  Covers everything except **poppet** (no Unicode codepoint exists);
  I'll hand-draw that one if you confirm.

### Attribution

OpenMoji is released under CC-BY-SA 4.0 — credit them when you ship.
- We only see **one product** (the app). If a marketing site or print
  collateral exists, please attach it.
