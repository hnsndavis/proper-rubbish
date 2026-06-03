const stats = [
  { v: '100+', l: 'Loads hauled' },
  { v: 'Same wk', l: 'Typical turnaround' },
  { v: '5.0★', l: 'Google rating' },
  { v: '100%', l: 'Driveways swept' },
];

export default function Proof() {
  return (
    <section style={s.wrap}>
      <div style={s.inner}>
        <div className="script" style={s.lead}>the neighbors talk</div>
        <blockquote style={s.quote}>
          "They arrived exactly when they said, were polite to my clients, and the house
          was empty and swept by lunch. I&rsquo;ve referred them to every seller since."
        </blockquote>
        <div style={s.cite}>
          <span style={s.name}>Margaret Ellison</span>
          <span style={s.role}>Realtor &middot; North End, Boise</span>
        </div>
        <div style={s.stats} className="rg-4">
          {stats.map((st) => (
            <div key={st.l} style={s.stat}>
              <div style={s.statV}>{st.v}</div>
              <div style={s.statL}>{st.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const s = {
  wrap: { background: 'var(--paper-100)' },
  inner: { maxWidth: 'var(--container-narrow)', margin: '0 auto', padding: 'var(--space-9) var(--gutter)', textAlign: 'center' },
  lead: { fontFamily: 'var(--font-script)', fontSize: 34, color: 'var(--red-500)', marginBottom: 10 },
  quote: { fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3.2vw,36px)', lineHeight: 1.32, color: 'var(--ink-900)', margin: '0 auto 26px', maxWidth: '22ch', letterSpacing: '-0.01em' },
  cite: { display: 'flex', flexDirection: 'column', gap: 4 },
  name: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--ink-900)' },
  role: { fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--ink-700)', letterSpacing: '.02em' },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginTop: 60, borderTop: '2px solid var(--paper-300)', paddingTop: 38 },
  stat: {},
  statV: { fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--navy-500)' },
  statL: { fontFamily: 'var(--font-head)', fontWeight: 500, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-700)', marginTop: 8 },
};
