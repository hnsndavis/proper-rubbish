import { useState, useEffect } from 'react';
import Icon from './Icon';

const SERVICES_CHOICE = [
  { id: 'junk', icon: 'truck', label: 'Junk Removal', sub: 'One-time haul', meta: 'Flat price, same week' },
  { id: 'bin', icon: 'trash-2', label: 'Bin Cleaning', sub: 'Monthly route', meta: '$25/mo · both bins' },
];
const JOBS = [
  { id: 'single',    icon: 'package',      label: 'Single item',        base: 89  },
  { id: 'furniture', icon: 'sofa',         label: 'Furniture',          base: 149 },
  { id: 'garage',    icon: 'warehouse',    label: 'Garage purge',       base: 289 },
  { id: 'appliance', icon: 'refrigerator', label: 'Appliance',          base: 119 },
  { id: 'estate',    icon: 'key-round',    label: 'Estate cleanout',    base: 690 },
  { id: 'debris',    icon: 'hammer',       label: 'Construction debris',base: 349 },
];
const LOADS = [
  { id: 'min',     label: 'Single item', mult: 0.6 },
  { id: 'quarter', label: '¼ truck',     mult: 1   },
  { id: 'half',    label: '½ truck',     mult: 1.7 },
  { id: 'full',    label: 'Full truck',  mult: 2.8 },
];

