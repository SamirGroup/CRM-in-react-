import { LOCALES } from '@/lib/i18n/translations';
import { useLocaleStore } from '@/store/useLocaleStore';
import { cn } from '@/lib/cn';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocaleStore();

  return (
    <div className={cn('flex items-center gap-1 rounded-lg bg-[var(--naf-border-subtle)]/40 p-1', className)}>
      {LOCALES.map((l) => (
        <button
          key={l.value}
          type="button"
          onClick={() => setLocale(l.value)}
          className={cn(
            'flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors',
            locale === l.value
              ? 'bg-[var(--naf-accent)] text-white shadow-sm'
              : 'text-[var(--naf-body-fg-muted)] hover:text-[var(--naf-body-fg)]',
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
