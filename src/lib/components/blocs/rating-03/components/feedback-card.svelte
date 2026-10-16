<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardPanel } from '#lib/components/ui/card/index.js';
  import { Checkbox } from '#lib/components/ui/checkbox/index.js';
  import { RadioGroup, RadioPrimitive } from '#lib/components/ui/radio-group/index.js';
  import { Textarea } from '#lib/components/ui/textarea/index.js';

  const MAX_LENGTH = 500;

  const feelings = [
    { value: 'angry', emoji: '😠', label: 'Angry' },
    { value: 'sad', emoji: '🙁', label: 'Sad' },
    { value: 'fine', emoji: '😐', label: 'Fine' },
    { value: 'glad', emoji: '🙂', label: 'Glad' },
    { value: 'fantastic', emoji: '🤩', label: 'Fantastic' }
  ];

  let feeling = $state('glad');
  let details = $state('');
  let consent = $state(false);
  const remaining = $derived(MAX_LENGTH - details.length);
</script>

<Card class="w-full max-w-lg rounded-3xl">
  <CardPanel class="flex flex-col gap-6 p-6">
    <div class="flex flex-col gap-1">
      <h2 class="text-xl font-bold tracking-tight">Your thoughts shape our roadmap</h2>
      <p class="text-muted-foreground text-sm">
        What was it like working with the platform this week?
      </p>
    </div>
    <RadioGroup bind:value={feeling} aria-label="Feeling" class="flex-row justify-between gap-2">
      {#each feelings as f (f.value)}
        <RadioPrimitive.Root
          value={f.value}
          class="group flex flex-col items-center gap-2 outline-none"
        >
          <span
            class="flex size-14 items-center justify-center rounded-full border-2 border-border text-3xl transition-colors group-hover:bg-accent/50 group-focus-visible:ring-2 group-focus-visible:ring-ring group-data-checked:border-foreground group-data-checked:bg-muted"
          >
            {f.emoji}
          </span>
          <span class="text-xs font-medium">{f.label}</span>
        </RadioPrimitive.Root>
      {/each}
    </RadioGroup>
    <div class="flex flex-col gap-2">
      <Textarea
        bind:value={details}
        maxlength={MAX_LENGTH}
        placeholder="Add any details you would like to share (optional)"
        class="[&_textarea]:min-h-32"
        aria-label="Details"
      />
      <p class="text-muted-foreground text-xs">{remaining}/{MAX_LENGTH} characters remaining</p>
    </div>
    <label class="flex items-center gap-3 text-sm">
      <Checkbox bind:checked={consent} />
      I agree to let Brightpath Studio reach out about my response
    </label>
    <div class="flex justify-end gap-2">
      <Button variant="outline" class="rounded-full">Dismiss</Button>
      <Button class="rounded-full">Send response</Button>
    </div>
  </CardPanel>
</Card>
