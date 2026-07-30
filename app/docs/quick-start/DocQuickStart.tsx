'use client';

import CodeBlock from '@/components/CodeBlock';
import { H2, P, Lead, C, Callout, Brand } from '@/components/ui';
import { useT } from '@/lib/i18n';

const DAILY = `import { Zollama } from 'zollama';
import { z } from 'zod';

const client = new Zollama(); // local Ollama on http://localhost:11434

// The contract: turn a sentence into a calendar event with these exact
// fields. z.string() / z.number() / z.boolean() = each field's type.
const CalendarEvent = z.object({
  title: z.string(),
  date: z.string(),           // e.g. "2026-08-07"
  durationMinutes: z.number(),
  isOnline: z.boolean(),
});

const event = await client.generate(
  CalendarEvent,
  'Team sync next Friday at 3pm for half an hour, over Zoom',
);

event.title;            // "Team sync"   — typed as string
event.durationMinutes;  // 30            — a real number, not the text "30"
event.isOnline;         // true          — a real boolean`;

const CODING = `import { Zollama } from 'zollama';
import { z } from 'zod';

const client = new Zollama();

// Describe a Conventional Commit as structured fields.
const Commit = z.object({
  type: z.enum(['feat', 'fix', 'chore']),
  scope: z.string().nullable(),
  summary: z.string().max(72),
  breaking: z.boolean(),
});

const commit = await client.generate(
  Commit,
  'Summarize this change: added a dark-mode toggle to settings',
);

commit.type;      // 'feat'  — one of the enum values, typed
commit.summary;   // a string guaranteed <= 72 chars
commit.breaking;  // false`;

export default function DocQuickStart() {
  const t = useT();
  return (
    <>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px' }}>{t('Quick start', 'Início rápido')}</h1>
      <Lead>
        {t('Hand ', 'Passe ao ')}
        <Brand />
        {t(
          ' a Zod schema and a prompt. The schema is your ',
          ' um schema Zod e um prompt. O schema é o seu ',
        )}
        <b>{t('contract', 'contrato')}</b>
        {t(
          ': it spells out the exact shape you want back — which fields, and what type each one is. ',
          ': descreve exatamente o formato que você quer de volta — quais campos e o tipo de cada um. ',
        )}
        <Brand />
        {t(
          ' makes the model fill that shape, checks the answer, and hands you a typed value.',
          ' faz o modelo preencher esse formato, confere a resposta e te devolve um valor tipado.',
        )}
      </Lead>

      <H2 id="daily">{t('A relatable example', 'Um exemplo do dia a dia')}</H2>
      <P>{t('Turn a sentence into structured data — no model config needed beyond a running local Ollama:', 'Transforme uma frase em dados estruturados — sem configuração além de um Ollama local rodando:')}</P>
      <CodeBlock code={DAILY} label={t('Daily use', 'Uso diário')} />
      <P>
        {t('Because the schema is the contract, ', 'Como o schema é o contrato, ')}
        <C>event</C>
        {t(
          ' comes back fully typed and already checked — you never parse a raw string yourself or guess whether ',
          ' volta totalmente tipado e já verificado — você nunca faz parse de uma string crua nem adivinha se ',
        )}
        <C>durationMinutes</C>
        {t(' is a number or the text ', ' é um número ou o texto ')}
        <C>&quot;30&quot;</C>
        {t(
          '. If the model can’t produce something that fits, ',
          '. Se o modelo não conseguir produzir algo que se encaixe, o ',
        )}
        <Brand />
        {t(' repairs it or retries, and only throws if it still can’t.', ' repara ou tenta de novo, e só lança um erro se ainda assim não conseguir.')}
      </P>

      <H2 id="coding">{t('Or a coding example', 'Ou um exemplo de código')}</H2>
      <CodeBlock code={CODING} label={t('Coding', 'Programação')} />

      <Callout kind="tip" title={t('Keep schemas tight', 'Mantenha os schemas rígidos')}>
        {t('Every ', 'Cada ')}
        <C>enum</C>, <C>.max()</C>, <C>.nullable()</C> {t('and', 'e')} <C>.min(1)</C>
        {t(
          ' is both a decoding constraint the model must satisfy ',
          ' é ao mesmo tempo uma restrição de decodificação que o modelo precisa satisfazer ',
        )}
        <i>{t('and', 'e')}</i>
        {t(
          ' a check that catches a weak model — the stricter the schema, the more ',
          ' uma verificação que pega um modelo fraco — quanto mais rígido o schema, mais o ',
        )}
        <Brand />
        {t(' can guarantee.', ' consegue garantir.')}
      </Callout>
    </>
  );
}
