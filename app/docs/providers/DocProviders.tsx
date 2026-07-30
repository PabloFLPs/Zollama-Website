'use client';

import CodeBlock from '@/components/CodeBlock';
import { H2, P, Lead, UL, LI, C, Callout } from '@/components/ui';
import { useT } from '@/lib/i18n';

const CODE = `import {
  Zollama,
  OpenAITransport,
  AnthropicTransport,
  GeminiTransport,
  LMStudioTransport,
  OpenAICompatibleTransport,
} from 'zollama';

// Cloud — bring your own key
new Zollama({ transport: new OpenAITransport({ apiKey, model: 'gpt-4o-mini' }) });
new Zollama({ transport: new AnthropicTransport({ apiKey, model: 'claude-3-5-sonnet-latest' }) });
new Zollama({ transport: new GeminiTransport({ apiKey, model: 'gemini-2.0-flash' }) });

// Local — no key
new Zollama({ transport: new LMStudioTransport() });        // localhost:1234
// (default, no transport option) → Ollama on localhost:11434

// Anything OpenAI-compatible (OpenRouter / vLLM / LocalAI / …)
new Zollama({
  transport: new OpenAICompatibleTransport({
    baseUrl: 'https://openrouter.ai/api/v1',
    apiKey,
    model: 'meta-llama/llama-3.1-8b-instruct',
  }),
});`;

export default function DocProviders() {
  const t = useT();
  return (
    <>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px' }}>{t('Providers', 'Provedores')}</h1>
      <Lead>
        <C>generate()</C>
        {t(
          ' never talks to a model runtime directly — it talks to a ',
          ' nunca fala diretamente com um runtime de modelo — ele fala com uma interface ',
        )}
        <C>ChatTransport</C>
        {t(
          ' seam, and defaults to Ollama. Swap the transport to point at anything else; the retry / repair / validation loop is identical for every provider.',
          ' e usa Ollama por padrão. Troque o transport para apontar para qualquer outro; o ciclo de retry / reparo / validação é idêntico para todo provedor.',
        )}
      </Lead>

      <CodeBlock code={CODE} />

      <H2>{t('Caveats worth knowing', 'Ressalvas que vale conhecer')}</H2>
      <P>{t(
        'Each provider implements structured output differently under the hood — which is exactly what the transport abstracts away. Ordinary object / array / enum schemas behave the same everywhere; a few specifics:',
        'Cada provedor implementa saída estruturada de um jeito diferente por baixo dos panos — que é justamente o que o transport abstrai. Schemas comuns de objeto / array / enum se comportam igual em todos; algumas especificidades:',
      )}</P>
      <UL>
        <LI>
          <b>{t('OpenAI-compatible', 'Compatíveis com OpenAI')}</b>
          {t(
            ' (OpenAI, LM Studio, OpenRouter, vLLM…) — use ',
            ' (OpenAI, LM Studio, OpenRouter, vLLM…) — usam o modo ',
          )}
          <C>json_schema</C>
          {t(' mode. Grammar-strict decoding is opt-in and ', '. A decodificação estritamente gramatical é opcional e ')}
          <i>{t('off by default', 'desligada por padrão')}</i>
          {t(', so an imperfect schema still works (the schema is sent as guidance either way).', ', então um schema imperfeito ainda funciona (o schema é enviado como orientação de qualquer forma).')}
        </LI>
        <LI>
          <b>Anthropic</b>
          {t(
            ' — no native JSON-schema mode, so structured output is done via a single forced tool call; ',
            ' — sem modo nativo de JSON-schema, então a saída estruturada é feita via uma única chamada de ferramenta forçada; ',
          )}
          <C>max_tokens</C>
          {t(' is fixed at ', ' é fixo em ')}
          <C>4096</C>.
        </LI>
        <LI>
          <b>Gemini</b>
          {t(' — uses its own ', ' — usa seu próprio ')}
          <C>responseSchema</C>
          {t(
            ', which supports only a subset of JSON Schema: no recursive schemas (',
            ', que suporta apenas um subconjunto do JSON Schema: sem schemas recursivos (',
          )}
          <C>z.lazy()</C>
          {t('), and the API key travels as a query parameter.', '), e a chave de API vai como parâmetro de query.')}
        </LI>
      </UL>

      <Callout kind="note" title={t('One loop, many providers', 'Um ciclo, muitos provedores')}>
        {t('Schema, retry, repair, and evals all live in ', 'Schema, retry, reparo e evals vivem todos em ')}
        <C>generate()</C>
        {t(
          ' — none of it is provider-specific. Adding a provider is just another ',
          ' — nada disso é específico de provedor. Adicionar um provedor é só mais um ',
        )}
        <C>fetch</C>
        {t(' + response-shape translation behind the transport.', ' + tradução do formato da resposta atrás do transport.')}
      </Callout>
    </>
  );
}
