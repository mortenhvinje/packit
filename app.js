'use strict';

// ---------- Valg ----------

const TYPES = [
  { id: 'sol', label: '☀️ Sol & strand', words: ['strand', 'syden', ' sol ', 'solferie', 'spania', 'hellas', 'kreta', 'mallorca', 'kanari', 'gran canaria', 'tenerife', 'thailand', 'kroatia', 'tyrkia', 'kypros', 'portugal', 'algarve', 'bali', 'karibia', 'dubai', 'egypt'] },
  { id: 'by', label: '🏙️ Storby', words: [' by ', 'byferie', 'storby', 'london', 'paris', 'roma', 'new york', 'berlin', 'barcelona', 'københavn', 'stockholm', 'amsterdam', 'praha', 'wien', 'tokyo', 'budapest', 'madrid', 'lisboa'] },
  { id: 'hytte', label: '🏡 Hytte', words: ['hytte', 'fjellhytte', 'sjøbu', 'landsted'] },
  { id: 'ski', label: '⛷️ Skiferie', words: ['skiferie', 'alpin', 'slalom', 'skisenter', 'hemsedal', 'trysil', 'alpene', 'langrenn', 'skitur'] },
  { id: 'camping', label: '⛺ Camping', words: ['camping', 'telt', 'bobil', 'campingvogn'] },
  { id: 'jobb', label: '💼 Jobbreise', words: ['jobb', 'konferanse', 'møte', 'kurs', 'business', 'seminar', 'kunde'] },
];

const CLIMATES = [
  { id: 'varm', label: '🔥 Varmt' },
  { id: 'mild', label: '🌤️ Mildt' },
  { id: 'kald', label: '❄️ Kaldt' },
];

const ACTS = [
  { id: 'bading', label: '🏊 Bading', words: ['bad', 'svøm', 'snork', 'strand', 'basseng'] },
  { id: 'fottur', label: '🥾 Fottur', words: ['fottur', 'tur i fjellet', 'topptur', 'hike', 'fjelltur', 'vandr', 'gå tur'] },
  { id: 'alpint', label: '🎿 Alpint', words: ['alpin', 'slalom', 'snowboard', 'skisenter'] },
  { id: 'langrenn', label: '⛷️ Langrenn', words: ['langrenn', 'skitur'] },
  { id: 'trening', label: '🏃 Trening', words: ['trening', 'trene', 'løp', 'jogg', 'gym', 'yoga'] },
  { id: 'fint', label: '🍷 Fin middag / fest', words: ['middag', 'restaurant', 'fest', 'bryllup', 'gallamiddag', 'selskap', 'dåp', 'konfirmasjon'] },
  { id: 'sykling', label: '🚴 Sykling', words: ['sykkel', 'sykl'] },
  { id: 'fiske', label: '🎣 Fiske', words: ['fisk'] },
  { id: 'festival', label: '🎪 Festival / konsert', words: ['festival', 'konsert'] },
  { id: 'foto', label: '📷 Fotografering', words: ['foto', 'kamera'] },
];

const EXTRAS = [
  { id: 'fly', label: '✈️ Fly', words: [' fly', 'flyr ', 'flyet'] },
  { id: 'utland', label: '🌍 Utenlands', words: [] },
  { id: 'barn', label: '👶 Med barn', words: ['barn', 'unger', 'ungene', 'baby', 'familie'] },
  { id: 'handbagasje', label: '🎒 Kun håndbagasje', words: ['håndbagasje', 'kun sekk'] },
];

// Typer som normalt betyr utenlandsreise / fly
const ABROAD_WORDS = TYPES.find(t => t.id === 'sol').words.concat(TYPES.find(t => t.id === 'by').words)
  .filter(w => ![' sol ', 'solferie', 'strand', ' by ', 'byferie', 'storby'].includes(w))
  .concat(['utland', 'utenlands', 'usa', 'italia', 'frankrike', 'tyskland', 'japan', 'sveits', 'østerrike', 'alpene']);

// ---------- Pakkeregler ----------
// c = kategori, w = når (valgfri), q = antall (valgfri)

