import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Icon from './Icon';

export default function CityPage({ city, onQuote }) {
  useEffect(() => {
    const url = `https://properrubbish.com/junk-removal-${city.slug}`;
    document.title = city.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', city.metaDesc);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', city.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', city.metaDesc);
  }, [city]);

  return (
    <>
      <Header onQuote={onQuote} />
      <main>
        {/* HERO */}
        <section className="herringbone-faint" style={s.heroWrap}>
          <div style={s.heroInner}>
            <div className="eyebrow" style={{ color: 'var(--navy-500)', marginBottom: 16 }}>{city.county} · Treasure Valley, ID</div>
            <h1 style={s.h1}>{city.h1}</h1>
            <p style={s.lede}>{city.intro}</p>
            <div style={s.actions}>
              <button style={s.primary} onClick={onQuote}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-400)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--red-500)'; }}>
                Get a free quote
              </button>
              <a href="tel:+12085302729" style={s.callBtn}>
                <Icon name="phone" size={16} /> (208) 530-2729
              </a>
            </div>
            <div style={s.trust}>
              {['Flat-rate pricing', 'Same-week scheduling', 'We serve ' + city.name].map((t, i) => (
                <span key={i} style={{ display: 'contents' }}>
                  {i > 0 && <span style={s.dot} />}
                  <span style={s.trustItem}><Icon name="check" size={14} stroke={3} /> {t}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section style={s.servicesWrap}>
          <div style={s.inner}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>What we haul in {city.name}</div>
            <h2 style={s.h2}>Junk removal, done right.</h2>
            <div style={s.grid}>
              {SERVICES.map(sv => (
                <div key={sv.title} style={s.card}>
                  <span style={{ color: 'var(--navy-500)', marginBottom: 14, display: 'block' }}>
                    <Icon name={sv.icon} size={26} stroke={1.75} />
                  </span>
                  <h3 style={s.cardTitle}>{sv.title}</h3>
                  <p style={s.cardDesc}>{sv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={s.pricingWrap}>
          <div style={s.inner}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Pricing</div>
            <h2 style={s.h2}>Flat rates. No surprises.</h2>
            <p style={s.pricingIntro}>Pricing is based on the space your junk takes up in our 15 cu yd trailer. You get the number before we start.</p>
            <div style={s.priceGrid}>
              {LOADS.map(l => (
                <div key={l.label} style={s.priceCard}>
                  <div style={s.priceLabel}>{l.label}</div>
                  <div style={s.priceVol}>{l.desc}</div>
                  <div style={s.priceAmt}>{l.price}</div>
                </div>
              ))}
            </div>
            <p style={s.priceNote}>Construction and demolition debris may add 20% due to disposal rates. Single items: mattress $75 · sofa $50/cushion · fridge $75–$125.</p>
          </div>
        </section>

        {/* WHY US */}
        <section className="on-navy" style={s.whyWrap}>
          <div style={s.inner}>
            <div className="eyebrow" style={{ color: 'var(--red-400)', marginBottom: 12 }}>Why Proper Rubbish</div>
            <h2 style={s.whyH2}>The {city.name} crew that actually shows up.</h2>
            <div style={s.whyGrid}>
              {WHY.map(w => (
                <div key={w.title} style={s.whyCard}>
                  <span style={{ color: 'var(--red-400)', marginBottom: 12, display: 'block' }}>
                    <Icon name={w.icon} size={22} stroke={1.75} />
                  </span>
                  <h3 style={s.whyTitle}>{w.title}</h3>
                  <p style={s.whyDesc}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCAL FAQ */}
        <section style={s.faqWrap}>
          <div style={{ ...s.inner, maxWidth: 760 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>FAQ</div>
            <h2 style={s.h2}>Questions about junk removal in {city.name}</h2>
            <div style={s.faqList}>
              {city.faqs.map(faq => (
                <div key={faq.q} style={s.faqItem}>
                  <h3 style={s.faqQ}>{faq.q}</h3>
                  <p style={s.faqA}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={s.ctaWrap}>
          <div style={s.ctaInner}>
            <h2 style={s.ctaH}>Ready to clear it out in {city.name}?</h2>
            <p style={s.ctaSub}>Call or text for a same-day quote. We&rsquo;ll get you on the schedule.</p>
            <div style={s.ctaBtns}>
              <button style={s.ctaBtn} onClick={onQuote}>Get a free quote</button>
              <a href="tel:+12085302729" style={s.ctaCall}><Icon name="phone" size={18} /> (208) 530-2729</a>
            </div>
          </div>
        </section>
      </main>
      <Footer onQuote={onQuote} />
    </>
  );
}

const SERVICES = [
  { icon: 'home',         title: 'Property Cleanouts',    desc: 'Full house cleared top to bottom. We haul it; you list it.' },
  { icon: 'warehouse',    title: 'Garage Purges',          desc: "Years of 'I'll deal with it later' — gone in an afternoon." },
  { icon: 'sofa',         title: 'Furniture Removal',      desc: 'Couches, mattresses, the dresser nobody wants to move.' },
  { icon: 'refrigerator', title: 'Appliance Haul-Away',    desc: 'Fridges, washers, water heaters — disconnected and gone.' },
  { icon: 'key-round',    title: 'Estate Cleanouts',       desc: 'Handled with care and discretion, on your timeline.' },
  { icon: 'hammer',       title: 'Construction Debris',    desc: 'Post-reno rubble cleared so the space is ready to show.' },
];

const LOADS = [
  { label: 'Minimum',      desc: 'Up to 2 cu yd',  price: '$165' },
  { label: '¼ Truckload',  desc: '~4 cu yd',       price: '$225–$275' },
  { label: '½ Truckload',  desc: '~8 cu yd',       price: '$400–$450' },
  { label: '¾ Truckload',  desc: '~11 cu yd',      price: '$600–$700' },
  { label: 'Full Truck',   desc: '15 cu yd',       price: '$1,100' },
];

const WHY = [
  { icon: 'clock',        title: 'Same-week scheduling',  desc: 'Most jobs booked within 24–48 hours of your call.' },
  { icon: 'tag',          title: 'Flat-rate pricing',      desc: 'You get the number before we lift a single item. No surprises.' },
  { icon: 'sparkles',     title: 'We sweep up after',      desc: 'The space looks better after we leave than before we arrived.' },
  { icon: 'phone',        title: 'Real person answers',    desc: 'Call or text (208) 530-2729. No bots, no forms, no runaround.' },
];

const s = {
  heroWrap: { background: 'var(--paper-100)', borderBottom: '2px solid var(--paper-300)', padding: 'clamp(48px,7vw,96px) var(--gutter)' },
  heroInner: { maxWidth: 760, margin: '0 auto' },
  h1: { fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,64px)', lineHeight: 1.02, color: 'var(--ink-900)', margin: '0 0 24px', letterSpacing: '-0.01em' },
  lede: { fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px,1.6vw,20px)', lineHeight: 1.65, color: 'var(--ink-700)', margin: '0 0 36px', maxWidth: '56ch' },
  actions: { display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 28 },
  primary: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 17, textTransform: 'uppercase', letterSpacing: '.04em', background: 'var(--red-500)', color: 'var(--cream)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '15px 34px', cursor: 'pointer', boxShadow: '0 3px 0 var(--red-700)', transition: 'background .2s', whiteSpace: 'nowrap' },
  callBtn: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 16, color: 'var(--navy-500)', textDecoration: 'none' },
  trust: { display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' },
  trustItem: { display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: 'var(--ink-700)' },
  dot: { width: 4, height: 4, borderRadius: '50%', background: 'var(--paper-300)' },
  inner: { maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--space-9) var(--gutter)' },
  h2: { fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.6vw,46px)', lineHeight: 1.05, color: 'var(--ink-900)', margin: '0 0 16px' },
  servicesWrap: { background: 'var(--paper-200)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 40 },
  card: { background: 'var(--surface)', border: '1px solid var(--paper-300)', borderRadius: 'var(--radius-lg)', padding: '26px 24px', boxShadow: 'var(--shadow-card)' },
  cardTitle: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 18, textTransform: 'uppercase', letterSpacing: '.01em', color: 'var(--ink-900)', margin: '0 0 8px' },
  cardDesc: { fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--ink-700)', margin: 0 },
  pricingWrap: { background: 'var(--paper-50)' },
  pricingIntro: { fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-700)', maxWidth: '58ch', margin: '0 0 32px' },
  priceGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 },
  priceCard: { background: 'var(--surface)', border: '1px solid var(--paper-300)', borderRadius: 'var(--radius-md)', padding: '18px 14px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' },
  priceLabel: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--ink-900)', marginBottom: 4 },
  priceVol: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-700)', marginBottom: 10 },
  priceAmt: { fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--red-500)' },
  priceNote: { fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--ink-700)', margin: 0, maxWidth: '72ch' },
  whyWrap: { background: 'var(--navy-500)' },
  whyH2: { fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3.2vw,42px)', lineHeight: 1.05, color: 'var(--cream)', margin: '0 0 40px' },
  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 },
  whyCard: {},
  whyTitle: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '.02em', color: 'var(--cream)', margin: '0 0 8px' },
  whyDesc: { fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.55, color: '#C3C9DF', margin: 0 },
  faqWrap: { background: 'var(--paper-100)' },
  faqList: { marginTop: 36, display: 'flex', flexDirection: 'column', gap: 28 },
  faqItem: { borderTop: '1px solid var(--paper-300)', paddingTop: 24 },
  faqQ: { fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 18, textTransform: 'uppercase', letterSpacing: '.01em', color: 'var(--ink-900)', margin: '0 0 10px' },
  faqA: { fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.65, color: 'var(--ink-700)', margin: 0 },
  ctaWrap: { background: 'var(--red-500)' },
  ctaInner: { maxWidth: 'var(--container)', margin: '0 auto', padding: '60px var(--gutter)', textAlign: 'center' },
  ctaH: { fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.8vw,48px)', lineHeight: 1.02, color: 'var(--cream)', margin: '0 0 12px' },
  ctaSub: { fontFamily: 'var(--font-sans)', fontSize: 17, color: 'rgba(251,245,233,0.85)', margin: '0 0 28px' },
  ctaBtns: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' },
  ctaBtn: { background: 'var(--cream)', color: 'var(--red-600)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '15px 34px', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '.04em', cursor: 'pointer', boxShadow: '0 3px 0 rgba(111,30,21,0.4)' },
  ctaCall: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 18, color: 'var(--cream)', textDecoration: 'none' },
};