export default function QuoteFlow({ open, onClose, initialService }) {
  const [service, setService] = useState(null);
  const [step, setStep] = useState(0);
  const [job, setJob] = useState(null);
  const [load, setLoad] = useState(LOADS[1]);
  const [zip, setZip] = useState('');
  const [name, setName] = useState('');
  const [addr, setAddr] = useState('');

  useEffect(() => {
    if (open) {
      const s = initialService === 'bin' || initialService === 'junk' ? initialService : null;
      setService(s);
      setStep(s ? 1 : 0);
      setJob(null); setLoad(LOADS[1]); setZip(''); setName(''); setAddr('');
    }
  }, [open, initialService]);

  if (!open) return null;

  const price = job ? Math.round((job.base * load.mult) / 5) * 5 : 0;
  const ticketNo = 'PJC-' + (2000 + (job ? job.label.length * 37 : 0) + load.mult * 10).toString().slice(0, 4);
  const routeNo = 'RT-' + (700 + (zip ? Number(zip.slice(-2)) || 7 : 7)).toString();
  const stepLabels = service === 'bin' ? ['Need', 'Your info', 'On the route'] : ['Need', 'Job', 'Details', 'Quote'];
  const pickService = (id) => { setService(id); setStep(1); };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div className="pjc" style={s.modal} onClick={e => e.stopPropagation()}>
        <div style={s.head}>
          <div style={s.steps}>
            {stepLabels.map((l, i) => (
              <span key={l} style={{ ...s.stepDot, ...(i <= step ? s.stepDotOn : {}) }}>{l}</span>
            ))}
          </div>
          <button style={s.close} onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
        </div>

        {step === 0 && (
          <div style={s.body}>
            <h3 style={s.h3}>What do you need?</h3>
            <div style={s.serviceGrid}>
              {SERVICES_CHOICE.map((sv) => (
                <button key={sv.id} style={s.serviceBtn}
                  onClick={() => pickService(sv.id)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red-500)'; e.currentTarget.style.background = '#FCEFE6'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--paper-300)'; e.currentTarget.style.background = 'var(--surface)'; }}>
                  <span style={s.serviceIcon}><Icon name={sv.icon} size={32} stroke={1.6} /></span>
                  <span style={s.serviceLabel}>{sv.label}</span>
                  <span style={s.serviceSub}>{sv.sub}</span>
                  <span style={s.serviceMeta}>{sv.meta}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {service === 'junk' && step === 1 && (
          <div style={s.body}>
            <h3 style={s.h3}>What needs to go?</h3>
            <div style={s.jobGrid}>
              {JOBS.map((j) => (
                <button key={j.id} style={{ ...s.jobBtn, ...(job?.id === j.id ? s.jobBtnOn : {}) }}
                  onClick={() => { setJob(j); setStep(2); }}>
                  <span style={{ color: 'var(--navy-500)' }}><Icon name={j.icon} size={26} stroke={1.75} /></span>
                  <span>{j.label}</span>
                </button>
              ))}
            </div>
            <div style={s.actions}>
              <button style={s.ghost} onClick={() => setStep(0)}>← Back</button>
              <span />
            </div>
          </div>
        )}

        {service === 'junk' && step === 2 && (
          <div style={s.body}>
            <h3 style={s.h3}>Roughly how much?</h3>
            <div style={s.loadRow}>
              {LOADS.map((l) => (
                <button key={l.id} style={{ ...s.loadBtn, ...(load.id === l.id ? s.loadBtnOn : {}) }}
                  onClick={() => setLoad(l)}>{l.label}</button>
              ))}
            </div>
            <div style={s.fields}>
              <div style={{ flex: 1 }}>
                <label style={s.label}>Name</label>
                <input style={s.input} value={name} onChange={e => setName(e.target.value)} placeholder="Jane Realtor" />
              </div>
              <div style={{ width: 130 }}>
                <label style={s.label}>Zip</label>
                <input style={s.input} value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))} placeholder="83702" />
              </div>
            </div>
            <div style={s.estimate}>
              <span style={s.estLabel}>Estimate</span>
              <span style={s.estVal}>${price}</span>
            </div>
            <div style={s.actions}>
              <button style={s.ghost} onClick={() => setStep(1)}>← Back</button>
              <button style={s.primary} onClick={() => setStep(3)}>See my quote →</button>
            </div>
          </div>
        )}

        {service === 'junk' && step === 3 && (
          <div style={s.body}>
            <div style={s.ticket}>
              <div style={s.ticketTop}>
                <span style={s.ticketLbl}>Haul ticket · {ticketNo}</span>
                <span style={s.ticketStamp}><Icon name="check-circle" size={14} /> Confirmed</span>
              </div>
              <div style={s.ticketPrice}>${price}</div>
              <div style={s.ticketMeta}>{job?.label} · {load.label} · flat rate</div>
              <div style={s.ticketRow}>{name || 'Customer'} · {zip || 'Boise, ID'}</div>
            </div>
            <p style={s.confirmNote}>
              We&rsquo;ll reach out to confirm your day &mdash; usually same or next week.
              Questions? Call <a href="tel:+12085302729" style={{ color: 'var(--red-500)' }}>(208) 530-2729</a>.
            </p>
            <div style={s.actions}>
              <button style={s.ghost} onClick={() => setStep(2)}>← Adjust</button>
              <a href="tel:+12085302729" style={{ ...s.primary, textDecoration: 'none', display: 'inline-block' }}>Call to book</a>
            </div>
          </div>
        )}

        {service === 'bin' && step === 1 && (
          <div style={s.body}>
            <h3 style={s.h3}>Add your bins to the route.</h3>
            <p style={s.binIntro}>$25 a month, both bins. We come to you after collection day — nothing to remember.</p>
            <div style={{ ...s.fields, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <label style={s.label}>Name</label>
                <input style={s.input} value={name} onChange={e => setName(e.target.value)} placeholder="Jane Neighbour" />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={s.label}>Address</label>
              <input style={s.input} value={addr} onChange={e => setAddr(e.target.value)} placeholder="412 Maple Ave" />
            </div>
            <div style={{ ...s.fields, marginBottom: 22 }}>
              <div style={{ width: 150 }}>
                <label style={s.label}>Zip</label>
                <input style={s.input} value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))} placeholder="83702" />
              </div>
              <div style={s.binPriceTag}>
                <span style={s.binPriceTagLbl}>Monthly</span>
                <span style={s.binPriceTagVal}>$25<span style={s.binPriceTagUnit}>/mo</span></span>
              </div>
            </div>
            <div style={s.actions}>
              <button style={s.ghost} onClick={() => setStep(0)}>← Back</button>
              <button style={{ ...s.primary, ...(!name || !addr || !zip ? s.primaryOff : {}) }}
                onClick={() => (name && addr && zip) && setStep(2)}>Add me to the route</button>
            </div>
          </div>
        )}

        {service === 'bin' && step === 2 && (
          <div style={s.body}>
            <div style={s.ticket}>
              <div style={s.ticketTop}>
                <span style={s.ticketLbl}>Route card · {routeNo}</span>
                <span style={s.ticketStamp}><Icon name="check-circle" size={14} /> On the route</span>
              </div>
              <div style={s.ticketPrice}>$25<span style={s.ticketPriceUnit}>/mo</span></div>
              <div style={s.ticketMeta}>Both bins · monthly · {zip || '83702'}</div>
              <div style={s.ticketRow}>{name || 'Neighbour'} · {addr || 'your address'}</div>
            </div>
            <p style={s.confirmNote}>
              We&rsquo;ll confirm your first clean by text &mdash; then it&rsquo;s every month, like clockwork.
              Questions? Call <a href="tel:+12085302729" style={{ color: 'var(--red-500)' }}>(208) 530-2729</a>.
            </p>
            <div style={s.actions}>
              <button style={s.ghost} onClick={() => setStep(1)}>← Adjust</button>
              <a href="tel:+12085302729" style={{ ...s.primary, textDecoration: 'none', display: 'inline-block' }}>Call to confirm</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(43,38,32,0.55)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 },
  modal: { width: 560, maxWidth: '100%', background: 'var(--paper-50)', border: '2px solid var(--paper-300)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' },
  head: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', borderBottom: '1px solid var(--paper-300)', background: 'var(--paper-100)' },
  steps: { display: 'flex', gap: 8 },
  stepDot: { fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--gray-400)', padding: '5px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--paper-300)' },
  stepDotOn: { color: 'var(--cream)', background: 'var(--red-500)', borderColor: 'var(--red-500)' },
  close: { background: 'transparent', border: 'none', color: 'var(--ink-700)', cursor: 'pointer', display: 'inline-flex' },
  body: { padding: '26px 30px 30px' },
  h3: { fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--ink-900)', margin: '0 0 22px' },
  serviceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  serviceBtn: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '24px 22px', background: 'var(--surface)', border: '1.5px solid var(--paper-300)', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', transition: 'border-color .15s, background .15s' },
  serviceIcon: { color: 'var(--navy-500)', marginBottom: 12, display: 'block' },
  serviceLabel: { display: 'block', width: '100%', fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.01em', color: 'var(--ink-900)', lineHeight: 1.15 },
  serviceSub: { display: 'block', width: '100%', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-700)', marginTop: 6 },
  serviceMeta: { display: 'block', width: '100%', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red-600)', letterSpacing: '.02em', marginTop: 8 },
  jobGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 22 },
  jobBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11, padding: '22px 10px', background: 'var(--surface)', border: '1.5px solid var(--paper-300)', borderRadius: 'var(--radius-md)', color: 'var(--ink-900)', fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.02em', cursor: 'pointer', transition: 'all .15s' },
  jobBtnOn: { borderColor: 'var(--red-500)', background: '#FCEFE6' },
  loadRow: { display: 'flex', gap: 10, marginBottom: 24 },
  loadBtn: { flex: 1, padding: '13px 8px', background: 'var(--surface)', border: '1.5px solid var(--paper-300)', borderRadius: 'var(--radius-md)', color: 'var(--ink-700)', fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.02em', cursor: 'pointer', transition: 'all .15s' },
  loadBtnOn: { borderColor: 'var(--red-500)', color: 'var(--ink-900)', background: '#FCEFE6' },
  fields: { display: 'flex', gap: 14, marginBottom: 22 },
  label: { display: 'block', fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--ink-700)', marginBottom: 7 },
  input: { width: '100%', boxSizing: 'border-box', background: 'var(--surface)', border: '1.5px solid var(--gray-300)', borderRadius: 'var(--radius-sm)', color: 'var(--ink-900)', fontFamily: 'var(--font-sans)', fontSize: 15, padding: '11px 12px' },
  binIntro: { fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-700)', margin: '0 0 22px' },
  binPriceTag: { marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' },
  binPriceTagLbl: { fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--ink-700)' },
  binPriceTagVal: { fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--red-500)', lineHeight: 1 },
  binPriceTagUnit: { fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 500, color: 'var(--ink-700)' },
  estimate: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px', background: 'var(--paper-200)', border: '1px dashed var(--gray-400)', borderRadius: 'var(--radius-md)', marginBottom: 24 },
  estLabel: { fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, color: 'var(--ink-700)', textTransform: 'uppercase', letterSpacing: '.06em' },
  estVal: { fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--red-500)' },
  actions: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 },
  ghost: { background: 'transparent', border: 'none', color: 'var(--ink-700)', fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.03em', cursor: 'pointer' },
  primary: { background: 'var(--red-500)', color: 'var(--cream)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '13px 28px', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 15, textTransform: 'uppercase', letterSpacing: '.04em', cursor: 'pointer', boxShadow: '0 3px 0 var(--red-700)' },
  primaryOff: { opacity: 0.4, boxShadow: 'none', cursor: 'not-allowed' },
  ticket: { background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '24px 26px', color: 'var(--ink-900)', border: '1px solid var(--paper-300)' },
  ticketTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  ticketLbl: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)', textTransform: 'uppercase', letterSpacing: '.05em' },
  ticketStamp: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--positive)' },
  ticketPrice: { fontFamily: 'var(--font-display)', fontSize: 52, color: 'var(--ink-900)', margin: '8px 0 2px' },
  ticketPriceUnit: { fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 500, color: 'var(--ink-700)', letterSpacing: '.02em' },
  ticketMeta: { fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--ink-700)' },
  ticketRow: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)', borderTop: '1px dashed var(--gray-400)', marginTop: 16, paddingTop: 12, textTransform: 'uppercase', letterSpacing: '.03em' },
  confirmNote: { fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-700)', margin: '22px 0 24px' },
};
