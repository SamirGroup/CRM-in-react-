import { ICONS } from '@/lib/constants';
import { FileQuestion } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface NavIconProps {
  name: string;
  className?: string;
}

export function NavIcon({ name, className }: NavIconProps) {
  const Icon = ICONS[name] || FileQuestion;
  return <Icon className={cn('h-5 w-5', className)} />;
}
