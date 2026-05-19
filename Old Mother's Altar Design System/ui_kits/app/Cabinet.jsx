// Cabinet.jsx — ingredient / supply inventory

const RITUAL_COLORS = [
  { name: 'White',   hex: '#F5F5F0' },
  { name: 'Black',   hex: '#1C1C1C' },
  { name: 'Red',     hex: '#C0271D' },
  { name: 'Green',   hex: '#2D7A3A' },
  { name: 'Yellow',  hex: '#D4A017' },
  { name: 'Blue',    hex: '#1E4FA0' },
  { name: 'Purple',  hex: '#6B3FA0' },
  { name: 'Orange',  hex: '#D96B0A' },
  { name: 'Pink',    hex: '#D4618A' },
  { name: 'Brown',   hex: '#7A4A2A' },
  { name: 'Silver',  hex: '#A0A8B0' },
  { name: 'Gold',    hex: '#C8A430' },
];

const CAB_TYPES = [
  { id: 'herb',    label: 'Herb',     emoji: '🌿' },
  { id: 'crystal', label: 'Crystal',  emoji: '💎' },
  { id: 'candle',  label: 'Candle',   emoji: '🕯️' },
  { id: 'incense', label: 'Incense',  emoji: '🌫️' },
  { id: 'cord',    label: 'Cord',     emoji: '🪢' },
  { id: 'oil',     label: 'Oil',      emoji: '🫙' },
  { id: 'paper',   label: 'Paper',    emoji: '📄' },
  { id: 'other',   label: 'Other',    emoji: '✨' },
];

function typeEmoji(type) {
  return CAB_TYPES.find(t => t.id === type)?.emoji || '✨';
}
function typeLabel(type) {
  return CAB_TYPES.find(t => t.id === type)?.label || 'Other';
}

