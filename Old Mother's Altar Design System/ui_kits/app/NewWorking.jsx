// NewWorking.jsx — full-page form for composing or editing a spell

const MOON_PHASES_NW = [
  {key:'new',label:'New Moon'},
  {key:'waxing-crescent',label:'Waxing Crescent'},
  {key:'first-quarter',label:'First Quarter'},
  {key:'waxing-gibbous',label:'Waxing Gibbous'},
  {key:'full',label:'Full Moon'},
  {key:'waning-gibbous',label:'Waning Gibbous'},
  {key:'last-quarter',label:'Last Quarter'},
  {key:'waning-crescent',label:'Waning Crescent'},
];

const MAGIC_TYPES_NW  = ['Candle','Knot','Herbal','Crystal','Sigil','Moon','Ritual','Sachet','Bath','Fire','Other'];
const CATEGORIES_NW   = ['Protection','Love','Prosperity','Clarity','Banishing','Healing','Divination','Grounding','Communication','Luck','Other'];
const SEASONS_NW      = ['Spring','Summer','Autumn','Winter'];
const TIMES_NW        = ['Dawn','Morning','Afternoon','Evening','Midnight'];
const DAYS_NW         = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const DURATION_UNITS  = ['minutes','hours','days','weeks','months'];

const TIMING_TABS_NW = [
  { id: 'moon',   label: 'Moon',   icoKey: 'moonIcon' },
  { id: 'season', label: 'Season', icoKey: 'sun'      },
  { id: 'time',   label: 'Time',   icoKey: 'candle'   },
  { id: 'day',    label: 'Day',    icoKey: 'calendar' },
];

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => onChange(value === n ? 0 : n)} style={{
          background: 'none', border: 0, cursor: 'pointer', padding: '2px',
          color: n <= value ? 'var(--amber)' : 'var(--line-medium)',
          fontSize: 22,
        }}>{n <= value ? '★' : '☆'}</button>
      ))}
    </div>
  );
}

