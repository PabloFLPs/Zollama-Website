'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n';

export default function Footer() {
  const t = useT();
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 80 }}>
      <div
        className="container"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between', padding: '28px 24px', fontSize: 13, color: 'var(--fg-3)' }}
      >
        <span>
          <span style={{ color: 'var(--zo)', fontWeight: 700 }}>Zollama</span> — {t('typed, validated structured output from AI models.', 'saída estruturada, tipada e validada de modelos de IA.')}
        </span>
        <span style={{ display: 'flex', gap: 18 }}>
          <Link href="/docs">{t('Docs', 'Docs')}</Link>
          <Link href="/docs/quick-start">{t('Quick start', 'Início rápido')}</Link>
          <a href="https://github.com/PabloFLPs" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </span>
      </div>
    </footer>
  );
}
