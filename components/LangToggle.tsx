'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang, useT, type Lang } from '@/lib/i18n';

const OPTIONS: { id: Lang; short: string; label: string }[] = [
  { id: 'en', short: 'EN', label: 'English' },
  { id: 'pt', short: 'PT', label: 'Português' },
];

// Language switcher — a compact EN/PT button that opens a small dropdown. Also hosts
// the lowercase reading-mode toggle (design identity) below a divider, matching the
// combined EN/PT popover in System Design Studio.
export default function LangToggle() {
  const { lang, setLang } = useLang();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [lower, setLower] = useState(true); // lowercase on by default (data-nolower absent)
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Sync from the attribute the pre-paint script (app/layout.tsx) set before hydration.
  useEffect(() => {
    setLower(!document.documentElement.hasAttribute('data-nolower'));
  }, []);

  const toggleLower = () => {
    const next = !lower;
    setLower(next);
    const el = document.documentElement;
    if (next) el.removeAttribute('data-nolower');
    else el.setAttribute('data-nolower', '');
    try {
      localStorage.setItem('zo-lower', next ? 'on' : 'off');
    } catch {
      /* ignore */
    }
  };

  const current = OPTIONS.find((o) => o.id === lang) ?? OPTIONS[0];

  return (
    <div ref={ref} className="nolower" style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Language"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Language"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          height: 34,
          padding: '0 10px',
          borderRadius: 9,
          border: '1px solid var(--border-strong)',
          background: 'transparent',
          color: 'var(--fg-2)',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.02em',
          // Follow the site's reading mode: "en"/"pt" in lowercase mode, "EN"/"PT" when off.
          textTransform: lower ? 'lowercase' : 'none',
        }}
      >
        {current.short}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ opacity: 0.7 }}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            padding: 4,
            minWidth: 168,
            background: 'var(--surface-2)',
            border: '1px solid var(--border-strong)',
            borderRadius: 10,
            boxShadow: '0 16px 40px -18px rgba(0,0,0,0.6)',
            zIndex: 60,
          }}
        >
          <ul role="listbox" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {OPTIONS.map((o) => {
              const active = o.id === lang;
              return (
                <li key={o.id}>
                  <button
                    role="option"
                    aria-selected={active}
                    onClick={() => { setLang(o.id); setOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      width: '100%',
                      textAlign: 'left',
                      padding: '7px 9px',
                      border: 'none',
                      borderRadius: 7,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: 13,
                      fontWeight: 600,
                      background: active ? 'var(--zo-soft)' : 'transparent',
                      color: active ? 'var(--zo)' : 'var(--fg-1)',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.8, width: 20 }}>{o.short}</span>
                    <span style={{ flex: 1 }}>{o.label}</span>
                    {active && <span style={{ color: 'var(--zo)', fontSize: 12 }}>✓</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          <div style={{ height: 1, background: 'var(--border)', margin: '4px 5px' }} />

          <button
            onClick={toggleLower}
            aria-pressed={lower}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              textAlign: 'left',
              padding: '7px 9px',
              border: 'none',
              borderRadius: 7,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: 600,
              background: lower ? 'var(--zo-soft)' : 'transparent',
              color: lower ? 'var(--zo)' : 'var(--fg-1)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, width: 20, opacity: 0.9 }}>aa</span>
            <span style={{ flex: 1 }}>{t('Lowercase', 'Minúsculas')}</span>
            {lower && <span style={{ color: 'var(--zo)', fontSize: 12 }}>✓</span>}
          </button>
        </div>
      )}
    </div>
  );
}
