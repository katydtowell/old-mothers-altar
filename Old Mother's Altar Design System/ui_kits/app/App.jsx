// App.jsx — root: navigation, fixture data

const WORKINGS = [
  {
    id: 'salt-threshold',
    name: 'Salt for the Threshold',
    summary: 'A quieting working for the doorframe. Trace the salt at last light.',
    sealed: true,
    castCount: 7,
    lastCast: 'IX DAYS',
    tags: ['Protection', 'Hearth'],
    color: '#A1BDC6',
    icon: Ico.altar,
    moonPhase: 'waning-gibbous',
    ingredients: [
      { name: 'Hearth salt',  amount: 'III parts', note: 'Coarse, never fine.' },
      { name: 'Rosemary',     amount: 'I sprig',    note: 'Dried and crumbled.' },
      { name: 'Iron filing',  amount: 'a pinch',    note: 'Optional in summer.' },
    ],
    casts: [
      { id: 'c1', date: '2026-05-04', title: 'Cast at the front door', note: 'Margaux quiet by VIII. The dog did not whine.', outcome: 'sealed' },
      { id: 'c2', date: '2026-04-20', title: 'Cast at all four corners', note: 'Storm broke through anyway. Worth doing twice next time.', outcome: 'broken' },
      { id: 'c3', date: '2026-03-30', title: 'Cast on a new moon', note: 'Slept through the night.', outcome: 'sealed' },
    ],
  },
  {
    id: 'sleep-taper',
    name: 'A Taper for Sleep',
    summary: 'Beeswax burned at last light, two hours, no more.',
    sealed: true,
    castCount: 13,
    lastCast: 'TODAY',
    tags: ['Sleep', 'Candle'],
    color: '#F4AF59',
    icon: Ico.flame,
    moonPhase: 'waning-gibbous',
    ingredients: [
      { name: 'Beeswax taper', amount: '1', note: 'Unscented, hand-rolled.' },
      { name: 'Chamomile oil', amount: '3 drops' },
    ],
    casts: [
      { id: 'c1', date: '2026-05-13', title: 'Lit at 21:47', note: 'Burning now.', outcome: 'active' },
      { id: 'c2', date: '2026-05-11', title: 'Two hours, then snuffed', outcome: 'sealed' },
      { id: 'c3', date: '2026-05-08', title: 'Cast with lavender', note: 'The substitution worked. Hold for full moon next.', outcome: 'sealed' },
    ],
  },
  {
    id: 'rosemary-bind',
    name: 'Rosemary, on a String',
    summary: 'A waxing-moon binding for the sill. Replace every new moon.',
    sealed: true,
    castCount: 3,
    lastCast: 'XXII DAYS',
    tags: ['Hearth', 'Herb'],
    color: '#96A560',
    icon: Ico.leaf,
    moonPhase: 'waxing-gibbous',
    ingredients: [
      { name: 'Rosemary, fresh', amount: 'III sprigs' },
      { name: 'Linen thread',    amount: 'a hand-length' },
    ],
    casts: [
      { id: 'c1', date: '2026-04-21', title: 'Hung in the kitchen window', outcome: 'sealed' },
      { id: 'c2', date: '2026-03-25', title: 'Snapped while tying', note: 'Bad sign, recast next moon.', outcome: 'broken' },
    ],
  },
  {
    id: 'dream-jar',
    name: 'A Jar to Remember Dreams',
    summary: 'Lavender, mugwort, and a small glass. Beside the bed, not under.',
    sealed: false,
    castCount: 0,
    lastCast: '—',
    tags: ['Dream'],
    color: '#C68FD2',
    icon: Ico.moon,
    moonPhase: 'full',
    ingredients: [
      { name: 'Mugwort', amount: 'I tsp' },
      { name: 'Lavender', amount: 'I tsp' },
    ],
    casts: [],
  },
  {
    id: 'wax-mend',
    name: 'A Mend for a Broken Cup',
    summary: 'Beeswax, gold leaf, patience. Not for things meant to hold water.',
    sealed: true,
    castCount: 2,
    lastCast: 'XLI DAYS',
    tags: ['Object', 'Mending'],
    color: '#F35321',
    icon: Ico.sparkle,
    moonPhase: 'waxing-crescent',
    ingredients: [
      { name: 'Beeswax', amount: 'a thumb' },
      { name: 'Gold leaf', amount: 'I sheet' },
    ],
    casts: [
      { id: 'c1', date: '2026-04-02', title: 'The blue cup, handle reset', outcome: 'sealed' },
    ],
  },
];

