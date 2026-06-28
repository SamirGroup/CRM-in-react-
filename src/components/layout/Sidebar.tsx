import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Store, LogOut } from 'lucide-react';
import { cn } from '@/lib/cn';
import { NavList } from './NavList';
import { NavIcon } from '@/components/icons/NavIcon';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-30 h-dvh w-56 bg-[var(--naf-chrome-bg)] border-r border-[var(--naf-border-subtle)]',
        'flex flex-col',
        'md:flex',
        'hidden',
        className
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--naf-border-subtle)]">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--naf-accent)] text-white shadow-sm">
            <Store className="h-5 w-5" />
          </span>
          <span className="font-bold text-lg text-[var(--naf-body-fg)]">
            CON<span className="text-[var(--naf-accent)]">DOR</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto thin-scrollbar p-4">
        <NavList />
      </div>

      {/* Til, Tema, Chiqish */}
      <div className="p-4 border-t border-[var(--naf-border-subtle)] space-y-2">
        <LanguageSwitcher />
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={toggleTheme}
        >
          <NavIcon name={theme === 'dark' ? 'sun' : 'moon'} />
          {theme === 'dark' ? t('common.themeLight') : t('common.themeDark')}
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-[var(--naf-danger)] hover:text-[var(--naf-danger-hover)] hover:bg-[var(--naf-badge-danger-bg)]"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {t('common.logout')}
        </Button>
      </div>
    </aside>
  );
}
