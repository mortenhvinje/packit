'use strict';

// ---------- Valg ----------

const TYPES = [
  { id: 'sol', label: '☀️ Sol & strand', words: ['strand', 'syden', ' sol ', 'solferie', 'spania', 'hellas', 'kreta', 'mallorca', 'kanari', 'gran canaria', 'tenerife', 'thailand', 'kroatia', 'tyrkia', 'kypros', 'portugal', 'algarve', 'bali', 'karibia', 'dubai', 'egypt'] },
  { id: 'by', label: '🏙️ Storby', words: [' by ', 'byferie', 'storby', 'london', 'paris', 'roma', 'new york', 'berlin', 'barcelona', 'københavn', 'stockholm', 'amsterdam', 'praha', 'wien', 'tokyo', 'budapest', 'madrid', 'lisboa'] },
  { id: 'hytte', label: '🏡 Hytte', words: ['hytte', 'hytta', 'sjøbu', 'landsted'] },
  { id: 'ski', label: '⛷️ Skiferie', words: ['skiferie', 'alpin', 'slalom', 'skisenter', 'hemsedal', 'trysil', 'alpene', 'langrenn', 'skitur'] },
  { id: 'camping', label: '⛺ Camping', words: ['camping', 'telt', 'bobil', 'campingvogn'] },
  { id: 'jobb', label: '💼 Jobbreise', words: ['jobb', 'konferanse', 'møte', 'kurs', 'business', 'seminar', 'kunde'] },
];

