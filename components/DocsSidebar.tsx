'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOCS_NAV } from '@/lib/docsNav';
import { useT } from '@/lib/i18n';

export default function DocsSidebar() {
  const path = usePathname();
  const t = useT();
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {DOCS_NAV.map((section) => (
        <div key={section.title}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 8 }}>
            {t(section.title, section.titlePt)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {section.links.map((l) => {
              const active = path === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontSize: 14,
                    padding: '7px 11px',
                    borderRadius: 8,
                    color: active ? 'var(--zo)' : 'var(--fg-2)',
                    background: active ? 'var(--zo-soft)' : 'transparent',
                    fontWeight: active ? 600 : 500,
                    transition: 'background .12s, color .12s',
                  }}
                >
                  {t(l.title, l.titlePt)}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
