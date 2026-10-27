const base = {
  width: 56,
  height: 56,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function ArrowRight(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Chevron({ dir = 'right', size = 20 }) {
  const d = dir === 'left' ? 'M15 5l-7 7 7 7' : dir === 'up' ? 'M5 15l7-7 7 7' : dir === 'down' ? 'M5 9l7 7 7-7' : 'M9 5l7 7-7 7';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
export function PauseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}
export function MuteIcon({ muted }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5L6 9H2v6h4l5 4z" />
      {muted ? <path d="M22 9l-6 6M16 9l6 6" /> : <path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />}
    </svg>
  );
}

export function WhatsApp() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.2 14.2c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.6-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.6.8 2 .8 2.1.1.1.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" />
    </svg>
  );
}

export function Social({ name }) {
  const paths = {
    facebook: 'M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z',
    instagram: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-2.5h.01',
    twitter: 'M4 4l16 16M20 4L4 20',
    youtube: 'M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3zm7 1v6l5-3z',
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

export function ExpertiseIcon({ name }) {
  switch (name) {
    case 'drop':
      return <svg {...base}><path d="M12 3s6 6.2 6 10.5A6 6 0 016 13.5C6 9.2 12 3 12 3z" /><path d="M9.5 14a2.5 2.5 0 002.5 2.5" /></svg>;
    case 'click':
      return <svg {...base}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>;
    case 'cycle':
      return <svg {...base}><path d="M20 12a8 8 0 01-14 5.3M4 12A8 8 0 0118 6.7" /><path d="M18 3v4h-4M6 21v-4h4" /></svg>;
    case 'stars':
      return <svg {...base}><path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z" /><path d="M18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" /></svg>;
    case 'diversity':
      return <svg {...base}><circle cx="8" cy="8" r="3" /><circle cx="16.5" cy="9" r="2.5" /><path d="M2.5 19c.5-3.5 3-5 5.5-5s5 1.5 5.5 5M14 15.2c.8-.5 1.700-.7 2.500-.7 2 0 3.700 1.200 4.200 4" /></svg>;
    default:
      return <svg {...base}><path d="M12 3l2.600 5.300 5.800.8-4.200 4.100 1 5.800L12 16.300 6.800 19l1-5.800L3.600 9.100l5.800-.8z" /></svg>;
  }
}