const GENDERS = [
  { id: 'kvinne', label: '👩 Kvinne' },
  { id: 'mann', label: '👨 Mann' },
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

const CATS = ['Reisedokumenter', 'Klær', 'Sko', 'Toalettsaker', 'Elektronikk', 'Aktiviteter', 'Barn', 'Diverse'];

const cap = (n, max) => Math.max(1, Math.min(Math.ceil(n), max));

const ITEMS = [
  // Reisedokumenter
  { n: 'Lommebok (bankkort, førerkort, etc.)', c: 'Reisedokumenter' },
  { n: 'Pass', c: 'Reisedokumenter', w: t => t.utland },
  { n: 'Europeisk helsetrygdkort', c: 'Reisedokumenter', w: t => t.utland },
  { n: 'Nøkler', c: 'Reisedokumenter' },

  // Klær
  { n: 'Undertøy', c: 'Klær', q: t => cap(t.days + 1, 8) },
  { n: 'Sokker', c: 'Klær', q: t => cap(t.days + 1, 8) },
  { n: 'T-skjorter', c: 'Klær', q: t => t.varm ? cap(t.days, 8) : t.mild ? cap(t.days * 0.7, 6) : cap(t.days / 2 + 1, 4) },
  { n: 'Shorts', c: 'Klær', w: t => t.varm, q: t => cap(t.days / 2, 4) },
  { n: 'Bukser', c: 'Klær', q: t => t.varm ? 1 : cap(t.days / 3 + 1, 3) },
  { n: 'Kjole / skjørt', c: 'Klær', w: t => t.kvinne && (t.varm || t.acts.fint), q: t => cap(t.days / 3, 3) },
  { n: 'Genser', c: 'Klær', q: t => t.kald ? cap(t.days / 3 + 1, 3) : t.mild ? 2 : 1 },
  { n: 'Ullundertøy', c: 'Klær', w: t => t.kald || t.ski, q: t => cap(t.days / 3, 3) },
  { n: 'Fleece / mellomlag', c: 'Klær', w: t => t.kald || t.ski || t.acts.fottur },
  { n: 'Badetøy', c: 'Klær', w: t => t.sol || t.acts.bading, q: t => t.days > 3 ? 2 : 1 },
  { n: 'Lett jakke', c: 'Klær', w: t => t.varm },
  // Med værvarsel styres regntøy av varselet, ellers gjetter vi ut fra turen
  { n: 'Regnjakke', c: 'Klær', w: t => t.weather ? t.regn : (!t.varm || t.acts.fottur || t.acts.festival) },
  { n: 'Regnbukse', c: 'Klær', w: t => t.myeRegn && (t.acts.fottur || t.camping || t.acts.festival || t.barn) },
  { n: 'Paraply', c: 'Klær', w: t => t.regn && (t.by || t.jobb) },
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
  { n: 'Sandaler / flipflops', c: 'Sko', w: t => t.varm || t.sol || t.acts.bading || t.camping },
  { n: 'Fjellsko / tursko', c: 'Sko', w: t => t.acts.fottur },
  { n: 'Vintersko / støvler', c: 'Sko', w: t => t.kald },
  { n: 'Pensko', c: 'Sko', w: t => t.acts.fint || t.jobb },
  { n: 'Innesko / tøfler', c: 'Sko', w: t => t.hytte },
  { n: 'Gummistøvler (barn)', c: 'Sko', w: t => t.barn && t.myeRegn },
  { n: 'Treningssko', c: 'Sko', w: t => t.acts.trening },

  // Toalettsaker
  { n: 'Toalettsaker', c: 'Toalettsaker' },
  { n: 'Sminke', c: 'Toalettsaker', w: t => t.kvinne },

  // Elektronikk
  { n: 'Mobil og lader', c: 'Elektronikk' },
  { n: 'Hodetelefoner', c: 'Elektronikk' },
  { n: 'PC og lader', c: 'Elektronikk', w: t => t.jobb },
  { n: 'Kamera, lader og minnekort', c: 'Elektronikk', w: t => t.acts.foto },
  { n: 'Hodelykt', c: 'Elektronikk', w: t => t.camping || t.hytte || t.acts.festival },

  // Aktiviteter
  { n: 'Badehåndkle', c: 'Aktiviteter', w: t => t.sol || t.acts.bading },
  { n: 'Dagstursekk', c: 'Aktiviteter', w: t => t.acts.fottur || t.by || t.acts.alpint || t.acts.langrenn },
  { n: 'Skibriller', c: 'Aktiviteter', w: t => t.acts.alpint },
  { n: 'Hjelm (ski)', c: 'Aktiviteter', w: t => t.acts.alpint },
  { n: 'Skidress / skibukse', c: 'Aktiviteter', w: t => t.acts.alpint },
  { n: 'Ski, staver og sko', c: 'Aktiviteter', w: t => t.acts.alpint || t.acts.langrenn },
  { n: 'Buff / hals', c: 'Aktiviteter', w: t => t.acts.alpint || t.acts.langrenn },
  { n: 'Sykkelhjelm', c: 'Aktiviteter', w: t => t.acts.sykling },
  { n: 'Sykkelbukse og -hansker', c: 'Aktiviteter', w: t => t.acts.sykling },
  { n: 'Sykkellys og lås', c: 'Aktiviteter', w: t => t.acts.sykling },
  { n: 'Fiskestang og sluk', c: 'Aktiviteter', w: t => t.acts.fiske },
  { n: 'Festivalbillett / armbånd', c: 'Aktiviteter', w: t => t.acts.festival },
  { n: 'Telt', c: 'Aktiviteter', w: t => t.camping },
  { n: 'Sovepose', c: 'Aktiviteter', w: t => t.camping },
  { n: 'Liggeunderlag', c: 'Aktiviteter', w: t => t.camping },
  { n: 'Primus', c: 'Aktiviteter', w: t => t.camping },
  { n: 'Kopp, tallerken og bestikk', c: 'Aktiviteter', w: t => t.camping },
  { n: 'Kniv / multiverktøy', c: 'Aktiviteter', w: t => t.camping || t.acts.fiske },

  // Barn
  { n: 'Barneklær (beregn ekstra skift)', c: 'Barn', w: t => t.barn },
  { n: 'Bleier og våtservietter', c: 'Barn', w: t => t.barn },
  { n: 'Kosedyr / smokk', c: 'Barn', w: t => t.barn },
  { n: 'Bøker / spill / nettbrett', c: 'Barn', w: t => t.barn },
  { n: 'Barnevogn / bæresele', c: 'Barn', w: t => t.barn },

  // Diverse
  { n: 'Solbriller', c: 'Diverse', w: t => t.varm || t.sol || t.ski || t.mild },
  { n: 'Sovemaske og ørepropper', c: 'Diverse' },
  { n: 'Bok / lesebrett', c: 'Diverse' },
  { n: 'Sengetøy og håndklær (hvis ikke inkludert)', c: 'Diverse', w: t => t.hytte },
];

// ---------- Tilstand ----------

const KEY = 'packit:v1';
const defaultTrip = (gender = '') => ({
  desc: '', dest: '', destAuto: false, start: '', weather: null,
  days: 5, gender, types: [], climate: 'mild', acts: [], extras: [],
});

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

  // Reisemål: stedsnavn med stor forbokstav etter «i», «til» eller «på»
  const place = text.match(/(?:^|\s)(?:i|til|på)\s+([A-ZÆØÅ][\p{L}-]+(?:\s+[A-ZÆØÅ][\p{L}-]+)*)/u);
  if (place) out.dest = place[1];

  return out;
}

function applyParsed(p) {
  const t = state.trip;
  if (p.days) t.days = Math.min(p.days, 60);
  if (p.climate && !t.weather) t.climate = p.climate;
  t.types = [...new Set(p.types)];
  t.acts = [...new Set(p.acts)];
  t.extras = [...new Set(p.extras)];
  // Fyll inn reisemål fra teksten, men ikke overstyr noe brukeren har skrevet selv
  if (p.dest && (!t.dest || t.destAuto) && p.dest !== t.dest) {
    t.dest = p.dest;
    t.destAuto = true;
    loadWeather();
  }
}