// ── Item Form (bottom sheet) ────────────────────────────────────────────────
function CabinetForm({ open, item, onClose, onSave, onDelete }) {
  const [name,      setName]      = React.useState('');
  const [type,      setType]      = React.useState('herb');
  const [color,     setColor]     = React.useState('');
  const [colorMode, setColorMode] = React.useState('preset'); // 'preset' | 'custom'
  const [inv,       setInv]       = React.useState('');
  const [note,      setNote]      = React.useState('');

  React.useEffect(() => {
    if (open) {
      setName(item?.name || '');
      setType(item?.type || 'herb');
      const c = item?.color || '';
      const isPreset = RITUAL_COLORS.some(rc => rc.name === c);
      setColor(c);
      setColorMode(c && !isPreset ? 'custom' : 'preset');
      setInv(item?.inv != null ? String(item.inv) : '');
      setNote(item?.note || '');
    }
  }, [open, item]);

  if (!open) return null;

  const field = {
    background: 'var(--bg-page)', border: '1px solid var(--line-medium)',
    borderRadius: 'var(--r-xs)', padding: '11px 14px',
    color: 'var(--fg-1)', fontFamily: 'var(--font-body)',
    fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box',
  };

  function handleSave() {
    if (!name.trim()) return;
    onSave({
      id: item?.id || Date.now().toString(),
      name: name.trim(),
      type,
      color: color.trim() || null,
      inv: inv !== '' ? parseInt(inv) : null,
      note: note.trim(),
    });
    onClose();
  }

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
        maxHeight: '88%', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* Grabber */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--line-medium)' }} />
        </div>

        {/* Header */}
        <div>
          <div className="oma-eyebrow">The Cabinet</div>
          <div style={{
            fontFamily: '"Ohno Blazeface 24", var(--font-display)', fontStyle: 'normal',
            fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
            fontSize: 26, color: 'var(--fg-1)', marginTop: 4,
          }}>{item ? 'Edit Item' : 'Add to Cabinet'}</div>
        </div>

        {/* Type chips */}
        <div>
          <span className="oma-eyebrow" style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>Type</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {CAB_TYPES.map(t => (
              <button key={t.id} onClick={() => setType(t.id)} style={{
                padding: '7px 10px', borderRadius: 999, cursor: 'pointer',
                background: type === t.id ? 'var(--chrome-active-bg)' : 'var(--bg-page)',
                border: '1px solid ' + (type === t.id ? 'var(--chrome-active-line)' : 'var(--line-soft)'),
                color: type === t.id ? 'var(--chrome-active-fg)' : 'var(--fg-2)',
                fontFamily: 'var(--font-body)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5,
              }}>{t.emoji} {t.label}</button>
            ))}
          </div>
        </div>

        {/* Name */}
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="oma-eyebrow" style={{ fontSize: 10 }}>Name</span>
          <input value={name} onChange={e => setName(e.target.value)} autoComplete="off"
            placeholder={`e.g. ${type === 'herb' ? 'Mugwort, Bay Laurel…' : type === 'crystal' ? 'Rose Quartz, Pyrite…' : type === 'candle' ? 'White Pillar, Black Taper…' : 'Name this item…'}`}
            style={{ ...field }} />
        </label>

        {/* Color swatches — candle and cord only */}
        {(type === 'candle' || type === 'cord') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className="oma-eyebrow" style={{ fontSize: 10 }}>Color (optional)</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {RITUAL_COLORS.map(rc => {
                const sel = colorMode === 'preset' && color === rc.name;
                return (
                  <button key={rc.name} title={rc.name} onClick={() => { setColor(rc.name); setColorMode('preset'); }} style={{
                    width: 32, height: 32, borderRadius: 50, cursor: 'pointer', flexShrink: 0,
                    background: rc.hex,
                    border: sel ? '2.5px solid var(--fg-1)' : '2px solid var(--line-medium)',
                    boxShadow: sel ? '0 0 0 2px var(--bg-surface), 0 0 0 4px var(--fg-1)' : 'none',
                    outline: 0, transition: 'box-shadow 120ms',
                    position: 'relative',
                  }}>
                    {sel && (
                      <span style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: rc.hex === '#F5F5F0' ? '#333' : '#fff', fontSize: 13, fontWeight: 700,
                      }}>✓</span>
                    )}
                  </button>
                );
              })}
              {/* Custom option */}
              <button title="Custom color" onClick={() => { setColorMode('custom'); setColor(''); }} style={{
                width: 32, height: 32, borderRadius: 50, cursor: 'pointer', flexShrink: 0,
                background: 'var(--bg-page)',
                border: colorMode === 'custom' ? '2px solid var(--fg-1)' : '1.5px dashed var(--line-medium)',
                outline: 0, fontSize: 15,
              }}>✏️</button>
            </div>
            {/* Selected preset name or custom input */}
            {colorMode === 'preset' && color && (
              <div style={{ color: 'var(--fg-2)', fontSize: 12 }}>{color}</div>
            )}
            {colorMode === 'custom' && (
              <input value={color} onChange={e => setColor(e.target.value)} autoComplete="off"
                placeholder="Custom color name…" style={{ ...field }} />
            )}
            {(colorMode === 'preset' && color) || colorMode === 'custom' ? (
              <button onClick={() => { setColor(''); setColorMode('preset'); }} style={{
                background: 'none', border: 0, cursor: 'pointer', textAlign: 'left',
                color: 'var(--fg-3)', fontSize: 11, padding: 0,
              }}>Clear color</button>
            ) : null}
          </div>
        )}

        {/* Inventory */}
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="oma-eyebrow" style={{ fontSize: 10 }}>Quantity on hand (optional)</span>
          <input type="number" min="0" value={inv} onChange={e => setInv(e.target.value)}
            placeholder="Leave blank if not tracking" style={{ ...field }} />
        </label>

        {/* Note */}
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="oma-eyebrow" style={{ fontSize: 10 }}>Note (optional)</span>
          <input value={note} onChange={e => setNote(e.target.value)} autoComplete="off"
            placeholder="e.g. dried, fresh, color, size…" style={{ ...field }} />
        </label>

        {/* Footer */}
        <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="secondary" size="lg" style={{ flex: '0 0 auto' }} onClick={onClose}>Cancel</Btn>
            <Btn variant="primary" size="lg" icon={Ico.check} fullWidth onClick={handleSave}>
              {item ? 'Save Changes' : 'Add to Cabinet'}
            </Btn>
          </div>
          {item && (
            <Btn variant="ghost" size="sm" fullWidth onClick={() => {
              if (window.confirm(`Remove "${item.name}" from the cabinet?`)) { onDelete(item.id); onClose(); }
            }} style={{ color: 'var(--crimson-300)', fontSize: 12 }}>
              Remove from cabinet
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Cabinet main view ───────────────────────────────────────────────────────
function Cabinet({ cabinet, onSave, onDelete, addRef }) {
  const [search,     setSearch]    = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState([]);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [formOpen,   setFormOpen]  = React.useState(false);
  const [editItem,   setEditItem]  = React.useState(null);
  const filterRef = React.useRef(null);

  const field = {
    background: 'var(--bg-surface)', border: '1px solid var(--line-soft)',
    borderRadius: 'var(--r-pill)', padding: '9px 16px',
    color: 'var(--fg-1)', fontFamily: 'var(--font-body)',
    fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box',
  };

  // Close filter on click outside
  React.useEffect(() => {
    if (!filterOpen) return;
    function handleDown(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
    }
    document.addEventListener('mousedown', handleDown);
    return () => document.removeEventListener('mousedown', handleDown);
  }, [filterOpen]);

  // Derive present types as SearchSelect items
  const presentTypes = [...new Set(cabinet.map(c => c.type))];
  const typeItems = presentTypes.map(t => ({ key: t, label: typeEmoji(t) + ' ' + typeLabel(t) }));

  const filtered = cabinet.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.note?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = typeFilter.length === 0 || typeFilter.includes(c.type);
    return matchSearch && matchFilter;
  });

  // Group by type for display
  const grouped = {};
  filtered.forEach(c => {
    if (!grouped[c.type]) grouped[c.type] = [];
    grouped[c.type].push(c);
  });

  function openAdd() { setEditItem(null); setFormOpen(true); }
  function openEdit(item) { setEditItem(item); setFormOpen(true); }

  if (addRef) addRef.current = openAdd;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Search + filter */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-soft)' }}>
        <div ref={filterRef} style={{ position: 'relative' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Search */}
            <input value={search} onChange={e => setSearch(e.target.value)} autoComplete="off"
              placeholder="Search stores…" style={{ ...field, flex: 1 }} />
            {/* Filter button */}
            {typeItems.length > 0 && (
              <button onClick={() => setFilterOpen(o => !o)} style={{
                width: 40, height: 40, borderRadius: 'var(--r-md)', cursor: 'pointer', flexShrink: 0,
                background: filterOpen || typeFilter.length > 0 ? 'var(--chrome-active-bg)' : 'var(--bg-surface)',
                border: '1px solid ' + (filterOpen || typeFilter.length > 0 ? 'var(--chrome-active-line)' : 'var(--line-soft)'),
                color: filterOpen || typeFilter.length > 0 ? 'var(--chrome-active-fg)' : 'var(--fg-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                {React.cloneElement(Ico.filter, { size: 17 })}
                {typeFilter.length > 0 && (
                  <span style={{
                    position: 'absolute', top: 5, right: 5,
                    width: 14, height: 14, borderRadius: 50,
                    background: 'var(--ember)', color: '#fff',
                    fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{typeFilter.length}</span>
                )}
              </button>
            )}
          </div>
          {/* Filter dropdown */}
          {filterOpen && typeItems.length > 0 && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 200,
              background: 'var(--bg-surface)', border: '1px solid var(--line-medium)',
              borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-3)',
              padding: '12px 12px 10px',
            }}>
              <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: 8 }}>
                SUPPLY TYPE
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {typeItems.map(item => {
                  const active = typeFilter.includes(item.key);
                  return (
                    <button key={item.key} onClick={() => setTypeFilter(prev =>
                      prev.includes(item.key) ? prev.filter(t => t !== item.key) : [...prev, item.key]
                    )} style={{
                      padding: '5px 10px', borderRadius: 999, cursor: 'pointer',
                      background: active ? 'var(--chrome-active-bg)' : 'var(--bg-page)',
                      border: '1px solid ' + (active ? 'var(--chrome-active-line)' : 'var(--line-soft)'),
                      color: active ? 'var(--chrome-active-fg)' : 'var(--fg-2)',
                      fontFamily: 'var(--font-body)', fontSize: 12,
                    }}>{item.label}</button>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--line-soft)' }}>
                <button onClick={() => setTypeFilter([])} style={{
                  background: 'none', border: 0, cursor: 'pointer',
                  color: typeFilter.length > 0 ? 'var(--ember)' : 'var(--fg-3)',
                  fontFamily: 'var(--font-body)', fontSize: 12, padding: '4px 0',
                }}>
                  {typeFilter.length > 0 ? `Clear (${typeFilter.length})` : 'Clear'}
                </button>
                <Btn variant="primary" size="sm" onClick={() => setFilterOpen(false)}>Done</Btn>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, padding: '14px 16px 22px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--fg-3)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🗄️</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg-2)', marginBottom: 6 }}>
              {cabinet.length === 0 ? 'Cabinet is empty' : 'No matches'}
            </div>
            <div style={{ fontSize: 13, marginBottom: 16 }}>
              {cabinet.length === 0 ? 'Add your ritual supplies and ingredients.' : 'Try a different search or filter.'}
            </div>
            {cabinet.length === 0 && (
              <Btn variant="primary" size="md" icon={Ico.plus} onClick={openAdd}>Add an Item</Btn>
            )}
          </div>
        ) : (
          Object.entries(grouped).map(([type, items]) => (
            <div key={type} style={{ marginBottom: 20 }}>
              <div className="oma-eyebrow" style={{ marginBottom: 8 }}>
                {typeEmoji(type)} {typeLabel(type)}
              </div>
              <div style={{ borderRadius: 'var(--r-lg)', border: '1px solid var(--line-soft)', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                {items.map((item, i) => (
                  <button key={item.id} onClick={() => openEdit(item)} style={{
                    width: '100%', background: 'none', border: 0, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px',
                    borderTop: i === 0 ? 0 : '1px solid var(--line-soft)',
                    textAlign: 'left',
                  }}>
                    <div style={{ fontSize: 20, flexShrink: 0 }}>{typeEmoji(item.type)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: 'var(--fg-1)', fontSize: 14, fontWeight: 600 }}>{item.name}</div>
                      {item.color && <div style={{ color: 'var(--fg-3)', fontSize: 12, marginTop: 2 }}>{item.color}</div>}
                      {!item.color && item.note && <div style={{ color: 'var(--fg-3)', fontSize: 12, marginTop: 2 }}>{item.note}</div>}
                      {item.color && item.note && <div style={{ color: 'var(--fg-3)', fontSize: 11, marginTop: 1, fontStyle: 'italic' }}>{item.note}</div>}
                    </div>
                    <div style={{ flexShrink: 0, textAlign: 'right' }}>
                      {item.inv != null ? (
                        <div>
                          <div style={{
                            color: item.inv === 0 ? 'var(--crimson-300)' : item.inv <= 1 ? 'var(--warning)' : 'var(--success)',
                            fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)',
                          }}>{item.inv}</div>
                          <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>ON HAND</div>
                        </div>
                      ) : (
                        <div style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>—</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <CabinetForm open={formOpen} item={editItem}
        onClose={() => { setFormOpen(false); setEditItem(null); }}
        onSave={onSave} onDelete={onDelete} />
    </div>
  );
}

window.Cabinet = Cabinet;
