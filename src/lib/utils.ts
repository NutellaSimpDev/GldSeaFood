import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases condicionales (clsx) y resuelve conflictos de Tailwind
 * quedandose con la ultima (tailwind-merge).
 *
 *   cn('px-2 py-1', isActive && 'bg-gold', 'px-4')  ->  'py-1 bg-gold px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