const CATS = ['Reisedokumenter', 'Klær', 'Sko', 'Toalettsaker', 'Helse', 'Elektronikk', 'Aktiviteter', 'Barn', 'Diverse'];

const cap = (n, max) => Math.max(1, Math.min(Math.ceil(n), max));

const ITEMS = [
  // Reisedokumenter
  { n: 'Pass', c: 'Reisedokumenter', w: t => t.utland },
  { n: 'Førerkort / ID-kort', c: 'Reisedokumenter' },
  { n: 'Bankkort', c: 'Reisedokumenter' },
  { n: 'Kontanter / valuta', c: 'Reisedokumenter', w: t => t.utland },
  { n: 'Reiseforsikringsbevis', c: 'Reisedokumenter', w: t => t.utland },
  { n: 'Europeisk helsetrygdkort', c: 'Reisedokumenter', w: t => t.utland },
  { n: 'Billetter / boardingkort', c: 'Reisedokumenter', w: t => t.fly },
  { n: 'Hotell- / bookingbekreftelse', c: 'Reisedokumenter', w: t => !t.hytte && !t.camping },
  { n: 'Nøkler', c: 'Reisedokumenter' },

  // Klær
  { n: 'Undertøy', c: 'Klær', q: t => cap(t.days + 1, 8) },
  { n: 'Sokker', c: 'Klær', q: t => cap(t.days + 1, 8) },
  { n: 'T-skjorter', c: 'Klær', q: t => t.varm ? cap(t.days, 8) : t.mild ? cap(t.days * 0.7, 6) : cap(t.days / 2 + 1, 4) },
  { n: 'Shorts', c: 'Klær', w: t => t.varm, q: t => cap(t.days / 2, 4) },
  { n: 'Bukser', c: 'Klær', q: t => t.varm ? 1 : cap(t.days / 3 + 1, 3) },
  { n: 'Kjole / skjørt', c: 'Klær', w: t => t.varm || t.acts.fint, q: t => cap(t.days / 3, 3) },
  { n: 'Genser', c: 'Klær', q: t => t.kald ? cap(t.days / 3 + 1, 3) : t.mild ? 2 : 1 },
  { n: 'Ullundertøy', c: 'Klær', w: t => t.kald || t.ski, q: t => cap(t.days / 3, 3) },
  { n: 'Fleece / mellomlag', c: 'Klær', w: t => t.kald || t.ski || t.acts.fottur },
  { n: 'Pysjamas', c: 'Klær' },
  { n: 'Badetøy', c: 'Klær', w: t => t.sol || t.acts.bading, q: t => t.days > 3 ? 2 : 1 },
  { n: 'Lett jakke', c: 'Klær', w: t => t.varm },
  { n: 'Regnjakke', c: 'Klær', w: t => !t.varm || t.acts.fottur || t.acts.festival },
  { n: 'Vinterjakke', c: 'Klær', w: t => t.kald },
  { n: 'Lue', c: 'Klær', w: t => t.kald || t.ski },
  { n: 'Votter / hansker', c: 'Klær', w: t => t.kald || t.ski },
  { n: 'Skjerf / hals', c: 'Klær', w: t => t.kald || t.ski },
  { n: 'Solhatt / caps', c: 'Klær', w: t => t.varm || t.sol },
  { n: 'Finere antrekk', c: 'Klær', w: t => t.acts.fint },
  { n: 'Dress / blazer', c: 'Klær', w: t => t.jobb },
  { n: 'Skjorter / bluser', c: 'Klær', w: t => t.jobb, q: t => cap(t.days, 5) },
  { n: 'Treningstøy', c: 'Klær', w: t => t.acts.trening, q: t => cap(t.days / 2, 3) },

  // Sko
  { n: 'Joggesko / komfortable sko', c: 'Sko' },
  { n: 'Sandaler', c: 'Sko', w: t => t.varm },
  { n: 'Flipflops', c: 'Sko', w: t => t.sol || t.acts.bading || t.camping },
  { n: 'Fjellsko / tursko', c: 'Sko', w: t => t.acts.fottur },
  { n: 'Vintersko / støvler', c: 'Sko', w: t => t.kald },
  { n: 'Pensko', c: 'Sko', w: t => t.acts.fint || t.jobb },
  { n: 'Innesko / tøfler', c: 'Sko', w: t => t.hytte },
  { n: 'Treningssko', c: 'Sko', w: t => t.acts.trening },

  // Toalettsaker
  { n: 'Tannbørste og tannkrem', c: 'Toalettsaker' },
  { n: 'Deodorant', c: 'Toalettsaker' },
  { n: 'Sjampo og balsam', c: 'Toalettsaker' },
  { n: 'Dusjsåpe', c: 'Toalettsaker' },
  { n: 'Hudkrem / ansiktskrem', c: 'Toalettsaker' },
  { n: 'Hårbørste / kam', c: 'Toalettsaker' },
  { n: 'Barberhøvel', c: 'Toalettsaker' },
  { n: 'Sminke', c: 'Toalettsaker' },
  { n: 'Solkrem', c: 'Toalettsaker', w: t => t.varm || t.sol || t.ski || t.acts.fottur || t.acts.bading },
  { n: 'Aftersun', c: 'Toalettsaker', w: t => t.sol || t.varm },
  { n: 'Leppepomade', c: 'Toalettsaker', w: t => t.kald || t.ski },
  { n: 'Bind / tamponger (ved behov)', c: 'Toalettsaker' },
  { n: 'Væskepose til sikkerhetskontroll', c: 'Toalettsaker', w: t => t.fly },

  // Helse
  { n: 'Faste medisiner', c: 'Helse' },
  { n: 'Smertestillende', c: 'Helse' },
  { n: 'Plaster', c: 'Helse' },
  { n: 'Gnagsårplaster', c: 'Helse', w: t => t.acts.fottur || t.by },
  { n: 'Myggspray', c: 'Helse', w: t => t.varm || t.camping || t.acts.fiske || t.hytte },
  { n: 'Reisesyketabletter', c: 'Helse', w: t => t.barn },
  { n: 'Antibac', c: 'Helse', w: t => t.fly || t.festival || t.camping },

  // Elektronikk
  { n: 'Mobil og lader', c: 'Elektronikk' },
  { n: 'Powerbank', c: 'Elektronikk' },
  { n: 'Hodetelefoner', c: 'Elektronikk' },
  { n: 'Reiseadapter', c: 'Elektronikk', w: t => t.utland },
  { n: 'PC og lader', c: 'Elektronikk', w: t => t.jobb },
  { n: 'Kamera, lader og minnekort', c: 'Elektronikk', w: t => t.acts.foto },
  { n: 'Hodelykt', c: 'Elektronikk', w: t => t.camping || t.hytte || t.acts.festival },

  // Aktiviteter
  { n: 'Badehåndkle', c: 'Aktiviteter', w: t => t.sol || t.acts.bading },
  { n: 'Strandveske', c: 'Aktiviteter', w: t => t.sol },
  { n: 'Snorkel og maske', c: 'Aktiviteter', w: t => t.sol && t.acts.bading },
  { n: 'Dagstursekk', c: 'Aktiviteter', w: t => t.acts.fottur || t.by || t.acts.alpint || t.acts.langrenn },
  { n: 'Drikkeflaske', c: 'Aktiviteter', w: t => t.acts.fottur || t.acts.trening || t.acts.sykling || t.fly },
  { n: 'Termos', c: 'Aktiviteter', w: t => t.kald || t.acts.langrenn || t.acts.fiske },
  { n: 'Kart / turapp', c: 'Aktiviteter', w: t => t.acts.fottur },
  { n: 'Turmat og sjokolade', c: 'Aktiviteter', w: t => t.acts.fottur || t.acts.langrenn },
  { n: 'Skibriller', c: 'Aktiviteter', w: t => t.acts.alpint },
  { n: 'Hjelm (ski)', c: 'Aktiviteter', w: t => t.acts.alpint },
  { n: 'Skidress / skibukse', c: 'Aktiviteter', w: t => t.acts.alpint },
  { n: 'Ski, staver og sko', c: 'Aktiviteter', w: t => t.acts.alpint || t.acts.langrenn },
  { n: 'Buff / hals', c: 'Aktiviteter', w: t => t.acts.alpint || t.acts.langrenn },
  { n: 'Skismøring', c: 'Aktiviteter', w: t => t.acts.langrenn },
  { n: 'Sykkelhjelm', c: 'Aktiviteter', w: t => t.acts.sykling },
  { n: 'Sykkelbukse og -hansker', c: 'Aktiviteter', w: t => t.acts.sykling },
  { n: 'Sykkellys og lås', c: 'Aktiviteter', w: t => t.acts.sykling },
  { n: 'Fiskestang og sluk', c: 'Aktiviteter', w: t => t.acts.fiske },
  { n: 'Fiskekort', c: 'Aktiviteter', w: t => t.acts.fiske },
  { n: 'Ørepropper', c: 'Aktiviteter', w: t => t.acts.festival || t.fly },
  { n: 'Festivalbillett / armbånd', c: 'Aktiviteter', w: t => t.acts.festival },
  { n: 'Telt', c: 'Aktiviteter', w: t => t.camping },
  { n: 'Sovepose', c: 'Aktiviteter', w: t => t.camping },
  { n: 'Liggeunderlag', c: 'Aktiviteter', w: t => t.camping },
  { n: 'Primus og gass', c: 'Aktiviteter', w: t => t.camping },
  { n: 'Kopp, tallerken og bestikk', c: 'Aktiviteter', w: t => t.camping },
  { n: 'Kniv / multiverktøy', c: 'Aktiviteter', w: t => t.camping || t.acts.fiske },
  { n: 'Notatbok og penn', c: 'Aktiviteter', w: t => t.jobb },
  { n: 'Visittkort', c: 'Aktiviteter', w: t => t.jobb },

  // Barn
  { n: 'Barneklær (beregn ekstra skift)', c: 'Barn', w: t => t.barn },
  { n: 'Bleier og våtservietter', c: 'Barn', w: t => t.barn },
  { n: 'Kosedyr / smokk', c: 'Barn', w: t => t.barn },
  { n: 'Snacks til reisen', c: 'Barn', w: t => t.barn },
  { n: 'Bøker / spill / nettbrett', c: 'Barn', w: t => t.barn },
  { n: 'Barnesolkrem', c: 'Barn', w: t => t.barn && (t.varm || t.sol || t.ski) },
  { n: 'Barnevogn / bæresele', c: 'Barn', w: t => t.barn },

  // Diverse
  { n: 'Solbriller', c: 'Diverse', w: t => t.varm || t.sol || t.ski || t.mild },
  { n: 'Nakkepute', c: 'Diverse', w: t => t.fly },
  { n: 'Bok / lesebrett', c: 'Diverse' },
  { n: 'Handlenett / pose til skittentøy', c: 'Diverse' },
  { n: 'Sengetøy og håndklær (hvis ikke inkludert)', c: 'Diverse', w: t => t.hytte },
  { n: 'Fyrstikker / lighter', c: 'Diverse', w: t => t.hytte || t.camping },
  { n: 'Mat og drikke til første dag', c: 'Diverse', w: t => t.hytte || t.camping },
  { n: 'Toalettpapir', c: 'Diverse', w: t => t.camping },
  { n: 'Kortstokk / spill', c: 'Diverse', w: t => t.hytte || t.camping },
];

