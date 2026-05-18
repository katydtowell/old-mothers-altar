// Workings.jsx — list of all workings in the book

// ── Canonical filter values (mirrors NewWorking.jsx) ─────────────────────────
const WF_MOON_PHASES = [
  { key: 'new',             label: 'New Moon'        },
  { key: 'waxing-crescent', label: 'Waxing Crescent' },
  { key: 'first-quarter',   label: 'First Quarter'   },
  { key: 'waxing-gibbous',  label: 'Waxing Gibbous'  },
  { key: 'full',            label: 'Full Moon'        },
  { key: 'waning-gibbous',  label: 'Waning Gibbous'  },
  { key: 'last-quarter',    label: 'Last Quarter'     },
  { key: 'waning-crescent', label: 'Waning Crescent'  },
];
const WF_CATEGORIES  = ['Protection','Love','Prosperity','Clarity','Banishing','Healing','Divination','Grounding','Communication','Luck','Other'];
const WF_MAGIC_TYPES = ['Candle','Knot','Herbal','Crystal','Sigil','Moon','Ritual','Sachet','Bath','Fire','Other'];
const WF_SEASONS     = ['Spring','Summer','Autumn','Winter'];
const WF_TIMES       = ['Dawn','Morning','Afternoon','Evening','Midnight'];
const WF_DAYS        = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

const TIMING_TABS_WF = [
  { id: 'moon',   label: 'Moon',   icoKey: 'moonIcon' },
  { id: 'season', label: 'Season', icoKey: 'sun'      },
  { id: 'time',   label: 'Time',   icoKey: 'candle'   },
  { id: 'day',    label: 'Day',    icoKey: 'calendar' },
];

