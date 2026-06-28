import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { X, LogOut } from 'lucide-react';
import { NavList } from './NavList';
import { NavIcon } from '@/components/icons/NavIcon';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';

export function MobileDrawerNav() {
  const { isMobileNavOpen, toggleMobileNav } = useUIStore();
  const { theme, setTheme } = useTheme();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logout();
    toggleMobileNav();
    navigate('/login');
  };

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleMobileNav}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-72 bg-[var(--naf-page-bg)] z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--naf-border-subtle)]">
              <span className="font-bold text-lg text-[var(--naf-body-fg)]">
                Menu
              </span>
              <Button variant="ghost" size="icon" onClick={toggleMobileNav}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <div className="p-4">
              <NavList onNavigate={toggleMobileNav} />
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
