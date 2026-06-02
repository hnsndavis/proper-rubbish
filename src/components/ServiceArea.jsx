const CITIES = [
  { name: 'Boise', href: '/junk-removal-boise-id' },
  { name: 'Meridian', href: '/junk-removal-meridian-id' },
  { name: 'Nampa', href: '/junk-removal-nampa-id' },
  { name: 'Eagle', href: '/junk-removal-eagle-id' },
  { name: 'Star', href: '/junk-removal-star-id' },
  { name: 'Caldwell', href: '/junk-removal-caldwell-id' },
  { name: 'Kuna', href: '/junk-removal-kuna-id' },
  { name: 'Garden City', href: '/junk-removal-garden-city-id' },
  { name: 'Middleton', href: '/junk-removal-middleton-id' },
  { name: 'Emmett' },
];

export default function ServiceArea() {
  return (
    <section id="service-area" style={s.wrap}>
      <div style={s.inner}>
        <div style={s.head}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Where we work</div>
          <h2 style={s.h2}>Treasure Valley, top to bottom.</h2>
          <p style={s.sub}>
            Based in the Valley and serving all corners — from the North End to Nampa and everywhere in between.
            Not sure if we cover your area? Call and ask.
          </p>
        </div>
        <div style={s.grid}>
          {CITIES.map((city) => (
            <a key={city.name} href={city.href || 'tel:+12085302729'} style={s.chip}>
              <span style={s.dot} />
              <span style={s.cityName}>Junk Removal {city.name}, ID</span>
            </a>
          ))}
        </div>
        <p style={s.note}>
          Don&rsquo;t see your city? We may still be able to help &mdash;{' '}
          <a href="tel:+12085302729" style={s.link}>call (208) 530-2729</a> and we&rsquo;ll let you know.
        </p>
      </div>
    </section>
  );
}

const s = {
  wrap: { background: 'var(--paper-50)', borderTop: '2px solid var(--paper-300)' },
  inner: { maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--space-9) var(--gutter)' },
  head: { marginBottom: 48 },
  h2: { fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.6vw,46px)', lineHeight: 1.05, color: 'var(--ink-900)', margin: '0 0 16px' },
  sub: { fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.6, color: 'var(--ink-700)', maxWidth: '54ch', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 32 },
  chip: { display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface)', border: '1px solid var(--paper-300)', borderRadius: 'var(--radius-md)', padding: '14px 18px', boxShadow: 'var(--shadow-sm)', textDecoration: 'none' },
  dot: { width: 8, height: 8, borderRadius: '50%', background: 'var(--red-500)', flex: 'none' },
  cityName: { fontFamily: 'var(--font-head)', fontWeight: 500, fontSize: 15, textTransform: 'uppercase', letterSpacing: '.03em', color: 'var(--ink-900)' },
  note: { fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink-700)', margin: 0 },
  link: { color: 'var(--red-500)', fontWeight: 600, textDecoration: 'none' },
};
