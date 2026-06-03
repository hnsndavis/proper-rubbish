import { useState, useEffect } from 'react';
import Icon from './Icon';
import sealBadge from '../assets/seal-badge.svg';

const PHONE = '(208) 530-2729';
const PHONE_HREF = 'tel:+12085302729';
const NAV = [
  { l: 'Services',     href: '/#junk' },
  { l: 'Bin Cleaning', href: '/#bin-cleaning' },
  { l: 'How it works', href: '/#how-it-works' },
  { l: 'Service area', href: '/#service-area' },
];

export default function Header({ onQuote }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mobile,    setMobile]    = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      setMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const showBg = scrolled || menuOpen;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: showBg ? 'rgba(244,233,210,0.96)' : 'transparent',
      backdropFilter: showBg ? 'blur(8px)' : 'none',
      borderBottom: `2px solid ${showBg ? 'var(--paper-300)' : 'transparent'}`,
      transition: 'background .25s var(--ease-out), border-color .25s var(--ease-out)',
    }}>
      <div style={s.bar}>
        <a href="/" style={s.lockup} onClick={close}>
          <img src={sealBadge} alt="Proper Rubbish" style={{ width: 46, height: 46 }} />
          <span style={s.wm}>PROPER RUBBISH</span>
        </a>

        {!mobile && (
          <nav style={s.nav}>
            {NAV.map(n => <a key={n.l} href={n.href} style={s.link}>{n.l}</a>)}
          </nav>
        )}

        {!mobile && (
          <div style={s.actions}>
            <a href={PHONE_HREF} style={s.phone}>
              <Icon name="phone" size={15} /> {PHONE}
            </a>
            <button style={s.cta} onClick={onQuote}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-400)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--red-500)'; }}>
              Get a quote
            </button>
          </div>
        )}

        {mobile && (
          <div style={s.mobileRight}>
            <a href={PHONE_HREF} style={s.mobilePhone} aria-label="Call us">
              <Icon name="phone" size={20} />
            </a>
            <button
              style={s.burger}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <Icon name={menuOpen ? 'x' : 'menu'} size={24} />
            </button>
          </div>
        )}
      </div>

      {mobile && menuOpen && (
        <div style={s.drawer}>
          <nav style={s.drawerNav}>
            {NAV.map(n => (
              <a key={n.l} href={n.href} style={s.drawerLink} onClick={close}>{n.l}</a>
            ))}
          </nav>
          <div style={s.drawerFoot}>
            <a href={PHONE_HREF} style={s.drawerCall} onClick={close}>
              <Icon name="phone" size={18} /> Call {PHONE}
            </a>
            <button style={s.drawerCta} onClick={() => { close(); onQuote(); }}>
              Get a free quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

const s = {
  bar: { maxWidth: 'var(--container)', margin: '0 auto', padding: '14px var(--gutter)', display: 'flex', alignItems: 'center', gap: 30 },
  lockup: { display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 },
  wm: { fontFamily: 'var(--font-display)', fontSize: 21, letterSpacing: '.01em', color: 'var(--ink-900)', whiteSpace: 'nowrap' },
  nav: { display: 'flex', gap: 26, marginLeft: 6 },
  link: { fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--ink-700)', textDecoration: 'none', whiteSpace: 'nowrap' },
  actions: { display: 'flex', alignItems: 'center', gap: 18, marginLeft: 'auto' },
  phone: { display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-900)', textDecoration: 'none', whiteSpace: 'nowrap' },
  cta: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 15, textTransform: 'uppercase', letterSpacing: '.04em', background: 'var(--red-500)', color: 'var(--cream)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '11px 22px', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 2px 0 var(--red-700)', transition: 'background .2s var(--ease-out)' },
  // mobile bar
  mobileRight: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 0 },
  mobilePhone: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 10px', color: 'var(--ink-900)', textDecoration: 'none' },
  burger: { display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-900)', padding: '8px 4px', borderRadius: 'var(--radius-sm)' },
  // mobile drawer
  drawer: { background: 'rgba(244,233,210,0.98)', borderTop: '1px solid var(--paper-300)', padding: '8px var(--gutter) 28px' },
  drawerNav: { display: 'flex', flexDirection: 'column' },
  drawerLink: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 19, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--ink-900)', textDecoration: 'none', padding: '15px 0', borderBottom: '1px solid var(--paper-300)', display: 'block' },
  drawerFoot: { display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 },
  drawerCall: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--navy-500)', textDecoration: 'none', padding: '14px', border: '2px solid var(--navy-500)', borderRadius: 'var(--radius-sm)' },
  drawerCta: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '.04em', background: 'var(--red-500)', color: 'var(--cream)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '15px', cursor: 'pointer', boxShadow: '0 3px 0 var(--red-700)', width: '100%' },
};