function Workings({ workings, onOpenWorking, onCompose, onToggleFavorite }) {
  const [query,      setQuery]      = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [timingTab,  setTimingTab]  = React.useState('moon');
  const [filters,    setFilters]    = React.useState({
    cat: [], type: [], tag: [], deity: [], author: [],
    phase: [], season: [], tod: [], dow: [], favorites: false,
  });

  // Dynamic items (user-created tags / deities / authors)
  const dynTags    = React.useMemo(() => [...new Set(workings.flatMap(w => w.tags    || []))].sort(), [workings]);
  const dynDeities = React.useMemo(() => [...new Set(workings.flatMap(w => w.deities || []))].sort(), [workings]);
  const dynAuthors = React.useMemo(() => [...new Set(workings.map(w => w.author).filter(Boolean))].sort(), [workings]);

  const totalActive = Object.values(filters).reduce((n, a) => Array.isArray(a) ? n + a.length : n + (a ? 1 : 0), 0);

  function setFilter(key, val) {
    setFilters(prev => ({ ...prev, [key]: val }));
  }
  function clearAll() {
    setFilters({ cat: [], type: [], tag: [], deity: [], author: [], phase: [], season: [], tod: [], dow: [], favorites: false });
  }

  // AND across groups, OR within each group
  const filtered = workings.filter(w => {
    if (filters.favorites      && !w.favorite)                                                return false;
    if (filters.cat.length    && !filters.cat.some(v    => (w.category  || []).includes(v))) return false;
    if (filters.type.length   && !filters.type.some(v   => (w.magicType || []).includes(v))) return false;
    if (filters.tag.length    && !filters.tag.some(v    => (w.tags      || []).includes(v))) return false;
    if (filters.deity.length  && !filters.deity.some(v  => (w.deities   || []).includes(v))) return false;
    if (filters.author.length && !filters.author.includes(w.author || ''))                   return false;
    if (filters.phase.length  && !filters.phase.includes(w.moonPhase))                        return false;
    if (filters.season.length && !filters.season.some(v => (w.season    || []).includes(v))) return false;
    if (filters.tod.length    && !filters.tod.some(v    => (w.tod       || []).includes(v))) return false;
    if (filters.dow.length    && !filters.dow.some(v    => (w.dow       || []).includes(v))) return false;
    if (query && !w.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const sectionLabel = txt => (
    <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: '"New Kansas", var(--font-body)', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
      {txt}
    </div>
  );

  return (
    <div style={{ padding: '12px 16px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* ── Search + filter button row ── */}
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--bg-surface)', border: '1px solid var(--line-soft)',
          borderRadius: 'var(--r-md)', padding: '0 12px', height: 40,
        }}>
          <span style={{ color: 'var(--fg-3)' }}>{React.cloneElement(Ico.search, { size: 16 })}</span>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search the Grimoire…"
            autoComplete="off"
            style={{ flex: 1, border: 0, background: 'transparent', outline: 0, color: 'var(--fg-1)', fontFamily: 'var(--font-body)', fontSize: 14 }}
          />
        </div>

        <button onClick={() => setFilterOpen(o => !o)} style={{
          width: 40, height: 40, borderRadius: 'var(--r-md)', cursor: 'pointer', flexShrink: 0,
          background: filterOpen || totalActive > 0 ? 'var(--chrome-active-bg)' : 'var(--bg-surface)',
          border: '1px solid ' + (filterOpen || totalActive > 0 ? 'var(--chrome-active-line)' : 'var(--line-soft)'),
          color: filterOpen || totalActive > 0 ? 'var(--chrome-active-fg)' : 'var(--fg-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
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

      {/* ── Filter panel — in normal document flow so SearchSelect dropdowns aren't clipped ── */}
      {filterOpen && (
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--line-medium)',
          borderRadius: 'var(--r-lg)', padding: '16px',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>

          {/* Favorites */}
          <div>
            {sectionLabel('QUICK FILTER')}
            <button
              onClick={() => setFilters(prev => ({ ...prev, favorites: !prev.favorites }))}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
                background: filters.favorites ? 'rgba(220,50,80,0.12)' : 'var(--bg-page)',
                border: '1px solid ' + (filters.favorites ? 'rgba(220,50,80,0.45)' : 'var(--line-soft)'),
                color: filters.favorites ? '#e85070' : 'var(--fg-2)',
                fontFamily: 'var(--font-body)', fontSize: 13,
              }}
            >
              {React.cloneElement(filters.favorites ? Ico.heartFilled : Ico.heart, { size: 14 })}
              Favorites only
            </button>
          </div>

          {/* Category */}
          <div>
            {sectionLabel('CATEGORY')}
            <SearchSelect
              items={WF_CATEGORIES}
              value={filters.cat}
              onChange={v => setFilter('cat', v)}
              multi
              placeholder="Any category…"
            />
          </div>

          {/* Magic Type */}
          <div>
            {sectionLabel('MAGIC TYPE')}
            <SearchSelect
              items={WF_MAGIC_TYPES}
              value={filters.type}
              onChange={v => setFilter('type', v)}
              multi
              placeholder="Any magic type…"
            />
          </div>

          {/* Tags — from data */}
          {dynTags.length > 0 && (
            <div>
              {sectionLabel('TAG')}
              <SearchSelect
                items={dynTags}
                value={filters.tag}
                onChange={v => setFilter('tag', v)}
                multi
                placeholder="Any tag…"
              />
            </div>
          )}

          {/* Deity — from data */}
          {dynDeities.length > 0 && (
            <div>
              {sectionLabel('DEITY')}
              <SearchSelect
                items={dynDeities}
                value={filters.deity}
                onChange={v => setFilter('deity', v)}
                multi
                placeholder="Any deity…"
              />
            </div>
          )}

          {/* Author — from data */}
          {dynAuthors.length > 0 && (
            <div>
              {sectionLabel('AUTHOR')}
              <SearchSelect
                items={dynAuthors}
                value={filters.author}
                onChange={v => setFilter('author', v)}
                multi
                placeholder="Any author…"
              />
            </div>
          )}

          {/* Timing — tabbed exactly like the spell form */}
          <div>
            {sectionLabel('TIMING')}
            <div style={{
              background: 'var(--bg-page)', borderRadius: 'var(--r-md)',
              border: '1px solid var(--line-soft)', padding: '10px 12px',
            }}>
              {/* Tab strip */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--line-soft)', marginBottom: 12 }}>
                {TIMING_TABS_WF.map(t => (
                  <button key={t.id} onClick={() => setTimingTab(t.id)} style={{
                    flex: 1, padding: '6px 4px 8px', background: 'none', border: 0,
                    borderBottom: '2px solid ' + (timingTab === t.id ? 'var(--amber)' : 'transparent'),
                    marginBottom: -1, cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    color: timingTab === t.id ? 'var(--fg-1)' : 'var(--fg-3)',
                    fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                    textTransform: 'uppercase', transition: 'color 0.15s',
                  }}>
                    {React.cloneElement(Ico[t.icoKey] || Ico.sparkle, { size: 14 })}
                    {t.label}
                  </button>
                ))}
              </div>

              {timingTab === 'moon' && (
                <SearchSelect
                  items={WF_MOON_PHASES}
                  value={filters.phase}
                  onChange={v => setFilter('phase', v)}
                  multi
                  placeholder="Any moon phase…"
                />
              )}
              {timingTab === 'season' && (
                <SearchSelect
                  items={WF_SEASONS}
                  value={filters.season}
                  onChange={v => setFilter('season', v)}
                  multi
                  placeholder="Any season…"
                />
              )}
              {timingTab === 'time' && (
                <SearchSelect
                  items={WF_TIMES}
                  value={filters.tod}
                  onChange={v => setFilter('tod', v)}
                  multi
                  placeholder="Any time of day…"
                />
              )}
              {timingTab === 'day' && (
                <SearchSelect
                  items={WF_DAYS}
                  value={filters.dow}
                  onChange={v => setFilter('dow', v)}
                  multi
                  placeholder="Any day of the week…"
                />
              )}
            </div>
          </div>

          {/* Panel footer */}
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
        <div style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)', marginTop: -6 }}>
          {filtered.length} {filtered.length === 1 ? 'spell' : 'spells'} · {totalActive} {totalActive === 1 ? 'filter' : 'filters'} active
        </div>
      )}

      {/* ── Spell list ── */}
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                  <span style={{
                    fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal', fontWeight: 400,
                    textTransform: 'uppercase', letterSpacing: '0.02em',
                    fontSize: 17, color: 'var(--fg-1)', flex: 1, minWidth: 0,
                  }}>{w.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <button onClick={e => { e.stopPropagation(); onToggleFavorite && onToggleFavorite(w.id); }} style={{
                      background: 'none', border: 0, cursor: 'pointer', padding: 3,
                      color: w.favorite ? '#e85070' : 'var(--line-medium)',
                      display: 'flex', alignItems: 'center',
                    }}>
                      {React.cloneElement(w.favorite ? Ico.heartFilled : Ico.heart, { size: 15 })}
                    </button>
                    <span style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
                      {w.lastCast}
                    </span>
                  </div>
                </div>
                <div style={{ color: 'var(--fg-2)', fontSize: 12, marginTop: 2, lineHeight: 1.35 }}>
                  {w.summary}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  {w.tags.map(t => <Badge key={t} tone="pending" dot={false}>{t}</Badge>)}
                  {w.castCount > 0 && (
                    <span style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
                      {w.castCount} {w.castCount === 1 ? 'cast' : 'casts'}
                    </span>
                  )}
                  {w.duration && w.duration.val && (
                    <span style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
                      · {w.duration.val} {w.duration.unit}
                    </span>
                  )}
                  {w.rating > 0 && (
                    <span style={{ color: 'var(--amber)', fontSize: 11, letterSpacing: '0.05em', marginLeft: 2 }}>
                      {'★'.repeat(w.rating)}{'☆'.repeat(5 - w.rating)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card padding={28} style={{ textAlign: 'center' }}>
            <div className="oma-eyebrow">Nothing here</div>
            <div style={{
              fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal',
              fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
              fontSize: 18, color: 'var(--fg-1)', marginTop: 6,
            }}>The Grimoire Is Empty.</div>
            <div style={{ color: 'var(--fg-2)', fontSize: 13, marginTop: 4 }}>
              {totalActive > 0 ? 'No spells match these filters.' : 'Add your first spell.'}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

window.Workings = Workings;