// ---------- Værvarsel (Open-Meteo, gratis og uten nøkkel) ----------

const FORECAST_DAYS = 16;
const WEEKDAYS = ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'];
let weatherStatus = '';
let weatherReq = 0;
let weatherTimer;

const isoDate = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
function addDays(iso, n) {
  const d = new Date(iso + 'T12:00');
  d.setDate(d.getDate() + n);
  return isoDate(d);
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const wxIcon = c => c === 0 ? '☀️' : c <= 2 ? '🌤️' : c === 3 ? '☁️' : c <= 48 ? '🌫️' : c <= 57 ? '🌦️'
  : c <= 67 ? '🌧️' : c <= 77 ? '❄️' : c <= 82 ? '🌧️' : c <= 86 ? '🌨️' : '⛈️';

function weatherFacts(w) {
  const rainy = w.days.filter(d => d.mm >= 0.5 || d.pop >= 60);
  return {
    lo: Math.min(...w.days.map(d => d.min)),
    hi: Math.max(...w.days.map(d => d.max)),
    rainDays: rainy.length,
    heavy: w.days.reduce((s, d) => s + d.mm, 0) >= 15 || w.days.some(d => d.mm >= 8),
    snow: w.days.some(d => (d.code >= 71 && d.code <= 77) || d.code === 85 || d.code === 86),
  };
}

function climateFrom(w) {
  const avgMax = w.days.reduce((s, d) => s + d.max, 0) / w.days.length;
  if (avgMax >= 21) return 'varm';
  if (avgMax <= 7 || Math.min(...w.days.map(d => d.min)) <= -3) return 'kald';
  return 'mild';
}

function loadWeather(delay = 700) {
  clearTimeout(weatherTimer);
  weatherTimer = setTimeout(fetchWeather, delay);
}

async function fetchWeather() {
  const t = state.trip;
  const dest = (t.dest || '').trim();
  const req = ++weatherReq;
  if (!dest) { t.weather = null; weatherStatus = ''; save(); renderWeather(); return; }

  const today = isoDate(new Date());
  const start = t.start && t.start > today ? t.start : today;
  const last = addDays(today, FORECAST_DAYS - 1);
  if (start > last) {
    t.weather = null;
    weatherStatus = '🗓️ Værvarselet blir tilgjengelig ca. to uker før avreise.';
    save(); renderPlan(); return;
  }
  const end = [addDays(start, t.days - 1), last].sort()[0];

  weatherStatus = 'Henter værvarsel …';
  renderWeather();
  try {
    const geo = await fetch('https://geocoding-api.open-meteo.com/v1/search?count=1&language=no&format=json&name='
      + encodeURIComponent(dest)).then(r => r.json());
    const p = geo.results && geo.results[0];
    if (!p) throw new Error('notfound');
    const f = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}`
      + '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max'
      + `&timezone=auto&start_date=${start}&end_date=${end}`).then(r => r.json());
    if (req !== weatherReq) return;
    const d = f.daily;
    const place = [p.name, p.country].filter(Boolean).join(', ');
    // Nytt reisemål utenfor Norge: kryss av for utenlands
    if (p.country_code !== 'NO' && (!t.weather || t.weather.place !== place) && !t.extras.includes('utland')) {
      t.extras.push('utland');
    }
    t.weather = {
      place,
      fetched: Date.now(),
      days: d.time.map((day, i) => ({
        d: day,
        code: d.weather_code[i],
        max: Math.round(d.temperature_2m_max[i]),
        min: Math.round(d.temperature_2m_min[i]),
        mm: d.precipitation_sum[i] || 0,
        pop: d.precipitation_probability_max[i] || 0,
      })),
    };
    t.climate = climateFrom(t.weather);
    weatherStatus = '';
  } catch (e) {
    if (req !== weatherReq) return;
    t.weather = null;
    weatherStatus = e.message === 'notfound'
      ? `Fant ikke «${dest}». Prøv en by eller et land.`
      : 'Kunne ikke hente værvarsel akkurat nå.';
  }
  save();
  renderPlan();
}

function weatherAdvice(w, f) {
  const tips = [];
  if (f.heavy) tips.push('☔ Mye regn ventet – regnjakke og regntøy legges til.');
  else if (f.rainDays) tips.push('🌦️ Litt regn ventet – regnjakke legges til.');
  else tips.push('☀️ Ser tørt ut – du kan droppe regntøyet.');
  if (f.snow) tips.push('❄️ Snø i varselet.');
  if (f.hi >= 28) tips.push('🥵 Skikkelig varmt – lette klær og solhatt.');
  if (f.lo <= 0) tips.push('🧤 Kuldegrader – pakk varmt.');
  return tips;
}

function renderWeather() {
  const el = $('weather');
  const w = state.trip.weather;
  $('climateHint').textContent = w ? '(satt fra værvarselet)' : '';
  if (!w) { el.innerHTML = weatherStatus ? `<div class="hint">${esc(weatherStatus)}</div>` : ''; return; }
  const f = weatherFacts(w);
  const covered = w.days.length < state.trip.days
    ? `<div class="hint">Varselet dekker ${w.days.length} av ${state.trip.days} dager.</div>` : '';
  el.innerHTML = `
    <div class="wx-head"><strong>📍 ${esc(w.place)}</strong>
      <span class="hint">${f.lo}–${f.hi}°C · regn ${f.rainDays} av ${w.days.length} dager</span></div>
    <div class="wx-days">${w.days.map(d => `
      <div class="wx-day">${WEEKDAYS[new Date(d.d + 'T12:00').getDay()]}
        <div class="ico">${wxIcon(d.code)}</div>
        <b>${d.max}°</b> ${d.min}°
        <div class="rain">${d.mm >= 0.5 ? Math.round(d.mm) + ' mm' : '&nbsp;'}</div></div>`).join('')}
    </div>
    ${covered}
    <div class="wx-advice">${weatherAdvice(w, f).join('<br>')}</div>`;
}

// ---------- Generering ----------

function context(trip) {
  const t = { days: trip.days, acts: {} };
  trip.types.forEach(id => { t[id] = true; });
  trip.acts.forEach(id => { t.acts[id] = true; });
  trip.extras.forEach(id => { t[id] = true; });
  t[trip.climate] = true;
  if (trip.gender) t[trip.gender] = true;
  t.festival = t.acts.festival;
  if (trip.weather) {
    const f = weatherFacts(trip.weather);
    t.weather = true;
    t.regn = f.rainDays > 0;
    t.myeRegn = f.heavy;
  }
  return t;
}

function generate(trip) {
  const t = context(trip);
  const items = ITEMS.filter(i => !i.w || i.w(t)).map(i => ({
    n: i.n, c: i.c, q: i.q ? i.q(t) : null, done: false,
  }));
  // Ved kun håndbagasje: hold klær nede
  if (t.handbagasje) items.forEach(i => { if (i.c === 'Klær' && i.q > 4) i.q = 4; });
  return items;
}

function tripTitle(trip) {
  const typ = trip.types.map(id => TYPES.find(x => x.id === id).label.replace(/^\S+\s/, ''));
  const name = trip.dest ? trip.dest.trim() : typ.length ? typ.join(' + ') : 'Ferie';
  return name + ` · ${trip.days} ${trip.days === 1 ? 'dag' : 'dager'}`;
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
  if ($('desc').value !== t.desc) $('desc').value = t.desc;
  if ($('dest').value !== (t.dest || '')) $('dest').value = t.dest || '';
  $('start').min = isoDate(new Date());
  $('start').value = t.start || isoDate(new Date());
  renderWeather();
  $('days').textContent = t.days;
  renderChips($('gender'), GENDERS, t.gender, true, id => { t.gender = t.gender === id ? '' : id; save(); renderPlan(); });
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
  const w = trip.weather;
  if (w) {
    const f = weatherFacts(w);
    $('tripWeather').textContent = `📍 ${w.place} · ${f.lo}–${f.hi}°C · `
      + (f.rainDays ? `☔ regn ${f.rainDays} av ${w.days.length} dager` : '☀️ tørt');
  } else $('tripWeather').textContent = '';

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

$('dest').addEventListener('input', e => {
  state.trip.dest = e.target.value;
  state.trip.destAuto = false;
  save();
  loadWeather();
});
$('start').addEventListener('change', e => {
  state.trip.start = e.target.value;
  save();
  loadWeather(0);
});

$('dayMinus').onclick = () => { state.trip.days = Math.max(1, state.trip.days - 1); save(); renderPlan(); if (state.trip.dest) loadWeather(); };
$('dayPlus').onclick = () => { state.trip.days = Math.min(60, state.trip.days + 1); save(); renderPlan(); if (state.trip.dest) loadWeather(); };

$('generate').onclick = async () => {
  // Hent ferskt varsel hvis det mangler eller er mer enn tre timer gammelt
  const w = state.trip.weather;
  if (state.trip.dest && (!w || Date.now() - w.fetched > 3 * 3600e3)) {
    clearTimeout(weatherTimer);
    await fetchWeather();
  }
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
  state = { trip: defaultTrip(state.trip.gender), list: null };
  save();
  show('plan');
};

show(state.list ? 'list' : 'plan');

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js');
}
