// components.jsx — shared primitives for the Altar app
// All visual tokens come from colors_and_type.css; here we just compose.

// ─── ICONS — Palladini Aquarian Tarot line style ───────────────────
// Bold 2px strokes, rounded joins, filled center-dots and 8-point stars
// as Palladini-style accents. All inherit currentColor.
const Icon = ({ d, size = 22, strokeWidth = 2, fill, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'}
       stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
       strokeLinejoin="round" style={style}>{d}</svg>
);
const Ico = {
  // ── action / chrome ─────────────────────────────────
  search:   <Icon d={<><circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="20.5" y2="20.5"/><circle cx="10.5" cy="10.5" r="1.4" fill="currentColor" stroke="none"/></>} />,
  plus:     <Icon strokeWidth={2.25} d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} />,
  close:    <Icon strokeWidth={2.25} d={<><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></>} />,
  check:    <Icon strokeWidth={2.25} d={<polyline points="4 12.5 9.5 18 20 6.5"/>} />,
  back:     <Icon strokeWidth={2.25} d={<polyline points="15 5 8 12 15 19"/>} />,
  chevron:  <Icon strokeWidth={2.25} d={<polyline points="9 5 16 12 9 19"/>} />,
  more:     <Icon d={<><circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.6" fill="currentColor" stroke="none"/></>} />,
  menu:     <Icon strokeWidth={2.25} d={<><line x1="4" y1="7" x2="20" y2="7"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>} />,
  edit:     <Icon d={<><path d="M4 20 L4 16 L16 4 L20 8 L8 20 Z"/><line x1="13" y1="7" x2="17" y2="11"/></>} />,
  trash:    <Icon d={<><line x1="4" y1="7" x2="20" y2="7"/><path d="M9 7 V5 a1 1 0 0 1 1 -1 h4 a1 1 0 0 1 1 1 V7"/><path d="M7 7 L8 20 a1 1 0 0 0 1 1 h6 a1 1 0 0 0 1 -1 L17 7"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></>} />,
  bell:     <Icon d={<><path d="M6 16 V12 a6 6 0 0 1 12 0 V16 L20 18 H4 Z"/><path d="M10 18 a2 2 0 0 0 4 0"/><circle cx="12" cy="4" r="1" fill="currentColor" stroke="none"/></>} />,
  calendar: <Icon d={<><rect x="4" y="6" width="16" height="14"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="9" y1="3" x2="9" y2="7"/><line x1="15" y1="3" x2="15" y2="7"/><circle cx="9" cy="15" r="1.3" fill="currentColor" stroke="none"/></>} />,
  settings: <Icon strokeWidth={1.9} d={<><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.7" y1="4.7" x2="7.6" y2="7.6"/><line x1="16.4" y1="16.4" x2="19.3" y2="19.3"/><line x1="4.7" y1="19.3" x2="7.6" y2="16.4"/><line x1="16.4" y1="7.6" x2="19.3" y2="4.7"/></>} />,
  user:     <Icon d={<><circle cx="12" cy="8" r="4"/><path d="M4 20 c0 -4 4 -7 8 -7 s8 3 8 7"/></>} />,
  cabinet:  <Icon d={<><rect x="3" y="2" width="18" height="20" rx="1.5"/><line x1="12" y1="2" x2="12" y2="22"/><circle cx="8.5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="15.5" cy="12" r="1.3" fill="currentColor" stroke="none"/></>} />,
  star:     <Icon d={<><polygon points="12 2 15.1 8.4 22.1 9.3 17 14.3 18.2 21.3 12 18 5.8 21.3 7 14.3 1.9 9.3 8.9 8.4"/></>} />,
  photo:    <Icon d={<><rect x="3" y="6" width="18" height="13" rx="1.5"/><circle cx="12" cy="12.5" r="3"/><path d="M9 6 L10.5 3 L13.5 3 L15 6"/><circle cx="17" cy="9" r="0.8" fill="currentColor" stroke="none"/></>} />,
  image:    <Icon d={<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>} />,

  // ── ritual ──────────────────────────────────────────
  moon:     <Icon d={<><path d="M19 14 a8 8 0 1 1 -9 -9 a6 6 0 0 0 9 9 Z"/><path d="M6 7 L7 5.5 L7.5 7 L9 7.5 L7.5 8 L7 9.5 L6.5 8 L5 7.5 Z" fill="currentColor" stroke="none"/></>} />,
  moonIcon: <Icon d={<path d="M19 14 a8 8 0 1 1 -9 -9 a6 6 0 0 0 9 9 Z"/>} />,
  sun:      <Icon d={<><circle cx="12" cy="12" r="3.5"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="5" y1="5" x2="7" y2="7"/><line x1="17" y1="17" x2="19" y2="19"/><line x1="5" y1="19" x2="7" y2="17"/><line x1="17" y1="7" x2="19" y2="5"/></>} />,
  flame:    <Icon d={<><path d="M12 2 c -3 3 -6 7 -6 12 a 6 6 0 0 0 12 0 c 0 -3 -1.5 -5 -3 -7 a 3 3 0 0 1 -3 4 c -1 -3 0 -5 0 -9 Z"/><circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none"/></>} />,
  candle:   <Icon d={<><path d="M12 2 c -1.5 1.5 -3 3.5 -3 5.5 a 3 3 0 0 0 6 0 c 0 -2 -1.5 -4 -3 -5.5 Z"/><rect x="10" y="11" width="4" height="9"/><line x1="9" y1="20" x2="15" y2="20"/><circle cx="12" cy="6" r="0.9" fill="currentColor" stroke="none"/></>} />,
  leaf:     <Icon d={<><path d="M5 19 c 0 -8 6 -14 14 -14 c 0 8 -6 14 -14 14 Z"/><line x1="5" y1="19" x2="13" y2="11"/></>} />,
  star:     <Icon strokeWidth={1.8} d={<><path d="M12 2 L13.5 8.3 L19.1 4.9 L15.7 10.5 L22 12 L15.7 13.5 L19.1 19.1 L13.5 15.7 L12 22 L10.5 15.7 L4.9 19.1 L8.3 13.5 L2 12 L8.3 10.5 L4.9 4.9 L10.5 8.3 Z"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></>} />,
  eye:      <Icon d={<><path d="M2 12 c 3 -5 7 -7 10 -7 s 7 2 10 7 c -3 5 -7 7 -10 7 s -7 -2 -10 -7 Z"/><circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></>} />,
  key:      <Icon d={<><circle cx="7" cy="12" r="4"/><line x1="11" y1="12" x2="20" y2="12"/><line x1="17" y1="12" x2="17" y2="15"/><line x1="20" y1="12" x2="20" y2="16"/><circle cx="7" cy="12" r="1" fill="currentColor" stroke="none"/></>} />,
  book:     <Icon d={<><path d="M2 5 H10 a2 2 0 0 1 2 2 V20 a2 2 0 0 0 -2 -2 H2 Z"/><path d="M22 5 H14 a2 2 0 0 0 -2 2 V20 a2 2 0 0 1 2 -2 H22 Z"/><line x1="5" y1="9" x2="9" y2="9"/><line x1="5" y1="12" x2="9" y2="12"/><line x1="15" y1="9" x2="19" y2="9"/><line x1="15" y1="12" x2="19" y2="12"/></>} />,
  altar:    <Icon d={<><line x1="3" y1="20.5" x2="21" y2="20.5"/><rect x="3" y="3" width="18" height="3"/><rect x="4.5" y="6" width="3" height="14.5"/><rect x="16.5" y="6" width="3" height="14.5"/><line x1="10" y1="9" x2="14" y2="9" stroke="currentColor"/><circle cx="12" cy="13" r="1.4" fill="currentColor" stroke="none"/></>} />,
  sparkle:  <Icon d={<><path d="M12 3 L13 11 L21 12 L13 13 L12 21 L11 13 L3 12 L11 11 Z" fill="currentColor" stroke="none"/><circle cx="19" cy="5" r="1" fill="currentColor" stroke="none"/><circle cx="5" cy="19" r="1.2" fill="currentColor" stroke="none"/></>} />,
  pentacle: <Icon strokeWidth={1.9} d={<><circle cx="12" cy="12" r="9.5"/><polygon points="12 5 13.65 9.73 18.66 9.84 14.66 12.87 16.11 17.66 12 14.8 7.89 17.66 9.34 12.87 5.34 9.84 10.35 9.73"/></>} />,
  hand:     <Icon d={<><path d="M9 11 V4.5 a1.2 1.2 0 0 1 2.4 0 V11"/><path d="M11.4 11 V3 a1.2 1.2 0 0 1 2.4 0 V11"/><path d="M13.8 11 V4 a1.2 1.2 0 0 1 2.4 0 V13"/><path d="M16.2 11 V6 a1.2 1.2 0 0 1 2.4 0 V14 a7 7 0 0 1 -7 7 a 5 5 0 0 1 -5 -5 V11 a1.2 1.2 0 0 1 2.4 0 V14"/></>} />,
  jar:      <Icon d={<><path d="M8 3 H16 V6 H8 Z"/><path d="M7 6 H17 L17 18 a3 3 0 0 1 -3 3 H10 a3 3 0 0 1 -3 -3 Z"/><line x1="9" y1="11" x2="15" y2="11"/><circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none"/></>} />,
  feather:  <Icon d={<><path d="M4 20 L10 14 a 8 8 0 0 1 10 -10 a 14 14 0 0 1 -10 16 Z"/><line x1="4" y1="20" x2="13" y2="11"/></>} />,
  penTool:  <Icon d={<><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></>} />,
  tag:      <Icon d={<><path d="M3 12 L3 4 L11 4 L21 14 L13 22 Z"/><circle cx="7" cy="8" r="1.3" fill="currentColor" stroke="none"/></>} />,
  lock:     <Icon d={<><rect x="5" y="10" width="14" height="11"/><path d="M8 10 V7 a4 4 0 0 1 8 0 V10"/><circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none"/><line x1="12" y1="15" x2="12" y2="18"/></>} />,
  info:     <Icon d={<><circle cx="12" cy="12" r="9"/><line x1="12" y1="10" x2="12" y2="16"/><circle cx="12" cy="7" r="1.2" fill="currentColor" stroke="none"/></>} />,
  warn:     <Icon d={<><path d="M12 3 L22 20 H2 Z"/><line x1="12" y1="10" x2="12" y2="14"/><circle cx="12" cy="17" r="1.2" fill="currentColor" stroke="none"/></>} />,
  filter:   <Icon strokeWidth={2} d={<><path d="M22 3H2l8 9.46V19l4 2V12.46Z"/></>} />,
  heart:       <Icon strokeWidth={1.9} d={<><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>} />,
  heartFilled: <Icon strokeWidth={1.9} fill="currentColor" d={<><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>} />,
};

// ─── MOON GLYPH (8 phases) ──────────────────────────────────────────
function MoonGlyph({ phase = 'waning-gibbous', size = 22, color = 'currentColor' }) {
  // phases: new, waxing-crescent, first-quarter, waxing-gibbous,
  //         full, waning-gibbous, last-quarter, waning-crescent
  const r = size / 2;
  let face;
  switch (phase) {
    case 'new':              face = <circle cx={r} cy={r} r={r - 1} fill="none" stroke={color} strokeWidth="1.5"/>; break;
    case 'full':             face = <circle cx={r} cy={r} r={r - 1} fill={color}/>; break;
    case 'first-quarter':    face = <><circle cx={r} cy={r} r={r - 1} fill="none" stroke={color} strokeWidth="1.5"/><path d={`M${r} ${1} A ${r - 1} ${r - 1} 0 0 1 ${r} ${size - 1} Z`} fill={color}/></>; break;
    case 'last-quarter':     face = <><circle cx={r} cy={r} r={r - 1} fill="none" stroke={color} strokeWidth="1.5"/><path d={`M${r} ${1} A ${r - 1} ${r - 1} 0 0 0 ${r} ${size - 1} Z`} fill={color}/></>; break;
    case 'waxing-crescent':  face = <><circle cx={r} cy={r} r={r - 1} fill="none" stroke={color} strokeWidth="1.5"/><path d={`M${r - 2} ${1} A ${r - 1} ${r - 1} 0 0 1 ${r - 2} ${size - 1} A ${r - 3} ${r - 1} 0 0 0 ${r - 2} ${1} Z`} fill={color}/></>; break;
    case 'waxing-gibbous':   face = <><circle cx={r} cy={r} r={r - 1} fill={color}/><path d={`M${r - 3} ${1} A ${r - 1} ${r - 1} 0 0 0 ${r - 3} ${size - 1} A ${r - 6} ${r - 1} 0 0 0 ${r - 3} ${1} Z`} fill="var(--bg-page)"/></>; break;
    case 'waning-gibbous':   face = <><circle cx={r} cy={r} r={r - 1} fill={color}/><path d={`M${r + 3} ${1} A ${r - 1} ${r - 1} 0 0 1 ${r + 3} ${size - 1} A ${r - 6} ${r - 1} 0 0 1 ${r + 3} ${1} Z`} fill="var(--bg-page)"/></>; break;
    case 'waning-crescent':  face = <><circle cx={r} cy={r} r={r - 1} fill="none" stroke={color} strokeWidth="1.5"/><path d={`M${r + 2} ${1} A ${r - 1} ${r - 1} 0 0 0 ${r + 2} ${size - 1} A ${r - 3} ${r - 1} 0 0 1 ${r + 2} ${1} Z`} fill={color}/></>; break;
    default:                 face = <circle cx={r} cy={r} r={r - 1} fill={color}/>;
  }
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>{face}</svg>;
}

// ─── CANDLE FLAME (animated, mode-aware) ───────────────────────────
function Flame({ size = 28 }) {
  return (
    <div className="oma-flame" style={{ width: size, height: size * 1.2, position: 'relative' }}>
      <svg viewBox="0 0 28 36" width={size} height={size * 1.28} style={{ display: 'block' }}>
        <defs>
          <radialGradient id="fg" cx="50%" cy="80%" r="70%">
            <stop offset="0%"   stopColor="var(--flame-1)" />
            <stop offset="35%"  stopColor="var(--flame-2)" />
            <stop offset="75%"  stopColor="var(--flame-3)" />
            <stop offset="100%" stopColor="var(--flame-4)" />
          </radialGradient>
        </defs>
        <path d="M14 2c-2 4-7 8-7 16a7 7 0 0 0 14 0c0-4-2-7-3-9 .5 2-.5 3-1.5 3.5C16 11 17 7 14 2Z" fill="url(#fg)" />
      </svg>
    </div>
  );
}

// ─── THEME TOGGLE ───────────────────────────────────────────────────
function ThemeToggle({ theme, onChange }) {
  const isLight = theme === 'light';
  return (
    <button
      aria-label={isLight ? 'Switch to dark' : 'Switch to light'}
      onClick={() => onChange(isLight ? 'dark' : 'light')}
      style={{
        width: 40, height: 40, borderRadius: 'var(--r-md)',
        background: 'transparent', border: 0, cursor: 'pointer',
        color: 'var(--fg-2)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
      }}
    >
      {isLight ? Ico.sun : Ico.moonIcon}
    </button>
  );
}

// ─── BUTTON ─────────────────────────────────────────────────────────
const omaBtnStyles = {
  base: {
    fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.04em',
    border: 0, cursor: 'pointer', lineHeight: 1, borderRadius: 'var(--r-sm)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
  },
  lg: { padding: '14px 20px', fontSize: 15 },
  md: { padding: '11px 16px', fontSize: 14 },
  sm: { padding: '8px 12px', fontSize: 13, borderRadius: 'var(--r-xs)' },
  primary:   { background: 'var(--action-primary-bg)',   color: 'var(--action-primary-fg)' },
  secondary: { background: 'var(--action-secondary-bg)', color: 'var(--action-secondary-fg)', border: '1px solid var(--line-soft)' },
  ghost:     { background: 'transparent', color: 'var(--action-ghost-fg)' },
  danger:    { background: 'var(--action-danger-bg)', color: 'var(--action-danger-fg)' },
  ember:     { background: 'rgba(243,83,33,0.16)', color: 'var(--ember)', border: '1px solid rgba(243,83,33,0.30)' },
};
function Btn({ variant = 'primary', size = 'md', icon, children, onClick, style, fullWidth }) {
  return (
    <button onClick={onClick} style={{
      ...omaBtnStyles.base, ...omaBtnStyles[size], ...omaBtnStyles[variant],
      width: fullWidth ? '100%' : 'fit-content', ...style,
    }}>
      {icon && React.cloneElement(icon, { size: 16 })}
      {children}
    </button>
  );
}

// ─── ICON BUTTON ────────────────────────────────────────────────────
function IconBtn({ icon, onClick, label, style, active }) {
  return (
    <button onClick={onClick} aria-label={label} style={{
      width: 40, height: 40, borderRadius: 'var(--r-md)',
      background: active ? 'var(--chrome-active-bg)' : 'transparent',
      border: 0, cursor: 'pointer',
      color: active ? 'var(--chrome-active-fg)' : 'var(--fg-2)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
      ...style,
    }}>{icon}</button>
  );
}

// ─── BADGE ─────────────────────────────────────────────────────────
// Each tone carries fg (text) and dot (accent dot) separately.
// Contrast targets: all text ≥4.5:1 on composited badge bg.
function Badge({ tone = 'pending', dot = true, children, style }) {
  const tones = {
    pending: { bg: 'var(--action-secondary-bg)', fg: 'var(--fg-2)',   dot: 'var(--fg-2)' },   // ~8.9:1 ✓
    sealed:  { bg: 'rgba(0,194,138,0.14)',        fg: 'var(--success)', dot: 'var(--success)' }, // ~6.6:1 ✓
    burning: { bg: 'rgba(243,83,33,0.18)',        fg: 'var(--saffron)', dot: 'var(--ember)' },   // saffron ~6.8:1 ✓; dot stays ember
    moss:    { bg: 'rgba(150,165,96,0.22)',       fg: 'var(--moss)',   dot: 'var(--moss)' },    // moss ~4.7:1 ✓ (was --olive: 2.8:1 ✗)
    plum:    { bg: 'rgba(118,72,131,0.26)',       fg: 'var(--fg-1)',   dot: 'var(--plum)' },    // bone ~15:1 ✓ (was --plum: 2.1:1 ✗)
    amber:   { bg: 'rgba(244,175,89,0.18)',       fg: 'var(--amber)',  dot: 'var(--amber)' },   // amber ~6.9:1 ✓ (was --olive: 2.8:1 ✗)
    indigo:  { bg: 'rgba(45,78,166,0.26)',        fg: 'var(--fg-1)',   dot: 'var(--indigo-300)' }, // bone ~15:1 ✓ (was --indigo-500: 2.0:1 ✗)
  };
  const t = tones[tone] || tones.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 9px', borderRadius: 999,
      background: t.bg, color: t.fg,
      fontFamily: 'var(--font-body)', fontWeight: 600,
      fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
      lineHeight: 1, ...style,
    }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: 50, background: t.dot, display: 'inline-block' }} />}
      {children}
    </span>
  );
}

// ─── CARD ──────────────────────────────────────────────────────────
function Card({ children, glow, vellum, padding = 16, style, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: vellum ? 'var(--bone)' : 'var(--bg-surface)',
      color: vellum ? 'var(--ink-100)' : undefined,
      border: '1px solid ' + (vellum ? 'var(--line-vellum)' : 'var(--line-soft)'),
      borderRadius: 'var(--r-lg)',
      padding,
      boxShadow: glow === 'ember' ? 'var(--glow-ember)' : glow === 'indigo' ? 'var(--glow-indigo)' : 'var(--shadow-1)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform var(--dur-fast) var(--ease-out)',
      ...style,
    }}>{children}</div>
  );
}

