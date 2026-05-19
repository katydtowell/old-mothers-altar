// App.jsx — root: navigation, data, state

const ICO_MAP = {
  sparkle: Ico.sparkle, flame: Ico.flame, moon: Ico.moon,
  altar: Ico.altar, book: Ico.book, feather: Ico.feather, user: Ico.user,
};

// ── Default spells ────────────────────────────────────────────────────────────
const DEFAULT_WORKINGS = [
  {
    id: 'money-knot',
    name: 'Money Drawing Knot Spell',
    summary: 'Tie nine knots at sunrise with green cord and bay laurel. Each knot calls abundance in.',
    sealed: false, castCount: 1,
    tags: ['Money', 'Career', 'Knot Magic'],
    color: '#96A560', iconKey: 'sparkle',
    moonPhase: 'waxing-gibbous',
    season: [], tod: ['Morning'], dow: ['Thursday'], timingCustom: '',
    magicType: ['Knot'], category: ['Prosperity'],
    chant: 'I tie one for abundance coming in,\nI tie two for debts growing thin,\nI tie three and money flows to me,\nAs I will it, so mote it be.',
    deities: ['Lakshmi', 'Fortuna'],
    ingredients: [
      { name: 'Green Hemp Cord', amount: 'I length', note: 'Thin hemp twine.' },
      { name: 'Pyrite Chunk', amount: 'I', note: '' },
      { name: 'Bay Laurel', amount: 'a few leaves', note: '' },
    ],
    tasks: [
      { id: 't1', text: 'Set intention at sunrise — hold pyrite and speak your need aloud' },
      { id: 't2', text: 'Anoint each bay laurel leaf with a drop of oil, then lay them in a line' },
      { id: 't3', text: 'Tie nine knots while chanting — one per knot, breath between each' },
      { id: 't4', text: 'Carry cord in your left pocket for nine days without removing it' },
      { id: 't5', text: 'On day nine, bury or burn the cord to release the working' },
    ],
    rating: 4,
    author: 'Self', authorSelf: true, source: '',
    duration: { val: 9, unit: 'days' },
    casts: [
      { id: 'c1', date: '2026-05-08', title: 'Begun on a Thursday morning', note: 'Very focused during the knot-tying. By day III an unexpected freelance inquiry arrived.', outcome: 'active' },
    ],
  },
  {
    id: 'hearth-blessing',
    name: 'Hearth Blessing Candle Ritual',
    summary: 'A full moon candle rite for home and hearth. Rose quartz, lavender smoke, three hours of candlelight.',
    sealed: true, castCount: 1,
    tags: ['Family', 'Health', 'Candle Magic'],
    color: '#F4AF59', iconKey: 'flame',
    moonPhase: 'full',
    season: ['Winter', 'Spring'], tod: ['Evening'], dow: [], timingCustom: '',
    magicType: ['Candle'], category: ['Protection', 'Healing'],
    chant: 'By flame and stone and fragrant smoke,\nI call the warmth of hearth and folk.\nBless this home, protect this space,\nMay peace and love fill every place.',
    deities: ['Hestia', 'Brigid'],
    ingredients: [
      { name: 'White Candle', amount: 'I', note: 'Unscented.' },
      { name: 'Lavender', amount: 'a sprig', note: 'For cleansing smoke.' },
      { name: 'Rose Quartz', amount: 'IV pieces', note: 'One at each corner.' },
    ],
    tasks: [
      { id: 't1', text: 'Walk the perimeter and sweep out stagnant energy before the ritual' },
      { id: 't2', text: 'Cleanse the space with lavender smoke — widdershins first, then deosil' },
      { id: 't3', text: 'Place one rose quartz at each corner, point facing inward' },
      { id: 't4', text: 'Light the white candle at dusk and recite the chant three times' },
      { id: 't5', text: 'Sit in candlelight for three hours — journal any impressions received' },
    ],
    rating: 5,
    author: 'Self', authorSelf: true, source: '',
    duration: { val: 3, unit: 'hours' },
    casts: [
      { id: 'c1', date: '2026-03-20', title: 'Full moon ritual', note: 'Deep sense of peace settled in. Two weeks later, household tensions noticeably eased.', outcome: 'sealed' },
    ],
  },
  {
    id: 'sweet-dreams',
    name: 'Sweet Dreams Herbal Sachet',
    summary: 'A sachet of lavender and mugwort for calm sleep and blessed visions. Replace every moon.',
    sealed: false, castCount: 0,
    tags: ['Health', 'Dream', 'Sachet Magic'],
    color: '#C68FD2', iconKey: 'moon',
    moonPhase: 'waning-crescent',
    season: [], tod: ['Evening'], dow: [], timingCustom: '',
    magicType: ['Herbal'], category: ['Healing'],
    chant: 'Herbs of calm and moon of rest,\nSend me visions from the blest.',
    deities: ['Morpheus'],
    ingredients: [
      { name: 'Lavender', amount: 'I tsp', note: 'Dried.' },
      { name: 'Dried Mugwort', amount: 'I tsp', note: '' },
      { name: 'Rose Quartz', amount: 'I', note: 'Small tumbled piece.' },
    ],
    tasks: [
      { id: 't1', text: 'Charge mugwort and lavender in a bowl under moonlight for an hour' },
      { id: 't2', text: 'Hold the rose quartz and set your dream intention before placing in sachet' },
      { id: 't3', text: 'Blend herbs together while reciting the chant softly' },
      { id: 't4', text: 'Tie sachet closed with purple cord — three knots, each for a night of clear dreaming' },
      { id: 't5', text: 'Place under pillow and replace contents at the next new moon' },
    ],
    rating: 0,
    author: 'Self', authorSelf: true, source: '',
    duration: { val: 1, unit: 'months' },
    casts: [],
  },
];

