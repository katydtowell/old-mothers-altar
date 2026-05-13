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
  tag:      <Icon d={<><path d="M3 12 L3 4 L11 4 L21 14 L13 22 Z"/><circle cx="7" cy="8" r="1.3" fill="currentColor" stroke="none"/></>} />,
  lock:     <Icon d={<><rect x="5" y="10" width="14" height="11"/><path d="M8 10 V7 a4 4 0 0 1 8 0 V10"/><circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none"/><line x1="12" y1="15" x2="12" y2="18"/></>} />,
  info:     <Icon d={<><circle cx="12" cy="12" r="9"/><line x1="12" y1="10" x2="12" y2="16"/><circle cx="12" cy="7" r="1.2" fill="currentColor" stroke="none"/></>} />,
  warn:     <Icon d={<><path d="M12 3 L22 20 H2 Z"/><line x1="12" y1="10" x2="12" y2="14"/><circle cx="12" cy="17" r="1.2" fill="currentColor" stroke="none"/></>} />,
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
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
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
      width: fullWidth ? '100%' : undefined, ...style,
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
function Badge({ tone = 'pending', dot = true, children, style }) {
  const tones = {
    pending: { bg: 'var(--action-secondary-bg)', fg: 'var(--fg-2)' },
    sealed:  { bg: 'rgba(0,194,138,0.14)',  fg: 'var(--success)' },
    burning: { bg: 'rgba(243,83,33,0.16)',  fg: 'var(--ember)' },
    moss:    { bg: 'rgba(150,165,96,0.22)', fg: 'var(--olive)' },
    plum:    { bg: 'rgba(118,72,131,0.26)', fg: 'var(--plum)' },
    amber:   { bg: 'rgba(244,175,89,0.18)', fg: 'var(--olive)' },
    indigo:  { bg: 'rgba(45,78,166,0.22)',  fg: 'var(--indigo-500)' },
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
      {dot && <span style={{ width: 5, height: 5, borderRadius: 50, background: t.fg, display: 'inline-block' }} />}
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
      height: 56, padding: '0 8px 0 12px',
      display: 'grid', gridTemplateColumns: '40px 1fr 40px',
      alignItems: 'center', gap: 6,
      borderBottom: '1px solid var(--line-soft)',
      background: 'var(--bg-page)',
    }}>
      <div>{leading}</div>
      <div style={{ textAlign: 'center', minWidth: 0 }}>
        {eyebrow && <div className="oma-eyebrow" style={{ fontSize: 9, marginBottom: 2 }}>{eyebrow}</div>}
        <div style={{
          fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
          fontSize: 18, lineHeight: 1, color: 'var(--fg-1)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{title}</div>
      </div>
      <div style={{ textAlign: 'right' }}>{trailing}</div>
    </div>
  );
}

// ─── TAB BAR (bottom) ───────────────────────────────────────────────
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'altar',    label: 'Altar',    icon: Ico.altar },
    { id: 'workings', label: 'Workings', icon: Ico.sparkle },
    { id: 'book',     label: 'The Book', icon: Ico.book },
  ];
  return (
    <div style={{
      padding: '8px 6px 28px',
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

Object.assign(window, {
  Ico, MoonGlyph, Flame, Btn, IconBtn, Badge, Card, TopBar, TabBar, ThemeToggle,
});
