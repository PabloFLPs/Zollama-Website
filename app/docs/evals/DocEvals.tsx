'use client';

import CodeBlock from '@/components/CodeBlock';
import { H2, P, Lead, C, Brand } from '@/components/ui';
import { useT } from '@/lib/i18n';

const CODE = `import { zodEval, semanticEval, referentialExistenceCheck } from 'zollama';

const result = await client.generate(GraphSchema, prompt, {
  evals: [
    // 1) a stricter refinement than the base schema
    zodEval(GraphSchema.refine(g => g.edges.length > 0, 'needs edges')),

    // 2) a deterministic semantic check — every edge points at a real node
    semanticEval([
      referentialExistenceCheck({
        from: g => g.edges.flatMap(e => [e.source, e.target]),
        exists: g => new Set(g.nodes.map(n => n.id)),
      }),
    ]),
  ],
});`;

export default function DocEvals() {
  const t = useT();
  return (
    <>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px' }}>Evals</h1>
      <Lead>
        {t('Validation is ', 'Validação é ')}
        <i>{t('a', 'um')}</i>
        {t(
          ' gate — there can be more. An ',
          ' portão — pode haver mais. Um ',
        )}
        <b>eval</b>
        {t(
          ' is any additional contract the schema-valid value must satisfy: a stricter Zod refinement, a deterministic semantic check, a domain policy. They run on the already-valid value, and a failure is fed back and retried exactly like a schema failure.',
          ' é qualquer contrato adicional que o valor já válido pelo schema precisa satisfazer: um refinamento Zod mais rígido, uma verificação semântica determinística, uma política de domínio. Eles rodam sobre o valor já válido, e uma falha é reenviada e repetida exatamente como uma falha de schema.',
        )}
      </Lead>

      <CodeBlock code={CODE} />

      <H2>{t('A tiny, deliberate interface', 'Uma interface minúscula e proposital')}</H2>
      <P>
        {t('An eval is just ', 'Um eval é apenas ')}
        <C>{'{ name, run }'}</C>
        {t(
          ' — a mechanism, not a platform. You define domain-specific evals inline; they live in ',
          ' — um mecanismo, não uma plataforma. Você define evals específicos do domínio inline; eles vivem no ',
        )}
        <i>{t('your', 'seu')}</i>
        {t(' code, keeping ', ' código, mantendo o ')}
        <Brand />
        {t(' itself domain-free. Built-in check factories: ', ' livre de domínio. Fábricas de verificação prontas: ')}
        <C>enumCheck</C>, <C>referentialExistenceCheck</C>, <C>crossFieldCheck</C>.
      </P>
      <P>
        {t(
          'Validation is the in-band gate; evals extend it with contracts you can express deterministically. Graded, model-judged scoring stays an ',
          'A validação é o portão em linha; os evals a estendem com contratos que você expressa de forma determinística. A avaliação graduada, julgada por modelo, permanece uma medição ',
        )}
        <i>{t('offline', 'offline')}</i>
        {t(' measurement — never a runtime gate.', ' — nunca um portão em tempo de execução.')}
      </P>
    </>
  );
}
