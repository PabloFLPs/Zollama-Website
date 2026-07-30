'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';
import { useT } from '@/lib/i18n';

// The Zollama mark — the same "Z" glyph used across System Design Studio.
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.28,
          background: 'var(--zo)',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 6px 18px -8px rgba(249,115,22,0.7)',
          flex: '0 0 auto',
        }}
      >
        <svg viewBox="0 0 48 48" width={size * 0.62} height={size * 0.62} aria-hidden="true">
          <path d="M15 16 h18 l-16 16 h16" fill="none" stroke="#ffffff" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="brand-word" style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--fg)' }}>Zollama</span>
    </span>
  );
}

const navLink: React.CSSProperties = { fontSize: 14, fontWeight: 500, color: 'var(--fg-2)', padding: '6px 4px' };

export default function Header() {
  const t = useT();
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'color-mix(in oklab, var(--bg) 82%, transparent)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 18, height: 60 }}>
        <Link href="/" aria-label="Zollama home">
          <Logo />
        </Link>
        <nav className="site-nav" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Secondary text links — hidden on small screens (still in the footer). */}
          <span className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Link href="/docs" style={navLink}>
              {t('Docs', 'Docs')}
            </Link>
            <a href="https://github.com/PabloFLPs" target="_blank" rel="noreferrer" style={navLink}>
              GitHub
            </a>
          </span>
          <LangToggle />
          <ThemeToggle />
          <Link href="/docs/quick-start" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 13 }}>
            {t('Get started', 'Começar')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
