// Login.jsx — sign-in screen, shown only when the user logs out

function Login({ onSignIn }) {
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible]   = React.useState(false);
  const [focused, setFocused]   = React.useState(null); // 'email' | 'password' | null

  // Gentle fade-in on mount
  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, []);

  function handleKey(e) {
    if (e.key === 'Enter') onSignIn();
  }

  const baseInput = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'rgba(253,254,235,0.05)',
    border: '1px solid rgba(253,254,235,0.12)',
    borderRadius: 14,
    padding: '14px 16px',
    color: 'var(--fg-1)',
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.18s, background 0.18s',
    display: 'block',
  };

  function inputStyle(name) {
    return {
      ...baseInput,
      borderColor: focused === name ? 'rgba(244,175,89,0.55)' : 'rgba(253,254,235,0.12)',
      background: focused === name ? 'rgba(253,254,235,0.07)' : 'rgba(253,254,235,0.05)',
    };
  }

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at 50% 38%, rgba(45,78,166,0.14) 0%, transparent 62%), #07090A',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 32px',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.45s ease',
      overflowY: 'auto',
    }}>

      {/* Logo */}
      <div style={{
        marginBottom: 8,
        filter: 'drop-shadow(0 0 22px rgba(244,175,89,0.14))',
      }}>
        <SplashLogo size={195} />
      </div>

      {/* Tagline */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.20em',
        color: 'rgba(253,254,235,0.30)', textTransform: 'uppercase',
        marginBottom: 44,
      }}>
        Your Practice. Your Book.
      </div>

      {/* Divider */}
      <div style={{
        width: '100%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(253,254,235,0.10), transparent)',
        marginBottom: 32,
      }} />

      {/* Email field */}
      <div style={{ width: '100%', marginBottom: 12 }}>
        <label style={{
          display: 'block', marginBottom: 6,
          fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em',
          color: 'rgba(253,254,235,0.35)', textTransform: 'uppercase',
        }}>Email</label>
        <input
          type="email"
          placeholder="witch@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          onKeyDown={handleKey}
          style={inputStyle('email')}
          autoComplete="email"
        />
      </div>

      {/* Password field */}
      <div style={{ width: '100%', marginBottom: 24 }}>
        <label style={{
          display: 'block', marginBottom: 6,
          fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em',
          color: 'rgba(253,254,235,0.35)', textTransform: 'uppercase',
        }}>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={() => setFocused('password')}
          onBlur={() => setFocused(null)}
          onKeyDown={handleKey}
          style={inputStyle('password')}
          autoComplete="current-password"
        />
      </div>

      {/* Sign In button */}
      <button
        onClick={onSignIn}
        style={{
          width: '100%',
          padding: '15px',
          background: 'linear-gradient(135deg, #F4AF59 0%, #7d8c4e 100%)',
          border: 'none',
          borderRadius: 14,
          color: '#FDFEEB',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: '0.03em',
          cursor: 'pointer',
          boxShadow: '0 4px 18px rgba(244,175,89,0.22)',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        Sign In
      </button>

      {/* Create account link */}
      <button
        onClick={onSignIn}
        style={{
          marginTop: 18,
          background: 'none', border: 'none',
          color: 'rgba(253,254,235,0.38)',
          fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em',
          textTransform: 'uppercase', cursor: 'pointer',
          padding: '6px 0',
        }}
      >
        New here? Create an account
      </button>

      {/* Forgot password */}
      <button
        onClick={onSignIn}
        style={{
          marginTop: 8,
          background: 'none', border: 'none',
          color: 'rgba(253,254,235,0.25)',
          fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em',
          textTransform: 'uppercase', cursor: 'pointer',
          padding: '4px 0',
        }}
      >
        Forgot password?
      </button>

      {/* Copyright */}
      <div style={{
        position: 'absolute', bottom: 22,
        fontFamily: 'var(--font-mono)', fontSize: 9,
        color: 'rgba(253,254,235,0.18)', letterSpacing: '0.10em',
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        This is a concept by Katy Towell, and I'll hex you if you steal it. · © {new Date().getFullYear()}
      </div>
    </div>
  );
}

window.Login = Login;
