// NewEntry.jsx — full journal entry form (JournalEntry)

const MONTHS_JE = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const ROMAN_JE  = n => {
  const v=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const s=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let r=''; for(let i=0;i<v.length;i++) while(n>=v[i]){r+=s[i];n-=v[i];} return r;
};

const ENTRY_STATUSES = ['Pending', 'Ongoing', 'Completed'];

function JournalEntry({ editId, onClose, onSave, onDelete, workings, entries, submitRef }) {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const defaultDate = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
  const defaultTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const [title,       setTitle]       = React.useState('');
  const [date,        setDate]        = React.useState(defaultDate);
  const [time,        setTime]        = React.useState(defaultTime);
  const [status,      setStatus]      = React.useState('Pending');
  const [workingId,   setWorkingId]   = React.useState('');
  const [noteText,    setNoteText]    = React.useState('');
  const [notes,       setNotes]       = React.useState([]);
  const [result,      setResult]      = React.useState('');
  const [tasksDone,   setTasksDone]   = React.useState({});
  const [imgSrc,      setImgSrc]      = React.useState(null);
  const [spellError,  setSpellError]  = React.useState(false);
  const fileRef = React.useRef(null);

  React.useEffect(() => {
    if (editId && entries) {
      const e = entries.find(x => x.id === editId);
      if (e) {
        setTitle(e.title || '');
        setDate(e.date || defaultDate);
        setTime(e.time || defaultTime);
        setStatus(e.status || 'Pending');
        setWorkingId(e.workingId || '');
        setNotes(e.notes ? e.notes.map(n => ({...n})) : []);
        setResult(e.result || '');
        setTasksDone(e.tasksDone ? {...e.tasksDone} : {});
        setImgSrc(e.img || null);
        setNoteText('');
      }
    }
  }, []);

  const field = {
    background: 'var(--bg-page)', border: '1px solid var(--line-medium)',
    borderRadius: 'var(--r-xs)', padding: '11px 14px',
    color: 'var(--fg-1)', fontFamily: 'var(--font-body)',
    fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box',
  };

  const linkedWorking = workingId ? (workings || []).find(w => w.id === workingId) : null;

  function addNote() {
    const text = noteText.trim();
    if (!text) return;
    setNotes(prev => [...prev, { id: Date.now().toString(), text, ts: new Date().toISOString() }]);
    setNoteText('');
  }

  function removeNote(id) { setNotes(prev => prev.filter(n => n.id !== id)); }

  function toggleTask(taskId) {
    setTasksDone(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  }

  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setImgSrc(ev.target.result);
    reader.readAsDataURL(f);
    e.target.value = '';
  }

  function handleSave() {
    if (!workingId) { setSpellError(true); return; }
    setSpellError(false);
    const allNotes = [...notes];
    if (noteText.trim()) {
      allNotes.push({ id: Date.now().toString(), text: noteText.trim(), ts: new Date().toISOString() });
    }
    const d = new Date(`${date}T${time}`);
    onSave({
      id: editId || Date.now().toString(),
      workingId: workingId,
      workingName: linkedWorking ? linkedWorking.name.toUpperCase() : null,
      title: title.trim() || (linkedWorking?.name || 'Journal Entry'),
      date,
      romanDay: ROMAN_JE(d.getDate()),
      month: MONTHS_JE[d.getMonth()],
      time,
      kind: 'cast',
      status,
      notes: allNotes,
      result: result.trim(),
      tasksDone: { ...tasksDone },
      img: imgSrc,
    });
    setNoteText('');
  }

  if (submitRef) submitRef.current = handleSave;

  const fmtTs = iso => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' +
      d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const phaseLabel = p => p ? p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '';

  return (
    <div style={{ padding: '14px 18px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Spell selector — required, first ── */}
      <div>
        <span className="oma-eyebrow" style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>
          Spell <span style={{ color: 'var(--ember)', fontStyle: 'normal' }}>*</span>
        </span>
        <SearchSelect
          items={(workings || []).map(w => ({ key: w.id, label: w.name }))}
          value={workingId}
          onChange={id => { setWorkingId(id); setTasksDone({}); setSpellError(false); if (!title) setTitle(''); }}
          multi={false}
          placeholder="Select a spell to begin…"
        />
        {spellError && (
          <div style={{ color: 'var(--ember)', fontSize: 12, marginTop: 6 }}>
            A spell is required before saving.
          </div>
        )}
        {!workingId && !spellError && (
          <div style={{ color: 'var(--fg-3)', fontSize: 12, marginTop: 6 }}>
            Choose a spell to unlock the rest of this entry.
          </div>
        )}
      </div>

      {/* ── Spell details — visible once spell is selected ── */}
      {linkedWorking && (
        <div style={{
          borderRadius: 'var(--r-lg)', overflow: 'hidden',
          border: '1px solid var(--line-soft)', background: 'var(--bg-surface)',
        }}>
          {/* Spell header */}
          <div style={{
            padding: '12px 14px',
            background: linkedWorking.color + '18',
            borderBottom: '1px solid var(--line-soft)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 'var(--r-sm)',
              background: linkedWorking.color + '30', color: linkedWorking.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {React.cloneElement(linkedWorking.icon, { size: 16 })}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: 'var(--fg-1)', fontSize: 13, fontWeight: 600 }}>{linkedWorking.name}</div>
              {linkedWorking.summary && (
                <div style={{ color: 'var(--fg-3)', fontSize: 11, marginTop: 2, lineHeight: 1.4 }}>{linkedWorking.summary}</div>
              )}
            </div>
          </div>

          {/* Timing */}
          {(linkedWorking.moonPhase || (linkedWorking.season||[]).length > 0 || (linkedWorking.tod||[]).length > 0 || (linkedWorking.dow||[]).length > 0) && (
            <div style={{
              padding: '8px 14px',
              borderBottom: '1px solid var(--line-soft)',
              display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center',
            }}>
              {linkedWorking.moonPhase && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                  <MoonGlyph phase={linkedWorking.moonPhase} size={12} color="var(--fg-3)" />
                  {phaseLabel(linkedWorking.moonPhase).toUpperCase()}
                </span>
              )}
              {(linkedWorking.tod||[]).map(t => (
                <span key={t} style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>{t.toUpperCase()}</span>
              ))}
              {(linkedWorking.dow||[]).map(d => (
                <span key={d} style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>{d.toUpperCase()}</span>
              ))}
              {(linkedWorking.season||[]).map(s => (
                <span key={s} style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>{s.toUpperCase()}</span>
              ))}
            </div>
          )}

          {/* Ingredients */}
          {linkedWorking.ingredients && linkedWorking.ingredients.length > 0 && (
            <div style={{ borderBottom: (linkedWorking.tasks && linkedWorking.tasks.length > 0) ? '1px solid var(--line-soft)' : 'none' }}>
              <div style={{ padding: '8px 14px 4px', color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                INGREDIENTS
              </div>
              {linkedWorking.ingredients.map((ing, i) => (
                <div key={ing.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 14px',
                  borderTop: i === 0 ? 'none' : '1px solid var(--line-soft)',
                }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: 'var(--fg-1)', fontSize: 13 }}>{ing.name}</span>
                    {ing.note && <span style={{ color: 'var(--fg-3)', fontSize: 11, marginLeft: 6 }}>{ing.note}</span>}
                  </div>
                  <span style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{ing.amount}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tasks — checkable */}
          {linkedWorking.tasks && linkedWorking.tasks.length > 0 && (
            <div>
              <div style={{ padding: '8px 14px 4px', color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                TASKS
              </div>
              {linkedWorking.tasks.map((t, i) => (
                <label key={t.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '9px 14px',
                  borderTop: i === 0 ? 'none' : '1px solid var(--line-soft)',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                    border: '1.5px solid ' + (tasksDone[t.id] ? 'var(--success)' : 'var(--line-medium)'),
                    background: tasksDone[t.id] ? 'var(--success)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 150ms, border-color 150ms',
                  }}>
                    {tasksDone[t.id] && <span style={{ color: 'var(--bg-page)', fontSize: 11, fontWeight: 700 }}>✓</span>}
                  </div>
                  <input type="checkbox" checked={!!tasksDone[t.id]} onChange={() => toggleTask(t.id)} style={{ display: 'none' }} />
                  <span style={{
                    color: tasksDone[t.id] ? 'var(--fg-3)' : 'var(--fg-1)',
                    fontSize: 13, lineHeight: 1.4,
                    textDecoration: tasksDone[t.id] ? 'line-through' : 'none',
                  }}>{t.text}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Rest of form — only shown when spell is selected ── */}
      {workingId && (
        <>
          {/* Status */}
          <div>
            <span className="oma-eyebrow" style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>Status</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {ENTRY_STATUSES.map(s => (
                <button key={s} onClick={() => setStatus(s)} style={{
                  padding: '7px 12px', borderRadius: 999, cursor: 'pointer',
                  background: status === s ? 'var(--chrome-active-bg)' : 'var(--bg-page)',
                  border: '1px solid ' + (status === s ? 'var(--chrome-active-line)' : 'var(--line-soft)'),
                  color: status === s ? 'var(--chrome-active-fg)' : 'var(--fg-2)',
                  fontFamily: 'var(--font-body)', fontSize: 13,
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Date + Time */}
          <div style={{ display: 'flex', gap: 10 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <span className="oma-eyebrow" style={{ fontSize: 10 }}>Date</span>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                style={{ ...field, colorScheme: 'dark' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <span className="oma-eyebrow" style={{ fontSize: 10 }}>Time</span>
              <input type="time" value={time} onChange={e => setTime(e.target.value)}
                style={{ ...field, colorScheme: 'dark' }} />
            </label>
          </div>

          {/* Title */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="oma-eyebrow" style={{ fontSize: 10 }}>Title</span>
            <input value={title} onChange={e => setTitle(e.target.value)} autoComplete="off"
              placeholder={linkedWorking ? linkedWorking.name : 'Name this entry'}
              style={{ ...field, fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal',
                fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em', fontSize: 18 }} />
          </label>

          {/* Notes */}
          <div>
            <span className="oma-eyebrow" style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>Notes</span>
            {notes.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                {notes.map(n => (
                  <div key={n.id} style={{
                    padding: '10px 12px', borderRadius: 'var(--r-xs)',
                    background: 'var(--bg-page)', border: '1px solid var(--line-soft)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <div style={{ flex: 1, color: 'var(--fg-1)', fontSize: 13, lineHeight: 1.55 }}>{n.text}</div>
                      <button onClick={() => removeNote(n.id)} style={{
                        background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-3)', padding: '2px 4px', flexShrink: 0,
                      }}>{React.cloneElement(Ico.close, { size: 13 })}</button>
                    </div>
                    <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)', marginTop: 5 }}>
                      {fmtTs(n.ts)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <textarea value={noteText} onChange={e => setNoteText(e.target.value)}
              rows={5} autoComplete="off"
              placeholder={notes.length === 0 ? 'Write what happened…' : 'Add another note…'}
              style={{ ...field, resize: 'none', lineHeight: 1.55 }} />
            {noteText.trim() && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                <Btn variant="secondary" size="sm" onClick={addNote}>Add Note</Btn>
              </div>
            )}
          </div>

          {/* Result */}
          {status === 'Completed' && (
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="oma-eyebrow" style={{ fontSize: 10 }}>Result</span>
              <textarea value={result} onChange={e => setResult(e.target.value)}
                rows={3} autoComplete="off" placeholder="What came of this spell…"
                style={{ ...field, resize: 'none', lineHeight: 1.55 }} />
            </label>
          )}

          {/* Photo */}
          <div>
            <span className="oma-eyebrow" style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>Photo (optional)</span>
            {imgSrc ? (
              <div style={{ position: 'relative' }}>
                <img src={imgSrc} alt="" style={{
                  width: '100%', maxHeight: 180, objectFit: 'cover',
                  borderRadius: 'var(--r-md)', display: 'block', border: '1px solid var(--line-soft)',
                }} />
                <button onClick={() => setImgSrc(null)} style={{
                  position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: 50,
                  background: 'rgba(0,0,0,0.55)', border: 0, cursor: 'pointer', color: 'var(--bone)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{React.cloneElement(Ico.close, { size: 12 })}</button>
              </div>
            ) : (
              <>
                <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
                <Btn variant="secondary" size="sm" icon={Ico.photo}
                  onClick={() => fileRef.current && fileRef.current.click()}>
                  Add Photo
                </Btn>
              </>
            )}
          </div>

          {/* Delete (edit mode only) */}
          {editId && onDelete && (
            <div style={{ paddingTop: 4 }}>
              <Btn variant="ghost" size="sm" fullWidth onClick={() => {
                if (window.confirm('Delete this entry? This cannot be undone.')) onDelete(editId);
              }} style={{ color: 'var(--crimson-300)', fontSize: 12 }}>
                Delete this entry
              </Btn>
            </div>
          )}
        </>
      )}

    </div>
  );
}

window.JournalEntry = JournalEntry;
window.NewEntry = JournalEntry;

// ── EntryDetail — read-only single-entry view ─────────────────────────────────
function EntryDetail({ entryId, entries, workings }) {
  const e = entries.find(x => x.id === entryId);
  if (!e) return null;

  const statusTone = { Pending: 'amber', Ongoing: 'pending', Completed: 'sealed' };
  const linkedWorking = (workings || []).find(w => w.id === e.workingId);

  const fmtTs = iso => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' · ' +
      d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* Hero band */}
      <div style={{
        padding: '18px 18px 22px',
        borderBottom: '1px solid var(--line-soft)',
      }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
          {e.status && (
            <Badge tone={statusTone[e.status] || 'pending'} dot={false}>{e.status}</Badge>
          )}
          <span style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            {e.romanDay} {e.month} · {e.time}
          </span>
        </div>
        <div style={{
          fontFamily: '"Ohno Blazeface 36", var(--font-display)', fontStyle: 'normal',
          fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
          fontSize: 28, lineHeight: 1.05, color: 'var(--fg-1)',
        }}>{e.title}</div>
        {e.workingName && (
          <div style={{
            color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)',
            marginTop: 8, letterSpacing: '0.04em',
          }}>— {e.workingName}</div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '18px 18px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Photo */}
        {e.img && (
          <img src={e.img} alt="" style={{
            width: '100%', maxHeight: 220, objectFit: 'cover',
            borderRadius: 'var(--r-md)', border: '1px solid var(--line-soft)', display: 'block',
          }} />
        )}

        {/* Legacy body fallback for old-format entries */}
        {(!e.notes || e.notes.length === 0) && e.body && (
          <div style={{
            padding: '14px 16px', borderRadius: 'var(--r-md)',
            background: 'var(--bg-surface)', border: '1px solid var(--line-soft)',
          }}>
            <div style={{ color: 'var(--fg-1)', fontSize: 14, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{e.body}</div>
          </div>
        )}

        {/* Notes */}
        {e.notes && e.notes.length > 0 && (
          <div>
            <div className="oma-eyebrow" style={{ marginBottom: 12 }}>
              {e.notes.length === 1 ? 'Note' : `${e.notes.length} Notes`}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {e.notes.map(n => (
                <div key={n.id} style={{
                  padding: '14px 16px', borderRadius: 'var(--r-md)',
                  background: 'var(--bg-surface)', border: '1px solid var(--line-soft)',
                }}>
                  <div style={{
                    color: 'var(--fg-1)', fontSize: 14, lineHeight: 1.65,
                    whiteSpace: 'pre-wrap',
                  }}>{n.text}</div>
                  {n.ts && (
                    <div style={{
                      color: 'var(--fg-3)', fontSize: 10,
                      fontFamily: 'var(--font-mono)', marginTop: 10,
                    }}>{fmtTs(n.ts)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tasks */}
        {linkedWorking && linkedWorking.tasks && linkedWorking.tasks.length > 0 && (
          <div>
            <div className="oma-eyebrow" style={{ marginBottom: 10 }}>Tasks</div>
            <div style={{
              borderRadius: 'var(--r-md)', border: '1px solid var(--line-soft)',
              overflow: 'hidden', background: 'var(--bg-surface)',
            }}>
              {linkedWorking.tasks.map((t, i) => {
                const done = !!(e.tasksDone && e.tasksDone[t.id]);
                return (
                  <div key={t.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                    borderTop: i === 0 ? 'none' : '1px solid var(--line-soft)',
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                      border: '1.5px solid ' + (done ? 'var(--success)' : 'var(--line-medium)'),
                      background: done ? 'var(--success)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {done && <span style={{ color: 'var(--bg-page)', fontSize: 11, fontWeight: 700 }}>✓</span>}
                    </div>
                    <span style={{
                      color: done ? 'var(--fg-3)' : 'var(--fg-1)', fontSize: 13,
                      textDecoration: done ? 'line-through' : 'none',
                    }}>{t.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Result */}
        {e.result && (
          <div style={{
            padding: '14px 16px', borderRadius: 'var(--r-md)',
            background: 'rgba(0,194,138,0.08)', border: '1px solid rgba(0,194,138,0.20)',
          }}>
            <div className="oma-eyebrow" style={{ color: 'var(--success)', marginBottom: 8 }}>Result</div>
            <div style={{ color: 'var(--fg-1)', fontSize: 14, lineHeight: 1.65 }}>{e.result}</div>
          </div>
        )}

      </div>
    </div>
  );
}

window.EntryDetail = EntryDetail;
