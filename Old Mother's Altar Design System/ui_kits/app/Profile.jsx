// Profile.jsx — profile, preferences, and settings

function Profile({ profile, onUpdateProfile, workings, entries, cabinet, theme, setTheme, onLogOut }) {
  const [editingName,  setEditingName]  = React.useState(false);
  const [nameVal,      setNameVal]      = React.useState(profile.name || '');
  const [editingNote,  setEditingNote]  = React.useState(false);
  const [noteVal,      setNoteVal]      = React.useState(profile.practiceNote || '');
  const [newDeity,     setNewDeity]     = React.useState('');
  const [privacyLock,  setPrivacyLock]  = React.useState(false);

  function saveName() {
    onUpdateProfile({ ...profile, name: nameVal.trim() || 'Witch' });
    setEditingName(false);
  }
  function saveNote() {
    onUpdateProfile({ ...profile, practiceNote: noteVal.trim() });
    setEditingNote(false);
  }
  function addDeity() {
    const d = newDeity.trim();
    if (!d) return;
    const existing = profile.deities || [];
    if (existing.includes(d)) { setNewDeity(''); return; }
    onUpdateProfile({ ...profile, deities: [...existing, d] });
    setNewDeity('');
  }
  function removeDeity(name) {
    onUpdateProfile({ ...profile, deities: (profile.deities || []).filter(d => d !== name) });
  }

  const field = {
    background: 'var(--bg-page)',
    border: '1px solid var(--line-medium)',
    borderRadius: 'var(--r-xs)',
    padding: '11px 14px',
    color: 'var(--fg-1)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  const row = (label, value, onEdit) => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '13px 14px',
      borderBottom: '1px solid var(--line-soft)',
    }}>
      <div>
        <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
          {label}
        </div>
        <div style={{ color: 'var(--fg-1)', fontSize: 14, fontWeight: 600, marginTop: 3 }}>{value}</div>
      </div>
      {onEdit && (
        <button onClick={onEdit} style={{
          background: 'none', border: 0, cursor: 'pointer',
          color: 'var(--fg-3)', padding: '4px',
          display: 'flex', alignItems: 'center',
        }}>{React.cloneElement(Ico.edit, { size: 15 })}</button>
      )}
    </div>
  );

  const deities = profile.deities || [];

  return (
    <div style={{ padding: '14px 16px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Profile ── */}
      <div>
        <div className="oma-eyebrow" style={{ marginBottom: 10 }}>Your Practice</div>
        <div style={{ borderRadius: 'var(--r-lg)', border: '1px solid var(--line-soft)', overflow: 'hidden', background: 'var(--bg-surface)' }}>

          {/* Name */}
          {editingName ? (
            <div style={{ padding: '13px 14px', borderBottom: '1px solid var(--line-soft)' }}>
              <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: 8 }}>
                YOUR NAME
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={nameVal} onChange={e => setNameVal(e.target.value)}
                  autoComplete="off" style={{ ...field, flex: 1 }}
                  onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditingName(false); }} />
                <Btn variant="primary" size="sm" onClick={saveName}>Save</Btn>
                <Btn variant="ghost" size="sm" onClick={() => setEditingName(false)}>Cancel</Btn>
              </div>
            </div>
          ) : (
            row('YOUR NAME', profile.name || 'Witch', () => { setNameVal(profile.name || ''); setEditingName(true); })
          )}

          {/* Practice note */}
          {editingNote ? (
            <div style={{ padding: '13px 14px', borderBottom: '1px solid var(--line-soft)' }}>
              <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: 8 }}>
                PRACTICE NOTE
              </div>
              <textarea value={noteVal} onChange={e => setNoteVal(e.target.value)}
                rows={4} autoComplete="off" placeholder="A few words about your practice…"
                style={{ ...field, resize: 'none', lineHeight: 1.55 }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
                <Btn variant="ghost" size="sm" onClick={() => setEditingNote(false)}>Cancel</Btn>
                <Btn variant="primary" size="sm" onClick={saveNote}>Save</Btn>
              </div>
            </div>
          ) : (
            row(
              'PRACTICE NOTE',
              profile.practiceNote || <span style={{ color: 'var(--fg-3)', fontStyle: 'italic', fontWeight: 400 }}>None yet</span>,
              () => { setNoteVal(profile.practiceNote || ''); setEditingNote(true); }
            )
          )}

          {/* Spell count */}
          <div style={{ padding: '13px 14px', borderBottom: 0 }}>
            <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
              SPELLS IN THE GRIMOIRE
            </div>
            <div style={{ color: 'var(--fg-1)', fontSize: 14, fontWeight: 600, marginTop: 3 }}>
              {(workings || []).length} {(workings || []).length === 1 ? 'spell' : 'spells'}
            </div>
          </div>
        </div>
      </div>

      {/* ── Practice Stats ── */}
      <div>
        <div className="oma-eyebrow" style={{ marginBottom: 10 }}>Practice Stats</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { label: 'SPELLS',   value: (workings || []).length, color: 'var(--indigo-300)' },
            { label: 'SUPPLIES', value: (cabinet || []).length,  color: 'var(--moss)' },
            { label: 'ENTRIES',  value: (entries || []).length,  color: 'var(--fg-3)' },
          ].map(stat => (
            <div key={stat.label} style={{
              padding: '14px 8px', borderRadius: 'var(--r-lg)',
              border: '1px solid var(--line-soft)', background: 'var(--bg-surface)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: stat.color, fontFamily: 'var(--font-mono)' }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--fg-3)', fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Deities ── */}
      <div>
        <div className="oma-eyebrow" style={{ marginBottom: 10 }}>Deities</div>
        <div style={{ borderRadius: 'var(--r-lg)', border: '1px solid var(--line-soft)', overflow: 'hidden', background: 'var(--bg-surface)' }}>
          {deities.length > 0 ? (
            <div style={{ padding: '10px 14px 6px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {deities.map(d => (
                <div key={d} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 10px 6px 12px', borderRadius: 999,
                  background: 'var(--bg-page)', border: '1px solid var(--line-medium)',
                  color: 'var(--fg-2)', fontSize: 13,
                }}>
                  <span>{d}</span>
                  <button onClick={() => removeDeity(d)} style={{
                    background: 'none', border: 0, cursor: 'pointer', padding: 0,
                    color: 'var(--fg-3)', display: 'flex', alignItems: 'center',
                    lineHeight: 1,
                  }} title={`Remove ${d}`}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '13px 14px 6px', color: 'var(--fg-3)', fontSize: 13, fontStyle: 'italic' }}>
              No deities added yet.
            </div>
          )}
          {/* Add deity input */}
          <div style={{ padding: '10px 14px 12px', display: 'flex', gap: 8 }}>
            <input
              value={newDeity}
              onChange={e => setNewDeity(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addDeity(); }}
              placeholder="Add a deity…"
              autoComplete="off"
              style={{
                flex: 1, background: 'var(--bg-page)',
                border: '1px solid var(--line-soft)',
                borderRadius: 'var(--r-xs)', padding: '8px 12px',
                color: 'var(--fg-1)', fontFamily: 'var(--font-body)', fontSize: 13,
                outline: 'none',
              }}
            />
            <Btn variant="secondary" size="sm" onClick={addDeity}>Add</Btn>
          </div>
        </div>
      </div>

      {/* ── Preferences ── */}
      <div>
        <div className="oma-eyebrow" style={{ marginBottom: 10 }}>Preferences</div>
        <div style={{ borderRadius: 'var(--r-lg)', border: '1px solid var(--line-soft)', overflow: 'hidden', background: 'var(--bg-surface)' }}>
          {/* Theme */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '13px 14px',
            borderBottom: '1px solid var(--line-soft)',
          }}>
            <div>
              <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>APPEARANCE</div>
              <div style={{ color: 'var(--fg-1)', fontSize: 14, fontWeight: 600, marginTop: 3 }}>
                {theme === 'dark' ? 'Dark' : 'Light'}
              </div>
            </div>
            <ThemeToggle theme={theme} onChange={setTheme} />
          </div>
        </div>
      </div>

      {/* ── Privacy ── */}
      <div>
        <div className="oma-eyebrow" style={{ marginBottom: 10 }}>Privacy</div>
        <div style={{ borderRadius: 'var(--r-lg)', border: '1px solid var(--line-soft)', overflow: 'hidden', background: 'var(--bg-surface)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '13px 14px',
          }}>
            <div style={{ flex: 1, paddingRight: 12 }}>
              <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>LOCK ON BACKGROUND</div>
              <div style={{ color: 'var(--fg-1)', fontSize: 14, fontWeight: 600, marginTop: 3 }}>Require login on re-entry</div>
              <div style={{ color: 'var(--fg-3)', fontSize: 12, marginTop: 4, lineHeight: 1.45 }}>
                Protects your spells and journal entries from prying eyes. When enabled, leaving the app requires login before re-entry is possible.
              </div>
            </div>
            {/* Toggle */}
            <button
              onClick={() => setPrivacyLock(p => !p)}
              aria-pressed={privacyLock}
              style={{
                flexShrink: 0,
                width: 44, height: 26,
                borderRadius: 13,
                background: privacyLock ? 'var(--amber)' : 'var(--line-medium)',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s',
                padding: 0,
              }}
            >
              <span style={{
                position: 'absolute',
                top: 3, left: privacyLock ? 21 : 3,
                width: 20, height: 20,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Reset demo data ── */}
      <div style={{ marginBottom: 8 }}>
        <Btn variant="secondary" size="lg" fullWidth onClick={() => {
          if (window.confirm('Reset all data to demo defaults? This cannot be undone.')) {
            ['oma_workings','oma_entries','oma_cabinet','oma_profile'].forEach(k => localStorage.removeItem(k));
            window.location.reload();
          }
        }}>
          Reset to Demo Data
        </Btn>
      </div>

      {/* ── Sign out ── */}
      <Btn variant="secondary" size="lg" fullWidth onClick={onLogOut}>
        Log Out
      </Btn>

    </div>
  );
}

window.Profile = Profile;
