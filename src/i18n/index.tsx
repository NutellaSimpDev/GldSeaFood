import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { es, type Dict } from './es';
import { en } from './en';

export type Lang = 'es' | 'en' | 'zh';

/**
 * Para agregar mandarin: crear zh.ts tipado como Dict (TypeScript exigira
 * todas las claves) e importarlo aqui. Nada mas cambia.
 */
const DICTS: Partial<Record<Lang, Dict>> = { es, en };

export const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh', label: '中文', short: '中文' },
];

/** Idiomas con traduccion real disponible hoy. */
export const AVAILABLE: Lang[] = Object.keys(DICTS) as Lang[];

const STORAGE_KEY = 'gs-lang';

function detectarIdioma(): Lang {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (guardado && AVAILABLE.includes(guardado)) return guardado;
  } catch {
    // localStorage puede lanzar en modo privado; se ignora y se usa el default
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'es';
  if (nav.startsWith('en')) return 'en';
  if (nav.startsWith('zh')) return AVAILABLE.includes('zh') ? 'zh' : 'en';
  return 'es';
}

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  // La deteccion corre en un efecto, no en el estado inicial, para que el
  // primer render coincida con el HTML servido y no haya parpadeo.
  useEffect(() => setLangState(detectarIdioma()), []);

  const setLang = (l: Lang) => {
    if (!AVAILABLE.includes(l)) return;
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // sin persistencia si el navegador la bloquea
    }
  };

  const t = DICTS[lang] ?? es;

  // Mantiene <html lang> y el <title> en sintonia con el idioma activo
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.meta.description);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>');
  return ctx;
}
