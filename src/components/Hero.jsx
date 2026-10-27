import { useEffect, useState } from 'react';
import { HERO_SLIDES } from '../data/content.js';
import SmartImg from './SmartImg.jsx';
import { Chevron, ArrowRight } from './Icons.jsx';

export default function Hero({ onPickup }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = HERO_SLIDES.length;

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => clearInterval(id);
  }, [paused, n]);

  return (
    <section id="home" className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-slides">
        {HERO_SLIDES.map((s, idx) => (
          <div key={idx} className={`hero-slide ${idx === i ? 'active' : ''}`} aria-hidden={idx !== i}>
            <SmartImg src={s.src} alt={s.alt} label="Free Pickup & Drop" className="hero-img" loading={idx === 0 ? 'eager' : 'lazy'} />
            <div className="overlay" />
          </div>
        ))}
      </div>

      <button type="button" className="hero-arrow prev" aria-label="Previous slide" onClick={() => setI((x) => (x - 1 + n) % n)}>
        <Chevron dir="left" size={26} />
      </button>
      <button type="button" className="hero-arrow next" aria-label="Next slide" onClick={() => setI((x) => (x + 1) % n)}>
        <Chevron dir="right" size={26} />
      </button>

      <div className="hero-copy">
        <button type="button" className="btn btn-light" onClick={onPickup}>
          Schedule Pickup <ArrowRight />
        </button>
      </div>

      <ul className="hero-dots">
        {HERO_SLIDES.map((_, idx) => (
          <li key={idx}>
            <button type="button" className={idx === i ? 'active' : ''} aria-label={`Slide ${idx + 1}`} onClick={() => setI(idx)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
