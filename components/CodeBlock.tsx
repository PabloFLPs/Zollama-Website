import type { CSSProperties, ReactNode } from 'react';

// Tiny dependency-free syntax highlighter (TS + shell), colored via CSS vars so it
// stays on-theme. Single-pass tokenizer — comments, strings, numbers, keywords, types.
const KW = new Set(
  'import from export default const let var new await async function return if else for of in type interface enum class extends implements try catch finally throw void as typeof instanceof yield public private readonly'.split(' '),
);
const LIT = new Set(['true', 'false', 'null', 'undefined']);

function highlight(code: string): ReactNode[] {
  const re = /(\/\/[^\n]*|#[^\n]*)|(`(?:\\[\s\S]|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) out.push(code.slice(last, m.index));
    let color: string | undefined;
    let italic = false;
    if (m[1] != null) {
      color = 'var(--code-comment)';
      italic = true;
    } else if (m[2] != null) color = 'var(--code-str)';
    else if (m[3] != null) color = 'var(--code-num)';
    else {
      const w = m[4];
      if (KW.has(w)) color = 'var(--code-kw)';
      else if (LIT.has(w)) color = 'var(--code-num)';
      else if (/^[A-Z]/.test(w)) color = 'var(--code-type)';
    }
    out.push(color ? <span key={k++} style={{ color, fontStyle: italic ? 'italic' : undefined }}>{m[0]}</span> : m[0]);
    last = re.lastIndex;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

const preStyle: CSSProperties = {
  background: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  padding: '14px 16px',
  fontFamily: 'var(--font-mono)',
  fontSize: 13,
  lineHeight: 1.6,
  color: 'var(--fg-1)',
  whiteSpace: 'pre',
  margin: '0 0 4px',
};

export default function CodeBlock({ code, label, filename }: { code: string; label?: string; filename?: string }) {
  // Window mode: an editor-style frame with traffic-light dots + a filename tab.
  if (filename) {
    // No horizontal scrollbar: long lines wrap instead of overflowing, so the card
    // never shows a bottom scroll track (and nothing to clip on the rounded corners).
    return (
      <div style={{ margin: '0 0 16px', minWidth: 0, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: 'var(--surface-2)', boxShadow: '0 24px 60px -34px rgba(0,0,0,0.65)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
          <span style={{ display: 'inline-flex', gap: 6 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.92 }} />
            ))}
          </span>
          <span style={{ marginLeft: 4, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)' }}>{filename}</span>
        </div>
        <pre style={{ ...preStyle, border: 'none', borderRadius: 0, margin: 0, background: 'transparent', padding: '14px 16px', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', overflowX: 'hidden' }}>{highlight(code)}</pre>
      </div>
    );
  }
  return (
    <div style={{ margin: '0 0 16px' }}>
      {label && (
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 6 }}>{label}</div>
      )}
      <pre style={preStyle}>{highlight(code)}</pre>
    </div>
  );
}
