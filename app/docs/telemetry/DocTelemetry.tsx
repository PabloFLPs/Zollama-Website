'use client';

import CodeBlock from '@/components/CodeBlock';
import { H2, P, Lead, C, Callout } from '@/components/ui';
import { useT } from '@/lib/i18n';

const CODE = `import { Zollama, type PerformanceRecorder } from 'zollama';

const recorder: PerformanceRecorder = {
  record(entry) {
    // entry: { latencyMs, outcome, attempts[], succeededOnAttempt? }
    // each attempt: { schemaValid, jsonParsed, repair?, usage? { promptTokens, completionTokens } }
    metrics.push(entry);
  },
};

const client = new Zollama({ recorder });`;

export default function DocTelemetry() {
  const t = useT();
  return (
    <>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px' }}>{t('Telemetry', 'Telemetria')}</h1>
      <Lead>
        {t('Every ', 'Cada chamada ')}
        <C>generate()</C>
        {t(
          ' call emits one ',
          ' emite um ',
        )}
        <C>PerformanceEntry</C>
        {t(
          ' — no prompt or response bodies, just counters: outcome, attempts (each with tokens, whether a repair applied, schema-valid, json-parsed), and latency. Cheap and privacy-safe.',
          ' — sem corpos de prompt ou resposta, apenas contadores: resultado, tentativas (cada uma com tokens, se houve reparo, se passou no schema, se fez parse do JSON) e latência. Barato e seguro para a privacidade.',
        )}
      </Lead>

      <P>
        {t('Pass a ', 'Passe um ')}
        <C>recorder</C>
        {t(' to capture them; the default is an in-memory one.', ' para capturá-los; o padrão é um em memória.')}
      </P>
      <CodeBlock code={CODE} />

      <H2>{t('What you can build from it', 'O que dá para construir com isso')}</H2>
      <P>
        {t(
          'Per-provider / per-model analytics: success rate (first pass or repaired), repair rate, break rate (schema-exhausted), eval-fail rate, tokens, and latency. Because it’s emitted as a side effect of wrapping each request, the numbers are real usage — not guesses — which makes it a genuinely useful model-selection signal, not just a dashboard.',
          'Analytics por provedor / por modelo: taxa de sucesso (de primeira ou reparado), taxa de reparo, taxa de falha (schema esgotado), taxa de eval-fail, tokens e latência. Como é emitido como efeito colateral de envolver cada requisição, os números são uso real — não estimativas — o que faz disso um sinal de escolha de modelo realmente útil, não só um painel.',
        )}
      </P>

      <Callout kind="tip" title={t('No bodies, just counters', 'Sem corpos, só contadores')}>
        {t(
          'Entries carry outcomes and usage numbers, never prompts or completions — so you can persist and chart them without handling sensitive content.',
          'As entradas carregam resultados e números de uso, nunca prompts ou respostas — então você pode persistir e plotar sem lidar com conteúdo sensível.',
        )}
      </Callout>
    </>
  );
}
