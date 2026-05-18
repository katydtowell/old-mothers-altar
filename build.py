#!/usr/bin/env python3
"""
build.py — bundles all JSX source files into a single self-contained index.html.
Run this from the project root whenever you change a JSX file:
    python3 build.py
"""

import os, base64

PROJECT = os.path.dirname(os.path.abspath(__file__))
DS = os.path.join(PROJECT, "Old Mother's Altar Design System", "ui_kits", "app")
CSS_SRC = os.path.join(PROJECT, "Old Mother's Altar Design System", "colors_and_type.css")
# Font urls in CSS are relative to the CSS file; when inlined into index.html at
# the project root they need to point one level deeper.
CSS_FONT_PREFIX = "./Old Mother's Altar Design System/fonts/"

JSX_FILES = [
    "ios-frame",
    "components",
    "Altar",
    "Workings",
    "WorkingDetail",
    "TheBook",
    "Cabinet",
    "NewWorking",
    "NewEntry",
    "Profile",
    "Splash",
    "Login",
    "App",
]

HTML_HEAD = """\
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<title>Old Mother's Altar</title>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<style>
  /* ── design system tokens (inlined from colors_and_type.css) ── */
"""

HTML_APP_STYLES = """
  /* ── app chrome ── */
  html, body {
    margin: 0; padding: 0;
    background: #07090A;
    font-family: var(--font-body);
    color: var(--fg-1);
  }
  body {
    display: flex; justify-content: center; align-items: center;
    min-height: 100vh;
    padding: 20px; box-sizing: border-box;
    background:
      radial-gradient(circle at 50% 30%, rgba(45,78,166,0.10) 0%, transparent 55%),
      radial-gradient(circle at 80% 80%, rgba(243,83,33,0.06) 0%, transparent 50%),
      #07090A;
  }
  @keyframes omaFadeIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes omaSheetUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .oma-flame { animation: omaCandle 2.4s var(--ease-candle) infinite; transform-origin: center bottom; filter: blur(0.2px); }
  @keyframes omaCandle {
    0%, 100% { transform: scaleY(1)    scaleX(1)    translateX(0); opacity: 0.95; }
    35%      { transform: scaleY(1.05) scaleX(0.95) translateX(0.5px); opacity: 1; }
    65%      { transform: scaleY(0.97) scaleX(1.03) translateX(-0.5px); opacity: 0.85; }
  }
  ::-webkit-scrollbar { width: 0; height: 0; }
</style>
</head>
<body>
  <div id="root"></div>
"""

FOOTER = """\

  <script type="text/babel">
    function Root() {
      const [theme, setTheme] = React.useState('dark');
      const [scale, setScale] = React.useState(
        () => Math.min(1, (window.innerHeight - 40) / 874)
      );
      React.useEffect(() => {
        function onResize() {
          setScale(Math.min(1, (window.innerHeight - 40) / 874));
        }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      }, []);
      const scaledH = Math.round(874 * scale);
      const scaledW = Math.round(402 * scale);
      return (
        <div style={{ width: scaledW, height: scaledH }}>
          <div style={{ transform: `scale(${scale.toFixed(4)})`, transformOrigin: 'top left', width: 402, height: 874 }}>
            <IOSDevice width={402} height={874} dark={theme === 'dark'}>
              <App theme={theme} setTheme={setTheme} />
            </IOSDevice>
          </div>
        </div>
      );
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
  </script>
</body>
</html>
"""

def build():
    # Read and patch the design-system CSS: font url() paths are relative to the
    # CSS file's location; once inlined into index.html at the project root we
    # need them relative to the HTML file instead.
    with open(CSS_SRC, "r", encoding="utf-8") as f:
        css = f.read()
    css = css.replace('url("./fonts/', f'url("{CSS_FONT_PREFIX}')

    # Read and base64-encode logo SVGs
    uploads = os.path.join(PROJECT, "Old Mother's Altar Design System", "uploads")
    logo_white_src = ''
    logo_primary_src = ''
    try:
        with open(os.path.join(uploads, "White.svg"), "rb") as f:
            logo_white_src = "data:image/svg+xml;base64," + base64.b64encode(f.read()).decode()
        with open(os.path.join(uploads, "Primary.svg"), "rb") as f:
            logo_primary_src = "data:image/svg+xml;base64," + base64.b64encode(f.read()).decode()
    except FileNotFoundError as e:
        print(f"Warning: logo not found — {e}")

    logo_script = f"""
  <script>
    window.OMA_LOGO_WHITE   = '{logo_white_src}';
    window.OMA_LOGO_PRIMARY = '{logo_primary_src}';
  </script>
"""

    parts = [
        HTML_HEAD,
        css,
        HTML_APP_STYLES,
        logo_script,
    ]

    for name in JSX_FILES:
        path = os.path.join(DS, f"{name}.jsx")
        with open(path, "r", encoding="utf-8") as f:
            src = f.read()
        parts.append(f'\n  <!-- ── {name}.jsx ── -->\n  <script type="text/babel">\n{src}\n  </script>\n')

    parts.append(FOOTER)

    out = os.path.join(PROJECT, "index.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write("".join(parts))

    print(f"Built index.html ({sum(len(p) for p in parts):,} bytes)")

if __name__ == "__main__":
    build()