// ---------- Tilstand ----------

const KEY = 'packit:v1';
const defaultTrip = () => ({ desc: '', days: 5, types: [], climate: 'mild', acts: [], extras: [] });

let state = load() || { trip: defaultTrip(), list: null };

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* privat modus */ }
}

const $ = id => document.getElementById(id);

// ---------- Tolking av fritekst ----------

function parse(text) {
  const s = ' ' + text.toLowerCase() + ' ';
  const has = words => words.some(w => s.includes(w));
  const out = {};

  const num = s.match(/(\d+)\s*(dager|dag|døgn|days?)/);
  const nights = s.match(/(\d+)\s*(netter|natt|nights?)/);
  const weeks = s.match(/(\d+|en|ei|ett|to|tre)\s*uk(e|er)/);
  const words = { en: 1, ei: 1, ett: 1, to: 2, tre: 3 };
  if (num) out.days = +num[1];
  else if (nights) out.days = +nights[1] + 1;
  else if (weeks) out.days = 7 * (words[weeks[1]] || +weeks[1]);
  else if (s.includes('langhelg')) out.days = 4;
  else if (s.includes('helg')) out.days = 3;
  else if (s.includes(' uke')) out.days = 7;

  out.types = TYPES.filter(t => has(t.words)).map(t => t.id);
  out.acts = ACTS.filter(a => has(a.words)).map(a => a.id);
  out.extras = EXTRAS.filter(e => has(e.words)).map(e => e.id);
  if (has(ABROAD_WORDS)) out.extras.push('utland', 'fly');

  if (has(['kaldt', 'vinter', 'snø', 'kulde', 'januar', 'februar', 'desember']) || out.types.includes('ski')) out.climate = 'kald';
  else if (has(['varmt', 'sommer', 'tropisk', 'hett', 'juli']) || out.types.includes('sol')) out.climate = 'varm';
  else if (has(['høst', 'vår', 'mildt'])) out.climate = 'mild';

  return out;
}

