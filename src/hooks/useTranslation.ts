import { useLocaleStore } from '@/store/useLocaleStore';
import { TRANSLATIONS, DEFAULT_LOCALE } from '@/lib/i18n/translations';

export function useTranslation() {
  const locale = useLocaleStore((s) => s.locale);

  function t(key: string): string {
    return TRANSLATIONS[locale][key] ?? TRANSLATIONS[DEFAULT_LOCALE][key] ?? key;
  }

  return { t, locale };
}
