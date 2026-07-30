import type { CSSProperties, ReactNode } from 'react';

// The brand name, always in Zollama orange (matches the footer). Use in prose only —
// never inside code, where "Zollama" / "ZollamaError" are identifiers.
export function Brand() {
  return <span style={{ color: 'var(--zo)', fontWeight: 600 }}>Zollama</span>;
}

// Small typographic primitives so doc pages stay declarative and consistent.

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} style={{ fontSize: 22, fontWeight: 700, margin: '38px 0 12px', scrollMarginTop: 84 }}>
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--fg)', margin: '22px 0 8px' }}>{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.7, margin: '0 0 14px', maxWidth: 720 }}>{children}</p>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: 17, color: 'var(--fg-1)', lineHeight: 1.65, margin: '0 0 22px', maxWidth: 720 }}>{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul style={{ margin: '0 0 16px', paddingLeft: 20, maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 7 }}>{children}</ul>;
}

export function LI({ children }: { children: ReactNode }) {
  return <li style={{ fontSize: 14.5, color: 'var(--fg-2)', lineHeight: 1.6 }}>{children}</li>;
}

// Inline code chip.
export function C({ children }: { children: ReactNode }) {
  return (
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88em', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 5, padding: '1px 5px', color: 'var(--fg-1)' }}>
      {children}
    </code>
  );
}

export function Callout({ kind = 'note', title, children }: { kind?: 'note' | 'tip'; title: string; children: ReactNode }) {
  const tip = kind === 'tip';
  const box: CSSProperties = {
    margin: '0 0 18px',
    maxWidth: 720,
    borderRadius: 11,
    padding: '12px 15px',
    background: tip ? 'var(--zo-soft)' : 'var(--surface-2)',
    border: `1px solid ${tip ? 'var(--zo-border)' : 'var(--border)'}`,
    borderLeft: `3px solid ${tip ? 'var(--zo)' : 'var(--border-strong)'}`,
  };
  return (
    <div style={box}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: tip ? 'var(--zo)' : 'var(--fg-2)', marginBottom: 5 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}
