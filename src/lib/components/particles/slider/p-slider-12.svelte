<script lang="ts">
  import {
    NumberField,
    NumberFieldGroup,
    NumberFieldInput
  } from '#lib/components/ui/number-field/index.js';
  import { Slider } from '#lib/components/ui/slider/index.js';

  const min = 0;
  const max = 150;

  let value = $state(25);
</script>

<div class="flex items-center gap-4">
  <Slider getAriaLabel={() => 'Slider value'} class="flex-1" {max} {min} bind:value />
  <NumberField class="w-12" {max} {min} bind:value size="sm">
    <NumberFieldGroup>
      <NumberFieldInput aria-label="Enter slider value" />
    </NumberFieldGroup>
  </NumberField>
</div>
