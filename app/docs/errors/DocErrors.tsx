'use client';

import CodeBlock from '@/components/CodeBlock';
import { H2, P, Lead, UL, LI, C } from '@/components/ui';
import { useT } from '@/lib/i18n';

const CODE = `import {
  ZollamaRequestError,
  ZollamaValidationError,
  ZollamaEvalError,
} from 'zollama';

try {
  const value = await client.generate(schema, prompt);
  use(value);
} catch (err) {
  if (err instanceof ZollamaRequestError)         showOffline(err.status);
  else if (err instanceof ZollamaValidationError) showBadOutput(err.lastRaw);
  else if (err instanceof ZollamaEvalError)        showFailedRules(err.failedEvals);
  else throw err;
}`;

export default function DocErrors() {
  const t = useT();
  return (
    <>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px' }}>{t('Errors', 'Erros')}</h1>
      <Lead>
        <C>generate()</C>
        {t(
          ' resolves with the typed value or throws one of three typed errors — so a caller can branch on ',
          ' resolve com o valor tipado ou lança um de três erros tipados — para que quem chama possa ramificar pelo ',
        )}
        <i>{t('why', 'porquê')}</i>
        {t(' it failed, not just ', ' da falha, não apenas pelo ')}
        <i>{t('that', 'fato de que')}</i>
        {t(' it failed.', ' falhou.')}
      </Lead>

      <UL>
        <LI><C>ZollamaRequestError</C> — {t('the model server was unreachable or returned non-2xx (carries ', 'o servidor do modelo estava inacessível ou retornou não-2xx (carrega ')}<C>status</C>).</LI>
        <LI><C>ZollamaValidationError</C> — {t('never produced schema-valid output within the retry budget (carries ', 'nunca produziu saída válida pelo schema dentro do orçamento de tentativas (carrega ')}<C>attempts</C>, <C>lastRaw</C>).</LI>
        <LI><C>ZollamaEvalError</C> — {t('passed the schema but kept failing an eval (carries ', 'passou no schema mas continuou falhando um eval (carrega ')}<C>failedEvals</C>, <C>attempts</C>, <C>lastRaw</C>).</LI>
      </UL>

      <CodeBlock code={CODE} />

      <H2>{t('Consistent across providers', 'Consistente entre provedores')}</H2>
      <P>
        {t('Every transport throws the same ', 'Todo transport lança o mesmo ')}
        <C>ZollamaRequestError</C>
        {t(
          ' on a network failure or non-2xx response — no provider-specific error subclasses. The distinction that matters to callers — “the server is unreachable” vs “the model kept producing invalid output” vs “it failed an eval” — is provider-agnostic.',
          ' em uma falha de rede ou resposta não-2xx — sem subclasses de erro específicas de provedor. A distinção que importa para quem chama — “o servidor está inacessível” vs “o modelo continuou produzindo saída inválida” vs “falhou um eval” — é independente de provedor.',
        )}
      </P>
    </>
  );
}
