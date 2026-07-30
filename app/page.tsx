'use client';

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import TypedOutput from '@/components/TypedOutput';
import { Brand } from '@/components/ui';
import { useT } from '@/lib/i18n';
import type { ReactNode } from 'react';

const svgProps = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const BookIcon = (
  <svg {...svgProps} aria-hidden>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const TerminalIcon = (
  <svg {...svgProps} aria-hidden>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const QUICK = `import { Zollama } from 'zollama';
import { z } from 'zod';

const client = new Zollama(); // defaults to local Ollama

const Commit = z.object({
  type: z.enum(['feat', 'fix', 'chore']),
  scope: z.string().nullable(),
  summary: z.string().max(72),
  breaking: z.boolean(),
});

// Typed, validated, repaired-or-retried — never an unchecked \`any\`.
const commit = await client.generate(
  Commit,
  'Summarize: added a dark-mode toggle to settings',
);`;

function Feature({ title, body, icon }: { title: string; body: ReactNode; icon: ReactNode }) {
  return (
    <div className="lift" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 18px' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--zo-soft)', border: '1px solid var(--zo-border)', color: 'var(--zo)', display: 'grid', placeItems: 'center', marginBottom: 12 }}>
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </div>
      <div style={{ fontSize: 15, fontWeight: 650, color: 'var(--fg)', marginBottom: 5 }}>{title}</div>
      <div style={{ fontSize: 13.5, color: 'var(--fg-2)', lineHeight: 1.55 }}>{body}</div>
    </div>
  );
}

const chip = (label: string, strong = false): ReactNode => (
  <span
    key={label}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 600,
      color: strong ? 'var(--zo)' : 'var(--fg-1)',
      background: strong ? 'var(--zo-soft)' : 'var(--surface-3)',
      border: `1px solid ${strong ? 'var(--zo-border)' : 'var(--border)'}`,
      padding: '6px 12px',
      borderRadius: 9,
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </span>
);
const arrow = (
  <span style={{ color: 'var(--fg-3)', fontSize: 16 }} aria-hidden="true">
    →
  </span>
);