// ── Default journal entries ────────────────────────────────────────────────────
const DEFAULT_ENTRIES = [
  // ── Money Drawing Knot Spell ─────────────────────────────────────────────────
  {
    id: 'e1',
    workingId: 'money-knot',
    workingName: 'Money Drawing Knot Spell',
    title: 'Money Drawing Knot Spell — begun',
    date: '2026-05-08',
    romanDay: 'VIII', month: 'MAY', time: '07:30',
    kind: 'cast',
    status: 'Active',
    notes: [
      { id: 'n1', text: 'Started on a Thursday morning at sunrise, as directed. Held the pyrite and spoke my intention aloud before touching the cord. Very focused during the knot-tying — the cord held its tension well and the bay laurel smelled sharp and green in the morning air.', ts: '2026-05-08T07:30:00' },
    ],
    result: '',
    tasksDone: { t1: true, t2: true, t3: true },
    img: null,
  },
  {
    id: 'e2',
    workingId: 'money-knot',
    workingName: 'Money Drawing Knot Spell',
    title: 'Day III — an unexpected inquiry',
    date: '2026-05-11',
    romanDay: 'XI', month: 'MAY', time: '08:10',
    kind: 'note',
    status: 'Active',
    notes: [
      { id: 'n1', text: 'Only three days in and already received an unexpected freelance inquiry from someone I haven\'t heard from in months. Noting it here without reading too much into it. The knots are holding and the cord feels warm in my pocket.', ts: '2026-05-11T08:10:00' },
    ],
    result: '',
    tasksDone: { t1: true, t2: true, t3: true, t4: true, t5: true },
    img: null,
  },
  {
    id: 'e5',
    workingId: 'money-knot',
    workingName: 'Money Drawing Knot Spell',
    title: 'Day IX — cord released',
    date: '2026-05-17',
    romanDay: 'XVII', month: 'MAY', time: '07:45',
    kind: 'note',
    status: 'Completed',
    notes: [
      { id: 'n1', text: 'Ninth day. Took the cord to the garden at sunrise and buried it under the rosemary. Said a quiet thank-you to Fortuna. The freelance project turned into a formal contract offer yesterday — the timing is hard to ignore.', ts: '2026-05-17T07:45:00' },
      { id: 'n2', text: 'Will repeat this working on the next waxing gibbous. Considering using gold cord next time in addition to the green.', ts: '2026-05-17T09:00:00' },
    ],
    result: 'Contract offer received on day VIII. Working sealed on day IX at sunrise.',
    tasksDone: { t1: true, t2: true, t3: true, t4: true, t5: true },
    img: null,
  },
  // ── Hearth Blessing Candle Ritual ────────────────────────────────────────────
  {
    id: 'e6',
    workingId: 'hearth-blessing',
    workingName: 'Hearth Blessing Candle Ritual',
    title: 'Hearth Blessing — preparation notes',
    date: '2026-03-18',
    romanDay: 'XVIII', month: 'MAR', time: '14:00',
    kind: 'note',
    status: 'Active',
    notes: [
      { id: 'n1', text: 'Two days before the full moon. Gathered everything: four rose quartz tumbles, a fresh sprig of lavender from the windowsill, and a new white pillar candle. Cleansed the stones in salt water overnight.', ts: '2026-03-18T14:00:00' },
    ],
    result: '',
    tasksDone: { t1: true },
    img: null,
  },
  {
    id: 'e3',
    workingId: 'hearth-blessing',
    workingName: 'Hearth Blessing Candle Ritual',
    title: 'Hearth Blessing — full moon cast',
    date: '2026-03-20',
    romanDay: 'XX', month: 'MAR', time: '19:00',
    kind: 'cast',
    status: 'Completed',
    notes: [
      { id: 'n1', text: 'Performed at dusk on the spring equinox full moon — the timing felt auspicious. Walked widdershins first to clear, then deosil with the lavender smoke. Placed the rose quartz at each corner with intention. Lit the candle and recited the chant three times. The third time my voice caught — something shifted in the room.', ts: '2026-03-20T19:00:00' },
      { id: 'n2', text: 'Sat with the candle for the full three hours. The house felt genuinely different afterward — quieter, warmer. Household tensions noticeably eased over the following two weeks. Will repeat at each equinox.', ts: '2026-04-05T14:30:00' },
    ],
    result: 'Deep and lasting shift in the home\'s energy. Will perform each equinox.',
    tasksDone: { t1: true, t2: true, t3: true, t4: true, t5: true },
    img: null,
  },
  {
    id: 'e7',
    workingId: 'hearth-blessing',
    workingName: 'Hearth Blessing Candle Ritual',
    title: 'Hearth Blessing — summer solstice plan',
    date: '2026-05-02',
    romanDay: 'II', month: 'MAY', time: '11:30',
    kind: 'note',
    status: 'Pending',
    notes: [
      { id: 'n1', text: 'Planning the next cast for Litha (June 21). Will source fresh lavender from the farmers\' market rather than the windowsill. Considering adding a small dish of salt at the hearth as an extra anchor. Need to replenish the rose quartz — two of the four are looking a bit dull.', ts: '2026-05-02T11:30:00' },
    ],
    result: '',
    tasksDone: {},
    img: null,
  },
  // ── Sweet Dreams Herbal Sachet ───────────────────────────────────────────────
  {
    id: 'e4',
    workingId: 'sweet-dreams',
    workingName: 'Sweet Dreams Herbal Sachet',
    title: 'Sweet Dreams Sachet — first attempt',
    date: '2026-05-14',
    romanDay: 'XIV', month: 'MAY', time: '22:15',
    kind: 'cast',
    status: 'Active',
    notes: [
      { id: 'n1', text: 'Mixed the herbs by candlelight while the moon was high. The mugwort smells earthy and sharp — it feels right for dream work. Set my intention clearly while holding the rose quartz: I want lucid, restful dreams with clear imagery I can actually remember in the morning.', ts: '2026-05-14T22:15:00' },
    ],
    result: '',
    tasksDone: { t1: true, t2: true, t3: true },
    img: null,
  },
  {
    id: 'e8',
    workingId: 'sweet-dreams',
    workingName: 'Sweet Dreams Herbal Sachet',
    title: 'Sweet Dreams — three nights in',
    date: '2026-05-17',
    romanDay: 'XVII', month: 'MAY', time: '08:00',
    kind: 'note',
    status: 'Active',
    notes: [
      { id: 'n1', text: 'Three nights with the sachet under my pillow. The first night was vivid and strange — a forest, a silver gate, a figure I couldn\'t quite see. Second night I slept deeply but remembered nothing. Third night: a long, coherent dream involving water and a conversation with someone who felt significant.', ts: '2026-05-17T08:00:00' },
      { id: 'n2', text: 'Starting a separate dream log. The mugwort is doing something — the quality of sleep is noticeably different, heavier and more textured than usual.', ts: '2026-05-17T08:15:00' },
    ],
    result: '',
    tasksDone: { t1: true, t2: true, t3: true },
    img: null,
  },
];

