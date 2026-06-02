import Icon from './Icon';
import patchOval from '../assets/patch-oval.svg';

export default function Footer({ onQuote }) {
  return (
    <footer>
      <div style={s.cta}>
        <div style={s.ctaInner}>
          <h2 style={s.ctaH}>Got a pile that&rsquo;s been bothering you?</h2>
          <p style={s.ctaSub}>Call or text for a flat quote — same day, no walk-through required.</p>
          <div style={s.ctaBtns}>
            <button style={s.ctaBtn} onClick={onQuote}>Get a quote online</button>
            <a href="tel:+12085302729" style={s.ctaCall}>
              <Icon name="phone" size={18} /> (208) 530-2729
            </a>
          </div>
        </div>
      </div>
      <div className="on-ink" style={s.main}>
        <div style={s.cols}>
          <div style={s.brandCol}>
            <img src={patchOval} alt="Proper Rubbish" style={{ width: 200 }} />
            <p style={s.tag}>Proper job. Every time.</p>
            <p style={s.lic}>Licensed &amp; insured · Treasure Valley, ID</p>
          </div>
          {[
            { h: 'Services', items: ['Property cleanouts', 'Garage purges', 'Furniture removal', 'Appliance haul-away', 'Monthly bin cleaning', 'Estate cleanouts'] },
            { h: 'Service Area', items: ['Boise', 'Meridian', 'Nampa', 'Eagle', 'Star', 'Caldwell'] },
          ].map((c) => (
            <div key={c.h} style={s.col}>
              <div style={s.colH}>{c.h}</div>
              {c.items.map(it => <a key={it} href="#" style={s.colLink}>{it}</a>)}
            </div>
          ))}
          <div style={s.col}>
            <div style={s.colH}>Get in touch</div>
            <a href="tel:+12085302729" style={s.contact}><Icon name="phone" size={14} /> (208) 530-2729</a>
            <a href="mailto:hello@properrubbish.com" style={s.contact}><Icon name="mail" size={14} /> hello@properrubbish.com</a>
            <span style={s.contact}><Icon name="clock" size={14} /> Mon–Sat · 7a–6p</span>
          </div>
        </div>
        <div style={s.legal}>
          <span>© 2026 Proper Rubbish · Treasure Valley, ID</span>
          <span>properrubbish.com</span>
        </div>
      </div>
    </footer>
  );
}

const s = {
  cta: { background: 'var(--red-500)' },
  ctaInner: { maxWidth: 'var(--container)', margin: '0 auto', padding: '60px var(--gutter)', textAlign: 'center' },
  ctaH: { fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.8vw,50px)', lineHeight: 1.02, color: 'var(--cream)', margin: 0 },
  ctaSub: { fontFamily: 'var(--font-sans)', fontSize: 17, color: 'rgba(251,245,233,0.85)', margin: '14px 0 28px' },
  ctaBtns: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' },
  ctaBtn: { background: 'var(--cream)', color: 'var(--red-600)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '15px 34px', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '.04em', cursor: 'pointer', boxShadow: '0 3px 0 rgba(111,30,21,0.4)' },
  ctaCall: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 18, color: 'var(--cream)', textDecoration: 'none' },
  main: { background: 'var(--ink-900)' },
  cols: { maxWidth: 'var(--container)', margin: '0 auto', padding: '64px var(--gutter) 36px', display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr', gap: 40 },
  brandCol: {},
  tag: { fontFamily: 'var(--font-script)', fontSize: 22, color: 'var(--red-400)', margin: '18px 0 12px', maxWidth: '20ch' },
  lic: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gray-400)', margin: 0, letterSpacing: '.02em' },
  col: { display: 'flex', flexDirection: 'column', gap: 11 },
  colH: { fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--red-400)', marginBottom: 4 },
  colLink: { fontFamily: 'var(--font-sans)', fontSize: 14.5, color: '#C9C1B2', textDecoration: 'none' },
  contact: { display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-sans)', fontSize: 14, color: '#C9C1B2', textDecoration: 'none' },
  legal: { maxWidth: 'var(--container)', margin: '0 auto', padding: '20px var(--gutter)', borderTop: '1px solid rgba(251,245,233,0.14)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gray-500)' },
};
