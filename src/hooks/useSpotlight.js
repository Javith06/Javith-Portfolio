import { useRef } from 'react';

// Tracks mouse position within an element and exposes CSS vars (--x, --y)
// used to render a radial spotlight glow that follows the cursor.
export function useSpotlight() {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return { ref, onMouseMove };
}
