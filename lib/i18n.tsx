'use client';

// Lightweight client i18n for the Zollama marketing/docs site. Components call
// `useT()` → `t(en, pt)` and render the active language. Language persists in
// localStorage ('zo-lang') and is applied to <html lang> pre-paint (see the inline
// script in app/layout.tsx). Initial render is EN (matches the static prerender) and
// switches to the stored language on mount — no hydration mismatch.
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'pt';

interface LangValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangValue>({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('zo-lang');
      if (stored === 'pt' || stored === 'en') setLangState(stored);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('zo-lang', l);
      document.documentElement.lang = l;
    } catch {
      /* ignore */
    }
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang(): LangValue {
  return useContext(LangContext);
}

/** Returns a translator: `t('English', 'Português')` → the active-language string. */
export function useT(): (en: string, pt: string) => string {
  const { lang } = useLang();
  return (en: string, pt: string) => (lang === 'pt' ? pt : en);
}
