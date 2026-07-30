// Docs navigation model — drives the sidebar and (implicitly) prev/next order.
// Titles carry both languages (en + pt); the href is the stable key.
export interface DocLink {
  title: string;
  titlePt: string;
  href: string;
}
export interface DocSection {
  title: string;
  titlePt: string;
  links: DocLink[];
}

export const DOCS_NAV: DocSection[] = [
  {
    title: 'Getting started',
    titlePt: 'Primeiros passos',
    links: [
      { title: 'Overview', titlePt: 'Visão geral', href: '/docs' },
      { title: 'Installation', titlePt: 'Instalação', href: '/docs/installation' },
      { title: 'Quick start', titlePt: 'Início rápido', href: '/docs/quick-start' },
    ],
  },
  {
    title: 'Guides',
    titlePt: 'Guias',
    links: [
      { title: 'The generate() call', titlePt: 'A chamada generate()', href: '/docs/generate' },
      { title: 'Providers', titlePt: 'Provedores', href: '/docs/providers' },
      { title: 'Validation & repair', titlePt: 'Validação e reparo', href: '/docs/validation' },
      { title: 'Evals', titlePt: 'Evals', href: '/docs/evals' },
      { title: 'Errors', titlePt: 'Erros', href: '/docs/errors' },
      { title: 'Telemetry', titlePt: 'Telemetria', href: '/docs/telemetry' },
    ],
  },
];

// Flat, ordered list (for prev/next footer links).
export const DOCS_FLAT: DocLink[] = DOCS_NAV.flatMap((s) => s.links);
