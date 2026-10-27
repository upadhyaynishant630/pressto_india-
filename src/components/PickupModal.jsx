import { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../data/content.js';

const empty = { name: '', phone: '', pincode: '', service: SERVICES[0], date: '' };

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export default function PickupModal({ open, onClose, onToast }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const first = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    setTimeout(() => first.current?.focus(), 30);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 2) err.name = 'Enter your name';
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) err.phone = 'Enter a valid 10-digit mobile number';
    if (!/^\d{6}$/.test(form.pincode.trim())) err.pincode = 'Enter a 6-digit pincode';
    if (!form.date) err.date = 'Choose a pickup date';
    else if (form.date < todayISO()) err.date = 'Date cannot be in the past';
    setErrors(err);
    if (Object.keys(err).length) return;

    try {
      const list = JSON.parse(localStorage.getItem('pressto_pickups') || '[]');
      list.push({ ...form, at: new Date().toISOString() });
      localStorage.setItem('pressto_pickups', JSON.stringify(list));
    } catch {
      /* ignore storage errors */
    }
    setForm(empty);
    setErrors({});
    onClose();
    onToast('Pickup request received! We will call you shortly.');
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="pickup-title">
        <button type="button" className="modal-x" onClick={onClose} aria-label="Close">&times;</button>
        <h3 id="pickup-title">Schedule Pickup</h3>
        <p className="sub">Free pickup &amp; drop at your doorstep.</p>
        <form onSubmit={submit} noValidate>
          <label>
            Full name
            <input ref={first} value={form.name} onChange={set('name')} placeholder="Your full name" />
            {errors.name && <span className="err">{errors.name}</span>}
          </label>
          <label>
            Mobile number
            <input value={form.phone} onChange={set('phone')} inputMode="numeric" maxLength={10} placeholder="10-digit mobile" />
            {errors.phone && <span className="err">{errors.phone}</span>}
          </label>
          <div className="row2">
            <label>
              Pincode
              <input value={form.pincode} onChange={set('pincode')} inputMode="numeric" maxLength={6} placeholder="400001" />
              {errors.pincode && <span className="err">{errors.pincode}</span>}
            </label>
            <label>
              Pickup date
              <input type="date" min={todayISO()} value={form.date} onChange={set('date')} />
              {errors.date && <span className="err">{errors.date}</span>}
            </label>
          </div>
          <label>
            Service
            <select value={form.service} onChange={set('service')}>
              {SERVICES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn btn-dark full">Confirm Pickup</button>
        </form>
      </div>
    </div>
  );
}
