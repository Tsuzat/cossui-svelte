<script lang="ts">
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput
  } from '#lib/components/ui/number-field/index.js';
</script>

<NumberField value={42} disabled>
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput aria-label="Quantity" />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>
