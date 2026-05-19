// TheBook.jsx — journal entries

function TheBook({ entries, workings, onWrite, onOpenEntry }) {
  const [query,      setQuery]      = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [filters,    setFilters]    = React.useState({
    status: [], spell: [], type: [], cat: [],
  });

  const statusTone = { Pending: 'amber', Ongoing: 'pending', Active: 'pending', Completed: 'sealed' };

  // Derive option lists from live data
  const presentStatuses = React.useMemo(
    () => [...new Set(entries.filter(e => e.status).map(e => e.status))].sort(),
    [entries]
  );
  const presentSpells = React.useMemo(
    () => [...new Set(entries.filter(e => e.workingName).map(e => e.workingName))].sort(),
    [entries]
  );
  // magicType + category come from the linked workings
  const presentTypes = React.useMemo(() => {
    const ids = new Set(entries.map(e => e.workingId).filter(Boolean));
    return [...new Set((workings || []).filter(w => ids.has(w.id)).flatMap(w => w.magicType || []))].sort();
  }, [entries, workings]);
  const presentCats = React.useMemo(() => {
    const ids = new Set(entries.map(e => e.workingId).filter(Boolean));
    return [...new Set((workings || []).filter(w => ids.has(w.id)).flatMap(w => w.category || []))].sort();
  }, [entries, workings]);

  const totalActive = Object.values(filters).reduce((n, a) => n + a.length, 0);

  // Moon cycle count since first entry (synodic months elapsed)
  const moonCycles = React.useMemo(() => {
    if (!entries || entries.length === 0) return 1;
    const dates = entries.map(e => new Date(e.date || e.createdAt || e.ts)).filter(d => !isNaN(d));
    if (dates.length === 0) return 1;
    const earliest = new Date(Math.min(...dates));
    const synodic = 29.530588853;
    const elapsed = (Date.now() - earliest.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(1, Math.floor(elapsed / synodic));
  }, [entries]);

  // Current moon phase (same formula used elsewhere in the app)
  const currentMoonPhase = React.useMemo(() => {
    const PHASES = ['new','waxing-crescent','first-quarter','waxing-gibbous','full','waning-gibbous','last-quarter','waning-crescent'];
    const known = new Date('2000-01-06T18:14:00Z');
    const synodic = 29.530588853;
    const diff = ((Date.now() - known.getTime()) / (1000 * 60 * 60 * 24) % synodic + synodic) % synodic;
    return PHASES[Math.floor((diff / synodic) * 8) % 8];
  }, []);

  function setFilter(key, val) { setFilters(prev => ({ ...prev, [key]: val })); }
  function clearAll() { setFilters({ status: [], spell: [], type: [], cat: [] }); }

  function previewText(e) {
    if (e.notes && e.notes.length > 0) return e.notes[e.notes.length - 1].text;
    return e.body || '';
  }

  const filtered = React.useMemo(() => entries.filter(e => {
    if (filters.status.length && !filters.status.includes(e.status)) return false;
    if (filters.spell.length  && !filters.spell.includes(e.workingName)) return false;
    if (filters.type.length || filters.cat.length) {
      const w = (workings || []).find(w => w.id === e.workingId);
      if (filters.type.length && !filters.type.some(v => (w?.magicType || []).includes(v))) return false;
      if (filters.cat.length  && !filters.cat.some(v  => (w?.category  || []).includes(v))) return false;
    }
    if (query) {
      const q = query.toLowerCase();
      const text = previewText(e).toLowerCase();
      if (!e.title?.toLowerCase().includes(q) && !text.includes(q) && !e.workingName?.toLowerCase().includes(q)) return false;
    }
    return true;
  }), [entries, workings, filters, query]);

  const sectionLabel = txt => (
    <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: '"New Kansas", var(--font-body)', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
      {txt}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* ── Search + filter button row ── */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-soft)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--bg-surface)', border: '1px solid var(--line-soft)',
            borderRadius: 'var(--r-md)', padding: '0 12px', height: 40,
          }}>
            <span style={{ color: 'var(--fg-3)' }}>{React.cloneElement(Ico.search, { size: 16 })}</span>
            <input value={query} onChange={ev => setQuery(ev.target.value)}
              placeholder="Search the Journal…" autoComplete="off"
              style={{ flex: 1, border: 0, background: 'transparent', outline: 0, color: 'var(--fg-1)', fontFamily: 'var(--font-body)', fontSize: 14 }}
            />
          </div>
          <button onClick={() => setFilterOpen(o => !o)} style={{
            width: 40, height: 40, borderRadius: 'var(--r-md)', cursor: 'pointer', flexShrink: 0,
            background: filterOpen || totalActive > 0 ? 'var(--chrome-active-bg)' : 'var(--bg-surface)',
            border: '1px solid ' + (filterOpen || totalActive > 0 ? 'var(--chrome-active-line)' : 'var(--line-soft)'),
            color: filterOpen || totalActive > 0 ? 'var(--chrome-active-fg)' : 'var(--fg-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            {React.cloneElement(Ico.filter, { size: 17 })}
            {totalActive > 0 && (
              <span style={{
                position: 'absolute', top: 5, right: 5,
                width: 14, height: 14, borderRadius: 50,
                background: 'var(--ember)', color: '#fff',
                fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{totalActive}</span>
            )}
          </button>
        </div>

        {/* ── Filter panel ── */}
        {filterOpen && (
          <div style={{
            background: 'var(--bg-surface)', border: '1px solid var(--line-medium)',
            borderRadius: 'var(--r-lg)', padding: '16px',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            {presentStatuses.length > 0 && (
              <div>
                {sectionLabel('STATUS')}
                <SearchSelect items={['Active','Pending','Ongoing','Completed'].filter(s => presentStatuses.includes(s))}
                  value={filters.status} onChange={v => setFilter('status', v)} multi placeholder="Any status…" />
              </div>
            )}
            {presentSpells.length > 0 && (
              <div>
                {sectionLabel('SPELL')}
                <SearchSelect items={presentSpells}
                  value={filters.spell} onChange={v => setFilter('spell', v)} multi placeholder="Any spell…" />
              </div>
            )}
            {presentTypes.length > 0 && (
              <div>
                {sectionLabel('MAGIC TYPE')}
                <SearchSelect items={presentTypes}
                  value={filters.type} onChange={v => setFilter('type', v)} multi placeholder="Any magic type…" />
              </div>
            )}
            {presentCats.length > 0 && (
              <div>
                {sectionLabel('SPELL CATEGORY')}
                <SearchSelect items={presentCats}
                  value={filters.cat} onChange={v => setFilter('cat', v)} multi placeholder="Any category…" />
              </div>
            )}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 8, borderTop: '1px solid var(--line-soft)',
            }}>
              <button onClick={clearAll} style={{
                background: 'none', border: 0, cursor: 'pointer', padding: '4px 0',
                color: totalActive > 0 ? 'var(--ember)' : 'var(--fg-3)',
                fontFamily: 'var(--font-body)', fontSize: 12,
              }}>
                {totalActive > 0 ? `Clear all (${totalActive})` : 'Clear all'}
              </button>
              <Btn variant="primary" size="sm" onClick={() => setFilterOpen(false)}>Done</Btn>
            </div>
          </div>
        )}

        {/* Active filter summary */}
        {totalActive > 0 && !filterOpen && (
          <div style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
            {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'} · {totalActive} {totalActive === 1 ? 'filter' : 'filters'} active
          </div>
        )}
      </div>

      {/* Introduction card */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          padding: '20px 20px 22px',
          borderRadius: 'var(--r-xl)',
          background: 'radial-gradient(circle at 80% 0%, rgba(243,83,33,0.10) 0%, transparent 60%), var(--bg-surface)',
          border: '1px solid var(--line-soft)',
          position: 'relative', overflow: 'hidden',
          marginBottom: 16,
        }}>
          <div style={{
            position: 'absolute', top: -8, right: -8,
            pointerEvents: 'none', opacity: 0.10,
          }}>
            <MoonGlyph phase={currentMoonPhase} size={160} color="rgba(244,175,89,1)" />
          </div>
          <div style={{
            fontFamily: '"Ohno Blazeface 24", var(--font-display)', fontStyle: 'normal', fontWeight: 400,
            textTransform: 'uppercase', letterSpacing: '0.02em',
            fontSize: 26, lineHeight: 1.05, color: 'var(--fg-1)', maxWidth: 280,
          }}>Your Book of Shadows</div>
          <div style={{ color: 'var(--fg-2)', fontSize: 13, marginTop: 10, lineHeight: 1.55, maxWidth: 320 }}>
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} recorded
            {entries.filter(e => e.status === 'Completed').length > 0
              ? ` · ${entries.filter(e => e.status === 'Completed').length} completed`
              : ''}.
          </div>
          {onWrite && (
            <div style={{ marginTop: 14 }}>
              <Btn variant="primary" size="sm" icon={Ico.penTool} onClick={onWrite}>
                Write an Entry
              </Btn>
            </div>
          )}
        </div>
      </div>

      {/* Entries list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--fg-3)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg-2)', marginBottom: 6 }}>
            {entries.length === 0 ? 'The journal is empty' : 'No entries match'}
          </div>
          <div style={{ fontSize: 13, marginBottom: 16 }}>
            {entries.length === 0 ? 'Start recording your workings and observations.' : 'Try a different search or filter.'}
          </div>
          {entries.length === 0 && onWrite && (
            <Btn variant="primary" size="md" icon={Ico.penTool} onClick={onWrite}>Write an Entry</Btn>
          )}
        </div>
      ) : (
        <div style={{ padding: '0 16px 22px' }}>
          {filtered.map((e, idx) => (
            <button key={e.id} onClick={() => onOpenEntry && onOpenEntry(e.id)}
              style={{
                width: '100%', background: 'none', border: 0, cursor: onOpenEntry ? 'pointer' : 'default',
                textAlign: 'left', padding: 0,
              }}>
              <div style={{ display: 'flex', gap: 14, paddingBottom: 16 }}>
                {/* Date column */}
                <div style={{ flex: '0 0 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                  <div style={{
                    fontFamily: '"Ohno Blazeface 24", var(--font-display)', fontStyle: 'normal', fontWeight: 400,
                    textTransform: 'uppercase', fontSize: 22, color: 'var(--amber)', lineHeight: 1,
                  }}>{e.romanDay}</div>
                  <div style={{ color: 'var(--fg-3)', fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginTop: 4 }}>
                    {e.month}
                  </div>
                  {idx < filtered.length - 1 && (
                    <div style={{ flex: 1, width: 1, background: 'var(--line-soft)', marginTop: 10 }} />
                  )}
                </div>
                {/* Content */}
                <div style={{ flex: 1, paddingBottom: 8 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                    {e.status && <Badge tone={statusTone[e.status] || 'pending'} dot={false}>{e.status}</Badge>}
                    <span style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>{e.time}</span>
                  </div>
                  <div style={{
                    fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal', fontWeight: 400,
                    textTransform: 'uppercase', letterSpacing: '0.02em',
                    fontSize: 18, lineHeight: 1.1, color: 'var(--fg-1)',
                  }}>{e.title}</div>
                  <div style={{ color: 'var(--fg-2)', fontSize: 13, lineHeight: 1.55, marginTop: 6, textWrap: 'pretty',
                    overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  }}>
                    {previewText(e)}
                  </div>
                  {e.notes && e.notes.length > 1 && (
                    <div style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)', marginTop: 6 }}>
                      {e.notes.length} notes
                    </div>
                  )}
                  {e.workingName && (
                    <div style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)', marginTop: 6, letterSpacing: '0.04em' }}>
                      — {e.workingName}
                    </div>
                  )}
                  {e.result && (
                    <div style={{
                      marginTop: 8, padding: '8px 10px',
                      borderRadius: 'var(--r-xs)', background: 'rgba(0,194,138,0.08)',
                      border: '1px solid rgba(0,194,138,0.20)',
                      color: 'var(--success)', fontSize: 12, lineHeight: 1.5,
                    }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', marginRight: 6 }}>RESULT</span>
                      {e.result}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

window.TheBook = TheBook;
