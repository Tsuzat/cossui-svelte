<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { type DateRange } from '#lib/components/ui/calendar/index.js';
  import { Calendar } from '#lib/components/ui/calendar/index.js';

  let value = $state<DateRange>({
    start: new CalendarDate(2025, 6, 9),
    end: new CalendarDate(2025, 6, 26)
  });
</script>

<Calendar mode="range" bind:value class="rounded-lg border shadow-sm" />
