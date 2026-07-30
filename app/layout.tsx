import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LangProvider } from '@/lib/i18n';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jb = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-jb', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://zollama.dev'),
  title: {
    default: 'Zollama — typed, validated structured output from AI models',
    template: '%s · Zollama',
  },
  description:
    'Zollama is a typed SDK for structured output from AI models. One Zod schema constrains decoding, validates the result, and repairs or retries on failure — local-first (Ollama) or any cloud provider.',
  keywords: ['Zollama', 'structured output', 'Zod', 'LLM', 'Ollama', 'JSON schema', 'AI SDK', 'TypeScript'],
  openGraph: {
    title: 'Zollama — typed, validated structured output from AI models',
    description: 'One Zod schema. Constrained decoding, validation, deterministic repair, retries. Any provider.',
    type: 'website',
    siteName: 'Zollama',
    // PNG (not SVG): WhatsApp/Facebook/most link scrapers don't render SVG OG images.
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, type: 'image/png', alt: 'Zollama' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zollama — typed, validated structured output from AI models',
    description: 'One Zod schema. Constrained decoding, validation, deterministic repair, retries. Any provider.',
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jb.variable}`} suppressHydrationWarning>
      <head>
        {/* Set theme + lowercase mode before first paint (no flash). Theme: explicit
            choice wins, else OS preference. Lowercase: on by default (design identity)
            unless the user turned it off. Set only on the DOM (not in JSX) to avoid
            hydration mismatches — hence suppressHydrationWarning above. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement;var t=localStorage.getItem('zo-theme');if(!t){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';}if(t==='light')d.setAttribute('data-theme','light');if(localStorage.getItem('zo-lower')==='off')d.setAttribute('data-nolower','');var lg=localStorage.getItem('zo-lang');if(lg==='pt'||lg==='en')d.setAttribute('lang',lg);}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <LangProvider>
          <Header />
          {children}
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
