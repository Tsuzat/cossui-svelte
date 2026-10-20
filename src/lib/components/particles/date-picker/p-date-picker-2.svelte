<script lang="ts">
  import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { Calendar } from '#lib/components/ui/calendar/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { cn } from '#lib/utils.js';

  const df = new DateFormatter('en-US', { dateStyle: 'medium' });

  let value = $state<{ end: DateValue; start: DateValue } | undefined>(undefined);
</script>

<Popover>
  <PopoverTrigger class={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-start')}>
    <CalendarIcon aria-hidden="true" />
    {#if value?.start}
      {#if value.end}
        {df.format(value.start.toDate(getLocalTimeZone()))}
        -
        {df.format(value.end.toDate(getLocalTimeZone()))}
      {:else}
        {df.format(value.start.toDate(getLocalTimeZone()))}
      {/if}
    {:else}
      <span>Pick a date range</span>
    {/if}
  </PopoverTrigger>
  <PopoverPopup>
    <Calendar mode="range" bind:value />
  </PopoverPopup>
</Popover>