export default function Home() {
  const t = useT();
  const faqs: { q: string; a: ReactNode }[] = [
    {
      q: t('What is Zollama, exactly?', 'O que é o Zollama, exatamente?'),
      a: (
        <>
          {t(
            'A typed TypeScript SDK that makes an AI model return data matching a ',
            'Um SDK TypeScript tipado que faz um modelo de IA retornar dados que batem com um ',
          )}
          <b>{t('Zod schema', 'schema Zod')}</b>
          {t(
            ' — then validates it and auto-repairs or retries when the model slips. You get a fully-typed value or a clear error, never an unchecked blob.',
            ' — e então valida e repara automaticamente ou tenta de novo quando o modelo erra. Você recebe um valor totalmente tipado ou um erro claro, nunca um blob não verificado.',
          )}
        </>
      ),
    },
    {
      q: t('How is it different from calling an LLM and JSON.parse-ing the result?', 'Qual a diferença de chamar um LLM e fazer JSON.parse do resultado?'),
      a: (
        <>
          {t('Raw parsing trusts the model. ', 'Fazer parse cru confia no modelo. ')}
          <Brand />
          {t(
            ' uses your schema to constrain decoding, safeParse the output, deterministically repair common mistakes, and retry with the failure fed back — within a budget — then fail loudly with a typed error instead of returning something plausible but wrong.',
            ' usa o seu schema para restringir a decodificação, faz safeParse da saída, repara erros comuns de forma determinística e tenta de novo reenviando a falha — dentro de um orçamento — e então falha de forma explícita com um erro tipado em vez de retornar algo plausível, mas errado.',
          )}
        </>
      ),
    },
    {
      q: t('Do I need a paid API? Does it cost anything?', 'Preciso de uma API paga? Custa alguma coisa?'),
      a: (
        <>
          {t('No. ', 'Não. ')}
          <Brand />
          {t(
            ' is local-first — point it at Ollama or LM Studio and run models free, offline. It also works with OpenAI, Anthropic, Gemini, or any OpenAI-compatible endpoint if you’d rather use the cloud.',
            ' é local-first — aponte para o Ollama ou LM Studio e rode modelos de graça, offline. Também funciona com OpenAI, Anthropic, Gemini ou qualquer endpoint compatível com OpenAI, se preferir a nuvem.',
          )}
        </>
      ),
    },
    {
      q: t('What does “repair” actually do?', 'O que o “reparo” faz, na prática?'),
      a: (
        <>
          {t(
            'Safe, type-directed fixes applied before spending a retry — e.g. a number returned as ',
            'Correções seguras e guiadas por tipo, aplicadas antes de gastar uma tentativa — ex.: um número retornado como ',
          )}
          <code>&quot;12&quot;</code>
          {t(' coerced to ', ' convertido para ')}
          <code>12</code>
          {t(
            ', a stray markdown code fence stripped, an out-of-enum value rejected. If it still can’t validate, it retries, then throws a structured error you can branch on.',
            ', uma cerca de código markdown perdida removida, um valor fora do enum rejeitado. Se ainda não validar, ele tenta de novo e então lança um erro estruturado no qual você pode ramificar.',
          )}
        </>
      ),
    },
    {
      q: t('Is it tied to a framework?', 'Está preso a algum framework?'),
      a: (
        <>
          {t('No — it’s a plain ESM library (Node 18+). Bring your own Zod schemas; ', 'Não — é uma biblioteca ESM comum (Node 18+). Traga seus próprios schemas Zod; ')}
          <Brand />
          {t(' stays domain-free. Drop it into a script, an API route, or a full app.', ' permanece livre de domínio. Coloque num script, numa rota de API ou num app completo.')}
        </>
      ),
    },
  ];

  return (
    <main>
      <style>{`
        @media (min-width: 920px) {
          .hero-grid { grid-template-columns: 1.04fr 0.96fr !important; }
        }
      `}</style>

      {/* ---- Hero ---- */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(58% 55% at 72% -5%, var(--zo-soft), transparent 68%), radial-gradient(40% 40% at 8% 8%, color-mix(in oklab, var(--zo) 7%, transparent), transparent 70%)',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.5,
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
            backgroundSize: '26px 26px',
            maskImage: 'radial-gradient(70% 60% at 50% 0%, #000, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(70% 60% at 50% 0%, #000, transparent 75%)',
          }}
        />
        <div className="container" style={{ position: 'relative', padding: '80px 24px 56px', animation: 'zo-fade .4s ease' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 44, alignItems: 'center' }}>
            <div>
              <span className="eyebrow">{t('Typed structured output', 'Saída estruturada e tipada')}</span>
              <h1 style={{ fontSize: 'clamp(36px, 6vw, 58px)', fontWeight: 800, margin: '20px 0 18px', lineHeight: 1.04, maxWidth: 660, color: 'var(--fg-1)' }}>
                {t('Treat model output like an ', 'Trate a saída do modelo como um ')}
                <span style={{ color: 'var(--zo)' }}>{t('untrusted HTTP body', 'corpo HTTP não confiável')}</span>.
              </h1>
              <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.6, maxWidth: 560, margin: '0 0 28px' }}>
                <Brand />
                {t(' is a typed SDK for structured output from AI models. One Zod schema constrains decoding, ', ' é um SDK tipado para saída estruturada de modelos de IA. Um único schema Zod restringe a decodificação, ')}
                <b style={{ color: 'var(--fg-1)' }}>{t('validates', 'valida')}</b>
                {t(' the result, and ', ' o resultado e ')}
                <b style={{ color: 'var(--fg-1)' }}>{t('deterministically repairs or retries', 'repara de forma determinística ou tenta de novo')}</b>
                {t(
                  ' on failure — so you get a fully-typed value or a clear error, never an unchecked blob. Local-first via Ollama, or any cloud provider.',
                  ' em caso de falha — então você recebe um valor totalmente tipado ou um erro claro, nunca um blob não verificado. Local-first via Ollama, ou qualquer provedor de nuvem.',
                )}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <Link href="/docs/quick-start" className="btn btn-primary">
                  {t('Get started', 'Começar')}
                </Link>
                <Link href="/docs" className="btn btn-ghost">
                  {BookIcon}
                  {t('Read the docs', 'Ler a documentação')}
                </Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 12, minWidth: 0 }}>
              <CodeBlock code={QUICK} filename="commit.ts" />
              <TypedOutput />
            </div>
          </div>
        </div>
      </section>

      {/* ---- The problem ---- */}
      <section className="container" style={{ padding: '30px 24px' }}>
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 16, padding: '26px 28px' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', fontWeight: 700, marginBottom: 10 }}>{t('The problem', 'O problema')}</div>
          <p style={{ fontSize: 17, color: 'var(--fg-1)', lineHeight: 1.6, maxWidth: 780, margin: 0 }}>
            {t(
              'A model can return structurally-valid-but-wrong JSON: a missing field, an out-of-enum value, an edge that points at a node that doesn’t exist. The weaker the model, the worse — and the quieter — the failures. Parsing raw output and hoping is how bugs ship.',
              'Um modelo pode retornar um JSON estruturalmente válido, mas errado: um campo faltando, um valor fora do enum, uma aresta que aponta para um nó que não existe. Quanto mais fraco o modelo, piores — e mais silenciosas — as falhas. Fazer parse da saída crua e torcer é como bugs vão para produção.',
            )}
          </p>
        </div>
      </section>

      {/* ---- Features ---- */}
      <section className="container" style={{ padding: '30px 24px 10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 14 }}>
          <Feature
            title={t('Schema as the contract', 'Schema como contrato')}
            body={t(
              'One Zod schema is both the decoding constraint (converted to JSON Schema) and the safeParse check. No judgment model in the loop.',
              'Um único schema Zod é ao mesmo tempo a restrição de decodificação (convertida em JSON Schema) e a verificação safeParse. Sem um modelo de julgamento no meio.',
            )}
            icon={<><path d="M9 12l2 2 4-4" /><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /></>}
          />
          <Feature
            title={t('Deterministic repair', 'Reparo determinístico')}
            body={t(
              'Safe, type-directed fixes before spending a retry — e.g. a numeric field returned as "12" coerced to 12, a stray code fence stripped.',
              'Correções seguras e guiadas por tipo antes de gastar uma tentativa — ex.: um campo numérico retornado como "12" convertido para 12, uma cerca de código perdida removida.',
            )}
            icon={<><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z" /></>}
          />
          <Feature
            title={t('Know why, then retry', 'Saiba o porquê, e tente de novo')}
            body={
              <>
                {t('A structured error says exactly what failed; ', 'Um erro estruturado diz exatamente o que falhou; ')}
                <Brand />
                {t(
                  ' feeds it back and retries within budget, then fails with a clear reason rather than shipping something broken.',
                  ' o reenvia e tenta de novo dentro do orçamento, e então falha com um motivo claro em vez de entregar algo quebrado.',
                )}
              </>
            }
            icon={<><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>}
          />
          <Feature
            title={t('Any provider, one call', 'Qualquer provedor, uma chamada')}
            body={t(
              'Ollama, LM Studio, OpenAI, Anthropic, Gemini, or any OpenAI-compatible endpoint — the same generate() behind a ChatTransport seam.',
              'Ollama, LM Studio, OpenAI, Anthropic, Gemini ou qualquer endpoint compatível com OpenAI — o mesmo generate() atrás de uma interface ChatTransport.',
            )}
            icon={<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>}
          />
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section className="container" style={{ padding: '40px 24px' }}>
        <span className="eyebrow">{t('How it works', 'Como funciona')}</span>
        <h2 style={{ fontSize: 26, fontWeight: 700, margin: '16px 0 18px' }}>{t('Every call takes the same path', 'Toda chamada segue o mesmo caminho')}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
          {chip('generate(schema, prompt)')}
          {arrow}
          {chip(t('constrained decode', 'decodificação restrita'), true)}
          {arrow}
          {chip('safeParse', true)}
          {arrow}
          {chip(t('repair / retry', 'reparo / retry'), true)}
          {arrow}
          {chip(t('typed value', 'valor tipado'))}
        </div>
        <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.65, maxWidth: 760 }}>
          {t(
            'If it can’t be made valid within the retry budget, the call throws a typed error you can branch on — unreachable server, schema-exhausted, or eval-exhausted — instead of returning something plausible but wrong.',
            'Se não for possível torná-lo válido dentro do orçamento de tentativas, a chamada lança um erro tipado no qual você pode ramificar — servidor inacessível, schema esgotado ou eval esgotado — em vez de retornar algo plausível, mas errado.',
          )}
        </p>
      </section>

      {/* ---- Providers ---- */}
      <section className="container" style={{ padding: '10px 24px 30px' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['Ollama', 'LM Studio', 'OpenAI', 'Anthropic', 'Google Gemini', t('OpenRouter / vLLM / any OpenAI-compatible', 'OpenRouter / vLLM / qualquer compatível com OpenAI')].map((p) => chip(p))}
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="container" style={{ padding: '30px 24px' }}>
        <span className="eyebrow">FAQ</span>
        <h2 style={{ fontSize: 26, fontWeight: 700, margin: '16px 0 18px' }}>{t('What is this, in plain terms?', 'O que é isso, em termos simples?')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 820 }}>
          {faqs.map((f) => (
            <details key={f.q} className="faq-item" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '2px 16px' }}>
              <summary style={{ cursor: 'pointer', padding: '14px 0', fontSize: 15, fontWeight: 600, color: 'var(--fg)', listStyle: 'none' }}>{f.q}</summary>
              <p style={{ margin: '0 0 14px', fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.65 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="container" style={{ padding: '30px 24px 20px' }}>
        <div
          style={{
            borderRadius: 18,
            padding: '38px 32px',
            textAlign: 'center',
            background: 'linear-gradient(160deg, var(--zo-soft), transparent)',
            border: '1px solid var(--zo-border)',
          }}
        >
          <h2 style={{ fontSize: 26, fontWeight: 750, margin: '0 0 10px' }}>{t('Stop trusting raw model output.', 'Pare de confiar na saída crua do modelo.')}</h2>
          <p style={{ fontSize: 15.5, color: 'var(--fg-2)', maxWidth: 560, margin: '0 auto 22px', lineHeight: 1.6 }}>
            {t(
              'One schema. Constrained decoding, validation, repair, retries, and per-call telemetry — behind a single typed call. It takes a minute to wire in.',
              'Um schema. Decodificação restrita, validação, reparo, retries e telemetria por chamada — atrás de uma única chamada tipada. Leva um minuto para integrar.',
            )}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/docs/quick-start" className="btn btn-primary">
              {TerminalIcon}
              {t('Quick start', 'Início rápido')}
            </Link>
            <Link href="/docs" className="btn btn-ghost">
              {BookIcon}
              {t('Browse the docs', 'Explorar a documentação')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
