<script lang="ts">
  import { Slider } from '#lib/components/ui/slider/index.js';

  let value = $state([25, 75]);
</script>

<Slider
  getAriaLabel={(index) => (index === 0 ? 'Minimum value' : 'Maximum value')}
  thumbCollisionBehavior="none"
  bind:value
/>
