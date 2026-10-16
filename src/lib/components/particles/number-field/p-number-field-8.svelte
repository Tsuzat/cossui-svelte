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
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput aria-label="Amount in USD" />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>
