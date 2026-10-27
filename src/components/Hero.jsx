import { useEffect, useRef, useState } from 'react';
import { HERO_SLIDES } from '../data/content.js';
import SmartImg from './SmartImg.jsx';
import { Chevron, ArrowRight } from './Icons.jsx';

const AUTOPLAY_DELAY = 5000;
const SWIPE_THRESHOLD = 45;

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5h3v14H8zM15 5h3v14h-3z" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5.5v13l10-6.5z" fill="currentColor" />
    </svg>
  );
}

export default function Hero({ onPickup }) {
  const slides = Array.isArray(HERO_SLIDES)
    ? HERO_SLIDES.filter((slide) => slide && typeof slide.src === 'string' && slide.src.trim())
    : [];
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const autoPlaying =
    count > 1 &&
    isPlaying &&
    !isHovered &&
    !isFocused &&
    isInView &&
    isDocumentVisible &&
    !prefersReducedMotion;

  useEffect(() => {
    if (!autoPlaying) return undefined;

    // The timer resets after a manual slide change, giving each slide a full interval.
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [autoPlaying, count, index]);

  const goTo = (nextIndex) => {
    if (count < 1) return;
    setIndex(((nextIndex % count) + count) % count);
  };

  const goPrevious = () => {
    setIndex((current) => (current - 1 + count) % count);
  };

  const goNext = () => {
    setIndex((current) => (current + 1) % count);
  };

  const handleKeyDown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    } else if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goTo(count - 1);
    }
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse') return;
    touchStartX.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (touchStartX.current === null || event.pointerType === 'mouse') return;

    const distance = event.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;

    if (distance > 0) goPrevious();
    else goNext();
  };

  const handlePointerCancel = () => {
    touchStartX.current = null;
  };

  if (count === 0) {
    return (
      <section id="home" className="hero hero--premium hero--empty" aria-label="Pressto homepage banner">
        <div className="hero-empty-copy">
          <p>Premium garment care, made convenient.</p>
          <button type="button" className="btn btn-light hero-cta" onClick={onPickup}>
            Schedule Pickup <ArrowRight />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`hero hero--premium${autoPlaying ? ' is-auto-playing' : ''}`}
      role="region"
      aria-label="Pressto promotional banner carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
      }}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <div className="hero-slides" aria-live={autoPlaying ? 'off' : 'polite'}>
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.src}
            className={`hero-slide${slideIndex === index ? ' active' : ''}`}
            aria-hidden={slideIndex !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${count}`}
          >
            <SmartImg
              src={slide.src}
              alt={slide.alt || 'Pressto premium garment care service'}
              label={slide.alt || 'Pressto premium garment care'}
              className="hero-img"
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
              fetchPriority={slideIndex === 0 ? 'high' : 'auto'}
              draggable="false"
            />
            <div className="overlay" aria-hidden="true" />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="hero-arrow prev"
        aria-label="Previous banner"
        onClick={goPrevious}
        disabled={count < 2}
      >
        <Chevron dir="left" size={24} />
      </button>
      <button
        type="button"
        className="hero-arrow next"
        aria-label="Next banner"
        onClick={goNext}
        disabled={count < 2}
      >
        <Chevron dir="right" size={24} />
      </button>

      <div className="hero-copy">
        <button type="button" className="btn btn-light hero-cta" onClick={onPickup}>
          <span>Schedule Pickup</span>
          <ArrowRight />
        </button>
      </div>

      <div className="hero-status" aria-hidden="true">
        <span className="hero-status-label">PRESSTO</span>
        <span className="hero-status-divider" />
        <span className="hero-status-count">
          {String(index + 1).padStart(2, '0')} <span>/</span> {String(count).padStart(2, '0')}
        </span>
      </div>

      <ul className="hero-dots" aria-label="Choose a banner">
        {slides.map((slide, slideIndex) => (
          <li key={slide.src}>
            <button
              type="button"
              className={slideIndex === index ? 'active' : ''}
              aria-label={`Go to banner ${slideIndex + 1} of ${count}`}
              aria-current={slideIndex === index ? 'true' : undefined}
              onClick={() => goTo(slideIndex)}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="hero-play-toggle"
        aria-label={
          prefersReducedMotion
            ? 'Automatic slide rotation disabled by reduced-motion preference'
            : isPlaying
              ? 'Pause automatic slide rotation'
              : 'Resume automatic slide rotation'
        }
        title={prefersReducedMotion ? 'Automatic rotation is off because reduced motion is enabled' : undefined}
        onClick={() => setIsPlaying((playing) => !playing)}
        disabled={prefersReducedMotion || count < 2}
      >
        {isPlaying && !prefersReducedMotion ? <PauseIcon /> : <PlayIcon />}
        <span>{prefersReducedMotion ? 'Motion reduced' : isPlaying ? 'Pause' : 'Play'}</span>
      </button>

      <span className="sr-only" aria-live={autoPlaying ? 'off' : 'polite'} aria-atomic="true">
        Banner {index + 1} of {count}: {slides[index]?.alt || 'Pressto premium garment care service'}
      </span>
    </section>
  );
}
