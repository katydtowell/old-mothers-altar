// WorkingDetail.jsx — single working with cast history, ingredients

function WorkingDetail({ working, onBack, onCast, onDelete, onEdit, onToggleFavorite }) {
  if (!working) return null;
  const { name, summary, ingredients, casts, color, icon, tags, moonPhase } = working;

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
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {tags[0] && <Badge tone="pending" dot={false}>{tags[0]}</Badge>}
            </div>
          </div>
          <button onClick={onToggleFavorite} style={{
            background: 'none', border: 0, cursor: onToggleFavorite ? 'pointer' : 'default',
            padding: 6, color: working.favorite ? '#e85070' : 'var(--fg-3)',
            display: 'flex', alignItems: 'center',
          }}>
            {React.cloneElement(working.favorite ? Ico.heartFilled : Ico.heart, { size: 22 })}
          </button>
        </div>
        <div style={{
          fontFamily: '"Ohno Blazeface 36", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase',
          fontSize: 32, lineHeight: 1.0, color: 'var(--fg-1)', letterSpacing: '-0.01em',
        }}>{name}</div>
        <div style={{ color: 'var(--fg-2)', fontSize: 13, marginTop: 8, lineHeight: 1.5, maxWidth: 340 }}>
          {summary}
        </div>
        {working.rating > 0 && (
          <div style={{ marginTop: 8, display: 'flex', gap: 2 }}>
            {[1,2,3,4,5].map(n => (
              <span key={n} style={{ color: n <= working.rating ? 'var(--amber)' : 'var(--line-medium)', fontSize: 16 }}>
                {n <= working.rating ? '★' : '☆'}
              </span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', flexWrap: 'wrap' }}>
          <MoonGlyph phase={moonPhase} size={14} color="var(--fg-2)" />
          <span>BEST UNDER {moonPhase.replace('-', ' ').toUpperCase()}</span>
          <span>·</span>
          <span>{casts.length} CAST</span>
          {working.duration && working.duration.val && (
            <>
              <span>·</span>
              <span>{working.duration.val} {working.duration.unit.toUpperCase()}</span>
            </>
          )}
        </div>
      </div>

      {/* ingredients */}
      <div style={{ padding: '18px 18px 8px' }}>
        <span className="oma-eyebrow">Spell Ingredients</span>
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

      {/* tasks */}
      {working.tasks && working.tasks.length > 0 && (
        <div style={{ padding: '0 18px 8px' }}>
          <span className="oma-eyebrow">Tasks</span>
          <div style={{
            display: 'flex', flexDirection: 'column', marginTop: 10,
            border: '1px solid var(--line-soft)', borderRadius: 'var(--r-lg)',
            overflow: 'hidden', background: 'var(--bg-surface)',
          }}>
            {working.tasks.map((t, i) => (
              <div key={t.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 14px',
                borderTop: i === 0 ? 0 : '1px solid var(--line-soft)',
              }}>
                <span style={{
                  color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)',
                  flexShrink: 0, paddingTop: 2, width: 16, textAlign: 'right',
                }}>{i + 1}.</span>
                <span style={{ color: 'var(--fg-1)', fontSize: 14, lineHeight: 1.45 }}>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

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
        display: 'flex', gap: 8, flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {onEdit && (
            <Btn variant="secondary" size="lg" icon={Ico.edit} style={{ flex: '0 0 auto' }} onClick={onEdit}>Edit</Btn>
          )}
          <Btn variant="primary" size="lg" icon={Ico.flame} fullWidth onClick={onCast}>Send to Journal</Btn>
        </div>
        {onDelete && (
          <Btn variant="ghost" size="sm" fullWidth onClick={() => {
            if (window.confirm(`Delete the spell "${name}"? This cannot be undone.`)) onDelete();
          }} style={{ color: 'var(--crimson-300)', fontSize: 12 }}>
            Delete this spell
          </Btn>
        )}
      </div>
    </div>
  );
}

window.WorkingDetail = WorkingDetail;
