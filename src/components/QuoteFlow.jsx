import { useState } from 'react';
import Icon from './Icon';

const SERVICES = [
  { id: 'junk', icon: 'truck',   label: 'Junk Removal',  sub: 'One-time haul',      meta: 'Volume-based pricing' },
  { id: 'bin',  icon: 'trash-2', label: 'Bin Cleaning',  sub: 'Sanitize your bins', meta: 'Monthly or one-time'  },
];

const LOADS = [
  { id: 'min', label: 'Minimum Pickup', sub: 'Up to 1 sofa · ~2 cu yd',  lo: 165,  hi: null  },
  { id: 'q',   label: '¼ Truckload',   sub: '~4 cubic yards',            lo: 225,  hi: 275   },
  { id: 'h',   label: '½ Truckload',   sub: '~8 cubic yards',            lo: 400,  hi: 450   },
  { id: 'tq',  label: '¾ Truckload',   sub: '~11 cubic yards',           lo: 600,  hi: 700   },
  { id: 'f',   label: 'Full Truck',    sub: '15 cubic yards',            lo: 1100, hi: 1100  },
];

const PLANS = [
  { id: 'once', label: 'One-Time Deep Clean', sub: 'No commitment',       price: 65, unit: ''      },
  { id: 'q',    label: 'Quarterly',           sub: 'Billed every 3 mo',   price: 35, unit: '/visit', badge: '' },
  { id: 'mo',   label: 'Monthly',             sub: 'Best for families',   price: 25, unit: '/mo',   badge: 'Most popular' },
];

const PHONE = '+12085302729';
const PHONE_DISPLAY = '(208) 530-2729';

function priceDisplay(load) {
  return load.hi ? `$${load.lo} – $${load.hi}` : `$${load.lo}`;
}

function buildSms(service, sel) {
  const body = service === 'junk'
    ? `Hi! I'd like to book a junk pickup — roughly a ${sel.label} (${sel.sub}). Your site quoted me ${priceDisplay(sel)}. When are you available?`
    : `Hi! I'm interested in your ${sel.label} bin cleaning ($${sel.price}${sel.unit}). Can you add me to the route?`;
  return `sms:${PHONE}?body=${encodeURIComponent(body)}`;
}

export default function QuoteFlow({ open, onClose, initialService }) {
  if (!open) return null;
  return <QuoteModal key={initialService || 'start'} onClose={onClose} initialService={initialService} />;
}

