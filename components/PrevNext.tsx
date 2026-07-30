'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOCS_FLAT } from '@/lib/docsNav';
import { useT } from '@/lib/i18n';

export default function PrevNext() {
  const path = usePathname();
  const t = useT();
  const i = DOCS_FLAT.findIndex((l) => l.href === path);
  if (i === -1) return null;
  const prev = DOCS_FLAT[i - 1];
  const next = DOCS_FLAT[i + 1];
  const cell: React.CSSProperties = {
    flex: 1,
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: '12px 16px',
    background: 'var(--surface-2)',
  };
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 44, flexWrap: 'wrap' }}>
      {prev ? (
        <Link href={prev.href} style={{ ...cell, textAlign: 'left' }}>
          <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>← {t('Previous', 'Anterior')}</div>
          <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--fg)' }}>{t(prev.title, prev.titlePt)}</div>
        </Link>
      ) : (
        <span style={{ flex: 1 }} />
      )}
      {next ? (
        <Link href={next.href} style={{ ...cell, textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>{t('Next', 'Próximo')} →</div>
          <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--zo)' }}>{t(next.title, next.titlePt)}</div>
        </Link>
      ) : (
        <span style={{ flex: 1 }} />
      )}
    </div>
  );
}
