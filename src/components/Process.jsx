const STEPS = [
  { n: '1', title: 'Tell us what\'s there', desc: 'A few photos or a quick call. We size the job and hand you a flat number — no walk-through required.' },
  { n: '2', title: 'We show up on time', desc: 'A uniformed crew, a clean truck, and the price we quoted. You point; we carry.' },
  { n: '3', title: 'It\'s gone for good', desc: 'Hauled, sorted, donated or disposed of properly. We sweep up before we leave.' },
];

export default function Process() {
  return (
    <section id="how-it-works" className="on-navy" style={s.wrap}>
      <div style={s.inner}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>How it works</div>
        <h2 style={s.h2}>Three steps. No surprises.</h2>
        <div style={s.grid}>
          {STEPS.map((st, i) => (
            <div key={st.n} style={s.step}>
              <div style={s.numRow}>
                <span style={s.num}>{st.n}</span>
                {i < STEPS.length - 1 && <span style={s.rule} />}
              </div>
              <h3 style={s.title}>{st.title}</h3>
              <p style={s.desc}>{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const s = {
  wrap: { background: 'var(--navy-500)' },
  inner: { maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--space-9) var(--gutter)' },
  h2: { fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.0, color: 'var(--cream)', margin: '0 0 52px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 38 },
  step: {},
  numRow: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 },
  num: { fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--cream)', width: 52, height: 52, borderRadius: 'var(--radius-pill)', background: 'var(--red-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', boxShadow: '0 3px 0 var(--red-700)' },
  rule: { flex: 1, height: 2, background: 'rgba(251,245,233,0.18)' },
  title: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 22, textTransform: 'uppercase', letterSpacing: '.01em', color: 'var(--cream)', margin: '0 0 10px' },
  desc: { fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.6, color: '#C3C9DF', margin: 0, maxWidth: '32ch' },
};
