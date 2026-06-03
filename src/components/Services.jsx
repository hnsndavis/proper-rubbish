import Icon from './Icon';

const SERVICES = [
  { n: '01', icon: 'home', title: 'Property Cleanouts', desc: 'Whole houses, top to bottom. We clear it, you list it.' },
  { n: '02', icon: 'warehouse', title: 'Garage Purges', desc: 'Years of "I\'ll deal with it later," gone in an afternoon.' },
  { n: '03', icon: 'sofa', title: 'Furniture Removal', desc: 'Couches, mattresses, the dresser nobody wants to carry.' },
  { n: '04', icon: 'refrigerator', title: 'Appliance Haul-Away', desc: 'Fridges, washers, water heaters — disconnected and gone.' },
  { n: '05', icon: 'key-round', title: 'Estate Cleanouts', desc: 'Handled with care and discretion, on your timeline.' },
  { n: '06', icon: 'hammer', title: 'Construction Debris', desc: 'Post-reno rubble cleared so the space is ready to show.' },
];

const HAUL_STEPS = [
  { n: '1', title: 'Call or text what\'s there', desc: 'A few photos or a quick description. We size the job and hand you a flat number — no walk-through needed.' },
  { n: '2', title: 'We show up on time', desc: 'A uniformed crew, a clean truck, and the price we quoted. You point; we carry.' },
  { n: '3', title: 'It\'s gone for good', desc: 'Hauled, sorted, donated or disposed of properly. We sweep up before we leave.' },
];

export default function Services({ onQuote }) {
  return (
    <section id="junk" style={s.wrap}>
      <div style={s.inner}>
        <div style={s.head}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Junk Removal &middot; Boise &amp; Treasure Valley</div>
            <h2 style={s.h2}>If you don&rsquo;t want it,<br />we&rsquo;ll deal with it.</h2>
          </div>
          <p style={s.sub}>
            Single item or a full estate &mdash; same crew, same coveralls, same standard.
            No haggling, no mess left behind.
          </p>
        </div>

        <div style={s.grid} className="rg-3">
          {SERVICES.map((sv) => (
            <div key={sv.n} style={s.card}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}>
              <div style={s.cardTop}>
                <span style={{ color: 'var(--navy-500)' }}><Icon name={sv.icon} size={28} stroke={1.75} /></span>
                <span style={s.num}>{sv.n}</span>
              </div>
              <h3 style={s.title}>{sv.title}</h3>
              <p style={s.desc}>{sv.desc}</p>
            </div>
          ))}
        </div>

        <div style={s.steps}>
          <div style={s.stepsHead}>
            <span style={s.stepsKicker}>How a haul works</span>
            <span style={s.stepsRule} />
          </div>
          <div style={s.stepsGrid} className="rg-3">
            {HAUL_STEPS.map((st, i) => (
              <div key={st.n} style={s.step}>
                <div style={s.numRow}>
                  <span style={s.stepNum}>{st.n}</span>
                  {i < HAUL_STEPS.length - 1 && <span style={s.stepRule} />}
                </div>
                <h4 style={s.stepTitle}>{st.title}</h4>
                <p style={s.stepDesc}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={s.cta}>
          <span style={s.ctaText}>Ready to clear it out? Call or text and we&rsquo;ll schedule your haul this week.</span>
          <button style={s.ctaBtn} onClick={onQuote}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-400)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--red-500)'; }}>
            Get a quote &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

const s = {
  wrap: { background: 'var(--paper-200)' },
  inner: { maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--space-9) var(--gutter)' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, marginBottom: 48, flexWrap: 'wrap' },
  h2: { fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.0, color: 'var(--ink-900)', margin: 0 },
  sub: { fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.6, color: 'var(--ink-700)', maxWidth: 360, margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 },
  card: { background: 'var(--surface)', border: '1px solid var(--paper-300)', borderRadius: 'var(--radius-lg)', padding: '26px 26px', boxShadow: 'var(--shadow-card)', transition: 'transform .2s var(--ease-out), box-shadow .2s var(--ease-out)', cursor: 'default', display: 'flex', flexDirection: 'column' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  num: { fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--red-500)', lineHeight: 1 },
  title: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 21, lineHeight: 1.08, textTransform: 'uppercase', letterSpacing: '.01em', color: 'var(--ink-900)', margin: '0 0 10px' },
  desc: { fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--ink-700)', margin: 0 },
  steps: { marginTop: 64 },
  stepsHead: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 },
  stepsKicker: { fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--red-500)', flex: 'none' },
  stepsRule: { flex: 1, height: 2, background: 'var(--paper-300)' },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 },
  step: {},
  numRow: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 },
  stepNum: { fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--cream)', width: 46, height: 46, borderRadius: 'var(--radius-pill)', background: 'var(--navy-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', boxShadow: '0 3px 0 var(--navy-700)' },
  stepRule: { flex: 1, height: 2, background: 'var(--paper-300)' },
  stepTitle: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 18, textTransform: 'uppercase', letterSpacing: '.01em', color: 'var(--ink-900)', margin: '0 0 8px' },
  stepDesc: { fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--ink-700)', margin: 0, maxWidth: '34ch' },
  cta: { marginTop: 56, background: 'var(--surface)', border: '1px solid var(--paper-300)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: '26px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' },
  ctaText: { fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.5, color: 'var(--ink-900)', fontWeight: 500, flex: '1 1 320px' },
  ctaBtn: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '.04em', background: 'var(--red-500)', color: 'var(--cream)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '14px 28px', cursor: 'pointer', boxShadow: '0 3px 0 var(--red-700)', transition: 'background .2s var(--ease-out)', whiteSpace: 'nowrap' },
};
