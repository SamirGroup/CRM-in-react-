import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/useUIStore';

export function MobileNavFab() {
  const { isMobileNavOpen, toggleMobileNav } = useUIStore();

  return (
    <Button
      variant="primary"
      size="icon"
      className="md:hidden fixed bottom-20 right-4 z-30 h-14 w-14 rounded-full shadow-lg transition-transform active:scale-95"
      onClick={toggleMobileNav}
    >
      {isMobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  );
}
