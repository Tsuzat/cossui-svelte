<script lang="ts">
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import { Radio, RadioGroup } from '#lib/components/ui/radio-group/index.js';

  const plans = [
    {
      value: 'monthly',
      name: 'Monthly',
      price: '$12.50/Month',
      trial: '5 day free trial',
      note: 'after that $12.50 monthly. Stop whenever.'
    },
    {
      value: 'yearly',
      name: 'Yearly',
      price: '$99.00/Year',
      trial: '10 day free trial',
      note: 'after that $99.00 yearly. Stop whenever.'
    }
  ];
</script>

<RadioGroup class="w-full gap-3" value="monthly">
  {#each plans as plan (plan.value)}
    <Label
      class="flex items-start justify-between gap-4 rounded-xl border p-4 hover:bg-accent/50 has-data-checked:border-primary has-data-checked:ring-1 has-data-checked:ring-primary"
    >
      <div class="flex flex-col items-start gap-2">
        <p class="font-medium text-muted-foreground text-xs uppercase tracking-widest">
          {plan.name}
        </p>
        <p class="font-semibold text-xl">{plan.price}</p>
        <Badge variant="success" size="lg" class="rounded-full">{plan.trial}</Badge>
        <p class="text-muted-foreground text-xs">{plan.note}</p>
      </div>
      <Radio value={plan.value} />
    </Label>
  {/each}
</RadioGroup>