function QuoteModal({ onClose, initialService }) {
  const initial = initialService === 'bin' || initialService === 'junk' ? initialService : null;
  const [service, setService] = useState(initial);
  const [step, setStep]       = useState(initial ? 1 : 0);
  const [sel, setSel]         = useState(null);

  const back = (toStep, clearSel) => () => {
    if (clearSel) setSel(null);
    if (toStep === 0) setService(null);
    setStep(toStep);
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={s.head}>
          <span style={s.brand}>Proper Rubbish</span>
          <button style={s.close} onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
        </div>

        {/* Step 0 — service picker */}
        {step === 0 && (
          <div style={s.body}>
            <h3 style={s.h3}>What can we help with?</h3>
            <div style={s.serviceGrid}>
              {SERVICES.map(sv => (
                <button key={sv.id} style={s.serviceBtn}
                  onClick={() => { setService(sv.id); setStep(1); }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red-500)'; e.currentTarget.style.background = '#FCEFE6'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--paper-300)'; e.currentTarget.style.background = 'var(--surface)'; }}>
                  <span style={s.serviceIcon}><Icon name={sv.icon} size={32} stroke={1.6} /></span>
                  <span style={s.serviceLabel}>{sv.label}</span>
                  <span style={s.serviceSub}>{sv.sub}</span>
                  <span style={s.serviceMeta}>{sv.meta}</span>
                </button>
              ))}
            </div>
            <p style={s.orCall}>Or just call/text: <a href={`tel:${PHONE}`} style={s.phoneLink}>{PHONE_DISPLAY}</a></p>
          </div>
        )}

        {/* Junk — Step 1: pick load size */}
        {service === 'junk' && step === 1 && (
          <div style={s.body}>
            <h3 style={s.h3}>How much do you have?</h3>
            <p style={s.intro}>Priced by the space your stuff takes up in our trailer — like a standard 10ft U-Haul.</p>
            <div style={s.loadList}>
              {LOADS.map(l => (
                <button key={l.id} style={s.loadCard}
                  onClick={() => { setSel(l); setStep(2); }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red-500)'; e.currentTarget.style.background = '#FCEFE6'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--paper-300)'; e.currentTarget.style.background = 'var(--surface)'; }}>
                  <div>
                    <span style={s.loadLabel}>{l.label}</span>
                    <span style={s.loadSub}>{l.sub}</span>
                  </div>
                  <span style={s.loadPrice}>{priceDisplay(l)}</span>
                </button>
              ))}
            </div>
            <p style={s.note}>Construction or demolition debris (concrete, drywall, tile) adds 20% due to higher landfill fees.</p>
            <button style={s.ghost} onClick={back(0, true)}>← Back</button>
          </div>
        )}

        {/* Junk — Step 2: quote + CTA */}
        {service === 'junk' && step === 2 && sel && (
          <div style={s.body}>
            <div style={s.ticket}>
              <span style={s.ticketLbl}>Your estimate</span>
              <div style={s.ticketPrice}>{priceDisplay(sel)}</div>
              <div style={s.ticketMeta}>{sel.label} · {sel.sub} · flat rate</div>
            </div>
            <div style={s.ctaBlock}>
              <p style={s.ctaNote}>
                Text us — your estimate is pre-filled in the message so we know exactly what you need.
                We typically schedule same or next week.
              </p>
              <a href={buildSms('junk', sel)} style={{ ...s.primary, display: 'block', textAlign: 'center', textDecoration: 'none', marginBottom: 10 }}>
                Text to Book
              </a>
              <a href={`tel:${PHONE}`} style={{ ...s.secondary, display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Call Instead · {PHONE_DISPLAY}
              </a>
            </div>
            <button style={s.ghost} onClick={back(1, true)}>← Change size</button>
          </div>
        )}

        {/* Bin — Step 1: pick plan */}
        {service === 'bin' && step === 1 && (
          <div style={s.body}>
            <h3 style={s.h3}>Choose your plan.</h3>
            <p style={s.intro}>We sanitize both bins (trash + recycle) at your curb after collection day — nothing for you to do.</p>
            <div style={s.planList}>
              {PLANS.map(p => (
                <button key={p.id} style={s.planCard}
                  onClick={() => { setSel(p); setStep(2); }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red-500)'; e.currentTarget.style.background = '#FCEFE6'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--paper-300)'; e.currentTarget.style.background = 'var(--surface)'; }}>
                  <div>
                    <div style={s.planLabelRow}>
                      <span style={s.planLabel}>{p.label}</span>
                      {p.badge && <span style={s.badge}>{p.badge}</span>}
                    </div>
                    <span style={s.planSub}>{p.sub}</span>
                  </div>
                  <span style={s.planPrice}>${p.price}<span style={s.planUnit}>{p.unit}</span></span>
                </button>
              ))}
            </div>
            <button style={s.ghost} onClick={back(0, true)}>← Back</button>
          </div>
        )}

        {/* Bin — Step 2: quote + CTA */}
        {service === 'bin' && step === 2 && sel && (
          <div style={s.body}>
            <div style={s.ticket}>
              <span style={s.ticketLbl}>Your plan</span>
              <div style={s.ticketPrice}>${sel.price}<span style={s.ticketUnit}>{sel.unit}</span></div>
              <div style={s.ticketMeta}>{sel.label} · both bins · Treasure Valley</div>
            </div>
            <div style={s.ctaBlock}>
              <p style={s.ctaNote}>
                Text us your address to get on the route. Your plan details are pre-filled in the message.
              </p>
              <a href={buildSms('bin', sel)} style={{ ...s.primary, display: 'block', textAlign: 'center', textDecoration: 'none', marginBottom: 10 }}>
                Text to Book
              </a>
              <a href={`tel:${PHONE}`} style={{ ...s.secondary, display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Call Instead · {PHONE_DISPLAY}
              </a>
            </div>
            <button style={s.ghost} onClick={back(1, true)}>← Change plan</button>
          </div>
        )}

      </div>
    </div>
  );
}

const s = {
  overlay:      { position: 'fixed', inset: 0, background: 'rgba(43,38,32,.55)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 },
  modal:        { width: 540, maxWidth: '100%', background: 'var(--paper-50)', border: '2px solid var(--paper-300)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' },
  head:         { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', borderBottom: '1px solid var(--paper-300)', background: 'var(--paper-100)' },
  brand:        { fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--ink-700)' },
  close:        { background: 'transparent', border: 'none', color: 'var(--ink-700)', cursor: 'pointer', display: 'inline-flex', padding: 4 },
  body:         { padding: '26px 28px 28px' },
  h3:           { fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--ink-900)', margin: '0 0 8px' },
  intro:        { fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.55, color: 'var(--ink-700)', margin: '0 0 18px' },
  orCall:       { fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-700)', margin: '18px 0 0', textAlign: 'center' },
  phoneLink:    { color: 'var(--red-500)', fontWeight: 600, textDecoration: 'none' },

  /* Service picker */
  serviceGrid:  { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 4 },
  serviceBtn:   { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '22px 20px', background: 'var(--surface)', border: '1.5px solid var(--paper-300)', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', transition: 'border-color .15s, background .15s' },
  serviceIcon:  { color: 'var(--navy-500)', marginBottom: 10, display: 'block' },
  serviceLabel: { display: 'block', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.01em', color: 'var(--ink-900)', lineHeight: 1.2 },
  serviceSub:   { display: 'block', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-700)', marginTop: 5 },
  serviceMeta:  { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red-600)', letterSpacing: '.03em', marginTop: 8 },

  /* Load cards */
  loadList:     { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 },
  loadCard:     { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--surface)', border: '1.5px solid var(--paper-300)', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', transition: 'border-color .15s, background .15s', width: '100%' },
  loadLabel:    { display: 'block', fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.01em', color: 'var(--ink-900)' },
  loadSub:      { display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-700)', marginTop: 3 },
  loadPrice:    { fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--red-500)', whiteSpace: 'nowrap', marginLeft: 12 },
  note:         { fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-600)', lineHeight: 1.5, margin: '0 0 20px', padding: '10px 14px', background: 'var(--paper-200)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--paper-400)' },

  /* Plan cards */
  planList:     { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 },
  planCard:     { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px', background: 'var(--surface)', border: '1.5px solid var(--paper-300)', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', transition: 'border-color .15s, background .15s', width: '100%' },
  planLabelRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 },
  planLabel:    { fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.01em', color: 'var(--ink-900)' },
  planSub:      { display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-700)' },
  planPrice:    { fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--red-500)', whiteSpace: 'nowrap', marginLeft: 12 },
  planUnit:     { fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 500, color: 'var(--ink-700)' },
  badge:        { display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--cream)', background: 'var(--red-500)', borderRadius: 'var(--radius-pill)', padding: '2px 8px' },

  /* Quote ticket */
  ticket:       { background: 'var(--paper-200)', border: '1px dashed var(--gray-400)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: 20 },
  ticketLbl:    { fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-600)' },
  ticketPrice:  { fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--ink-900)', margin: '4px 0 2px', lineHeight: 1 },
  ticketUnit:   { fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 500, color: 'var(--ink-700)' },
  ticketMeta:   { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)', marginTop: 6 },

  /* CTAs */
  ctaBlock:     { marginBottom: 20 },
  ctaNote:      { fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.55, color: 'var(--ink-700)', margin: '0 0 16px' },
  primary:      { background: 'var(--red-500)', color: 'var(--cream)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '14px 28px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, textTransform: 'uppercase', letterSpacing: '.05em', cursor: 'pointer', boxShadow: '0 3px 0 var(--red-700)' },
  secondary:    { background: 'transparent', color: 'var(--ink-800)', border: '1.5px solid var(--gray-400)', borderRadius: 'var(--radius-sm)', padding: '13px 28px', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: '.04em', cursor: 'pointer' },
  ghost:        { background: 'transparent', border: 'none', color: 'var(--ink-600)', fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em', cursor: 'pointer', padding: 0, marginTop: 4 },
  actions:      { display: 'flex', justifyContent: 'flex-start', marginTop: 8 },
};
