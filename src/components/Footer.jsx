import { useState } from 'react';
import { Social } from './Icons.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Footer({ onToast }) {
  const [form, setForm] = useState({ fullName: '', email: '' });
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.fullName.trim().length < 2) err.fullName = 'Please enter your full name';
    if (!EMAIL_RE.test(form.email.trim())) err.email = 'Please enter a valid email';
    setErrors(err);
    if (Object.keys(err).length) return;

    try {
      const list = JSON.parse(localStorage.getItem('pressto_subscribers') || '[]');
      list.push({ ...form, at: new Date().toISOString() });
      localStorage.setItem('pressto_subscribers', JSON.stringify(list));
    } catch {
      /* storage may be unavailable; the UI should still confirm */
    }
    setForm({ fullName: '', email: '' });
    onToast('Thank you! We will keep you posted.');
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div className="f-col social">
          <img className="logo" src="/images/icons/logobw.png" alt="pressto" width="170" height="37" />
          <p className="label">FOLLOW US</p>
          <div className="social-icons">
            {['facebook', 'instagram', 'twitter', 'youtube'].map((s) => (
              <a key={s} href="#home" aria-label={s}><Social name={s} /></a>
            ))}
          </div>
          <p className="copyright">&copy; {new Date().getFullYear()} presstoindia.com ALL RIGHTS RESERVED.</p>
        </div>

        <div className="f-col links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#blog">Case Studies &amp; Blogs</a>
          <a href="#about">About us</a>
          <a href="#contact">Contact Us</a>
          <a href="#home">Privacy Policy</a>
        </div>

        <div className="f-col form">
          <h2>Contact Us</h2>
          <p>Subscribe and be the first one to know our new updates</p>
          <form onSubmit={submit} noValidate>
            <label className="sr-only" htmlFor="f-name">Full name</label>
            <input
              id="f-name"
              type="text"
              placeholder="Your Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && <span className="err">{errors.fullName}</span>}
            <label className="sr-only" htmlFor="f-email">Email</label>
            <input
              id="f-email"
              type="email"
              placeholder="Your Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className="err">{errors.email}</span>}
            <button type="submit">CONNECT NOW</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
