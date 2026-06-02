import { useState, useEffect } from 'react';
import Icon from './Icon';
import sealBadge from '../assets/seal-badge.svg';

const PHONE = '(208) 530-2729';
const PHONE_HREF = 'tel:+12085302729';

export default function Header({ onQuote }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(244,233,210,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: `2px solid ${scrolled ? 'var(--paper-300)' : 'transparent'}`,
      transition: 'background .3s var(--ease-out), border-color .3s var(--ease-out)',
    }}>
      <div style={s.bar}>
        <a href="#" style={s.lockup}>
          <img src={sealBadge} alt="Proper Rubbish" style={{ width: 46, height: 46 }} />
          <span style={s.wm}>PROPER RUBBISH</span>
        </a>
        <nav style={s.nav}>
          {[
            { l: 'Services', href: '#junk' },
            { l: 'Bin Cleaning', href: '#bin-cleaning' },
            { l: 'How it works', href: '#how-it-works' },
            { l: 'Service area', href: '#service-area' },
          ].map((n) => (
            <a key={n.l} href={n.href} style={s.link}>{n.l}</a>
          ))}
        </nav>
        <div style={s.actions}>
          <a href={PHONE_HREF} style={s.phone}>
            <Icon name="phone" size={15} /> {PHONE}
          </a>
          <button
            style={s.cta}
            onClick={onQuote}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-400)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--red-500)'; }}
          >
            Get a quote
          </button>
        </div>
      </div>
    </header>
  );
}

const s = {
  bar: { maxWidth: 'var(--container)', margin: '0 auto', padding: '14px var(--gutter)', display: 'flex', alignItems: 'center', gap: 30 },
  lockup: { display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' },
  wm: { fontFamily: 'var(--font-display)', fontSize: 21, letterSpacing: '.01em', color: 'var(--ink-900)', whiteSpace: 'nowrap' },
  nav: { display: 'flex', gap: 26, marginLeft: 6 },
  link: { fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--ink-700)', textDecoration: 'none', whiteSpace: 'nowrap' },
  actions: { display: 'flex', alignItems: 'center', gap: 18, marginLeft: 'auto' },
  phone: { display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-900)', textDecoration: 'none', whiteSpace: 'nowrap' },
  cta: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 15, textTransform: 'uppercase', letterSpacing: '.04em', background: 'var(--red-500)', color: 'var(--cream)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '11px 22px', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 2px 0 var(--red-700)', transition: 'background .2s var(--ease-out)' },
};
