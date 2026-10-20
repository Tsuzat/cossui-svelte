<script lang="ts">
  import { getLocalTimeZone, today } from '@internationalized/date';
  import { Calendar } from '#lib/components/ui/calendar/index.js';

  const todayValue = today(getLocalTimeZone());
  let value = $state({ end: todayValue.add({ days: 25 }), start: todayValue });
</script>

<Calendar
  mode="range"
  bind:value
  class="**:data-outside-month:invisible [&>div]:gap-8"
  numberOfMonths={2}
  pagedNavigation
/>