const ENTRIES = [
  {
    id: 'e1', romanDay: 'XIII', month: 'MAY', time: '21:47', kind: 'cast',
    title: 'Lit the taper for sleep',
    body: 'Margaux was restless. The flame held steady for the first hour, then bent west — wind from the window, not omen. Snuffed at 23:30.',
    tagged: 'A TAPER FOR SLEEP',
  },
  {
    id: 'e2', romanDay: 'XII', month: 'MAY', time: '04:12', kind: 'dream',
    title: 'A pale fox in the kitchen',
    body: 'Carrying something in its mouth I could not see. Did not feel ominous. Kept the door open the rest of the night, just in case.',
  },
  {
    id: 'e3', romanDay: 'XI', month: 'MAY', time: '20:20', kind: 'moon',
    title: 'The Waning Gibbous returns',
    body: 'First quiet evening this week. Recorded the moon by the hawthorn; she is visible through the kitchen window again.',
  },
  {
    id: 'e4', romanDay: 'X', month: 'MAY', time: '17:10', kind: 'note',
    title: 'On substitutions',
    body: 'Out of mugwort — used dried sage. The book will say it worked anyway. Worth keeping a small jar of sage by the door from now on.',
  },
];

const APP_DATA = {
  activeCast: { name: 'A Taper for Sleep', lit: '21:47' },
  moonPhase: 'waning-gibbous',
  moonLabel: 'Waning Gibbous',
  monthRoman: 'V',
  recentWorkings: [
    { id: 'sleep-taper',    name: 'A Taper for Sleep',         lastCast: 'TODAY',    castCount: 'XIII', color: '#F4AF59', icon: Ico.flame, tone: 'burning' },
    { id: 'salt-threshold', name: 'Salt for the Threshold',    lastCast: 'IX DAYS',  castCount: 'VII',  color: '#A1BDC6', icon: Ico.altar, tone: 'pending' },
    { id: 'rosemary-bind',  name: 'Rosemary, on a String',     lastCast: 'XXII DAYS',castCount: 'III',  color: '#96A560', icon: Ico.leaf,  tone: 'moss' },
  ],
};

function App({ theme, setTheme }) {
  const [tab, setTab] = React.useState('altar');
  const [openWorkingId, setOpenWorkingId] = React.useState(null);
  const [composerOpen, setComposerOpen] = React.useState(false);

  const openWorking = WORKINGS.find(w => w.id === openWorkingId);

  const themeBtn = <ThemeToggle theme={theme} onChange={setTheme} />;

  // top bar varies by view
  let topBar = null, body = null;
  if (openWorking) {
    topBar = (
      <TopBar
        title={openWorking.name}
        eyebrow="A WORKING"
        leading={<IconBtn icon={Ico.back} onClick={() => setOpenWorkingId(null)} label="Back" />}
        trailing={themeBtn}
      />
    );
    body = <WorkingDetail working={openWorking} onBack={() => setOpenWorkingId(null)} onCast={() => {}} />;
  } else if (tab === 'altar') {
    topBar = (
      <TopBar
        title="The Altar"
        eyebrow={`V · MMXXVI · ☾`}
        leading={themeBtn}
        trailing={<IconBtn icon={Ico.search} label="Search" />}
      />
    );
    body = <Altar data={APP_DATA} onOpenWorking={setOpenWorkingId} onCompose={() => setComposerOpen(true)} />;
  } else if (tab === 'workings') {
    topBar = (
      <TopBar
        title="Workings"
        eyebrow="THE BOOK"
        leading={themeBtn}
        trailing={<IconBtn icon={Ico.plus} onClick={() => setComposerOpen(true)} label="New" />}
      />
    );
    body = <Workings workings={WORKINGS} onOpenWorking={setOpenWorkingId} onCompose={() => setComposerOpen(true)} />;
  } else if (tab === 'book') {
    topBar = (
      <TopBar
        title="The Book"
        eyebrow="VOLUME XVII"
        leading={themeBtn}
        trailing={<IconBtn icon={Ico.edit} label="Write" />}
      />
    );
    body = <TheBook entries={ENTRIES} />;
  }

  return (
    <div data-theme={theme} style={{
      width: '100%', height: '100%',
      background: 'var(--bg-page)', color: 'var(--fg-1)',
      fontFamily: 'var(--font-body)',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      paddingTop: 54,  // clear the iOS status bar
      transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    }}>
      {topBar}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {body}
      </div>
      {!openWorking && <TabBar active={tab} onChange={setTab} />}
      <NewWorking
        open={composerOpen}
        onClose={() => setComposerOpen(false)}
        onCreate={() => setComposerOpen(false)}
      />
    </div>
  );
}

window.App = App;
