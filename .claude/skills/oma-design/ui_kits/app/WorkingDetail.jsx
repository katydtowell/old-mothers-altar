// WorkingDetail.jsx — single working with cast history, ingredients

function WorkingDetail({ working, onBack, onCast }) {
  if (!working) return null;
  const { name, summary, ingredients, casts, color, icon, sealed, tags, moonPhase } = working;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* hero band */}
      <div style={{
        padding: '18px 18px 22px',
        background: `linear-gradient(180deg, ${color}22, transparent 90%)`,
        borderBottom: '1px solid var(--line-soft)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 'var(--r-md)',
            background: color + '33', color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{React.cloneElement(icon, { size: 22 })}</div>
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {sealed ? <Badge tone="sealed">Sealed</Badge> : <Badge tone="amber">Draft</Badge>}
              <Badge tone="pending" dot={false}>{tags[0]}</Badge>
            </div>
          </div>
        </div>
        <div style={{
          fontFamily: '"Ohno Blazeface 36", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
          fontSize: 32, lineHeight: 1.0, color: 'var(--fg-1)',
          letterSpacing: '-0.01em',
        }}>{name}</div>
        <div style={{ color: 'var(--fg-2)', fontSize: 13, marginTop: 8, lineHeight: 1.5, maxWidth: 340 }}>
          {summary}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
          <MoonGlyph phase={moonPhase} size={14} color="var(--fg-2)" />
          <span>BEST UNDER {moonPhase.replace('-', ' ').toUpperCase()}</span>
          <span>·</span>
          <span>{casts.length} CAST</span>
        </div>
      </div>

      {/* ingredients */}
      <div style={{ padding: '18px 18px 8px' }}>
        <span className="oma-eyebrow">Ingredients</span>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10, border: '1px solid var(--line-soft)', borderRadius: 'var(--r-lg)', overflow: 'hidden', background: 'var(--bg-surface)' }}>
          {ingredients.map((ing, i) => (
            <div key={ing.name} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px',
              borderTop: i === 0 ? 0 : '1px solid var(--line-soft)',
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 50,
                background: 'rgba(150,165,96,0.18)', color: 'var(--moss)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{React.cloneElement(Ico.leaf, { size: 14 })}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--fg-1)', fontSize: 14, fontWeight: 500 }}>{ing.name}</div>
                {ing.note && <div style={{ color: 'var(--fg-3)', fontSize: 11, marginTop: 2 }}>{ing.note}</div>}
              </div>
              <div style={{ color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                {ing.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* cast history */}
      <div style={{ padding: '14px 18px 18px' }}>
        <span className="oma-eyebrow">Cast history</span>
        <div style={{ marginTop: 12, position: 'relative', paddingLeft: 12 }}>
          {/* vertical line */}
          <div style={{ position: 'absolute', left: 4, top: 6, bottom: 6, width: 1, background: 'var(--line-medium)' }} />
          {casts.map((c, i) => (
            <div key={c.id} style={{ position: 'relative', paddingLeft: 18, paddingBottom: i === casts.length - 1 ? 0 : 18 }}>
              <div style={{
                position: 'absolute', left: -2, top: 4, width: 11, height: 11,
                borderRadius: 50, background: c.outcome === 'sealed' ? 'var(--success)' : c.outcome === 'broken' ? 'var(--crimson-300)' : 'var(--ember)',
                boxShadow: '0 0 0 3px var(--bg-page)',
              }} />
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--fg-1)', fontSize: 14 }}>{c.title}</span>
                <span style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>{c.date}</span>
              </div>
              {c.note && <div style={{ color: 'var(--fg-2)', fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{c.note}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* footer cta */}
      <div style={{
        padding: '14px 16px 24px',
        background: 'linear-gradient(180deg, transparent, var(--bg-page) 30%)',
        position: 'sticky', bottom: 0,
        display: 'flex', gap: 8,
      }}>
        <Btn variant="secondary" size="lg" style={{ flex: '0 0 auto' }} icon={Ico.edit}>Edit</Btn>
        <Btn variant="primary" size="lg" icon={Ico.flame} fullWidth onClick={onCast}>Cast Now</Btn>
      </div>
    </div>
  );
}

window.WorkingDetail = WorkingDetail;
