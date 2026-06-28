import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { NAV_ITEMS } from '@/lib/constants';
import { NavIcon } from '@/components/icons/NavIcon';
import { useTranslation } from '@/hooks/useTranslation';

const BOTTOM_NAV_KEYS = ['nav.dashboard', 'nav.hisobot', 'nav.sotuv', 'nav.kontakt'];

export function MobileBottomNav() {
  const location = useLocation();
  const { t } = useTranslation();

  const mainItems = NAV_ITEMS.filter((entry) => BOTTOM_NAV_KEYS.includes(entry.labelKey));

  const resolveTo = (entry: (typeof NAV_ITEMS)[number]) => entry.to ?? entry.children![0].to;
  const basePrefix = (to: string) => '/' + to.split('/')[1];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-16 bg-[var(--naf-raised-bg)] border-t border-[var(--naf-border-subtle)] flex items-center justify-around safe-area-pb">
      {mainItems.map((entry) => {
        const to = resolveTo(entry);
        const active = location.pathname.startsWith(basePrefix(to));
        return (
          <Link
            key={entry.labelKey}
            to={to}
            className={cn(
              'flex flex-col items-center justify-center gap-1 px-4 py-2',
              active ? 'text-[var(--naf-accent)]' : 'text-[var(--naf-body-fg-muted)]'
            )}
          >
            <NavIcon name={entry.icon} />
            <span className="text-xs font-medium">{t(entry.labelKey)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