// ── Default cabinet ────────────────────────────────────────────────────────────
const DEFAULT_CABINET = [
  { id: 'cab1', name: 'Lavender', type: 'herb', inv: 3, note: 'Dried' },
  { id: 'cab2', name: 'Rose Quartz', type: 'crystal', inv: 5, note: '' },
  { id: 'cab3', name: 'White Candle', type: 'candle', inv: 4, note: 'Unscented pillar' },
  { id: 'cab4', name: 'Green Hemp Cord', type: 'cord', inv: 1, note: 'Thin twine' },
  { id: 'cab5', name: 'Bay Laurel', type: 'herb', inv: null, note: 'Dried leaves' },
  { id: 'cab6', name: 'Dried Mugwort', type: 'herb', inv: 2, note: '' },
  { id: 'cab7', name: 'Pyrite Chunk', type: 'crystal', inv: 1, note: '' },
];

const DEFAULT_PROFILE = { name: 'Zola', practiceNote: '', deities: ['Hecate', 'Lilith'] };

// ── localStorage helpers ──────────────────────────────────────────────────────
function loadLS(key, fallback) {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; }
  catch { return fallback; }
}
function hydrateWorking(w) {
  return { ...w, icon: ICO_MAP[w.iconKey] || Ico.sparkle };
}
// Migrate old entry format (body string) to new format (notes array)
function migrateEntry(e) {
  if (!e.notes || !Array.isArray(e.notes) || e.notes.length === 0) {
    const text = e.body || '';
    return {
      ...e,
      notes: text ? [{ id: 'migrated', text, ts: e.date ? (e.date + 'T' + (e.time || '12:00') + ':00') : new Date().toISOString() }] : [],
    };
  }
  return e;
}

