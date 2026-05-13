// Workings.jsx — list of all workings in the book

function Workings({ workings, onOpenWorking, onCompose }) {
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState('all'); // all | sealed | draft

  const filtered = workings.filter(w => {
    if (filter === 'sealed' && !w.sealed) return false;
    if (filter === 'draft' && w.sealed) return false;
    if (query && !w.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const filters = [
    { id: 'all',    label: 'All',    count: workings.length },
    { id: 'sealed', label: 'Sealed', count: workings.filter(w => w.sealed).length },
    { id: 'draft',  label: 'Drafts', count: workings.filter(w => !w.sealed).length },
  ];

  return (
    <div style={{ padding: '12px 16px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--bg-surface)', border: '1px solid var(--line-soft)',
        borderRadius: 'var(--r-md)', padding: '0 12px',
        height: 40,
      }}>
        <span style={{ color: 'var(--fg-3)' }}>{React.cloneElement(Ico.search, { size: 16 })}</span>
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Look in the Book"
          style={{
            flex: 1, border: 0, background: 'transparent', outline: 0,
            color: 'var(--fg-1)', fontFamily: 'var(--font-body)', fontSize: 14,
          }}
        />
      </div>

      {/* filter chips */}
      <div style={{ display: 'flex', gap: 6 }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '7px 12px', borderRadius: 999,
            background: filter === f.id ? 'var(--chrome-active-bg)' : 'transparent',
            color: filter === f.id ? 'var(--chrome-active-fg)' : 'var(--fg-2)',
            border: '1px solid ' + (filter === f.id ? 'var(--chrome-active-line)' : 'var(--line-soft)'),
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.04em', cursor: 'pointer',
          }}>
            {f.label} <span style={{ opacity: 0.6, marginLeft: 4 }}>{f.count}</span>
          </button>
        ))}
      </div>

      {/* list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(w => (
          <Card key={w.id} onClick={() => onOpenWorking(w.id)} padding={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 'var(--r-md)',
                background: w.color + '22', color: w.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>{React.cloneElement(w.icon, { size: 20 })}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{
                    fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
                    fontSize: 17, color: 'var(--fg-1)',
                  }}>{w.name}</span>
                  <span style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
                    {w.lastCast}
                  </span>
                </div>
                <div style={{ color: 'var(--fg-2)', fontSize: 12, marginTop: 2, lineHeight: 1.35 }}>
                  {w.summary}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  {w.sealed
                    ? <Badge tone="sealed">Sealed · {w.castCount}</Badge>
                    : <Badge tone="amber">Unfinished</Badge>}
                  {w.tags.map(t => <Badge key={t} tone="pending" dot={false}>{t}</Badge>)}
                </div>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card padding={28} style={{ textAlign: 'center' }}>
            <div className="oma-eyebrow">Nothing here</div>
            <div style={{
              fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
              fontSize: 18, color: 'var(--fg-1)', marginTop: 6,
            }}>The Book Is Quiet.</div>
            <div style={{ color: 'var(--fg-2)', fontSize: 13, marginTop: 4 }}>
              No workings match this filter.
            </div>
          </Card>
        )}
      </div>

      <Btn variant="primary" size="lg" icon={Ico.plus} fullWidth onClick={onCompose} style={{ marginTop: 6 }}>
        Begin a Working
      </Btn>
    </div>
  );
}

window.Workings = Workings;
