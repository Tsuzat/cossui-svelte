<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardPanel } from '#lib/components/ui/card/index.js';
  import { RadioGroup, RadioPrimitive } from '#lib/components/ui/radio-group/index.js';

  const ratings = [
    { value: 'dreadful', emoji: '😭', label: 'Dreadful' },
    { value: 'weak', emoji: '🙁', label: 'Weak' },
    { value: 'decent', emoji: '🙂', label: 'Decent' },
    { value: 'solid', emoji: '😄', label: 'Solid' },
    { value: 'superb', emoji: '😍', label: 'Superb' }
  ];

  let rating = $state('decent');
</script>

<Card class="w-full max-w-3xl rounded-3xl">
  <CardPanel class="flex flex-col gap-8 p-8">
    <h2 class="text-center text-xl font-bold tracking-tight">
      How did we do during your last visit?
    </h2>
    <RadioGroup
      bind:value={rating}
      aria-label="Rating"
      class="grid grid-cols-2 gap-4 sm:grid-cols-5"
    >
      {#each ratings as r (r.value)}
        <RadioPrimitive.Root
          value={r.value}
          class="flex flex-col items-center gap-3 rounded-2xl border-2 border-border px-4 py-6 outline-none transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring data-checked:border-foreground"
        >
          <span class="text-4xl">{r.emoji}</span>
          <span class="text-sm font-medium">{r.label}</span>
        </RadioPrimitive.Root>
      {/each}
    </RadioGroup>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Button variant="outline" size="lg" class="rounded-full">Not now</Button>
      <Button size="lg" class="rounded-full">Send</Button>
    </div>
  </CardPanel>
</Card>
