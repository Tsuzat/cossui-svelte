<script lang="ts">
  import { Slider } from '#lib/components/ui/slider/index.js';
</script>

<div class="flex h-40 items-center justify-center">
  <Slider
    getAriaLabel={(index) => (index === 0 ? 'Minimum value' : 'Maximum value')}
    value={[25, 75]}
    orientation="vertical"
  />
</div>
