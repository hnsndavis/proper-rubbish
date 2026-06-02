import Icon from './Icon';

const ROUTE_STOPS = [
  { x: 60,  y: 196, you: false },
  { x: 138, y: 168, you: false },
  { x: 214, y: 132, you: true  },
  { x: 292, y: 104, you: false },
  { x: 360, y: 72,  you: false },
];

const ROUTE_STEPS = [
  { n: '1', title: 'Add your address', desc: 'Call or text and we\'ll put you on the nearest route. No contracts, cancel any month.' },
  { n: '2', title: 'We come after collection', desc: 'Every month, the day after your bins go out — empty and easy to scrub clean.' },
  { n: '3', title: 'Nothing to remember', desc: 'Deodorized, sanitized, done. Same time each month, like clockwork.' },
];

function House({ x, y, you }) {
  const w = you ? 13 : 10;
  const fill = you ? 'var(--red-500)' : 'var(--navy-500)';
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w} y={-2} width={w * 2} height={w + 2} rx="1.5" fill={fill} />
      <polygon points={`${-w - 2},-2 0,${-w - 4} ${w + 2},-2`} fill={fill} />
    </g>
  );
}

function RouteCard() {
  return (
    <div style={s.card}>
      <span style={s.tack} />
      <div style={s.cardHead}>
        <span style={s.cardKicker}>Monthly Route Card</span>
        <span style={s.cardNo}>RT-07</span>
      </div>
      <svg viewBox="0 0 420 240" style={s.map} role="img" aria-label="Neighbourhood route map">
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="rgba(43,38,32,0.10)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="420" height="240" fill="url(#dots)" />
        <path d="M60,196 C100,184 110,176 138,168 C175,156 184,150 214,132 C255,110 262,114 292,104 C330,90 338,82 360,72"
          fill="none" stroke="var(--red-500)" strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" />
        {ROUTE_STOPS.map((st, i) => <House key={i} {...st} />)}
        <g transform="translate(34 206)">
          <rect x="-14" y="-9" width="20" height="12" rx="1.5" fill="var(--navy-500)" />
          <rect x="6" y="-4" width="8" height="7" rx="1.5" fill="var(--navy-500)" />
          <circle cx="-8" cy="5" r="3" fill="var(--ink-900)" />
          <circle cx="9" cy="5" r="3" fill="var(--ink-900)" />
        </g>
        <g transform="translate(214 132)">
          <line x1="0" y1="-18" x2="0" y2="-44" stroke="var(--red-500)" strokeWidth="2" />
          <polygon points="0,-44 26,-39 0,-32" fill="var(--red-500)" />
          <circle cx="0" cy="-16" r="2.5" fill="var(--red-500)" />
        </g>
        <text x="222" y="88" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', fill: 'var(--red-600)', fontWeight: 600 }}>
          YOUR STREET
        </text>
      </svg>
      <div style={s.cardFoot}>
        <span style={s.footStop}><Icon name="map-pin" size={13} /> Monthly &middot; Treasure Valley</span>
        <span style={s.footPrice}>$25<span style={s.footPriceUnit}>/mo</span></span>
      </div>
    </div>
  );
}

export default function BinCleaning({ onQuote }) {
  return (
    <section id="bin-cleaning" className="on-navy" style={s.wrap}>
      <div style={s.inner}>
        <div style={s.top}>
          <div style={s.left}>
            <div className="eyebrow" style={s.eyebrow}>Bin Cleaning &middot; monthly route</div>
            <h2 style={s.h2}>Add your bins<br />to the route.</h2>
            <p style={s.lede}>
              Every month we come round, scrub your bins clean,
              and leave them smelling like nothing at all. <strong style={s.strong}>$25 a month.
              Both bins. We come to you.</strong>
            </p>
          </div>
          <div style={s.right}>
            <RouteCard />
          </div>
        </div>

        <div style={s.steps}>
          <div style={s.stepsHead}>
            <span style={s.stepsKicker}>How the route works</span>
            <span style={s.stepsRule} />
          </div>
          <div style={s.stepsGrid}>
            {ROUTE_STEPS.map((st, i) => (
              <div key={st.n} style={s.step}>
                <div style={s.numRow}>
                  <span style={s.stepNum}>{st.n}</span>
                  {i < ROUTE_STEPS.length - 1 && <span style={s.stepRule} />}
                </div>
                <h4 style={s.stepTitle}>{st.title}</h4>
                <p style={s.stepDesc}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={s.cta}>
          <span style={s.ctaText}>Add your address &mdash; call or text and we&rsquo;ll fit you onto next month&rsquo;s route.</span>
          <button style={s.ctaBtn} onClick={onQuote}
            onMouseEnter={e => { e.currentTarget.style.background = '#DB6E5B'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--red-400)'; }}>
            Join the route &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

const s = {
  wrap: { background: 'var(--navy-600)' },
  inner: { maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--space-9) var(--gutter)' },
  top: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,5vw,80px)', alignItems: 'center' },
  left: {},
  eyebrow: { color: 'var(--red-400)', marginBottom: 16 },
  h2: { fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4.4vw,58px)', lineHeight: 1.0, color: 'var(--cream)', margin: '0 0 22px' },
  lede: { fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.62, color: '#C3C9DF', margin: 0, maxWidth: '42ch' },
  strong: { color: 'var(--cream)', fontWeight: 600 },
  right: { display: 'flex', justifyContent: 'center' },
  card: { position: 'relative', width: 'min(100%, 460px)', background: 'var(--paper-50)', borderRadius: 'var(--radius-lg)', padding: '26px 26px 20px', boxShadow: '0 22px 48px rgba(15,20,40,0.45)', border: '1px solid var(--paper-300)', transform: 'rotate(-1.4deg)' },
  tack: { position: 'absolute', top: -9, left: '50%', width: 18, height: 18, borderRadius: '50%', background: 'var(--red-500)', transform: 'translateX(-50%)', boxShadow: '0 3px 0 var(--red-700), 0 6px 10px rgba(15,20,40,0.4)', border: '2px solid #D8604E' },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 14, borderBottom: '1.5px dashed var(--gray-400)' },
  cardKicker: { fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--ink-900)' },
  cardNo: { fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--red-600)', letterSpacing: '.05em' },
  map: { width: '100%', height: 'auto', display: 'block', margin: '8px 0 4px' },
  cardFoot: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1.5px dashed var(--gray-400)' },
  footStop: { display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--ink-700)', letterSpacing: '.02em' },
  footPrice: { fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--ink-900)', lineHeight: 1 },
  footPriceUnit: { fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 500, color: 'var(--ink-700)', letterSpacing: '.04em' },
  steps: { marginTop: 'clamp(56px,6vw,80px)' },
  stepsHead: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 },
  stepsKicker: { fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--red-400)', flex: 'none' },
  stepsRule: { flex: 1, height: 2, background: 'rgba(251,245,233,0.16)' },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 },
  step: {},
  numRow: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 },
  stepNum: { fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--cream)', width: 46, height: 46, borderRadius: 'var(--radius-pill)', background: 'var(--red-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', boxShadow: '0 3px 0 var(--red-700)' },
  stepRule: { flex: 1, height: 2, background: 'rgba(251,245,233,0.16)' },
  stepTitle: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 18, textTransform: 'uppercase', letterSpacing: '.01em', color: 'var(--cream)', margin: '0 0 8px' },
  stepDesc: { fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.55, color: '#C3C9DF', margin: 0, maxWidth: '34ch' },
  cta: { marginTop: 'clamp(44px,5vw,64px)', background: 'rgba(251,245,233,0.06)', border: '1px solid rgba(251,245,233,0.18)', borderRadius: 'var(--radius-lg)', padding: '26px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' },
  ctaText: { fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.5, color: 'var(--cream)', fontWeight: 500, flex: '1 1 320px' },
  ctaBtn: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '.04em', background: 'var(--red-400)', color: 'var(--cream)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '14px 28px', cursor: 'pointer', boxShadow: '0 3px 0 var(--red-600)', transition: 'background .2s var(--ease-out)', whiteSpace: 'nowrap' },
};