// ── Magical events ────────────────────────────────────────────────────────────
function getMagicalEvents(date) {
  const events = [];
  const m = date.getMonth() + 1, day = date.getDate(), yr = date.getFullYear();
  const known = new Date('2000-01-06T18:14:00Z');
  const synodic = 29.530588853;
  const diff = (date - known) / (1000 * 60 * 60 * 24);
  const phase = ((diff % synodic) + synodic) % synodic;
  const tol = 1.2;
  if (phase < tol || phase > synodic - tol) events.push({ name: 'New Moon', glyph: 'new' });
  else if (Math.abs(phase - 7.38) < tol)  events.push({ name: 'First Quarter Moon', glyph: 'first-quarter' });
  else if (Math.abs(phase - 14.77) < tol) events.push({ name: 'Full Moon', glyph: 'full' });
  else if (Math.abs(phase - 22.15) < tol) events.push({ name: 'Last Quarter Moon', glyph: 'last-quarter' });
  const sabbats = [
    {m:2,d:1,name:'Imbolc'},{m:2,d:2,name:'Imbolc'},
    {m:3,d:19,name:'Ostara'},{m:3,d:20,name:'Ostara'},{m:3,d:21,name:'Ostara'},
    {m:5,d:1,name:'Beltane'},
    {m:6,d:20,name:'Litha'},{m:6,d:21,name:'Litha'},{m:6,d:22,name:'Litha'},
    {m:8,d:1,name:'Lughnasadh'},{m:8,d:2,name:'Lughnasadh'},
    {m:9,d:21,name:'Mabon'},{m:9,d:22,name:'Mabon'},{m:9,d:23,name:'Mabon'},
    {m:10,d:31,name:'Samhain'},{m:11,d:1,name:'Samhain'},
    {m:12,d:20,name:'Yule'},{m:12,d:21,name:'Yule'},{m:12,d:22,name:'Yule'},
  ];
  sabbats.forEach(s => { if (s.m === m && s.d === day) events.push({ name: s.name, glyph: null }); });
  const retro = [
    ['2025-04-07','2025-04-30'],['2025-08-06','2025-08-28'],['2025-11-25','2025-12-15'],
    ['2026-03-15','2026-04-07'],['2026-07-18','2026-08-11'],['2026-11-06','2026-11-28'],
    ['2027-02-26','2027-03-20'],['2027-06-29','2027-07-23'],['2027-10-19','2027-11-10'],
  ];
  const ds = `${yr}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  const today = new Date(yr, m - 1, day);
  if (retro.some(([s, e]) => today >= new Date(s) && today <= new Date(e)))
    events.push({ name: 'Mercury Retrograde ☿', glyph: null });
  const eclipses = [
    {date:'2026-02-17',name:'Annular Solar Eclipse'},{date:'2026-03-03',name:'Total Lunar Eclipse'},
    {date:'2026-08-12',name:'Total Solar Eclipse'},{date:'2026-09-02',name:'Partial Lunar Eclipse'},
    {date:'2027-02-06',name:'Annular Solar Eclipse'},{date:'2027-07-22',name:'Total Solar Eclipse'},
    {date:'2027-08-06',name:'Total Lunar Eclipse'},
  ];
  eclipses.forEach(e => { if (e.date === ds) events.push({ name: e.name, glyph: null }); });
  return events;
}

// ── Help / Guide screen ───────────────────────────────────────────────────────────
function HelpScreen() {
  const [query, setQuery] = React.useState('');

  const SECTIONS = [
    {
      id: 'overview',
      title: 'Getting Started',
      icon: Ico.sparkle,
      items: [
        {
          q: 'What is Old Mother\'s Altar?',
          a: 'Old Mother\'s Altar is a private Book of Shadows for your digital practice. It has four main areas — Home, the Grimoire (your spell collection), the Journal (your casting record), and the Cabinet (your ingredient stores). Together they form a complete practice log.',
        },
        {
          q: 'What\'s the difference between a spell and a journal entry?',
          a: 'A spell in the Grimoire is your ritual template — the intent, ingredients, and instructions. A journal entry is a record of actually performing that spell. One spell can have many entries over time, letting you track results and refine your practice.',
        },
        {
          q: 'Is my data private?',
          a: 'Yes. All data is stored locally on your device in your browser\'s storage. Nothing is sent to a server.',
        },
      ],
    },
    {
      id: 'grimoire',
      title: 'The Grimoire',
      icon: Ico.sparkle,
      items: [
        {
          q: 'What is the Grimoire?',
          a: 'The Grimoire is your personal spell book — a collection of spells, rituals, and magical intentions. Each spell is a template you can cast repeatedly and journal about over time.',
        },
        {
          q: 'What goes in a spell?',
          a: 'Each spell holds a title, a short intention, magic type (e.g. protection, divination, abundance), categories, a status, the moon phase it was written under, a list of ingredients or materials, and any written notes or instructions.',
        },
        {
          q: 'What do the spell statuses mean?',
          a: 'Active — ready to cast. Ongoing — a spell you return to repeatedly (e.g. a monthly ritual). Completed — finished and closed. Sealed — complete and marked as sacred record, not to be changed.',
        },
        {
          q: 'What is the author filter?',
          a: 'If multiple people share a practice, each spell can be attributed to an author. The author filter lets you view spells by a specific person.',
        },
      ],
    },
    {
      id: 'journal',
      title: 'The Journal',
      icon: Ico.book,
      items: [
        {
          q: 'What is the Journal?',
          a: 'The Journal is your casting record — a Book of Shadows entry for every time you perform a spell. It\'s where you document what happened, what you observed, and how the casting felt.',
        },
        {
          q: 'How do I write an entry?',
          a: 'Tap "Write an Entry" from the Journal page, the Home screen, or the detail view of any spell. You\'ll be asked to link the entry to a spell from your Grimoire, then fill in the date, ideal timing (such as moon phase), notes, and any observations.',
        },
        {
          q: 'What does "completed" mean on a journal entry?',
          a: 'A completed entry marks that casting as finished — the spell was performed and the record is closed. You can still read it, but it\'s flagged as done. The Journal intro card counts how many of your entries are completed.',
        },
      ],
    },
    {
      id: 'cabinet',
      title: 'The Cabinet',
      icon: Ico.cabinet,
      items: [
        {
          q: 'What is the Cabinet?',
          a: 'The Cabinet is an inventory of your magical supplies — herbs, oils, crystals, candles, incense, and any other ingredients your practice uses. Think of it as a pantry or apothecary cabinet.',
        },
        {
          q: 'What can I track for each item?',
          a: 'Each cabinet entry holds a name, quantity, unit (e.g. grams, pieces, drops), category, and optional notes such as source, potency, or correspondences.',
        },
        {
          q: 'How do I add or update stock?',
          a: 'Tap "Add to Cabinet" at the bottom of the Cabinet page to add a new ingredient. Tap any existing item to edit its quantity, unit, or notes as your stock changes.',
        },
      ],
    },
    {
      id: 'home',
      title: 'Home',
      icon: Ico.altar,
      items: [
        {
          q: 'What does Home show?',
          a: 'Home is your daily dashboard. It shows the current moon phase, today\'s astrological and celestial events, pending tasks from your journal entries, and your three most recent journal entries with a link through to the full Journal.',
        },
        {
          q: 'What are the astrological events?',
          a: 'The "Today\'s Events" card lists significant celestial moments — moon sign ingresses, planetary aspects, and lunar quarters. These are calculated for the current date.',
        },
        {
          q: 'How do I navigate to other parts of the app?',
          a: 'Use the tab bar at the bottom of the screen, or tap the menu icon (top right) to open the side drawer, which lists all sections including Settings.',
        },
      ],
    },
    {
      id: 'settings',
      title: 'Settings & Profile',
      icon: Ico.settings,
      items: [
        {
          q: 'What can I change in Settings?',
          a: 'You can set your practitioner name, update your display name and profile details, and switch between dark and light themes.',
        },
        {
          q: 'How do I switch themes?',
          a: 'Open Settings from the menu and find the theme toggle there. The dark theme is recommended for night-time ritual use.',
        },
        {
          q: 'How do I log out?',
          a: 'Open the menu (top right) and tap "Log Out" at the bottom of the drawer.',
        },
      ],
    },
  ];

  const q = query.trim().toLowerCase();
  const visible = q
    ? SECTIONS.map(s => ({
        ...s,
        items: s.items.filter(
          item => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
        ),
      })).filter(s => s.items.length > 0 || s.title.toLowerCase().includes(q))
    : SECTIONS;

  return (
    <div style={{ padding: '0 0 40px' }}>
      {/* Search */}
      <div style={{ padding: '14px 16px 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--bg-surface)', border: '1px solid var(--line-soft)',
          borderRadius: 'var(--r-md)', padding: '0 12px', height: 40,
        }}>
          <span style={{ color: 'var(--fg-3)' }}>{React.cloneElement(Ico.search, { size: 16 })}</span>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search help…"
            autoComplete="off"
            style={{ flex: 1, border: 0, background: 'transparent', outline: 0, color: 'var(--fg-1)', fontFamily: 'var(--font-body)', fontSize: 14 }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-3)', padding: 0, display: 'flex', alignItems: 'center' }}>
              {React.cloneElement(Ico.close, { size: 14 })}
            </button>
          )}
        </div>
      </div>

      {/* Intro blurb */}
      {!q && (
        <div style={{ padding: '6px 16px 14px' }}>
          <div style={{ color: 'var(--fg-3)', fontSize: 13, lineHeight: 1.6 }}>
            A guide to your practice. Tap any question to expand it.
          </div>
        </div>
      )}

      {/* No results */}
      {visible.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--fg-3)' }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>✦</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-2)', marginBottom: 4 }}>No results</div>
          <div style={{ fontSize: 13 }}>Try a different word or phrase.</div>
        </div>
      )}

      {/* Sections */}
      {visible.map(section => (
        <HelpSection key={section.id} section={section} defaultOpen={!!q} />
      ))}
    </div>
  );
}

function HelpSection({ section, defaultOpen }) {
  const [open, setOpen] = React.useState(defaultOpen);
  // Keep open state in sync with search changes
  React.useEffect(() => { setOpen(defaultOpen); }, [defaultOpen]);

  return (
    <div style={{ padding: '0 16px', marginBottom: 6 }}>
      {/* Section header */}
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 10, padding: '12px 14px', borderRadius: 'var(--r-md)',
        background: open ? 'var(--bg-surface)' : 'transparent',
        border: open ? '1px solid var(--line-soft)' : '1px solid transparent',
        cursor: 'pointer', textAlign: 'left',
        borderBottomLeftRadius: open ? 0 : 'var(--r-md)',
        borderBottomRightRadius: open ? 0 : 'var(--r-md)',
        transition: 'background 0.15s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--amber)' }}>{React.cloneElement(section.icon, { size: 17 })}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: 'var(--fg-1)', letterSpacing: '0.02em' }}>
            {section.title}
          </span>
        </div>
        <span style={{ color: 'var(--fg-3)', transform: open ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'flex' }}>
          {React.cloneElement(Ico.chevron, { size: 16 })}
        </span>
      </button>

      {/* Q&A items */}
      {open && (
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--line-soft)', borderTop: 0,
          borderBottomLeftRadius: 'var(--r-md)', borderBottomRightRadius: 'var(--r-md)',
          overflow: 'hidden', marginBottom: 2,
        }}>
          {section.items.map((item, i) => (
            <HelpItem key={i} item={item} last={i === section.items.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function HelpItem({ item, last }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: last ? 0 : '1px solid var(--line-soft)' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 10, padding: '12px 14px',
        background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'left',
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, color: 'var(--fg-1)', lineHeight: 1.4, flex: 1 }}>
          {item.q}
        </span>
        <span style={{
          color: 'var(--fg-3)', flexShrink: 0, marginTop: 2,
          transform: open ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.18s', display: 'flex',
        }}>
          {React.cloneElement(Ico.chevron, { size: 14 })}
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 14px 14px', color: 'var(--fg-2)', fontSize: 13, lineHeight: 1.65 }}>
          {item.a}
        </div>
      )}
    </div>
  );
}

// ── Login screen ─────────────────────────────────────────────────────────────────
function LoginScreen({ theme, onLogin }) {
  const [user, setUser] = React.useState('demo');
  const [pass, setPass] = React.useState('demo');
  const [shake, setShake] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (user.trim() && pass.trim()) {
      onLogin();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--line-medium)',
    borderRadius: 'var(--r-md)',
    padding: '13px 16px',
    color: 'var(--fg-1)',
    fontFamily: 'var(--font-body)',
    fontSize: 16,
    outline: 'none',
  };

  const logoSrc = theme === 'dark' ? window.OMA_LOGO_WHITE : window.OMA_LOGO_PRIMARY;

  return (
    <div data-theme={theme} style={{
      width: '100%', height: '100%',
      background: 'var(--bg-page)', color: 'var(--fg-1)',
      fontFamily: 'var(--font-body)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 32px', boxSizing: 'border-box',
    }}>
      {logoSrc && (
        <img src={logoSrc} alt="Old Mother's Altar"
          style={{ height: 56, marginBottom: 36, display: 'block' }} />
      )}
      <form onSubmit={handleSubmit} style={{
        width: '100%', maxWidth: 300,
        display: 'flex', flexDirection: 'column', gap: 14,
        animation: shake ? 'oma-shake 0.4s ease' : 'none',
      }}>
        <div>
          <div className="oma-eyebrow" style={{ marginBottom: 6 }}>Username</div>
          <input value={user} onChange={ev => setUser(ev.target.value)}
            placeholder="demo" autoComplete="username" style={inputStyle} />
        </div>
        <div>
          <div className="oma-eyebrow" style={{ marginBottom: 6 }}>Password</div>
          <input type="password" value={pass} onChange={ev => setPass(ev.target.value)}
            placeholder="demo" autoComplete="current-password" style={inputStyle} />
        </div>
        <button type="submit" style={{
          marginTop: 8,
          background: 'var(--action-primary-bg)', color: 'var(--action-primary-fg)',
          border: 'none', borderRadius: 'var(--r-md)',
          padding: '14px 0', width: '100%', cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15,
          letterSpacing: 'var(--tk-button)',
        }}>Enter the Altar</button>
      </form>
      <style>{`
        @keyframes oma-shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-6px)}
          40%{transform:translateX(6px)}
          60%{transform:translateX(-4px)}
          80%{transform:translateX(4px)}
        }
      `}</style>
    </div>
  );
}

// ── Splash screen ─────────────────────────────────────────────────────────────────
const SPLASH_PHASES = [
  'new', 'waxing-crescent', 'first-quarter', 'waxing-gibbous',
  'full', 'waning-gibbous', 'last-quarter', 'waning-crescent',
];

function SplashScreen({ theme, onDone }) {
  const [exiting, setExiting] = React.useState(false);
  const logoSrc = theme === 'dark' ? window.OMA_LOGO_WHITE : window.OMA_LOGO_PRIMARY;
  const orbitR = 130;

  // Auto-advance after 3.4s
  React.useEffect(() => {
    const t = setTimeout(() => setExiting(true), 3400);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(onDone, 600);
    return () => clearTimeout(t);
  }, [exiting]);

  function handleTap() { if (!exiting) setExiting(true); }

  return (
    <div data-theme={theme} onClick={handleTap} style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at 50% 44%, rgba(45,78,166,0.13) 0%, transparent 60%), var(--bg-page)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer',
      opacity: exiting ? 0 : 1,
      transition: exiting ? 'opacity 0.55s ease-in' : 'none',
      zIndex: 300,
      userSelect: 'none',
    }}>
      <style>{`
        @keyframes splashFadeIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes splashOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes splashMoonCounter {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes splashPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes splashHintBlink {
          0%, 100% { opacity: 0; }
          50%       { opacity: 0.5; }
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        width: 340, height: 340, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244,175,89,0.07) 0%, transparent 70%)',
        animation: 'splashPulse 3.6s ease-in-out infinite',
      }} />

      {/* Orbit + logo */}
      <div style={{
        position: 'relative',
        width: orbitR * 2 + 60,
        height: orbitR * 2 + 60,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'splashFadeIn 1.1s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        opacity: 0,
      }}>
        {/* Dashed orbit ring */}
        <svg width={orbitR * 2 + 60} height={orbitR * 2 + 60}
          style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
          <circle
            cx={(orbitR * 2 + 60) / 2} cy={(orbitR * 2 + 60) / 2} r={orbitR}
            fill="none" stroke="rgba(244,175,89,0.12)" strokeWidth="1" strokeDasharray="3 7"
          />
        </svg>

        {/* Spinning moon container */}
        <div style={{
          position: 'absolute', inset: 0,
          animation: 'splashOrbit 22s linear infinite',
          transformOrigin: '50% 50%',
        }}>
          {SPLASH_PHASES.map((ph, i) => {
            const angle = (i / SPLASH_PHASES.length) * 360;
            const rad   = (angle * Math.PI) / 180;
            const cx    = (orbitR * 2 + 60) / 2;
            const cy    = (orbitR * 2 + 60) / 2;
            const x     = cx + orbitR * Math.sin(rad);
            const y     = cy - orbitR * Math.cos(rad);
            return (
              <div key={ph} style={{
                position: 'absolute',
                left: x - 14, top: y - 14,
                width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'splashMoonCounter 22s linear infinite',
                transformOrigin: '14px 14px',
                opacity: ph === 'full' ? 1 : 0.65,
              }}>
                <MoonGlyph
                  phase={ph}
                  size={ph === 'full' ? 22 : 16}
                  color={ph === 'full' ? 'rgba(244,175,89,0.95)' : 'rgba(253,254,235,0.65)'}
                />
              </div>
            );
          })}
        </div>

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 2, padding: '0 20px' }}>
          {logoSrc
            ? <img src={logoSrc} alt="Old Mother's Altar" style={{ width: 200, display: 'block', filter: 'drop-shadow(0 0 18px rgba(244,175,89,0.15))' }} />
            : <div style={{ color: 'var(--fg-1)', fontFamily: 'var(--font-display)', fontSize: 22, textAlign: 'center', textTransform: 'uppercase' }}>Old Mother's Altar</div>
          }
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        marginTop: 32,
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.20em',
        color: 'rgba(253,254,235,0.28)', textTransform: 'uppercase',
        animation: 'splashFadeIn 1.2s 0.9s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        opacity: 0,
      }}>
        Your Book of Shadows
      </div>

      {/* Tap hint */}
      <div style={{
        position: 'absolute', bottom: 52,
        fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.20em',
        color: 'rgba(253,254,235,0.28)', textTransform: 'uppercase',
        animation: 'splashFadeIn 0.6s 1.8s ease forwards, splashHintBlink 2.4s 2.4s ease-in-out infinite',
        opacity: 0,
      }}>
        Tap to enter
      </div>
    </div>
  );
}

