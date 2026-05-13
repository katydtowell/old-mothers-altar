// TheBook.jsx — long-form journal entries, timeline by moon

function TheBook({ entries }) {
  return (
    <div style={{ padding: '14px 16px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* introduction */}
      <div style={{
        padding: '20px 20px 22px',
        borderRadius: 'var(--r-xl)',
        background: 'radial-gradient(circle at 80% 0%, rgba(243,83,33,0.10) 0%, transparent 60%), var(--bg-surface)',
        border: '1px solid var(--line-soft)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -10, right: -10,
          fontFamily: '"Ohno Blazeface 72", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
          fontSize: 120, color: 'rgba(244,175,89,0.10)', lineHeight: 1, pointerEvents: 'none',
        }}>XVII</div>
        <div className="oma-eyebrow">Volume XVII · The Waning Gibbous</div>
        <div style={{
          fontFamily: '"Ohno Blazeface 24", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
          fontSize: 26, lineHeight: 1.05, color: 'var(--fg-1)', marginTop: 8, maxWidth: 280,
        }}>What the Book Has Held This Moon.</div>
        <div style={{ color: 'var(--fg-2)', fontSize: 13, marginTop: 10, lineHeight: 1.55, maxWidth: 320 }}>
          Three workings sealed. One broken on purpose. Six pages of notes; one dream worth keeping.
        </div>
      </div>

      {/* entries */}
      {entries.map(e => (
        <div key={e.id} style={{ display: 'flex', gap: 14 }}>
          <div style={{ flex: '0 0 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
            <div style={{
              fontFamily: '"Ohno Blazeface 24", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
              fontSize: 22, color: 'var(--amber)', lineHeight: 1,
            }}>{e.romanDay}</div>
            <div style={{ color: 'var(--fg-3)', fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginTop: 4 }}>
              {e.month}
            </div>
            <div style={{ flex: 1, width: 1, background: 'var(--line-soft)', marginTop: 10 }} />
          </div>
          <div style={{ flex: 1, paddingBottom: 8 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
              {e.kind === 'cast' && <Badge tone="sealed">Cast · Sealed</Badge>}
              {e.kind === 'dream' && <Badge tone="plum">Dream</Badge>}
              {e.kind === 'note' && <Badge tone="pending">Note</Badge>}
              {e.kind === 'moon' && <Badge tone="indigo">Moon</Badge>}
              <span style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>{e.time}</span>
            </div>
            <div style={{
              fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
              fontSize: 18, lineHeight: 1.1, color: 'var(--fg-1)',
            }}>{e.title}</div>
            <div style={{ color: 'var(--fg-2)', fontSize: 13, lineHeight: 1.55, marginTop: 6, textWrap: 'pretty' }}>
              {e.body}
            </div>
            {e.tagged && (
              <div style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)', marginTop: 8, letterSpacing: '0.04em' }}>
                — {e.tagged}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

window.TheBook = TheBook;
