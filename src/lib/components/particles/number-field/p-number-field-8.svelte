<script lang="ts">
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput
  } from '#lib/components/ui/number-field/index.js';

  const usd = new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' });

  function parseAmount(display: string): number | undefined {
    const n = Number(display.replace(/[^\d.-]/g, ''));
    return Number.isNaN(n) ? undefined : n;
  }
</script>

<NumberField value={0}>
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput
      aria-label="Amount in USD"
      format={(v) => usd.format(v)}
      parse={parseAmount}
    />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>
