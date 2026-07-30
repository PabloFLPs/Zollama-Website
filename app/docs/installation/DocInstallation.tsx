'use client';

import CodeBlock from '@/components/CodeBlock';
import InstallTabs from '@/components/InstallTabs';
import { H2, P, Lead, C, Callout, Brand } from '@/components/ui';
import { useT } from '@/lib/i18n';

export default function DocInstallation() {
  const t = useT();
  return (
    <>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px' }}>{t('Installation', 'Instalação')}</h1>
      <Lead>
        <Brand />
        {t(' is a plain library — you install it and import it. Nothing else to run.', ' é uma biblioteca comum — você instala e importa. Nada mais para rodar.')}
      </Lead>

      <div style={{ maxWidth: 460, margin: '0 0 18px' }}>
        <InstallTabs pkg="zollama zod" />
      </div>

      <P>
        <C>zod</C>
        {t(
          ' is a peer dependency — your schemas are Zod schemas. For ',
          ' é uma peer dependency — seus schemas são schemas Zod. Para modelos ',
        )}
        <b>{t('local', 'locais')}</b>
        {t(
          ' models you also need a running model runtime; for ',
          ' você também precisa de um runtime de modelo rodando; para provedores de ',
        )}
        <b>{t('cloud', 'nuvem')}</b>
        {t(' providers you just need an API key.', ' basta uma chave de API.')}
      </P>

      <H2>{t('Prerequisites', 'Pré-requisitos')}</H2>
      <P>{t('Using a local model? Install a runtime and pull a model once:', 'Vai usar um modelo local? Instale um runtime e baixe um modelo uma vez:')}</P>
      <CodeBlock code={`# Ollama (https://ollama.com) — or LM Studio (https://lmstudio.ai)
ollama serve                       # start the server, leave it running
ollama pull qwen2.5-coder:7b       # any model you like
curl http://localhost:11434/api/tags   # sanity check`} />

      <Callout kind="note" title={t('Requirements', 'Requisitos')}>
        {t(
          'Node 18+ and a bundler/runtime that supports ESM. ',
          'Node 18+ e um bundler/runtime com suporte a ESM. ',
        )}
        <Brand />
        {t(
          ' ships as an ESM package with TypeScript types. Cloud providers work with just a key — no local runtime needed.',
          ' é distribuído como um pacote ESM com tipos TypeScript. Provedores de nuvem funcionam só com uma chave — sem runtime local.',
        )}
      </Callout>
    </>
  );
}
