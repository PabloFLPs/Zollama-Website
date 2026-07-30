'use client';

import { useEffect, useRef, useState } from 'react';

// The typed value the hero's `commit.ts` schema would produce. Rendered as a
// live "console output" that types itself out, then flags itself schema-valid.
const RESULT = `{
  type: "feat",
  scope: "settings",
  summary: "add a dark-mode toggle",
  breaking: false
}`;

// Minimal per-character colorizer for a JSON-ish object literal (keys, strings,
// booleans). Operates on the already-revealed substring, so partial tokens just
// render in the default color until they complete — good enough for a ticker.
function color(text: string) {
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|([{}])/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] != null) {
      // a quoted token — a key if followed by ':', else a string value
      out.push(<span key={k++} style={{ color: m[2] ? 'var(--code-type)' : 'var(--code-str)' }}>{m[1]}</span>);
      if (m[2]) out.push(m[2]);
    } else if (m[3] != null) {
      out.push(<span key={k++} style={{ color: 'var(--code-num)' }}>{m[3]}</span>);
    } else if (m[4] != null) {
      out.push(<span key={k++} style={{ color: 'var(--fg-2)' }}>{m[4]}</span>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function TypedOutput() {
  const [n, setN] = useState(0); // characters revealed
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Respect reduced-motion: show the whole thing immediately.
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setN(RESULT.length);
      setDone(true);
      return;
    }
    let i = 0;
    let cancelled = false;
    const step = () => {
      if (cancelled) return;
      i += 1;
      setN(i);
      if (i >= RESULT.length) {
        setDone(true);
        timer.current = setTimeout(() => {
          // brief hold, then restart the loop
          cancelled || (setDone(false), (i = 0), setN(0), tick());
        }, 2600);
        return;
      }
      // newlines pause a touch longer for a natural cadence
      const d = RESULT[i - 1] === '\n' ? 90 : 26;
      timer.current = setTimeout(step, d);
    };
    const tick = () => {
      timer.current = setTimeout(step, 30);
    };
    tick();
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      className="nolower"
      style={{
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        paddingBottom: 14,
        background: 'var(--surface-2)',
        minWidth: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
        <span style={{ color: 'var(--zo)', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700 }}>→ typed result</span>
        <span
          style={{
            marginLeft: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 11,
            fontWeight: 700,
            color: '#3fb27f',
            opacity: done ? 1 : 0,
            transition: 'opacity .25s',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          schema-valid
        </span>
      </div>
      {/* The full text is ALWAYS present — the untyped tail is just rendered
          transparent — so the box reserves its final width + height from the first
          frame and never grows/shifts. Scrolls horizontally on narrow screens. */}
      <pre style={{ margin: 0, padding: '14px 16px 4px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.6, color: 'var(--fg-1)', whiteSpace: 'pre', overflowX: 'auto' }}>
        <span style={{ color: 'var(--fg-4)' }}>const commit = </span>
        {color(RESULT.slice(0, n))}
        <span
          aria-hidden
          style={{ display: 'inline-block', width: 8, height: '1.05em', transform: 'translateY(2px)', background: 'var(--zo)', marginLeft: 1, opacity: done ? 0 : 1, animation: 'zo-blink 1s steps(1) infinite' }}
        />
        <span aria-hidden style={{ color: 'transparent' }}>{RESULT.slice(n)}</span>
      </pre>
    </div>
  );
}
