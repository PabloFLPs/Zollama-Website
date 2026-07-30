'use client';

import { useState } from 'react';

const VERB = { yarn: 'yarn add', npm: 'npm i', pnpm: 'pnpm add' } as const;
type Mgr = keyof typeof VERB;

export default function InstallTabs({ pkg = 'zollama' }: { pkg?: string }) {
  const [mgr, setMgr] = useState<Mgr>('yarn'); // yarn first — many devs prefer it
  const [copied, setCopied] = useState(false);
  const cmd = `${VERB[mgr]} ${pkg}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="nolower" style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface-2)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 2, padding: 6, borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
        {(Object.keys(VERB) as Mgr[]).map((m) => (
          <button
            key={m}
            onClick={() => setMgr(m)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 600,
              padding: '5px 11px',
              borderRadius: 7,
              border: 'none',
              cursor: 'pointer',
              background: mgr === m ? 'var(--zo-soft)' : 'transparent',
              color: mgr === m ? 'var(--zo)' : 'var(--fg-3)',
            }}
          >
            {m}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px' }}>
        <code style={{ flex: 1, minWidth: 0, fontFamily: 'var(--font-mono)', fontSize: 13.5, color: 'var(--fg-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <span style={{ color: 'var(--zo)' }}>$</span> {cmd}
        </code>
        <button
          onClick={copy}
          aria-label="Copy install command"
          title={copied ? 'Copied' : 'Copy'}
          style={{ flex: '0 0 auto', display: 'grid', placeItems: 'center', width: 30, height: 30, borderRadius: 8, border: '1px solid var(--border-strong)', background: 'transparent', color: copied ? 'var(--zo)' : 'var(--fg-2)', cursor: 'pointer' }}
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