function App({ theme, setTheme }) {
  const [tab, setTab]                     = React.useState('altar');
  const [openWorkingId, setOpenWorkingId] = React.useState(null);
  const [editWorkingId, setEditWorkingId] = React.useState(null);
  const [viewEntryId, setViewEntryId]     = React.useState(null);
  const [composerOpen, setComposerOpen]   = React.useState(false);
  const [composerKey, setComposerKey]     = React.useState(0);
  const [entryOpen, setEntryOpen]         = React.useState(false);
  const [entryKey, setEntryKey]           = React.useState(0);
  const [editEntryId, setEditEntryId]     = React.useState(null);
  const [drawerOpen, setDrawerOpen]       = React.useState(false);

  const newWorkingSubmitRef = React.useRef(null);
  const newEntrySubmitRef   = React.useRef(null);
  const cabinetAddRef       = React.useRef(null);

  // ── Persisted state ────────────────────────────────────────────────────────
  const [workings, setWorkings] = React.useState(() =>
    loadLS('oma_workings', DEFAULT_WORKINGS).map(hydrateWorking)
  );
  const [entries, setEntries] = React.useState(() =>
    loadLS('oma_entries', DEFAULT_ENTRIES).map(migrateEntry)
  );
  const [cabinet, setCabinet] = React.useState(() =>
    loadLS('oma_cabinet', DEFAULT_CABINET)
  );
  const [profile, setProfile] = React.useState(() =>
    loadLS('oma_profile', DEFAULT_PROFILE)
  );

  // ── Persist ────────────────────────────────────────────────────────────────
  React.useEffect(() => {
    localStorage.setItem('oma_workings', JSON.stringify(workings.map(({ icon, ...r }) => r)));
  }, [workings]);
  React.useEffect(() => { localStorage.setItem('oma_entries', JSON.stringify(entries)); }, [entries]);
  React.useEffect(() => { localStorage.setItem('oma_cabinet', JSON.stringify(cabinet)); }, [cabinet]);
  React.useEffect(() => { localStorage.setItem('oma_profile', JSON.stringify(profile)); }, [profile]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleCreateWorking(w) {
    setWorkings(prev => [hydrateWorking(w), ...prev]);
    setComposerOpen(false); setEditWorkingId(null);
  }
  function handleSaveWorking(w) {
    setWorkings(prev => prev.map(x => x.id === w.id ? hydrateWorking(w) : x));
    setComposerOpen(false); setEditWorkingId(null);
  }
  function handleDeleteWorking(id) { setWorkings(prev => prev.filter(w => w.id !== id)); setOpenWorkingId(null); }
  function handleSealWorking(id) { setWorkings(prev => prev.map(w => w.id === id ? { ...w, sealed: !w.sealed } : w)); }
  function handleToggleFavorite(id) { setWorkings(prev => prev.map(w => w.id === id ? { ...w, favorite: !w.favorite } : w)); }

  function handleSaveEntry(e) {
    setEntries(prev => {
      const idx = prev.findIndex(x => x.id === e.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = e; return next; }
      return [e, ...prev];
    });
    setEntryOpen(false); setEditEntryId(null);
  }
  function handleDeleteEntry(id) {
    setEntries(prev => prev.filter(e => e.id !== id));
    setEntryOpen(false); setEditEntryId(null);
    setViewEntryId(null);
  }

  // ── Form open helpers (increment key to force fresh mount) ────────────────
  function openComposer(editId = null) {
    setEditWorkingId(editId);
    setComposerKey(k => k + 1);
    setComposerOpen(true);
  }
  function openEntryForm(editId = null) {
    setEditEntryId(editId);
    setEntryKey(k => k + 1);
    setEntryOpen(true);
  }

  function handleSaveCabinetItem(item) {
    setCabinet(prev => {
      const idx = prev.findIndex(c => c.id === item.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = item; return next; }
      return [item, ...prev];
    });
  }
  function handleDeleteCabinetItem(id) { setCabinet(prev => prev.filter(c => c.id !== id)); }

  function handleUpdateProfile(p) { setProfile(p); }

  // ── Altar data ─────────────────────────────────────────────────────────────
  const now = new Date();
  const MONTHS_ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
  const h = now.getHours();
  const timeOfDay = h < 5 ? 'Still the night' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const magicalEvents = getMagicalEvents(now);
  const MOON_PHASES = [
    {key:'new',label:'New Moon'},{key:'waxing-crescent',label:'Waxing Crescent'},
    {key:'first-quarter',label:'First Quarter'},{key:'waxing-gibbous',label:'Waxing Gibbous'},
    {key:'full',label:'Full Moon'},{key:'waning-gibbous',label:'Waning Gibbous'},
    {key:'last-quarter',label:'Last Quarter'},{key:'waning-crescent',label:'Waning Crescent'},
  ];
  const known = new Date('2000-01-06T18:14:00Z');
  const synodic = 29.530588853;
  const moonDiff = ((now - known) / (1000 * 60 * 60 * 24) % synodic + synodic) % synodic;
  const moonIdx = Math.floor((moonDiff / synodic) * 8) % 8;
  const currentMoon = MOON_PHASES[moonIdx];

  // Compute pending tasks from journal entries that are linked to spells
  const pendingTasks = [];
  entries.forEach(entry => {
    if (!entry.workingId) return;
    const spell = workings.find(w => w.id === entry.workingId);
    if (!spell || !spell.tasks || spell.tasks.length === 0) return;
    spell.tasks.forEach(task => {
      if (!entry.tasksDone || !entry.tasksDone[task.id]) {
        pendingTasks.push({
          taskId: task.id,
          taskText: task.text,
          entryId: entry.id,
          entryTitle: entry.title,
          spellName: spell.name,
        });
      }
    });
  });

  const altarData = {
    moonPhase: currentMoon.key,
    moonLabel: currentMoon.label,
    monthRoman: MONTHS_ROMAN[now.getMonth()],
    recentEntries: entries.slice(0, 3),
    totalEntries: entries.length,
    pendingTasks,
    magicalEvents,
    timeOfDay,
    userName: profile.name || 'Witch',
  };

  // ── Persistent right-side buttons: hamburger ─────────────────────────────
  const rightBtns = (
    <IconBtn icon={Ico.menu} onClick={() => setDrawerOpen(true)} label="Menu" />
  );

  // ── Home button — shown on non-altar tabs (no back arrow present) ─────────
  const homeBtn = (
    <IconBtn icon={Ico.altar} onClick={() => { setTab('altar'); setOpenWorkingId(null); setViewEntryId(null); }} label="Home" />
  );

  // ── Routing ────────────────────────────────────────────────────────────────
  let topBar = null, body = null, bottomBar = null;
  const openWorking = workings.find(w => w.id === openWorkingId);
  const viewEntry = viewEntryId ? entries.find(e => e.id === viewEntryId) : null;

  if (composerOpen) {
    // ── New / Edit Spell — full page ──
    const isEdit = !!editWorkingId;
    topBar = (
      <TopBar title={isEdit ? 'Edit Spell' : 'New Spell'} eyebrow="GRIMOIRE"
        leading={<IconBtn icon={Ico.back} onClick={() => { setComposerOpen(false); setEditWorkingId(null); }} label="Back" />}
        trailing={rightBtns} />
    );
    body = (
      <NewWorking
        key={composerKey}
        editData={isEdit ? workings.find(w => w.id === editWorkingId) : null}
        onCreate={handleCreateWorking}
        onSave={handleSaveWorking}
        submitRef={newWorkingSubmitRef}
        cabinet={cabinet}
      />
    );
    bottomBar = (
      <BottomBar>
        <Btn variant="secondary" size="lg" style={{ flex: '0 0 auto' }}
          onClick={() => { setComposerOpen(false); setEditWorkingId(null); }}>
          Cancel
        </Btn>
        <Btn variant="primary" size="lg" icon={Ico.sparkle} fullWidth
          onClick={() => newWorkingSubmitRef.current?.()}>
          Save Spell
        </Btn>
      </BottomBar>
    );

  } else if (entryOpen) {
    // ── New / Edit Journal Entry — full page ──
    const isEditEntry = !!editEntryId;
    topBar = (
      <TopBar title={isEditEntry ? 'Edit Entry' : 'New Entry'} eyebrow="JOURNAL"
        leading={<IconBtn icon={Ico.back} onClick={() => { setEntryOpen(false); setEditEntryId(null); }} label="Back" />}
        trailing={rightBtns} />
    );
    body = (
      <JournalEntry
        key={entryKey}
        editId={editEntryId}
        onSave={handleSaveEntry}
        onDelete={handleDeleteEntry}
        workings={workings}
        entries={entries}
        submitRef={newEntrySubmitRef}
      />
    );
    bottomBar = (
      <BottomBar>
        <Btn variant="secondary" size="lg" style={{ flex: '0 0 auto' }}
          onClick={() => { setEntryOpen(false); setEditEntryId(null); }}>
          Cancel
        </Btn>
        <Btn variant="primary" size="lg" icon={Ico.feather} fullWidth
          onClick={() => newEntrySubmitRef.current?.()}>
          Save Entry
        </Btn>
      </BottomBar>
    );

  } else if (openWorking) {
    // ── Spell detail ──
    topBar = (
      <TopBar title={openWorking.name} eyebrow="SPELL"
        leading={<IconBtn icon={Ico.back} onClick={() => setOpenWorkingId(null)} label="Back" />}
        trailing={rightBtns} />
    );
    body = (
      <WorkingDetail working={openWorking}
        onBack={() => setOpenWorkingId(null)}
        onCast={() => openEntryForm(null)}
        onDelete={() => handleDeleteWorking(openWorking.id)}
        onEdit={() => openComposer(openWorking.id)}
        onToggleFavorite={() => handleToggleFavorite(openWorking.id)} />
    );
    // WorkingDetail has its own sticky footer

  } else if (viewEntry) {
    // ── Entry detail (read-only) ──
    topBar = (
      <TopBar title={viewEntry.title} eyebrow="JOURNAL ENTRY"
        leading={<IconBtn icon={Ico.back} onClick={() => setViewEntryId(null)} label="Back" />}
        trailing={rightBtns} />
    );
    body = <EntryDetail entryId={viewEntryId} entries={entries} workings={workings} />;
    bottomBar = (
      <BottomBar>
        <Btn variant="ghost" size="md" onClick={() => {
          if (window.confirm('Delete this entry? This cannot be undone.')) {
            handleDeleteEntry(viewEntryId);
          }
        }} style={{ color: 'var(--crimson-300)', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {React.cloneElement(Ico.trash, { size: 15 })}
          Delete
        </Btn>
        <Btn variant="primary" size="md" fullWidth icon={Ico.edit} onClick={() => openEntryForm(viewEntryId)}>
          Edit Entry
        </Btn>
      </BottomBar>
    );

  } else if (tab === 'altar') {
    const logoSrc = theme === 'dark' ? window.OMA_LOGO_WHITE : window.OMA_LOGO_PRIMARY;
    topBar = (
      <TopBar
        title={logoSrc
          ? <img src={logoSrc} alt="Old Mother's Altar" style={{ height: 26, display: 'block', margin: '0 auto' }} />
          : "Home"}
        trailing={rightBtns} />
    );
    body = <Altar data={altarData} onOpenWorking={setOpenWorkingId} onCompose={() => openComposer()} onNewEntry={() => openEntryForm()} onOpenEntry={id => setViewEntryId(id)} onGoToJournal={() => setTab('book')} />;
    bottomBar = (
      <BottomBar>
        <Btn variant="secondary" size="lg" icon={Ico.penTool} style={{ flex: 1 }} onClick={() => openEntryForm()}>
          New Journal Entry
        </Btn>
        <Btn variant="primary" size="lg" icon={Ico.sparkle} style={{ flex: 1 }} onClick={() => openComposer()}>
          New Spell
        </Btn>
      </BottomBar>
    );

  } else if (tab === 'workings') {
    topBar = (
      <TopBar title="The Grimoire" eyebrow="YOUR SPELLS"
        leading={homeBtn} trailing={rightBtns} />
    );
    body = <Workings workings={workings} onOpenWorking={setOpenWorkingId} onCompose={() => openComposer()} onToggleFavorite={handleToggleFavorite} />;
    bottomBar = (
      <BottomBar>
        <Btn variant="primary" size="md" icon={Ico.plus} fullWidth onClick={() => openComposer()}>
          Add a Spell
        </Btn>
      </BottomBar>
    );

  } else if (tab === 'book') {
    topBar = (
      <TopBar title="The Journal" eyebrow="YOUR PRACTICE"
        leading={homeBtn} trailing={rightBtns} />
    );
    body = <TheBook entries={entries} workings={workings} onWrite={() => openEntryForm()} onOpenEntry={id => setViewEntryId(id)} />;
    bottomBar = (
      <BottomBar>
        <Btn variant="primary" size="md" icon={Ico.penTool} fullWidth onClick={() => openEntryForm()}>
          Write an Entry
        </Btn>
      </BottomBar>
    );

  } else if (tab === 'cabinet') {
    topBar = (
      <TopBar title="The Cabinet" eyebrow="YOUR STORES"
        leading={homeBtn} trailing={rightBtns} />
    );
    body = <Cabinet cabinet={cabinet} onSave={handleSaveCabinetItem} onDelete={handleDeleteCabinetItem} addRef={cabinetAddRef} />;
    bottomBar = (
      <BottomBar>
        <Btn variant="primary" size="md" icon={Ico.plus} fullWidth onClick={() => cabinetAddRef.current?.()}>
          Add to Cabinet
        </Btn>
      </BottomBar>
    );

  } else if (tab === 'profile') {
    topBar = (
      <TopBar title="Settings" eyebrow="YOUR PRACTICE"
        leading={homeBtn} trailing={rightBtns} />
    );
    body = (
      <Profile profile={profile} onUpdateProfile={handleUpdateProfile}
        workings={workings} entries={entries} cabinet={cabinet}
        theme={theme} setTheme={setTheme} onLogOut={() => window.OMA_ON_LOGOUT?.()} />
    );
  } else if (tab === 'help') {
    topBar = (
      <TopBar title="How to Use" eyebrow="YOUR GUIDE"
        leading={homeBtn} trailing={rightBtns} />
    );
    body = <HelpScreen />;
  }

  return (
    <div data-theme={theme} style={{
      width: '100%', height: '100%',
      background: 'var(--bg-page)', color: 'var(--fg-1)',
      fontFamily: 'var(--font-body)',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      paddingTop: 62, boxSizing: 'border-box',
      transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    }}>
      {topBar}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {body}
        <div style={{
          padding: '28px 16px 22px',
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.12em',
          color: 'rgba(253,254,235,0.50)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          This is a concept by Katy Towell, and I'll hex you if you steal it. · © {new Date().getFullYear()}
        </div>
      </div>
      {bottomBar}

      {/* Drawer navigation */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeTab={tab}
        onChangeTab={t => { setTab(t); setOpenWorkingId(null); setViewEntryId(null); }}
        onLogOut={() => window.OMA_ON_LOGOUT?.()}
        theme={theme}
      />
    </div>
  );
}

window.App = App;
window.getMagicalEvents = getMagicalEvents;