function applyParsed(p) {
  const t = state.trip;
  if (p.days) t.days = Math.min(p.days, 60);
  if (p.climate) t.climate = p.climate;
  t.types = [...new Set(p.types)];
  t.acts = [...new Set(p.acts)];
  t.extras = [...new Set(p.extras)];
}

// ---------- Generering ----------

function context(trip) {
  const t = { days: trip.days, acts: {} };
  trip.types.forEach(id => { t[id] = true; });
  trip.acts.forEach(id => { t.acts[id] = true; });
  trip.extras.forEach(id => { t[id] = true; });
  t[trip.climate] = true;
  t.festival = t.acts.festival;
  return t;
}

function generate(trip) {
  const t = context(trip);
  const items = ITEMS.filter(i => !i.w || i.w(t)).map(i => ({
    n: i.n, c: i.c, q: i.q ? i.q(t) : null, done: false,
  }));
  // Ved kun håndbagasje: hold klær nede, vask underveis
  if (t.handbagasje) {
    items.forEach(i => { if (i.c === 'Klær' && i.q > 4) i.q = 4; });
    items.push({ n: 'Reisevaskemiddel', c: 'Diverse', q: null, done: false });
  } else if (trip.days > 8) {
    items.push({ n: 'Reisevaskemiddel (vask underveis)', c: 'Diverse', q: null, done: false });
  }
  return items;
}

