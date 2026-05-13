// NewWorking.jsx — bottom sheet for composing a new working

function NewWorking({ open, onClose, onCreate }) {
  const [name, setName] = React.useState('Salt for the Threshold');
  const [intent, setIntent] = React.useState('Quiet the doorframe before sleep.');
  const [bind, setBind] = React.useState(true);

  if (!open) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'var(--bg-overlay)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      animation: 'omaFadeIn 220ms var(--ease-out)',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-surface)',
        borderTopLeftRadius: 'var(--r-2xl)', borderTopRightRadius: 'var(--r-2xl)',
        borderTop: '1px solid var(--line-medium)',
        padding: '14px 18px 30px',
        boxShadow: 'var(--shadow-3)',
        animation: 'omaSheetUp 320ms var(--ease-candle)',
        maxHeight: '92%', overflow: 'auto',
      }}>
        {/* grabber */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--line-medium)' }} />
        </div>

        <div className="oma-eyebrow">A new working</div>
        <div style={{
          fontFamily: '"Ohno Blazeface 24", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
          fontSize: 26, color: 'var(--fg-1)', marginTop: 4, marginBottom: 16,
        }}>Begin a Working</div>

        {/* name */}
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="oma-eyebrow" style={{ fontSize: 10 }}>Name it</span>
          <input value={name} onChange={e => setName(e.target.value)} style={{
            background: 'var(--bg-page)', border: '1px solid var(--line-medium)',
            borderRadius: 'var(--r-xs)', padding: '11px 14px',
            color: 'var(--fg-1)', fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
            fontSize: 18, outline: 'none',
          }} />
        </label>

        {/* intent */}
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
          <span className="oma-eyebrow" style={{ fontSize: 10 }}>The intent</span>
          <textarea value={intent} onChange={e => setIntent(e.target.value)} rows="3" style={{
            background: 'var(--bg-page)', border: '1px solid var(--line-medium)',
            borderRadius: 'var(--r-xs)', padding: '11px 14px',
            color: 'var(--fg-1)', fontFamily: 'var(--font-body)', fontSize: 14,
            outline: 'none', resize: 'none',
          }} />
        </label>

        {/* moon picker */}
        <div style={{ marginTop: 14 }}>
          <span className="oma-eyebrow" style={{ fontSize: 10 }}>Best moon</span>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {['new','waxing-crescent','first-quarter','waxing-gibbous','full','waning-gibbous','last-quarter','waning-crescent'].map((m, i) => (
              <button key={m} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 10px', borderRadius: 999,
                background: i === 5 ? 'rgba(45,78,166,0.22)' : 'var(--bg-page)',
                border: '1px solid ' + (i === 5 ? 'rgba(45,78,166,0.45)' : 'var(--line-soft)'),
                color: i === 5 ? 'var(--bone)' : 'var(--fg-2)',
                cursor: 'pointer',
              }}>
                <MoonGlyph phase={m} size={14} color={i === 5 ? 'var(--bone)' : 'var(--fg-2)'} />
              </button>
            ))}
          </div>
        </div>

        {/* bind toggle */}
        <div style={{
          marginTop: 16, padding: '12px 14px',
          border: '1px solid var(--line-soft)', borderRadius: 'var(--r-md)',
          background: 'var(--bg-page)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: 'var(--fg-1)', fontSize: 14, fontWeight: 600 }}>Bind to the book</div>
            <div style={{ color: 'var(--fg-3)', fontSize: 12, marginTop: 2 }}>
              Locks the working after sealing. Casts cannot be unmade.
            </div>
          </div>
          <button onClick={() => setBind(!bind)} style={{
            width: 42, height: 24, borderRadius: 999,
            background: bind ? 'var(--indigo-500)' : 'var(--ink-300)',
            border: 0, cursor: 'pointer', position: 'relative',
            transition: 'background var(--dur-base)',
            flexShrink: 0,
          }}>
            <span style={{
              position: 'absolute', top: 2, left: bind ? 20 : 2,
              width: 20, height: 20, borderRadius: 50,
              background: bind ? 'var(--bone)' : 'var(--slate-300)',
              transition: 'left var(--dur-base) var(--ease-out)',
            }} />
          </button>
        </div>

        {/* footer */}
        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <Btn variant="secondary" size="lg" style={{ flex: '0 0 auto' }} onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" size="lg" icon={Ico.check} fullWidth onClick={() => onCreate({ name, intent, bind })}>
            Seal the Working
          </Btn>
        </div>
      </div>
    </div>
  );
}

window.NewWorking = NewWorking;
