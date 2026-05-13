# Illustrative icon set — OpenMoji

The brand uses **[OpenMoji](https://openmoji.org)** (CC-BY-SA 4.0, by HfG
Schwäbisch Gmünd) for the **full-color illustrative glyphs**: crystals,
candles, teapots, threads, leaves, daggers, jars, herbs, etc. OpenMoji is
not the line-icon set (those live in `assets/icons/oma/`) — it's the
*decorative*, *thematic*, *ingredient-style* set. Use it for:

- Ritual cards (a working that uses *salt + rosemary + a beeswax taper*)
- The Book entries that reference physical objects
- Empty states, onboarding plates, ingredient gallery
- Anywhere a ritual icon should feel *painted*, not *drawn*

## How it's delivered

OpenMoji ships SVGs via the jsDelivr CDN, one per Unicode codepoint:

```
https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/svg/<CODEPOINT>.svg
```

This design system **does not vendor the SVGs** — they're fetched at runtime
from CDN. If you need offline access, run `npm install openmoji` in your
production project and bundle from `node_modules/openmoji/color/svg/`.

## The set we use

Codepoints curated below match the Old Mother's Altar working vocabulary:

| Object              | Codepoint | Notes                                     |
| ------------------- | --------- | ----------------------------------------- |
| Gem / crystal       | `1F48E`   | The default crystal — clear, faceted      |
| Crystal ball        | `1F52E`   | For scrying / divination workings         |
| Candle              | `1F56F`   | Single taper, lit                         |
| Fire                | `1F525`   | When candle is too literal                |
| Teapot              | `1FAD6`   | Brewing                                   |
| Teacup              | `1F375`   | Steeped                                   |
| Honey pot           | `1F36F`   | Sweetening, binding                       |
| Salt shaker         | `1F9C2`   | Salt circles, hearth salt                 |
| Mortar / urn        | `26B1`    | Funeral urn — closest stand-in for mortar |
| Thread spool        | `1F9F5`   | Sewing, binding workings                  |
| Sewing needle       | `1FAA1`   | Pair with thread                          |
| Leaf (fluttering)   | `1F343`   | Generic leaf                              |
| Herb                | `1F33F`   | The Book's default ingredient marker      |
| Fallen leaf         | `1F342`   | Late-season workings                      |
| Rose                | `1F339`   | Love / softness                           |
| Lotus               | `1FAB7`   | Cleansing                                 |
| Hyacinth            | `1FABB`   | Mourning                                  |
| Dagger              | `1F5E1`   | Athamé                                    |
| Magic wand          | `1FA84`   | Yes, an *actual* wand exists              |
| Hamsa               | `1FAAC`   | Protection                                |
| Nazar (evil eye)    | `1F9FF`   | Protection                                |
| Mirror              | `1FA9E`   | Reflection workings                       |
| Jar                 | `1FAD9`   | Spell jars                                |
| Bone                | `1F9B4`   | Divination by bones                       |
| Sparkles            | `2728`    | Glimmer accent                            |
| Star                | `2B50`    | Big single star                           |
| Crescent moon       | `1F319`   | The moon, simple                          |
| Waxing crescent     | `1F312`   | Phase-specific                            |
| Full moon           | `1F315`   | Phase-specific                            |
| New moon            | `1F311`   | Phase-specific                            |
| Mage                | `1F9D9`   | The practitioner avatar                   |

## The poppet caveat

OpenMoji **does not include a poppet / voodoo-doll glyph** (no Unicode
codepoint exists, and OpenMoji's extras don't ship one). Options:

1. I draw one custom in the OpenMoji color style and drop it in
   `assets/illustrations/custom/poppet.svg` — would match best.
2. Commission a one-off from an illustrator.
3. Use 🧸 (`1F9F8`, teddy bear) as a placeholder — *wrong stylistically*.

**Default behaviour: option 1 — flagged in the README.**

## Helper

```jsx
// usage
<OmaIllo name="crystal" size={64} />
```

See `ui_kits/app/illustrations.jsx` for the helper component and the
name → codepoint map.

## License & attribution

All OpenMoji glyphs are CC-BY-SA 4.0. We've added the attribution to the
root README. If you ship the design system to a third party, keep the
attribution intact.