function tripTitle(trip) {
  const typ = trip.types.map(id => TYPES.find(x => x.id === id).label.replace(/^\S+\s/, ''));
  return (typ.length ? typ.join(' + ') : 'Ferie') + ` · ${trip.days} ${trip.days === 1 ? 'dag' : 'dager'}`;
}

// ---------- Visning: planlegging ----------

function renderChips(el, options, selected, single, onToggle) {
  el.innerHTML = '';
  options.forEach(o => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = o.label;
    b.setAttribute('aria-pressed', single ? selected === o.id : selected.includes(o.id));
    b.onclick = () => onToggle(o.id);
    el.appendChild(b);
  });
}

function toggle(arr, id) {
  const i = arr.indexOf(id);
  i >= 0 ? arr.splice(i, 1) : arr.push(id);
}

function renderPlan() {
  const t = state.trip;
  $('desc').value = t.desc;
  $('days').textContent = t.days;
  renderChips($('types'), TYPES, t.types, false, id => { toggle(t.types, id); save(); renderPlan(); });
  renderChips($('climate'), CLIMATES, t.climate, true, id => { t.climate = id; save(); renderPlan(); });
  renderChips($('acts'), ACTS, t.acts, false, id => { toggle(t.acts, id); save(); renderPlan(); });
  renderChips($('extras'), EXTRAS, t.extras, false, id => { toggle(t.extras, id); save(); renderPlan(); });
}

// ---------- Visning: liste ----------

