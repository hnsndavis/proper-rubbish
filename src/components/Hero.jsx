import Icon from './Icon';
import sealBadge from '../assets/seal-badge.svg';

export default function Hero({ onQuote }) {
  return (
    <section className="herringbone-faint" style={s.wrap}>
      <div style={s.frameOuter}>
        <div style={s.frameInner}>
          <img src={sealBadge} alt="Proper Rubbish service seal" style={s.seal} />

          <div className="eyebrow" style={s.eyebrow}>
            Treasure Valley&rsquo;s neighbourhood rubbish man — Nampa, Caldwell, Boise &amp; beyond
          </div>

          <div style={s.script}>&ldquo;I want to be your</div>

          <div style={s.ribbonRow}>
            <span className="ribbon" style={s.ribbon}>RUBBISH&nbsp;MAN.&rdquo;</span>
          </div>

          <div style={s.tagStamp}>
            <span style={s.tagRule} />
            <span style={s.tagText}>Proper job. Every time.</span>
            <span style={s.tagRule} />
          </div>

          <p style={s.lede}>
            The dustman is back. We show up when we say we will, carry out the furniture,
            appliances and clutter you&rsquo;re done with &mdash; and leave the place tidier
            than we found it. Serving Boise, Meridian, Nampa, Eagle, Star &amp; the
            entire Treasure Valley.
          </p>

          <div style={s.actions}>
            <button
              style={s.primary}
              onClick={onQuote}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-400)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--red-500)'; }}
            >
              Get a free quote
            </button>
            <a href="tel:+12085302729" style={s.callBtn}>
              <Icon name="phone" size={16} /> Call (208) 530-2729
            </a>
          </div>

          <div style={s.trust}>
            {['Upfront flat pricing', 'Same-week scheduling', 'Licensed &amp; insured'].map((t, i) => (
              <span key={i} style={{ display: 'contents' }}>
                {i > 0 && <span style={s.dot} />}
                <span style={s.trustItem}>
                  <Icon name="check" size={15} stroke={3} />
                  <span dangerouslySetInnerHTML={{ __html: t }} />
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const s = {
  wrap: { background: 'var(--paper-100)', borderBottom: '2px solid var(--paper-300)', padding: 'clamp(28px,5vw,64px) var(--gutter)' },
  frameOuter: { position: 'relative', maxWidth: 1020, margin: '0 auto', border: '3px solid var(--navy-500)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)', padding: 7 },
  frameInner: { position: 'relative', border: '1px solid var(--navy-500)', padding: 'clamp(40px,6.5vw,82px) clamp(22px,6vw,76px) clamp(36px,5vw,64px)', textAlign: 'center' },
  seal: { position: 'absolute', top: -34, right: -26, width: 'clamp(86px,11vw,128px)', transform: 'rotate(-8deg)', filter: 'drop-shadow(0 8px 16px rgba(43,38,32,0.22))' },
  eyebrow: { color: 'var(--navy-500)', marginBottom: 'clamp(20px,3vw,30px)' },
  script: { fontFamily: 'var(--font-script)', fontSize: 'clamp(30px,5vw,56px)', lineHeight: 0.95, color: 'var(--red-500)', marginBottom: 'clamp(8px,1.4vw,16px)' },
  ribbonRow: { display: 'flex', justifyContent: 'center', marginBottom: 'clamp(26px,3.6vw,40px)' },
  ribbon: { fontSize: 'clamp(40px,8.2vw,104px)' },
  tagStamp: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 'clamp(22px,2.6vw,30px)' },
  tagRule: { width: 'clamp(20px,5vw,56px)', height: 2, background: 'var(--navy-500)', opacity: 0.5 },
  tagText: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 'clamp(13px,1.5vw,17px)', textTransform: 'uppercase', letterSpacing: 'var(--track-caps)', color: 'var(--navy-500)', whiteSpace: 'nowrap' },
  lede: { fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.62, color: 'var(--ink-700)', maxWidth: '60ch', margin: '0 auto' },
  actions: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 'clamp(28px,3.4vw,40px)', flexWrap: 'wrap' },
  primary: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 17, textTransform: 'uppercase', letterSpacing: '.04em', background: 'var(--red-500)', color: 'var(--cream)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '15px 34px', cursor: 'pointer', boxShadow: '0 3px 0 var(--red-700)', transition: 'background .2s var(--ease-out)', whiteSpace: 'nowrap' },
  callBtn: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--navy-500)', textDecoration: 'none', whiteSpace: 'nowrap' },
  trust: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 'clamp(28px,3.4vw,42px)', flexWrap: 'wrap' },
  trustItem: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: 500, color: 'var(--ink-700)' },
  dot: { width: 5, height: 5, borderRadius: '50%', background: 'var(--paper-300)' },
};
