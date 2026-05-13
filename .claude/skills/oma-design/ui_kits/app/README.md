# UI Kit — The Altar

The Altar is **the** product: a private mobile journal for a practitioner's
working life. This kit is a high-fidelity click-thru recreation of the core
screens, designed against the Old Mother's Altar design system.

## What's inside

- `index.html` — the runnable kit; renders the app inside an iOS device frame
- `App.jsx` — root: tab navigation, fixture data
- `components.jsx` — primitives (Btn, IconBtn, Badge, Card, TopBar, TabBar,
  MoonGlyph, Flame, Ico)
- `Altar.jsx` — home screen (greeting, moon, active cast, recent workings)
- `Workings.jsx` — searchable list of workings with sealed/draft filter
- `WorkingDetail.jsx` — single working: hero, ingredients, cast history
- `TheBook.jsx` — long-form journal timeline
- `NewWorking.jsx` — bottom-sheet composer
- `ios-frame.jsx` — device frame (starter component)

## Surfaces covered

- **The Altar** — today view with greeting, current moon, active candle, recent workings
- **Workings** — list with search, filter chips, status badges
- **Working detail** — ingredients table, cast history timeline, primary "Cast now" CTA
- **The Book** — journal entries on a roman-numeral timeline (Cast, Dream, Note, Moon kinds)
- **New working** — modal sheet with name, intent, moon picker, bind toggle

## Notable patterns

- **Optical-size headings.** Every heading uses the Ohno Blazeface optical
  size that matches its render size (`Ohno Blazeface 24` for card titles,
  `36` for sections, `48` for hero).
- **Roman numerals** for chapter / cast counts (`VII`, `XIII`, `XVII`).
- **Candle flame** — animated SVG with a slow flicker; the *only* "delight"
  motion in the kit. See `Flame` in `components.jsx` and `@keyframes omaCandle`
  in `index.html`.
- **Moon glyph** — eight phases as a self-drawn SVG component (`MoonGlyph`).
- **Ember glow card** for active casts — uses the `--glow-ember` token.

## Caveats

- The Figma reconstruction is a **dashboard** template that doesn't directly
  match a witchcraft journal. We've taken the dark-slate chrome (cards, dialog,
  buttons, badges) verbatim and rebuilt the screens for the actual product.
- Icons are Lucide (CDN substitution) — see the system-wide flag in the root
  README. They match the brand's 1.75-stroke geometric humanist feel.
