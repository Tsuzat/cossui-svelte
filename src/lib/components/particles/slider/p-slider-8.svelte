<script lang="ts">
  import { Slider } from '#lib/components/ui/slider/index.js';
</script>

<Slider getAriaLabel={(index) => `Value ${index + 1}`} value={[20, 50, 80]} />