function renderList() {
  const { list, trip } = state;
  $('tripTitle').textContent = tripTitle(trip);
  const meta = [CLIMATES.find(c => c.id === trip.climate).label]
    .concat(trip.acts.map(id => ACTS.find(a => a.id === id).label));
  $('tripMeta').textContent = meta.join('  ');

  const done = list.filter(i => i.done).length;
  $('bar').style.width = (list.length ? (done / list.length) * 100 : 0) + '%';
  $('count').textContent = done === list.length && list.length
    ? 'Alt er pakket – god tur! 🎉'
    : `${done} av ${list.length} pakket`;

  const groups = $('groups');
  groups.innerHTML = '';
  const cats = [...CATS, 'Egne ting'];
  cats.forEach(cat => {
    const items = list.map((it, idx) => ({ it, idx })).filter(x => x.it.c === cat);
    if (!items.length) return;
    const sec = document.createElement('div');
    sec.className = 'card group';
    const left = items.filter(x => !x.it.done).length;
    sec.innerHTML = `<h2>${cat}<span class="hint">${left ? left + ' igjen' : '✓'}</span></h2>`;
    items.forEach(({ it, idx }) => {
      const row = document.createElement('label');
      row.className = 'item' + (it.done ? ' done' : '');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = it.done;
      cb.onchange = () => { it.done = cb.checked; save(); renderList(); };
      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = it.n;
      if (it.q) {
        const q = document.createElement('span');
        q.className = 'qty';
        q.textContent = '× ' + it.q;
        name.appendChild(q);
      }
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'del';
      del.setAttribute('aria-label', 'Fjern ' + it.n);
      del.textContent = '×';
      del.onclick = e => { e.preventDefault(); list.splice(idx, 1); save(); renderList(); };
      row.append(cb, name, del);
      sec.appendChild(row);
    });
    groups.appendChild(sec);
  });
}

function show(view) {
  $('plan').hidden = view !== 'plan';
  $('list').hidden = view !== 'list';
  if (view === 'list') renderList(); else renderPlan();
  window.scrollTo(0, 0);
}

function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('show'), 2000);
}

// ---------- Hendelser ----------

let parseTimer;
$('desc').addEventListener('input', e => {
  state.trip.desc = e.target.value;
  clearTimeout(parseTimer);
  parseTimer = setTimeout(() => { applyParsed(parse(state.trip.desc)); save(); renderPlan(); }, 400);
});

$('dayMinus').onclick = () => { state.trip.days = Math.max(1, state.trip.days - 1); save(); renderPlan(); };
$('dayPlus').onclick = () => { state.trip.days = Math.min(60, state.trip.days + 1); save(); renderPlan(); };

$('generate').onclick = () => {
  const custom = (state.list || []).filter(i => i.c === 'Egne ting');
  state.list = generate(state.trip).concat(custom);
  save();
  show('list');
};

$('addForm').onsubmit = e => {
  e.preventDefault();
  const v = $('addInput').value.trim();
  if (!v) return;
  state.list.push({ n: v, c: 'Egne ting', q: null, done: false });
  $('addInput').value = '';
  save();
  renderList();
};

$('share').onclick = async () => {
  const lines = [`PackIt! – ${tripTitle(state.trip)}`];
  [...CATS, 'Egne ting'].forEach(cat => {
    const items = state.list.filter(i => i.c === cat);
    if (!items.length) return;
    lines.push('', cat.toUpperCase());
    items.forEach(i => lines.push(`${i.done ? '☑' : '☐'} ${i.n}${i.q ? ' × ' + i.q : ''}`));
  });
  const text = lines.join('\n');
  try {
    if (navigator.share) await navigator.share({ title: 'Pakkeliste', text });
    else { await navigator.clipboard.writeText(text); toast('Kopiert til utklippstavlen'); }
  } catch { /* avbrutt */ }
};

$('uncheck').onclick = () => { state.list.forEach(i => { i.done = false; }); save(); renderList(); };
$('edit').onclick = () => show('plan');
$('reset').onclick = () => {
  if (!confirm('Starte en ny tur? Den nåværende listen slettes.')) return;
  state = { trip: defaultTrip(), list: null };
  save();
  show('plan');
};

show(state.list ? 'list' : 'plan');

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js');
}
