import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
import InfoIcon from '@lucide/svelte/icons/info';
import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';
import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';

export const TOAST_ICONS = {
  error: CircleAlertIcon,
  info: InfoIcon,
  loading: LoaderCircleIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon
} as const;

export function upsertReplayClassName(toast: {
  type?: string;
  updateKey?: number;
}): string | undefined {
  const k = toast.updateKey ?? 0;
  if (k <= 0) return undefined;
  const isEven = k % 2 === 0;
  if (toast.type === 'error') {
    return isEven
      ? 'animate-toast-error-even motion-reduce:animate-none'
      : 'animate-toast-error-odd motion-reduce:animate-none';
  }
  return isEven
    ? 'animate-toast-success-even motion-reduce:animate-none'
    : 'animate-toast-success-odd motion-reduce:animate-none';
}
