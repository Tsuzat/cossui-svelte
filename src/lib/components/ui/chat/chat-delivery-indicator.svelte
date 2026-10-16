<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import CheckCheckIcon from '@lucide/svelte/icons/check-check';
  import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
  import ClockIcon from '@lucide/svelte/icons/clock';
  import { cn } from '#lib/utils.js';

  let {
    status,
    label
  }: { status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'; label: string } = $props();

  const Icon = $derived(
    {
      sending: ClockIcon,
      sent: CheckIcon,
      delivered: CheckCheckIcon,
      read: CheckCheckIcon,
      failed: CircleAlertIcon
    }[status]
  );
</script>

<span role="img" aria-label={label} title={label} data-slot="chat-delivery-indicator">
  <Icon
    aria-hidden="true"
    class={cn(
      'size-3',
      status === 'read' && 'text-sky-600 dark:text-sky-400',
      status === 'failed' && 'text-destructive'
    )}
  />
</span>
