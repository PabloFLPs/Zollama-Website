'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    const el = document.documentElement;
    if (next === 'light') el.setAttribute('data-theme', 'light');
    else el.removeAttribute('data-theme');
    try {
      localStorage.setItem('zo-theme', next);
    } catch {
      /* ignore */
    }
  };

  const showMoon = mounted && theme === 'light'; // in light mode, offer to switch to dark

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      title="Toggle theme"
      style={{
        display: 'grid',
        placeItems: 'center',
        width: 34,
        height: 34,
        borderRadius: 9,
        border: '1px solid var(--border-strong)',
        background: 'transparent',
        color: 'var(--fg-2)',
        cursor: 'pointer',
      }}
    >
      {showMoon ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}
