// illustrations.jsx — OpenMoji-backed illustrative glyphs +
// hand-drawn customs for items OpenMoji doesn't cover.
// License: OpenMoji is CC-BY-SA 4.0 (HfG Schwäbisch Gmünd).
// Customs in assets/illustrations/custom/ are part of the OMA design system.

const OPENMOJI_CDN = 'https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/svg/';
const OPENMOJI_BLACK_CDN = 'https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/black/svg/';
const CUSTOM_PATH  = '../../assets/illustrations/custom/';
const ZODIAC_PATH  = OPENMOJI_BLACK_CDN; // zodiac now uses OpenMoji black variants

// Each value is either:
//   string                    — OpenMoji codepoint (color, via CDN)
//   { black: 'CODEPOINT' }    — OpenMoji codepoint, black/monochrome variant
//   { custom: 'filename.svg' } — hand-drawn color illustration
//   { planet: 'name.svg' }     — hand-drawn color planet
const OMA_ILLO_MAP = {
  // ── Ingredient categories (the Altar's working vocabulary) ────────
  candle:         '1F56F',                          // OpenMoji default
  stringCord:     '1F9F5',                          // OpenMoji default
  personalItem:   '1F48D',
  paper:          '1F4C4',
  organicMaterial:'1F33C',                          // blossom
  crystal:        { custom: 'crystal.svg' },
  herb:           '1F343',
  poppet:         { custom: 'poppet.svg' },
  athame:         '1F5E1',
  besom:          '1F9F9',
  incense:        { custom: 'incense.svg' },
  smudgeBundle:   { custom: 'smudge-bundle.svg' },
  tea:            '1FAD6',
  tincture:       '1F9EA',
  other:          '2728',

  // ── Extras ─────────────────────────────────────────────────────────
  crystalBall:    '1F52E',
  mage:           '1F9D9',
  fire:           '1F525',
  teacup:         '1F375',
  honey:          '1F36F',
  salt:           '1F9C2',
  jar:            '1FAD9',
  urn:            '26B1',
  sewingNeedle:   '1FAA1',
  leaf:           '1F343',
  fallenLeaf:     '1F342',
  rose:           '1F339',
  lotus:          '1FAB7',
  hyacinth:       '1FABB',
  wand:           '1FA84',
  mirror:         '1FA9E',
  feather:        '1FAB6',
  hamsa:          '1FAAC',
  nazar:          '1F9FF',
  bone:           '1F9B4',

  // ── Astrology: zodiac line glyphs (OpenMoji black) ────────────────
  aries:       { black: '2648' },
  taurus:      { black: '2649' },
  gemini:      { black: '264A' },
  cancerSign:  { black: '264B' },
  leoSign:     { black: '264C' },
  virgo:       { black: '264D' },
  libra:       { black: '264E' },
  scorpio:     { black: '264F' },
  sagittarius: { black: '2650' },
  capricorn:   { black: '2651' },
  aquarius:    { black: '2652' },
  pisces:      { black: '2653' },

  // ── Astrology: illustrative planets & moon phases ─────────────────
  sun:           { planet: 'sun.svg' },
  moon:          { planet: 'moon.svg' },
  mercury:       { planet: 'mercury.svg' },
  venus:         { planet: 'venus.svg' },
  earth:         { planet: 'earth.svg' },
  mars:          { planet: 'mars.svg' },
  jupiter:       { planet: 'jupiter.svg' },
  saturn:        { planet: 'saturn.svg' },
  uranus:        { planet: 'uranus.svg' },
  neptune:       { planet: 'neptune.svg' },
  pluto:         { planet: 'pluto.svg' },

  // Moon phases — hand-drawn, match planets style
  moonNew:           { planet: 'moon-new-moon.svg' },
  moonWaxingCrescent:{ planet: 'moon-waxing-crescent.svg' },
  moonFirstQuarter:  { planet: 'moon-first-quarter.svg' },
  moonWaxingGibbous: { planet: 'moon-waxing-gibbous.svg' },
  moonFull:          { planet: 'moon-full-moon.svg' },
  moonWaningGibbous: { planet: 'moon-waning-gibbous.svg' },
  moonLastQuarter:   { planet: 'moon-last-quarter.svg' },
  moonWaningCrescent:{ planet: 'moon-waning-crescent.svg' },

  // moon phases (OpenMoji)
  newMoon:        '1F311',
  waxingCrescent: '1F312',
  firstQuarter:   '1F313',
  waxingGibbous:  '1F314',
  fullMoon:       '1F315',
  waningGibbous:  '1F316',
  lastQuarter:    '1F317',
  waningCrescent: '1F318',
  crescent:       '1F319',

  sparkles:       '2728',
  star:           '2B50',
};

// Resolve a name → URL
function omaIlloSrc(name, opts = {}) {
  const m = OMA_ILLO_MAP[name];
  if (!m) return null;
  if (typeof m === 'string') return `${OPENMOJI_CDN}${m}.svg`;
  if (m.black)  return `${OPENMOJI_BLACK_CDN}${m.black}.svg`;
  if (m.custom) return `${opts.customBase || CUSTOM_PATH}${m.custom}`;
  if (m.planet) return `${opts.planetBase || (opts.customBase || CUSTOM_PATH) + 'planets/'}${m.planet}`;
  return null;
}

// <OmaIllo name="crystal" size={48} />
function OmaIllo({ name, size = 48, alt, style, customBase }) {
  const src = omaIlloSrc(name, { customBase });
  if (!src) {
    return (
      <span
        title={`${name} — illustration TBD`}
        style={{
          width: size, height: size, display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center',
          borderRadius: 8, background: 'var(--bg-elevated)',
          border: '1px dashed var(--line-medium)',
          color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: size / 5,
          ...style,
        }}
      >{name}</span>
    );
  }
  return (
    <img
      src={src}
      alt={alt || name}
      width={size} height={size}
      style={{ display: 'block', ...style }}
    />
  );
}

Object.assign(window, { OmaIllo, OMA_ILLO_MAP, omaIlloSrc });
