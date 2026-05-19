// Altar.jsx — home / today view

function Altar({ data, onOpenWorking, onCompose, onNewEntry, onOpenEntry, onGoToJournal }) {
  const { moonPhase, moonLabel, monthRoman, recentEntries, totalEntries, pendingTasks, magicalEvents, timeOfDay, userName } = data;
  const [showAllTasks, setShowAllTasks] = React.useState(false);

  const statusTone = { Pending: 'amber', Ongoing: 'pending', Active: 'pending', Completed: 'sealed' };

  // Get first note text for preview
  function firstNote(e) {
    if (e.notes && e.notes.length > 0) return e.notes[0].text;
    return e.body || '';
  }

  return (
    <div style={{ padding: '14px 16px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Greeting ── */}
      <div>
        <div className="oma-eyebrow">
          {timeOfDay} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        <div style={{
          fontFamily: '"Ohno Blazeface 48", var(--font-display)', fontStyle: 'normal', fontWeight: 400,
          textTransform: 'uppercase', letterSpacing: '-0.01em',
          fontSize: 36, lineHeight: 1.0, color: 'var(--fg-1)', marginTop: 4,
        }}>Welcome back<span style={{ color: 'var(--fg-3)' }}>,</span></div>
        <div style={{
          fontFamily: '"Ohno Blazeface 48", var(--font-display)', fontStyle: 'normal', fontWeight: 400,
          textTransform: 'uppercase', letterSpacing: '-0.01em',
          fontSize: 36, lineHeight: 1.0, color: 'var(--amber)',
        }}>{userName}.</div>
      </div>

      {/* ── The Moon ── */}
      <Card padding={18} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 50,
          background: 'var(--action-secondary-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--line-medium)',
        }}>
          <MoonGlyph phase={moonPhase} size={36} color="var(--fg-1)" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="oma-eyebrow" style={{ fontSize: 10 }}>Today's Events</div>
          <div style={{
            fontFamily: '"Ohno Blazeface 24", var(--font-display)', fontStyle: 'normal', fontWeight: 400,
            textTransform: 'uppercase', letterSpacing: '0.02em',
            fontSize: 20, color: 'var(--fg-1)', marginTop: 2,
          }}>{moonLabel}</div>
          <div style={{ color: 'var(--fg-2)', fontSize: 12, marginTop: 2 }}>
            {['full','waxing-gibbous','waxing-crescent','first-quarter','new'].includes(moonPhase)
              ? 'Good for growth, attraction, and binding.'
              : 'Good for releasing, banishing, and clearing.'}
          </div>
        </div>
      </Card>

      {/* ── Magical Events (Today) ── */}
      {magicalEvents && magicalEvents.length > 0 && (
        <div>
          <div className="oma-eyebrow" style={{ marginBottom: 8 }}>Today</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {magicalEvents.map((ev, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--line-soft)',
                background: 'var(--bg-surface)',
              }}>
                {ev.glyph ? (
                  <MoonGlyph phase={ev.glyph} size={18} color="var(--amber)" />
                ) : (
                  <span style={{ fontSize: 16 }}>✦</span>
                )}
                <span style={{ color: 'var(--fg-1)', fontSize: 14, fontWeight: 500 }}>{ev.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Pending Tasks ── */}
      {pendingTasks && pendingTasks.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span className="oma-eyebrow">To Do</span>
            <span style={{ color: 'var(--fg-2)', fontSize: 12 }}>{pendingTasks.length} remaining</span>
          </div>
          <div style={{
            borderRadius: 'var(--r-lg)', overflow: 'hidden',
            border: '1px solid var(--line-soft)', background: 'var(--bg-surface)',
          }}>
            {(showAllTasks ? pendingTasks : pendingTasks.slice(0, 3)).map((task, i) => (
              <button key={task.taskId + task.entryId} onClick={() => onOpenEntry && onOpenEntry(task.entryId)}
                style={{
                  width: '100%', background: 'none', border: 0, cursor: 'pointer', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  borderTop: i === 0 ? 0 : '1px solid var(--line-soft)',
                }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                  border: '1.5px solid var(--line-medium)', background: 'transparent',
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'var(--fg-1)', fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{task.taskText}</div>
                  <div style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)', marginTop: 3, letterSpacing: '0.04em' }}>
                    {task.spellName}
                  </div>
                </div>
                {React.cloneElement(Ico.chevron, { size: 14, style: { color: 'var(--fg-3)', flexShrink: 0 } })}
              </button>
            ))}
            {pendingTasks.length > 3 && (
              <button onClick={() => setShowAllTasks(v => !v)} style={{
                width: '100%', background: 'none', border: 0, cursor: 'pointer', textAlign: 'center',
                padding: '10px 14px', borderTop: '1px solid var(--line-soft)',
                color: 'var(--fg-3)', fontSize: 12, fontFamily: 'var(--font-body)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                {showAllTasks
                  ? <>Show less {React.cloneElement(Ico.chevron, { size: 12, style: { transform: 'rotate(180deg)' } })}</>
                  : <>{pendingTasks.length - 3} more {React.cloneElement(Ico.chevron, { size: 12 })}</>
                }
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Recent Entries ── */}
      {recentEntries && recentEntries.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span className="oma-eyebrow">Recent Entries</span>
          </div>
          <div style={{
            borderRadius: 'var(--r-lg)', overflow: 'hidden',
            border: '1px solid var(--line-soft)', background: 'var(--bg-surface)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {recentEntries.slice(0, 3).map((e, i) => (
                <div key={e.id} style={{ borderTop: i === 0 ? 0 : '1px solid var(--line-soft)' }}>
                  <Card padding={14} onClick={() => onOpenEntry && onOpenEntry(e.id)} style={{ borderRadius: 0, border: 0, background: 'none' }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <div style={{ flexShrink: 0, textAlign: 'center', paddingTop: 2, width: 30 }}>
                        <div style={{
                          fontFamily: '"Ohno Blazeface 24", var(--font-display)', fontStyle: 'normal',
                          fontWeight: 400, textTransform: 'uppercase',
                          fontSize: 18, color: 'var(--amber)', lineHeight: 1,
                        }}>{e.romanDay}</div>
                        <div style={{ color: 'var(--fg-3)', fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginTop: 3 }}>{e.month}</div>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 5 }}>
                          {e.status && <Badge tone={statusTone[e.status] || 'pending'} dot={false}>{e.status}</Badge>}
                          <span style={{ color: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>{e.time}</span>
                        </div>
                        <div style={{
                          fontFamily: '"Ohno Blazeface 18", var(--font-display)', fontStyle: 'normal',
                          fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
                          fontSize: 14, lineHeight: 1.1, color: 'var(--fg-1)',
                        }}>{e.title}</div>
                        <div style={{
                          color: 'var(--fg-2)', fontSize: 12, lineHeight: 1.5, marginTop: 4,
                          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        }}>{firstNote(e)}</div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            {(totalEntries > 3) && (
              <button onClick={() => onGoToJournal && onGoToJournal()} style={{
                width: '100%', background: 'none', border: 0, cursor: 'pointer', textAlign: 'center',
                padding: '10px 14px', borderTop: '1px solid var(--line-soft)',
                color: 'var(--fg-3)', fontSize: 12, fontFamily: 'var(--font-body)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                {totalEntries - 3} more {React.cloneElement(Ico.chevron, { size: 12 })}
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

window.Altar = Altar;
