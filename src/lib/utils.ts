import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// oxlint-disable-next-line typescript/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
// oxlint-disable-next-line typescript/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
export type RenameTypeToMode<T> = T extends { type: infer M } ? Omit<T, 'type'> & { mode: M } : T;

/**
 * Derives a human readable title from a particle id, e.g. `p-accordion-1` -> `Accordion 1`.
 */
export function idToName(id: string): string {
  const match = id.match(/^p-(.*)-(\d+)$/);
  if (!match) return id;
  const [, category, num] = match;
  const name = category
    .split('-')
    .map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
  return `${name} ${num}`;
}
