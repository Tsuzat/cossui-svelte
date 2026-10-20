<script lang="ts">
  import { getLocalTimeZone, today } from '@internationalized/date';
  import { Calendar } from '#lib/components/ui/calendar/index.js';

  const start = today(getLocalTimeZone());
  let value = $state({ end: start.add({ days: 7 }), start });
</script>

<Calendar mode="range" bind:value />
