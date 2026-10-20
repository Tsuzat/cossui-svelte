<script lang="ts">
  import { getLocalTimeZone, today } from '@internationalized/date';
  import { Calendar } from '#lib/components/ui/calendar/index.js';

  const todayValue = today(getLocalTimeZone());
  let value = $state({ end: todayValue.add({ days: 3 }), start: todayValue });
</script>

<Calendar bind:value class="[--cell-radius:9999px]" mode="range" />
