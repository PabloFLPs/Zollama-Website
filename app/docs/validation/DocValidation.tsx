'use client';

import Link from 'next/link';
import { H2, P, Lead, UL, LI, C, Callout, Brand } from '@/components/ui';
import { useT } from '@/lib/i18n';

export default function DocValidation() {
  const t = useT();
  const linkStyle = { color: 'var(--zo)', fontWeight: 600 } as const;
  return (
    <>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px' }}>{t('Validation & repair', 'Validação e reparo')}</h1>
      <Lead>
        <Brand />
        {t(
          ' draws one distinction everything follows from: ',
          ' faz uma distinção da qual tudo decorre: ',
        )}
        <b>{t('validation', 'validação')}</b>
        {t(
          ' is a deterministic, in-band, pass/fail gate — never a judgment model.',
          ' é um portão determinístico, em linha, de passa/não-passa — nunca um modelo de julgamento.',
        )}
      </Lead>

      <P>{t('It runs in two buckets:', 'Ele roda em dois grupos:')}</P>
      <UL>
        <LI>
          <b>{t('Schema validity', 'Validade de schema')}</b>
          {t(' (Zod) — shape, types, enums. The same schema is the decoding constraint and the ', ' (Zod) — formato, tipos, enums. O mesmo schema é a restrição de decodificação e a verificação ')}
          <C>safeParse</C>
          {t(' check.', '.')}
        </LI>
        <LI>
          <b>{t('Semantic validity', 'Validade semântica')}</b>
          {t(
            ' — deterministic field checks: enum/domain membership, referential existence, cross-field consistency. Still no model in the loop.',
            ' — verificações determinísticas de campo: pertencimento a enum/domínio, existência referencial, consistência entre campos. Ainda sem modelo no meio.',
          )}
        </LI>
      </UL>

      <H2>{t('What happens on failure', 'O que acontece em caso de falha')}</H2>
      <UL>
        <LI>
          <b>{t('Deterministic repair', 'Reparo determinístico')}</b>
          {t(' — safe, type-directed fixes ', ' — correções seguras e guiadas por tipo ')}
          <i>{t('before', 'antes')}</i>
          {t(' spending a retry (e.g. ', ' de gastar uma tentativa (ex.: ')}
          <C>&quot;12&quot;</C> → <C>12</C>
          {t(', a stray code fence stripped, a near-miss enum snapped). Fires the ', ', uma cerca de código perdida removida, um enum quase-certo ajustado). Dispara o callback ')}
          <C>onRepair</C>
          {t(' callback.', '.')}
        </LI>
        <LI>
          <b>{t('Retry', 'Retry')}</b>
          {t(
            ' — if it still can’t parse, the validation error is fed back into the conversation and the call retried; transient transport failures are retried too.',
            ' — se ainda não der para parsear, o erro de validação é reenviado na conversa e a chamada repetida; falhas transitórias de transport também são repetidas.',
          )}
        </LI>
        <LI>
          <b>{t('Fail clearly', 'Falhar com clareza')}</b>
          {t(
            ' — out of retries, it throws with the reason rather than shipping something broken.',
            ' — sem tentativas restantes, ele lança com o motivo em vez de entregar algo quebrado.',
          )}
        </LI>
      </UL>

      <Callout kind="note" title={t('Why not a semantic scorer in the gate?', 'Por que não um avaliador semântico no portão?')}>
        {t(
          'A general semantic scorer is just another model you’d have to trust — it relocates the trust problem instead of solving it. The gate stays deterministic; graded LLM-as-judge scoring earns its place ',
          'Um avaliador semântico genérico é só mais um modelo em que você teria que confiar — ele realoca o problema de confiança em vez de resolvê-lo. O portão continua determinístico; a avaliação graduada (LLM como juiz) ganha seu lugar ',
        )}
        <i>{t('offline', 'offline')}</i>
        {t(', over datasets, where disagreements point at rules worth adding.', ', sobre datasets, onde as discordâncias apontam regras que vale a pena adicionar.')}
      </Callout>

      <P>
        {t('Need more than the schema? Add ', 'Precisa de mais que o schema? Adicione ')}
        <Link href="/docs/evals" style={linkStyle}>evals</Link>
        {t(' — extra contracts that run on the already-valid value.', ' — contratos extras que rodam sobre o valor já válido.')}
      </P>
    </>
  );
}
