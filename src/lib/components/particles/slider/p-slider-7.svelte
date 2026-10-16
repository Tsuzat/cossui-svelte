<script lang="ts">
  import { Slider } from '#lib/components/ui/slider/index.js';
</script>

<Slider
  getAriaLabel={(index) => (index === 0 ? 'Minimum value' : 'Maximum value')}
  value={[25, 75]}
/>
