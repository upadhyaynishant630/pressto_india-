import { useCallback, useEffect, useRef, useState } from 'react';
import { Chevron } from './Icons.jsx';

function useVisibleCount(perView) {
  const calc = () => {
    if (typeof window === 'undefined') return perView.lg;
    const w = window.innerWidth;
    if (w < 640) return perView.sm;
    if (w < 1024) return perView.md;
    return perView.lg;
  };
  const [count, setCount] = useState(calc);
  useEffect(() => {
    const onResize = () => setCount(calc());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return count;
}

/**
 * Generic horizontal carousel with arrows, dots and autoplay.
 * Pauses on hover. Loops back to the start after the last position.
 */
export default function Carousel({
  items,
  renderItem,
  perView = { sm: 1, md: 2, lg: 4 },
  autoplay = 3500,
  className = '',
}) {
  const visible = useVisibleCount(perView);
  const maxIndex = Math.max(0, items.length - visible);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);

  const safeIndex = Math.min(index, maxIndex);

  const next = useCallback(() => setIndex((i) => (Math.min(i, maxIndex) >= maxIndex ? 0 : Math.min(i, maxIndex) + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex((i) => (Math.min(i, maxIndex) <= 0 ? maxIndex : Math.min(i, maxIndex) - 1)), [maxIndex]);

  useEffect(() => {
    if (!autoplay || paused || maxIndex === 0) return undefined;
    const id = setInterval(next, autoplay);
    return () => clearInterval(id);
  }, [autoplay, paused, next, maxIndex]);

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStart.current = null;
  };

  const dots = maxIndex + 1;

  return (
    <div
      className={`carousel ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {maxIndex > 0 && (
        <button type="button" className="carousel-arrow prev" aria-label="Previous" onClick={prev}>
          <Chevron dir="left" />
        </button>
      )}
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${(safeIndex * 100) / visible}%)` }}
        >
          {items.map((item, i) => (
            <div className="carousel-slide" style={{ flex: `0 0 ${100 / visible}%` }} key={i}>
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>
      {maxIndex > 0 && (
        <button type="button" className="carousel-arrow next" aria-label="Next" onClick={next}>
          <Chevron dir="right" />
        </button>
      )}
      {maxIndex > 0 && (
        <ul className="carousel-dots">
          {Array.from({ length: dots }).map((_, i) => (
            <li key={i}>
              <button
                type="button"
                className={i === safeIndex ? 'active' : ''}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
