<script lang="ts">
  import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
  import XIcon from '@lucide/svelte/icons/x';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardPanel } from '#lib/components/ui/card/index.js';
  import { RadioGroup, RadioPrimitive } from '#lib/components/ui/radio-group/index.js';
  import { Separator } from '#lib/components/ui/separator/index.js';
  import { Textarea } from '#lib/components/ui/textarea/index.js';
  import { cn } from '#lib/utils.js';

  const moods = [
    { value: 'awful', emoji: '😢', label: 'Awful' },
    { value: 'bad', emoji: '😔', label: 'Not Great' },
    { value: 'okay', emoji: '😐', label: 'Just Okay' },
    { value: 'good', emoji: '🙂', label: 'Good' },
    { value: 'great', emoji: '🥰', label: 'Loving It' }
  ];

  let mood = $state('okay');
  let note = $state('');
  const selected = $derived(moods.find((m) => m.value === mood));
</script>

<Card class="w-full max-w-md rounded-3xl">
  <CardPanel class="flex flex-col gap-6 p-6">
    <header class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span
          class="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <MessageCircleIcon class="size-5" />
        </span>
        <span class="text-xl font-semibold tracking-tight">Quick Survey</span>
      </div>
      <Button variant="ghost" size="icon" class="rounded-full bg-muted" aria-label="Close">
        <XIcon />
      </Button>
    </header>
    <Separator />
    <div class="flex flex-col items-center gap-2 text-center">
      <h2 class="text-2xl font-bold tracking-tight">What is your mood today?</h2>
      <p class="text-muted-foreground max-w-xs text-sm">
        Every answer you share guides our team as we shape new features and improve the way we
        support you.
      </p>
    </div>
    <div class="flex flex-col items-center gap-3">
      <RadioGroup
        bind:value={mood}
        aria-label="Mood"
        class="flex-row items-center justify-between gap-2"
      >
        {#each moods as m (m.value)}
          <RadioPrimitive.Root
            value={m.value}
            aria-label={m.label}
            class={cn(
              'flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-transparent text-2xl outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring',
              'not-data-checked:opacity-60 not-data-checked:grayscale not-data-checked:hover:opacity-100',
              'data-checked:size-[4.5rem] data-checked:border-foreground data-checked:bg-muted data-checked:text-5xl data-checked:shadow-md'
            )}
          >
            {m.emoji}
          </RadioPrimitive.Root>
        {/each}
      </RadioGroup>
      <span
        class="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
        aria-live="polite"
      >
        {selected?.label}
      </span>
    </div>
    <Textarea
      bind:value={note}
      placeholder="Write a Note..."
      class="[&_textarea]:min-h-32"
      aria-label="Note"
    />
    <Button size="lg" class="w-full rounded-full">Send Answer</Button>
  </CardPanel>
</Card>
