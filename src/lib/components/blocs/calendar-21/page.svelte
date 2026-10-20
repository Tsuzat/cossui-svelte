<script lang="ts">
  import { CalendarDate, isWeekend } from '@internationalized/date';
  import { type DateRange } from '#lib/components/ui/calendar/index.js';
  import { Calendar, RangeDay } from '#lib/components/ui/calendar/index.js';

  let value = $state<DateRange | undefined>({
    start: new CalendarDate(2025, 6, 12),
    end: new CalendarDate(2025, 6, 17)
  });
</script>

<Calendar
  mode="range"
  bind:value
  class="rounded-lg border shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]"
  monthFormat="long"
  captionLayout="dropdown"
>
  {#snippet day({ day, outsideMonth })}
    {@const dayIsWeekend = isWeekend(day, 'en-US')}
    <RangeDay class="flex flex-col items-center">
      {day.day}
      {#if !outsideMonth}
        <span>
          {dayIsWeekend ? '$220' : '$100'}
        </span>
      {/if}
    </RangeDay>
  {/snippet}
</Calendar>