// Section header — must be defined OUTSIDE NewWorking to keep stable identity across re-renders
function NWSection({ title, children }) {
  return (
    <div>
      <div style={{
        color: 'var(--fg-3)', fontSize: 10, fontFamily: '"New Kansas", var(--font-body)', fontWeight: 300,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        borderBottom: '1px solid var(--line-soft)', paddingBottom: 6, marginBottom: 12,
      }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  );
}

function NewWorking({ editData, onCreate, onSave, submitRef, cabinet = [] }) {
  const [name,         setName]        = React.useState('');
  const [summary,      setSummary]     = React.useState('');
  const [authorSelf,   setAuthorSelf]  = React.useState(true);
  const [author,       setAuthor]      = React.useState('');
  const [source,       setSource]      = React.useState('');
  const [rating,       setRating]      = React.useState(0);
  const [moonPhase,    setMoonPhase]   = React.useState('');
  const [season,       setSeason]      = React.useState([]);
  const [tod,          setTod]         = React.useState([]);
  const [dow,          setDow]         = React.useState([]);
  const [timingCustom, setTimingCustom] = React.useState('');
  const [magicType,    setMagicType]   = React.useState([]);
  const [category,     setCategory]    = React.useState([]);
  const [chant,        setChant]       = React.useState('');
  const [deityInput,   setDeityInput]  = React.useState('');
  const [deities,      setDeities]     = React.useState([]);
  const [ingName,      setIngName]     = React.useState('');
  const [ingAmt,       setIngAmt]      = React.useState('');
  const [ingNote,      setIngNote]     = React.useState('');
  const [ingSuggestions, setIngSuggestions] = React.useState([]);
  const [ingDropOpen,    setIngDropOpen]    = React.useState(false);
  const [ingredients,  setIngredients] = React.useState([]);
  const [taskText,     setTaskText]    = React.useState('');
  const [tasks,        setTasks]       = React.useState([]);
  const [editingTaskId,   setEditingTaskId]   = React.useState(null);
  const [editingTaskText, setEditingTaskText] = React.useState('');
  const [durVal,       setDurVal]      = React.useState('');
  const [durUnit,      setDurUnit]     = React.useState('days');
  const [timingTab,    setTimingTab]   = React.useState('moon');

  // On mount: load editData if present, otherwise state is already at defaults
  React.useEffect(() => {
    if (editData) {
      setName(editData.name || '');
      setSummary(editData.summary || '');
      setAuthorSelf(editData.authorSelf !== false);
      setAuthor(editData.author || '');
      setSource(editData.source || '');
      setRating(editData.rating || 0);
      setMoonPhase(editData.moonPhase || '');
      setSeason(editData.season || []);
      setTod(editData.tod || []);
      setDow(editData.dow || []);
      setTimingCustom(editData.timingCustom || '');
      setMagicType(editData.magicType || []);
      setCategory(editData.category || []);
      setChant(editData.chant || '');
      setDeities(editData.deities || []);
      setIngredients((editData.ingredients || []).map((ing, i) => ({ ...ing, id: ing.id || String(i) })));
      setTasks((editData.tasks || []).map((t, i) => ({ ...t, id: t.id || String(i) })));
      setDurVal(editData.duration ? String(editData.duration.val) : '');
      setDurUnit(editData.duration ? editData.duration.unit : 'days');
    }
  }, []); // Run once on mount — component is re-keyed by App.jsx each open

  const field = {
    background: 'var(--bg-page)', border: '1px solid var(--line-medium)',
    borderRadius: 'var(--r-xs)', padding: '11px 14px',
    color: 'var(--fg-1)', fontFamily: 'var(--font-body)',
    fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box',
  };
  const selectStyle = { ...field, appearance: 'none', cursor: 'pointer' };

  function addDeity() {
    const d = deityInput.trim();
    if (d && !deities.includes(d)) { setDeities([...deities, d]); setDeityInput(''); }
  }

  function addIngredient() {
    if (!ingName.trim()) return;
    setIngredients([...ingredients, { id: Date.now().toString(), name: ingName.trim(), amount: ingAmt.trim(), note: ingNote.trim() }]);
    setIngName(''); setIngAmt(''); setIngNote('');
  }

  function addTask() {
    if (!taskText.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: taskText.trim() }]);
    setTaskText('');
  }

  function iconForCategory(cats) {
    if (cats.includes('Healing') || cats.includes('Love')) return 'flame';
    if (cats.includes('Divination')) return 'moon';
    return 'sparkle';
  }

  function handleCreate() {
    if (!name.trim()) return;
    const ik = iconForCategory(category);
    const spellData = {
      name: name.trim(),
      summary: summary.trim(),
      sealed: editData ? editData.sealed : false,
      castCount: editData ? (editData.castCount || 0) : 0,
      tags: [...category.slice(0, 2), ...magicType.slice(0, 1)],
      color: editData?.color || '#96A560',
      iconKey: ik,
      moonPhase: moonPhase || 'full',
      season, tod, dow, timingCustom,
      magicType, category,
      chant: chant.trim(),
      deities, ingredients, tasks,
      rating,
      author: authorSelf ? 'Self' : (author.trim() || 'Unknown'),
      authorSelf,
      source: source.trim(),
      duration: durVal ? { val: parseInt(durVal), unit: durUnit } : null,
    };
    if (editData && onSave) {
      onSave({ ...editData, ...spellData });
    } else {
      onCreate({ id: Date.now().toString(), casts: [], ...spellData });
    }
  }

  // Expose submit to App.jsx bottom bar button
  if (submitRef) submitRef.current = handleCreate;

  return (
    <div style={{ padding: '14px 18px 22px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Identity ── */}
      <NWSection title="Identity">
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="oma-eyebrow" style={{ fontSize: 10 }}>Name *</span>
          <input value={name} onChange={e => setName(e.target.value)} autoComplete="off"
            placeholder="Name this spell…"
            style={{ ...field, fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em', fontSize: 18 }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="oma-eyebrow" style={{ fontSize: 10 }}>Summary</span>
          <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3} autoComplete="off"
            placeholder="What this spell is for…"
            style={{ ...field, resize: 'none', lineHeight: 1.55 }} />
        </label>

        <div>
          <span className="oma-eyebrow" style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>Author</span>
          <div style={{ display: 'flex', gap: 6, marginBottom: authorSelf ? 0 : 8 }}>
            {['Self','Other'].map(opt => (
              <button key={opt} onClick={() => setAuthorSelf(opt === 'Self')} style={{
                padding: '6px 14px', borderRadius: 999, cursor: 'pointer',
                background: (opt === 'Self') === authorSelf ? 'var(--chrome-active-bg)' : 'var(--bg-page)',
                border: '1px solid ' + ((opt === 'Self') === authorSelf ? 'var(--chrome-active-line)' : 'var(--line-soft)'),
                color: (opt === 'Self') === authorSelf ? 'var(--chrome-active-fg)' : 'var(--fg-2)',
                fontFamily: 'var(--font-body)', fontSize: 13,
              }}>{opt}</button>
            ))}
          </div>
          {!authorSelf && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              <input value={author} onChange={e => setAuthor(e.target.value)} autoComplete="off"
                placeholder="Author name…" style={{ ...field }} />
              <input value={source} onChange={e => setSource(e.target.value)} autoComplete="off"
                placeholder="Source URL (optional)" style={{ ...field }} />
            </div>
          )}
        </div>

        <div>
          <span className="oma-eyebrow" style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>Rating</span>
          <StarRating value={rating} onChange={setRating} />
        </div>
      </NWSection>

      {/* ── Classification ── */}
      <NWSection title="Classification">
        <div>
          <span className="oma-eyebrow" style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>Category</span>
          <SearchSelect items={CATEGORIES_NW} value={category} onChange={setCategory} multi placeholder="Select categories…" />
        </div>
        <div>
          <span className="oma-eyebrow" style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>Magic Type</span>
          <SearchSelect items={MAGIC_TYPES_NW} value={magicType} onChange={setMagicType} multi placeholder="Select magic types…" />
        </div>
      </NWSection>

      {/* ── Ideal Timing (tabbed) ── */}
      <NWSection title="Ideal Timing">
        <div>
          {/* Tab strip */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--line-soft)', marginBottom: 14 }}>
            {TIMING_TABS_NW.map(t => (
              <button key={t.id} onClick={() => setTimingTab(t.id)} style={{
                flex: 1, padding: '8px 4px 9px', background: 'none', border: 0,
                borderBottom: '2px solid ' + (timingTab === t.id ? 'var(--amber)' : 'transparent'),
                marginBottom: -1, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                color: timingTab === t.id ? 'var(--fg-1)' : 'var(--fg-3)',
                fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                textTransform: 'uppercase', transition: 'color 0.15s',
              }}>
                {React.cloneElement(Ico[t.icoKey] || Ico.sparkle, { size: 15 })}
                {t.label}
              </button>
            ))}
          </div>

          {timingTab === 'moon' && (
            <SearchSelect items={MOON_PHASES_NW} value={moonPhase} onChange={setMoonPhase} multi={false} placeholder="Any phase…" />
          )}
          {timingTab === 'season' && (
            <SearchSelect items={SEASONS_NW} value={season} onChange={setSeason} multi placeholder="Select seasons…" />
          )}
          {timingTab === 'time' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SearchSelect items={TIMES_NW} value={tod} onChange={setTod} multi placeholder="Select times of day…" />
              <input value={timingCustom} onChange={e => setTimingCustom(e.target.value)} autoComplete="off"
                placeholder="Custom note (e.g. Mercury retrograde)…" style={{ ...field }} />
            </div>
          )}
          {timingTab === 'day' && (
            <SearchSelect items={DAYS_NW} value={dow} onChange={setDow} multi placeholder="Select days of the week…" />
          )}
        </div>
      </NWSection>

      {/* ── Duration ── */}
      <NWSection title="Duration (optional)">
        <div>
          <div style={{ color: 'var(--fg-2)', fontSize: 12, marginBottom: 10, lineHeight: 1.5 }}>
            How long does this spell take to work or need to be kept active?
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" min="1" value={durVal} onChange={e => setDurVal(e.target.value)}
              placeholder="Amount" style={{ ...field, flex: 1 }} />
            <select value={durUnit} onChange={e => setDurUnit(e.target.value)} style={{ ...selectStyle, flex: 1 }}>
              {DURATION_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </NWSection>

      {/* ── Supplies & Ingredients ── */}
      <NWSection title="Supplies & Ingredients">
        {ingredients.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {ingredients.map(ing => (
              <div key={ing.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 'var(--r-xs)',
                background: 'var(--bg-page)', border: '1px solid var(--line-soft)',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'var(--fg-1)', fontSize: 13, fontWeight: 600 }}>{ing.name}</div>
                  {(ing.amount || ing.note) && (
                    <div style={{ color: 'var(--fg-3)', fontSize: 11, marginTop: 2 }}>
                      {[ing.amount, ing.note].filter(Boolean).join(' · ')}
                    </div>
                  )}
                </div>
                <button onClick={() => setIngredients(ingredients.filter(x => x.id !== ing.id))} style={{
                  background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-3)', padding: 4,
                }}>{React.cloneElement(Ico.close, { size: 14 })}</button>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 2, position: 'relative' }}>
              <input value={ingName}
                onChange={e => {
                  const val = e.target.value;
                  setIngName(val);
                  if (val.trim().length > 0) {
                    const q = val.trim().toLowerCase();
                    const matches = cabinet.filter(c => c.name.toLowerCase().includes(q));
                    setIngSuggestions(matches);
                    setIngDropOpen(matches.length > 0);
                  } else {
                    setIngSuggestions([]);
                    setIngDropOpen(false);
                  }
                }}
                autoComplete="off"
                placeholder="Supply name…"
                style={{ ...field, width: '100%' }}
                onKeyDown={e => {
                  if (e.key === 'Enter') { e.preventDefault(); setIngDropOpen(false); addIngredient(); }
                  if (e.key === 'Escape') { setIngDropOpen(false); }
                }}
                onBlur={() => setTimeout(() => setIngDropOpen(false), 150)}
                onFocus={() => { if (ingName.trim().length > 0 && ingSuggestions.length > 0) setIngDropOpen(true); }}
              />
              {ingDropOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
                  background: 'var(--bg-elevated)', border: '1px solid var(--line-medium)',
                  borderRadius: 'var(--r-xs)', marginTop: 2,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.35)', overflow: 'hidden',
                }}>
                  {ingSuggestions.map(c => (
                    <button key={c.id}
                      onMouseDown={e => { e.preventDefault(); setIngName(c.name); setIngDropOpen(false); setIngSuggestions([]); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        width: '100%', padding: '9px 12px', background: 'none',
                        border: 0, borderBottom: '1px solid var(--line-soft)',
                        cursor: 'pointer', textAlign: 'left',
                        color: 'var(--fg-1)', fontFamily: 'var(--font-body)', fontSize: 13,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                      <span style={{ flex: 1, fontWeight: 500 }}>{c.name}</span>
                      {c.type && <span style={{ fontSize: 10, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.type}</span>}
                      {c.inv !== undefined && <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: c.inv === 0 ? 'var(--danger)' : c.inv === 1 ? 'var(--amber)' : 'var(--success)' }}>×{c.inv}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input value={ingAmt} onChange={e => setIngAmt(e.target.value)} autoComplete="off"
              placeholder="Amount" style={{ ...field, flex: 1 }} />
          </div>
          <input value={ingNote} onChange={e => setIngNote(e.target.value)} autoComplete="off"
            placeholder="Note (optional)" style={{ ...field }} />
          <Btn variant="secondary" size="sm" icon={Ico.plus} onClick={addIngredient}
            style={{ alignSelf: 'flex-start' }}>Add Supply</Btn>
        </div>
      </NWSection>

      {/* ── Spellwork ── */}
      <NWSection title="Spellwork">
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="oma-eyebrow" style={{ fontSize: 10 }}>Chant or Meditation</span>
          <textarea value={chant} onChange={e => setChant(e.target.value)}
            rows={4} autoComplete="off" placeholder="Words to speak or hold in mind…"
            style={{ ...field, resize: 'none', lineHeight: 1.55 }} />
        </label>
        <div>
          <span className="oma-eyebrow" style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>Deities</span>
          {deities.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {deities.map(d => (
                <span key={d} style={{
                  padding: '5px 10px', borderRadius: 999,
                  background: 'var(--bg-page)', border: '1px solid var(--line-soft)',
                  color: 'var(--fg-2)', fontSize: 13,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  {d}
                  <button onClick={() => setDeities(deities.filter(x => x !== d))} style={{
                    background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-3)', padding: 0, lineHeight: 1,
                  }}>×</button>
                </span>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={deityInput} onChange={e => setDeityInput(e.target.value)} autoComplete="off"
              placeholder="Add a deity…" style={{ ...field, flex: 1 }}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addDeity(); } }} />
            <Btn variant="secondary" size="sm" onClick={addDeity}>Add</Btn>
          </div>
        </div>
      </NWSection>

      {/* ── Tasks ── */}
      <NWSection title="Tasks">
        {tasks.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {tasks.map((t, i) => (
              <div key={t.id} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 12px', borderRadius: 'var(--r-xs)',
                background: 'var(--bg-page)', border: '1px solid var(--line-soft)',
              }}>
                <span style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)', flexShrink: 0, width: 16 }}>{i + 1}.</span>
                {editingTaskId === t.id ? (
                  <>
                    <input
                      value={editingTaskText}
                      onChange={e => setEditingTaskText(e.target.value)}
                      autoComplete="off"
                      style={{ ...field, flex: 1, padding: '5px 8px', fontSize: 13 }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') { e.preventDefault(); setTasks(tasks.map(x => x.id === t.id ? { ...x, text: editingTaskText.trim() || x.text } : x)); setEditingTaskId(null); }
                        if (e.key === 'Escape') { setEditingTaskId(null); }
                      }}
                    />
                    <button onClick={() => { setTasks(tasks.map(x => x.id === t.id ? { ...x, text: editingTaskText.trim() || x.text } : x)); setEditingTaskId(null); }} style={{
                      background: 'none', border: 0, cursor: 'pointer', color: 'var(--success)', padding: 4, flexShrink: 0,
                    }}>{React.cloneElement(Ico.check, { size: 14 })}</button>
                    <button onClick={() => setEditingTaskId(null)} style={{
                      background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-3)', padding: 4, flexShrink: 0,
                    }}>{React.cloneElement(Ico.close, { size: 14 })}</button>
                  </>
                ) : (
                  <>
                    <div style={{ flex: 1, color: 'var(--fg-1)', fontSize: 13, lineHeight: 1.4 }}>{t.text}</div>
                    <button onClick={() => { setEditingTaskId(t.id); setEditingTaskText(t.text); }} style={{
                      background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-3)', padding: 4, flexShrink: 0,
                    }}>{React.cloneElement(Ico.edit, { size: 13 })}</button>
                    <button onClick={() => { setTasks(tasks.filter(x => x.id !== t.id)); if (editingTaskId === t.id) setEditingTaskId(null); }} style={{
                      background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-3)', padding: 4, flexShrink: 0,
                    }}>{React.cloneElement(Ico.close, { size: 14 })}</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={taskText} onChange={e => setTaskText(e.target.value)} autoComplete="off"
            placeholder="Add a step or task…" style={{ ...field, flex: 1 }}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTask(); } }} />
          <Btn variant="secondary" size="sm" onClick={addTask}>Add</Btn>
        </div>
      </NWSection>


    </div>
  );
}

window.NewWorking = NewWorking;
