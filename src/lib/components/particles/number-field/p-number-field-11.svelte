<script lang="ts">
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput
  } from '#lib/components/ui/number-field/index.js';
</script>

<NumberField value={0}>
  <NumberFieldGroup class="[--radius-lg:9999px] [--radius:9999px]">
    <NumberFieldDecrement />
    <NumberFieldInput aria-label="Quantity" />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>
