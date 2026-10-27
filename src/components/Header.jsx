import { useEffect, useState } from 'react';
import { NAV } from '../data/content.js';
import { Chevron, ArrowRight, WhatsApp } from './Icons.jsx';

export default function Header({ onPickup }) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setSub(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <a href="#home" className="logo" onClick={close} aria-label="Pressto home">
          <img src="/images/icons/logobw.png" alt="pressto" width="170" height="37" />
        </a>

        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Main navigation">
          <ul>
            {NAV.map((item) =>
              item.children ? (
                <li key={item.label} className={`has-sub ${sub ? 'sub-open' : ''}`}>
                  <button type="button" className="nav-link" onClick={() => setSub((s) => !s)} aria-expanded={sub}>
                    {item.label} <Chevron dir="down" size={14} />
                  </button>
                  <ul className="sub">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <a href={c.href} onClick={close}>{c.label}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.label}>
                  <a className="nav-link" href={item.href} onClick={close}>{item.label}</a>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="header-actions">
          <a
            className="wa"
            href="https://wa.me/?text=Hi%20Pressto%2C%20I%20would%20like%20to%20schedule%20a%20pickup."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <WhatsApp />
          </a>
          <button type="button" className="btn btn-light" onClick={onPickup}>
            Schedule Pickup <ArrowRight />
          </button>
          <button
            type="button"
            className={`burger ${open ? 'open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