// ─── TOP BAR (in-frame) ─────────────────────────────────────────────
function TopBar({ title, leading, trailing, eyebrow }) {
  return (
    <div style={{
      height: 56, padding: '0 4px 0 4px',
      display: 'grid', gridTemplateColumns: '40px 1fr auto',
      alignItems: 'center', gap: 0,
      borderBottom: '1px solid var(--line-soft)',
      background: 'var(--bg-page)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>{leading}</div>
      <div style={{ textAlign: 'center', minWidth: 0, padding: '0 4px' }}>
        {eyebrow && <div className="oma-eyebrow" style={{ fontSize: 9, marginBottom: 2 }}>{eyebrow}</div>}
        <div style={{
          fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
          fontSize: 18, lineHeight: 1, color: 'var(--fg-1)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{title}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>{trailing}</div>
    </div>
  );
}

// ─── TAB BAR (bottom) ───────────────────────────────────────────────
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'altar',    label: 'Home',     icon: Ico.altar },
    { id: 'workings', label: 'Grimoire', icon: Ico.sparkle },
    { id: 'book',     label: 'Journal',  icon: Ico.book },
    { id: 'cabinet',  label: 'Cabinet',  icon: Ico.cabinet },
    { id: 'profile',  label: 'Settings', icon: Ico.settings },
  ];
  return (
    <div style={{
      padding: '8px 6px var(--bottom-inset, 28px)',
      display: 'flex', justifyContent: 'space-around',
      borderTop: '1px solid var(--line-soft)',
      background: 'var(--bg-page)',
    }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            background: 'transparent', border: 0, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '6px 12px', borderRadius: 'var(--r-md)',
            color: isActive ? 'var(--fg-1)' : 'var(--fg-3)',
            fontFamily: 'var(--font-body)', fontWeight: 600,
            fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase',
            position: 'relative',
          }}>
            <span style={{ color: isActive ? 'var(--amber)' : 'var(--fg-3)' }}>
              {React.cloneElement(t.icon, { size: 20 })}
            </span>
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── BOTTOM BAR (contextual action bar) ────────────────────────────
function BottomBar({ children, style }) {
  return (
    <div style={{
      padding: '10px 16px var(--bottom-inset, 40px)',
      display: 'flex', gap: 8, alignItems: 'stretch',
      borderTop: '1px solid var(--line-soft)',
      background: 'var(--bg-page)',
      flexShrink: 0,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── SLIDE-IN DRAWER ────────────────────────────────────────────────
function Drawer({ open, onClose, activeTab, onChangeTab, onLogOut, theme }) {
  const tabs = [
    { id: 'altar',    label: 'Home',        icon: Ico.altar   },
    { id: 'workings', label: 'Grimoire',     icon: Ico.sparkle },
    { id: 'book',     label: 'The Journal',  icon: Ico.book    },
    { id: 'cabinet',  label: 'The Cabinet',  icon: Ico.cabinet },
    { id: 'profile',  label: 'Settings',     icon: Ico.settings },
    { id: 'help',     label: 'How to Use',   icon: Ico.info    },
  ];
  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, zIndex: 150,
        background: open ? 'rgba(0,0,0,0.55)' : 'transparent',
        backdropFilter: open ? 'blur(2px)' : 'none',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'background 0.25s, backdrop-filter 0.25s',
      }} />
      {/* Panel */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: '72%', maxWidth: 280, zIndex: 160,
        background: 'var(--bg-surface)',
        borderLeft: '1px solid var(--line-soft)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.28s cubic-bezier(0.32,0,0.15,1)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '18px 18px 16px', borderBottom: '1px solid var(--line-soft)', position: 'relative', paddingTop: 62 }}>
          {/* Close X */}
          <button onClick={onClose} aria-label="Close menu" style={{
            position: 'absolute', top: 14, right: 14,
            width: 32, height: 32, borderRadius: 'var(--r-md)',
            background: 'transparent', border: 0, cursor: 'pointer',
            color: 'var(--fg-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'color 0.15s, background 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg-1)'; e.currentTarget.style.background = 'var(--action-secondary-bg)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-3)'; e.currentTarget.style.background = 'transparent'; }}
          >
            {React.cloneElement(Ico.close, { size: 18 })}
          </button>
          {/* Logo */}
          {(() => {
            const src = theme === 'light' ? window.OMA_LOGO_PRIMARY : window.OMA_LOGO_WHITE;
            return src
              ? <img src={src} alt="Old Mother's Altar" style={{ height: 28, display: 'block', opacity: 0.9 }} />
              : <div className="oma-eyebrow">Old Mother's Altar</div>;
          })()}
        </div>
        {/* Nav links */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
          {tabs.map(t => {
            const isActive = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => { onChangeTab(t.id); onClose(); }} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 14px', borderRadius: 'var(--r-md)',
                background: isActive ? 'var(--chrome-active-bg)' : 'transparent',
                border: 0, cursor: 'pointer', textAlign: 'left', marginBottom: 2,
                color: isActive ? 'var(--chrome-active-fg)' : 'var(--fg-2)',
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: 14, letterSpacing: '0.02em',
              }}>
                <span style={{ color: isActive ? 'var(--amber)' : 'var(--fg-3)' }}>
                  {React.cloneElement(t.icon, { size: 20 })}
                </span>
                {t.label}
              </button>
            );
          })}
        </nav>
        {/* Log Out */}
        <div style={{ padding: '10px 8px 32px', borderTop: '1px solid var(--line-soft)' }}>
          <button onClick={() => { onClose(); onLogOut && onLogOut(); }} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px 14px', borderRadius: 'var(--r-md)',
            background: 'transparent',
            border: 0, cursor: 'pointer', textAlign: 'left',
            color: 'var(--fg-3)',
            fontFamily: 'var(--font-body)', fontWeight: 600,
            fontSize: 14, letterSpacing: '0.02em',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--ember)'; e.currentTarget.style.background = 'rgba(243,83,33,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-3)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {React.cloneElement(Ico.key, { size: 20 })}
            </span>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

// ─── SEARCH SELECT (single or multi-select with search) ─────────────
function SearchSelect({ items, value, onChange, placeholder = 'Select…', multi = false }) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [otherInput, setOtherInput] = React.useState('');
  const containerRef = React.useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQ('');
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  const normalize = item =>
    typeof item === 'string' ? { key: item, label: item } : { key: item.key, label: item.label };
  const normalized = items.map(normalize);
  const filtered = normalized.filter(i => i.label.toLowerCase().includes(q.toLowerCase()));

  const isSelected = key =>
    multi ? (Array.isArray(value) && value.includes(key)) : value === key;

  // True when "Other" is the current / one of the current selections
  const otherSelected = multi
    ? (Array.isArray(value) && value.includes('Other'))
    : value === 'Other';

  // Commit the typed custom value, replacing "Other"
  function commitOther() {
    const trimmed = otherInput.trim();
    if (!trimmed) return; // nothing typed yet — leave "Other" in place
    if (multi) {
      const arr = Array.isArray(value) ? value : [];
      onChange([...arr.filter(k => k !== 'Other'), trimmed]);
    } else {
      onChange(trimmed);
    }
    setOtherInput('');
  }

  function handleSelect(key) {
    if (multi) {
      const arr = Array.isArray(value) ? value : [];
      onChange(arr.includes(key) ? arr.filter(k => k !== key) : [...arr, key]);
    } else {
      onChange(value === key ? '' : key);
      setOpen(false);
      setQ('');
    }
  }

  // All currently-selected items, including any custom values not in the list
  const knownKeys = new Set(normalized.map(i => i.key));
  const allSelected = multi
    ? (Array.isArray(value) ? value : []).map(k =>
        knownKeys.has(k) ? normalized.find(i => i.key === k) : { key: k, label: k }
      )
    : [];
  const selectedItems = multi ? allSelected : normalized.filter(i => isSelected(i.key));
  const displayText = multi
    ? selectedItems.map(i => i.label).join(', ')
    : (value && !knownKeys.has(value) ? value : (selectedItems[0]?.label || ''));

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        onClick={() => { setOpen(o => !o); setQ(''); }}
        style={{
          width: '100%', padding: '11px 14px', boxSizing: 'border-box',
          background: 'var(--bg-page)',
          border: '1px solid var(--line-medium)',
          borderRadius: 'var(--r-xs)',
          color: selectedItems.length ? 'var(--fg-1)' : 'var(--fg-3)',
          fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          textAlign: 'left',
        }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {displayText || placeholder}
        </span>
        {React.cloneElement(Ico.chevron, { size: 14, style: {
          transform: open ? 'rotate(270deg)' : 'rotate(90deg)',
          transition: 'transform 0.18s', flexShrink: 0, color: 'var(--fg-3)',
        }})}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200,
          marginTop: 2,
          border: '1px solid var(--line-medium)',
          borderRadius: 'var(--r-xs)',
          background: 'var(--bg-page)',
          boxShadow: 'var(--shadow-3)',
          maxHeight: 240, display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--line-soft)', flexShrink: 0 }}>
            <input
              value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search…"
              style={{
                width: '100%', border: 0, background: 'transparent', outline: 0,
                color: 'var(--fg-1)', fontFamily: 'var(--font-body)', fontSize: 13, boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '12px 14px', color: 'var(--fg-3)', fontSize: 13 }}>No matches</div>
            ) : filtered.map((item, i) => {
              const active = isSelected(item.key);
              return (
                <button key={item.key}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => handleSelect(item.key)}
                  style={{
                    width: '100%', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
                    background: active ? 'var(--chrome-active-bg)' : 'transparent',
                    border: 0, borderTop: i === 0 ? 0 : '1px solid var(--line-soft)',
                    cursor: 'pointer', textAlign: 'left',
                    color: active ? 'var(--chrome-active-fg)' : 'var(--fg-1)',
                    fontFamily: 'var(--font-body)', fontSize: 13,
                  }}>
                  <div style={{
                    width: 16, height: 16, flexShrink: 0,
                    borderRadius: multi ? 3 : '50%',
                    background: active ? 'var(--chrome-active-fg)' : 'transparent',
                    border: '1.5px solid ' + (active ? 'var(--chrome-active-fg)' : 'var(--line-medium)'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {active && <span style={{ color: 'var(--bg-page)', fontSize: 9, fontWeight: 800, lineHeight: 1 }}>✓</span>}
                  </div>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {multi && selectedItems.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
          {selectedItems.map(item => (
            <span key={item.key} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '3px 8px', borderRadius: 999, fontSize: 12,
              background: 'var(--chrome-active-bg)', color: 'var(--chrome-active-fg)',
              border: '1px solid var(--chrome-active-line)',
            }}>
              {item.label}
              <button onClick={e => { e.stopPropagation(); handleSelect(item.key); }} style={{
                background: 'none', border: 0, cursor: 'pointer', padding: 0,
                lineHeight: 1, color: 'inherit', fontSize: 15, display: 'flex', alignItems: 'center',
              }}>×</button>
            </span>
          ))}
        </div>
      )}

      {/* When "Other" is selected, show an inline text input to capture the custom value */}
      {otherSelected && (
        <input
          autoFocus
          value={otherInput}
          onChange={e => setOtherInput(e.target.value)}
          onBlur={commitOther}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commitOther(); } }}
          placeholder="Describe your custom option…"
          style={{
            marginTop: 8, width: '100%', boxSizing: 'border-box',
            padding: '9px 12px',
            background: 'var(--bg-page)',
            border: '1px solid var(--line-medium)',
            borderRadius: 'var(--r-xs)',
            color: 'var(--fg-1)', fontFamily: 'var(--font-body)', fontSize: 13,
            outline: 'none',
          }}
        />
      )}

      {/* Single-select: show the same input beneath the trigger when "Other" is chosen */}
      {!multi && value === 'Other' && (
        <input
          autoFocus
          value={otherInput}
          onChange={e => setOtherInput(e.target.value)}
          onBlur={commitOther}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commitOther(); } }}
          placeholder="Describe your custom option…"
          style={{
            marginTop: 8, width: '100%', boxSizing: 'border-box',
            padding: '9px 12px',
            background: 'var(--bg-page)',
            border: '1px solid var(--line-medium)',
            borderRadius: 'var(--r-xs)',
            color: 'var(--fg-1)', fontFamily: 'var(--font-body)', fontSize: 13,
            outline: 'none',
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  Ico, MoonGlyph, Flame, Btn, IconBtn, Badge, Card, TopBar, TabBar, ThemeToggle,
  BottomBar, Drawer, SearchSelect,
});
