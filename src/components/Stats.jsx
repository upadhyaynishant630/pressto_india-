import { useEffect, useRef, useState } from 'react';
import { STATS, TRUST_AVATARS } from '../data/content.js';
import SmartImg from './SmartImg.jsx';

function CountUp({ to, suffix }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf;
    const run = () => {
      const start = performance.now();
      const dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === 'undefined') {
      setVal(to);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <>
      <h1 className="page-title">Dry Cleaning &amp; Laundry Services in India</h1>
      <section className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <h4><CountUp to={s.value} suffix={s.suffix} /></h4>
            <span>{s.label}</span>
          </div>
        ))}
        <div className="stat trust">
          <div className="avatar-group">
            {TRUST_AVATARS.map((a, idx) => (
              <SmartImg key={a} src={a} alt={`user-${idx}`} className="avatar" label={String.fromCharCode(65 + idx)} />
            ))}
            <div className="more-count">+32</div>
          </div>
          <p>Discover stories of trust</p>
        </div>
      </section>
    </>
  );
}
