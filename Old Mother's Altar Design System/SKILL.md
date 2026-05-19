---
name: old-mothers-altar-design
description: Use this skill to generate well-branded interfaces and assets for Old Mother's Altar, a private witchcraft spell journal & tracker, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy
assets out and create static HTML files for the user to view. If working on
production code, you can copy assets and read the rules here to become an
expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they
want to build or design, ask some questions, and act as an expert designer who
outputs HTML artifacts *or* production code, depending on the need.

## Quick map

- `README.md` — full brand brief: voice, visual foundations, iconography
- `colors_and_type.css` — drop-in tokens (color, type, spacing, motion)
- `fonts/` — Ohno Blazeface (9 optical sizes, roman + italic) + New Kansas (8 weights)
- `assets/` — logo + icons
- `preview/` — small swatch/spec cards (Design System tab)
- `ui_kits/app/` — runnable app recreation (the Altar) with reusable JSX components
- `moodboard/` — Palladini Aquarian Tarot reference plates (the soul)

## The single sentence

> A deep eggplant altar surface with art-nouveau display serif, warmed sparingly by
> Aquarian-Tarot ember/saffron/moss. Terse, archaic, attentive. No emoji,
> no exclamation marks, no streaks or gamification.

## Do and don't

- DO use `var(--font-display)` (Ohno Blazeface, upright) for every heading.
  Reach for the optical-size aliases (`"Ohno Blazeface 24"`, `36`, `48`, `72`)
  to match the render size.
- DO write copy in second person for instruction, first person for the user's
  own journal entries. Sentence case for sentences, ALL CAPS for labels with
  `0.18em` tracking.
- DO use roman numerals for chapter / count marks (III, VII, XVII).
- DO keep the altar dark — `var(--bg-page)` is `#100B18`.
- DO always edit source files in `Old Mother's Altar Design System/` — that
  folder is the single source of truth for all tokens, components, and assets.

- DON'T use emoji. Ever.
- DON'T add gradients to page backgrounds. The page is a flat field.
- DON'T tint icons in the chrome — `--slate-300` is default, `--amber` for
  active. Reserve ember/saffron/moss for actual ritual states.
- DON'T substitute Fira Sans (the Figma export shows it as a fallback; the
  brand fonts are New Kansas + Ohno Blazeface).
