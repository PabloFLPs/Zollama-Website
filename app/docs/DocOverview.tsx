'use client';

import Link from 'next/link';
import { H2, P, Lead, UL, LI, C, Callout, Brand } from '@/components/ui';
import { useT } from '@/lib/i18n';

export default function DocOverview() {
  const t = useT();
  const linkStyle = { color: 'var(--zo)', fontWeight: 600 } as const;
  return (
    <>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px' }}>{t('Overview', 'Visão geral')}</h1>
      <Lead>
        <Brand />
        {t(
          ' is a typed SDK for structured output from AI models. You give it one Zod schema; it converts that to a JSON Schema and sends it to the model as a decoding constraint, then ',
          ' é um SDK tipado para saída estruturada de modelos de IA. Você fornece um único schema Zod; ele o converte em JSON Schema e o envia ao modelo como restrição de decodificação, e então faz ',
        )}
        <C>safeParse</C>
        {t(
          's the result. When output is structurally valid but wrong, it’s deterministically repaired or fed back and retried — a caller gets a fully-typed value or a clear error, never an unchecked blob.',
          ' do resultado. Quando a saída é estruturalmente válida mas incorreta, ela é reparada de forma determinística ou reenviada e repetida — quem chama recebe um valor totalmente tipado ou um erro claro, nunca um blob não verificado.',
        )}
      </Lead>

      <H2>{t('The one idea', 'A ideia central')}</H2>
      <P>
        <b style={{ color: 'var(--fg-1)' }}>{t('Treat model output like an untrusted HTTP body.', 'Trate a saída do modelo como um corpo HTTP não confiável.')}</b>
        {t(' The Zod schema is the contract, constrained decoding + ', ' O schema Zod é o contrato, a decodificação restrita + ')}
        <C>safeParse</C>
        {t(
          ' is the boundary check, and failures are repaired or retried — never silently trusted, regardless of which provider is behind it.',
          ' é a verificação de fronteira, e as falhas são reparadas ou repetidas — nunca confiadas silenciosamente, seja qual for o provedor por trás.',
        )}
      </P>
      <P>{t('One Zod schema does double duty:', 'Um único schema Zod cumpre um papel duplo:')}</P>
      <UL>
        <LI>
          {t('It’s converted to ', 'Ele é convertido em ')}
          <b>{t('JSON Schema', 'JSON Schema')}</b>
          {t(
            ' and sent to the model as a decoding constraint, so generation can only emit matching JSON.',
            ' e enviado ao modelo como restrição de decodificação, então a geração só pode emitir JSON compatível.',
          )}
        </LI>
        <LI>
          {t('It’s used to ', 'Ele é usado para fazer ')}
          <C>safeParse</C>
          {t(
            ' the result — because a small model can still produce structurally-valid-but-wrong values. On failure, a deterministic repair is tried first; if that can’t fix it, the validation error is fed back and the call retried.',
            ' do resultado — porque um modelo pequeno ainda pode produzir valores estruturalmente válidos, mas incorretos. Em caso de falha, um reparo determinístico é tentado primeiro; se isso não resolver, o erro de validação é reenviado e a chamada é repetida.',
          )}
        </LI>
      </UL>

      <H2>{t('Why it exists', 'Por que ele existe')}</H2>
      <P>
        {t(
          'The weaker the model, the worse — and the quieter — the failures: an invalid enum, a reference to a field that doesn’t exist, an empty required list, prose where you asked for an object. Coercing defensively per call is the difference between “the output looks broken and I don’t know why” and “field X failed validation on model Y.” ',
          'Quanto mais fraco o modelo, piores — e mais silenciosas — as falhas: um enum inválido, uma referência a um campo que não existe, uma lista obrigatória vazia, prosa onde você pediu um objeto. Coagir defensivamente a cada chamada é a diferença entre “a saída parece quebrada e não sei por quê” e “o campo X falhou na validação no modelo Y”. ',
        )}
        <Brand />
        {t(' centralizes that boundary so every AI call gets the same guarantee.', ' centraliza essa fronteira para que toda chamada de IA tenha a mesma garantia.')}
      </P>

      <Callout kind="tip" title={t('Start here', 'Comece aqui')}>
        {t('New to ', 'Novo no ')}
        <Brand />?{' '}
        <Link href="/docs/installation" style={linkStyle}>{t('Install it', 'Instale')}</Link>
        {t(', then walk the ', ' e percorra o ')}
        <Link href="/docs/quick-start" style={linkStyle}>{t('Quick start', 'Início rápido')}</Link>
        {t(' — you’ll have a typed, validated call running against a local model in a couple of minutes.', ' — você terá uma chamada tipada e validada rodando contra um modelo local em alguns minutos.')}
      </Callout>
    </>
  );
}
