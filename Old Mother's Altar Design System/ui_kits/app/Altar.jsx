// Altar.jsx — home / today view

function Altar({ data, onOpenWorking, onCompose }) {
  const { activeCast, recentWorkings, moonPhase, moonLabel, monthRoman } = data;

  return (
    <div style={{ padding: '14px 16px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* greeting */}
      <div>
        <div className="oma-eyebrow">Evensong · 9:41</div>
        <div style={{
          fontFamily: '"Ohno Blazeface 48", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
          fontSize: 36, lineHeight: 1.0, color: 'var(--fg-1)', marginTop: 4,
          letterSpacing: '-0.01em',
        }}>Welcome Back<span style={{ color: 'var(--fg-3)' }}>,</span></div>
        <div style={{
          fontFamily: '"Ohno Blazeface 48", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
          fontSize: 36, lineHeight: 1.0, color: 'var(--amber)',
          letterSpacing: '-0.01em',
        }}>Margaux.</div>
      </div>

      {/* the moon */}
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
          <div className="oma-eyebrow" style={{ fontSize: 10 }}>The {monthRoman} moon</div>
          <div style={{
            fontFamily: '"Ohno Blazeface 24", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
            fontSize: 20, color: 'var(--fg-1)', marginTop: 2,
          }}>{moonLabel}</div>
          <div style={{ color: 'var(--fg-2)', fontSize: 12, marginTop: 2 }}>
            Wanes through Friday. Good for releasing, less for binding.
          </div>
        </div>
      </Card>

      {/* active cast */}
      {activeCast && (
        <Card glow="ember" padding={0} style={{ overflow: 'hidden' }}>
          <div style={{
            padding: '16px 18px 14px',
            display: 'flex', alignItems: 'center', gap: 14,
            background: 'linear-gradient(180deg, rgba(243,83,33,0.10), transparent 70%)',
          }}>
            <div style={{
              width: 54, height: 64, position: 'relative',
              display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
            }}>
              <div style={{ position: 'absolute', top: -6 }}><Flame size={30} /></div>
              <div style={{
                width: 12, height: 38, borderRadius: 2,
                background: 'linear-gradient(180deg, var(--wax-1) 0%, var(--wax-2) 100%)',
                boxShadow: '0 0 0 1px var(--wax-outline), 0 0 14px rgba(243,83,33,0.35)',
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Badge tone="burning">Burning · 22m</Badge>
              <div style={{
                fontFamily: '"Ohno Blazeface 24", var(--font-display)', fontStyle: 'normal', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em',
                fontSize: 22, color: 'var(--fg-1)', marginTop: 6, lineHeight: 1.05,
              }}>{activeCast.name}</div>
              <div style={{ color: 'var(--fg-2)', fontSize: 12, marginTop: 4 }}>
                Lit at {activeCast.lit}. About II hours remain.
              </div>
            </div>
          </div>
          <div style={{
            padding: '10px 14px',
            display: 'flex', gap: 8, justifyContent: 'flex-end',
            borderTop: '1px solid var(--line-soft)',
          }}>
            <Btn variant="ghost" size="sm">Add a Note</Btn>
            <Btn variant="ember" size="sm">Tend the Flame</Btn>
          </div>
        </Card>
      )}

      {/* recent workings */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span className="oma-eyebrow">Recent workings</span>
          <span style={{ color: 'var(--fg-2)', fontSize: 12 }}>{recentWorkings.length} in the book</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recentWorkings.map(w => (
            <Card key={w.id} onClick={() => onOpenWorking(w.id)} padding={14} style={{
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 'var(--r-md)',
                background: w.color + '22',
                color: w.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>{React.cloneElement(w.icon, { size: 18 })}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-body)', fontWeight: 600,
                  fontSize: 14, color: 'var(--fg-1)',
                }}>{w.name}</div>
                <div style={{ color: 'var(--fg-3)', fontSize: 11, marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                  LAST CAST · {w.lastCast}
                </div>
              </div>
              <Badge tone={w.tone}>{w.castCount} · CAST</Badge>
            </Card>
          ))}
        </div>
      </div>

      {/* compose CTA */}
      <Btn variant="primary" size="lg" icon={Ico.plus} fullWidth onClick={onCompose}>
        Begin a Working
      </Btn>
    </div>
  );
}

window.Altar = Altar;
