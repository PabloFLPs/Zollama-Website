'use client';

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import { H2, P, Lead, UL, LI, C } from '@/components/ui';
import { useT } from '@/lib/i18n';

const OPTS = `const plan = await client.generate(TravelPlan, userPrompt, {
  system: 'You are a concise travel planner.',
  retries: 3,        // feed the error back and retry up to N times (default 2)
  temperature: 0,    // keep near 0 for structured tasks (default)
  onRepair: ({ attempt, changes }) =>
    console.warn('repaired on attempt ' + attempt, changes),
});`;

export default function DocGenerate() {
  const t = useT();
  const linkStyle = { color: 'var(--zo)', fontWeight: 600 } as const;
  return (
    <>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px' }}>{t('The generate() call', 'A chamada generate()')}</h1>
      <Lead>{t('Everything happens in one method.', 'Tudo acontece em um único método.')}</Lead>

      <CodeBlock code={`client.generate<T>(schema, prompt, options?) => Promise<z.infer<T>>`} />
      <P>{t(
        'It returns the parsed, typed value on success, or throws one of the typed errors if it can’t get there within the retry budget.',
        'Retorna o valor parseado e tipado em caso de sucesso, ou lança um dos erros tipados se não chegar lá dentro do orçamento de tentativas.',
      )}</P>

      <H2>{t('Options', 'Opções')}</H2>
      <UL>
        <LI><C>system</C> — {t('a system prompt prepended to the conversation.', 'um system prompt anexado ao início da conversa.')}</LI>
        <LI><C>retries</C> — {t('how many times to feed an error back and retry (default ', 'quantas vezes reenviar um erro e tentar de novo (padrão ')}<C>2</C>{t(', i.e. up to 3 attempts).', ', ou seja, até 3 tentativas).')}</LI>
        <LI><C>temperature</C> — {t('sampling temperature; keep at/near ', 'temperatura de amostragem; mantenha em/perto de ')}<C>0</C>{t(' for structured tasks (the default).', ' para tarefas estruturadas (o padrão).')}</LI>
        <LI><C>evals</C> — {t('extra contracts beyond the schema (see ', 'contratos extras além do schema (veja ')}<Link href="/docs/evals" style={linkStyle}>Evals</Link>{t(').', ').')}</LI>
        <LI><C>onRepair</C> — {t('a callback fired when a deterministic repair is applied, with ', 'um callback disparado quando um reparo determinístico é aplicado, com ')}<C>{'{ attempt, changes }'}</C>.</LI>
      </UL>

      <CodeBlock code={OPTS} />

      <P>{t(
        'The whole value is in that single call: you pass one Zod schema and get a fully-typed result. Behind it sits the retry-and-eval loop, the deterministic repair pass, and the provider transport — none of it provider-specific.',
        'Todo o valor está nessa única chamada: você passa um schema Zod e recebe um resultado totalmente tipado. Por trás dela ficam o ciclo de retry-e-eval, o passo de reparo determinístico e o transport do provedor — nada disso é específico de provedor.',
      )}</P>
    </>
  );
}
