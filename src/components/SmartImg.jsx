import { useState } from 'react';

/**
 * Image with a graceful fallback. If the file is missing from /public/images,
 * a neutral placeholder block is shown instead of a broken-image icon.
 */
export default function SmartImg({ src, alt = '', className = '', label, ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt}>
        <span>{label || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
