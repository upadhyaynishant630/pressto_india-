import { useMemo, useRef, useState } from 'react';
import reviews from '../data/reviews.json';
import { VIDEOS } from '../data/content.js';
import { Chevron, PlayIcon, PauseIcon, MuteIcon } from './Icons.jsx';

function Stars({ n }) {
  return (
    <div className="stars" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((k) => (
        <span key={k} className={k <= n ? 'on' : ''}>{k <= n ? '★' : '☆'}</span>
      ))}
    </div>
  );
}

function Review({ r }) {
  const initial = r.name.trim().charAt(0).toUpperCase();
  return (
    <div className="review">
      <div className="review-top">
        <a className="left" href={r.link} target="_blank" rel="noopener noreferrer">
          <span className="review-avatar" aria-label={`${r.name} profile initials`}>
            {initial}
          </span>
          <div>
            <div className="name">{r.name}</div>
            <Stars n={r.stars} />
          </div>
        </a>
        <div className="date">{r.date}</div>
      </div>
      {r.comment ? <p className="review-comment">{r.comment}</p> : null}
    </div>
  );
}

function VideoCard({ v, active, onPlay }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [broken, setBroken] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el || broken) return;
    if (el.paused) {
      onPlay?.(el);
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={`video-card ${active ? 'active' : ''}`}>
      {broken ? (
        <div className="img-fallback"><span>{v.name}</span></div>
      ) : (
        <video
          ref={ref}
          src={v.src}
          playsInline
          loop
          muted={muted}
          preload="metadata"
          onError={() => setBroken(true)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
      )}
      <button type="button" className="play-btn" onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'} disabled={broken}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button type="button" className="mute-btn" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute' : 'Mute'} disabled={broken}>
        <MuteIcon muted={muted} />
      </button>
      <div className="caption">
        <strong>{v.name}</strong>
        <span>{v.role}</span>
      </div>
    </div>
  );
}

export default function Stories() {
  const [idx, setIdx] = useState(0);
  const current = useRef(null);
  const n = VIDEOS.length;

  const stopCurrent = () => {
    if (current.current && !current.current.paused) current.current.pause();
  };
  const go = (d) => {
    stopCurrent();
    setIdx((i) => (i + d + n) % n);
  };
  const onPlay = (el) => {
    if (current.current && current.current !== el) current.current.pause();
    current.current = el;
  };

  const avg = useMemo(() => (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1), []);

  return (
    <section className="section" id="stories">
      <h2 className="heading">Real Stories, Real Trust</h2>
      <div className="stories">
        <div className="google-reviews">
          <div className="review-header">
            <span className="google-logo">Google</span>
            <span className="title">Reviews</span>
            <span className="avg">{avg} ★</span>
          </div>
          <div className="reviews">
            {reviews.map((r) => (
              <Review key={`${r.name}-${r.date}`} r={r} />
            ))}
          </div>
        </div>

        <div className="video-slider">
          <div className="video-stage">
            {VIDEOS.map((v, i) => (
              <div key={v.name} className={`video-slide ${i === idx ? 'show' : ''}`}>
                <VideoCard v={v} active={i === idx} onPlay={onPlay} />
              </div>
            ))}
          </div>
          <div className="video-nav">
            <button type="button" onClick={() => go(-1)} aria-label="Previous video"><Chevron dir="left" /></button>
            <span>{idx + 1} / {n}</span>
            <button type="button" onClick={() => go(1)} aria-label="Next video"><Chevron dir="right" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
