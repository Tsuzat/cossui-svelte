<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Checkbox } from '#lib/components/ui/checkbox/index.js';

  const id = $props.id();
</script>

<Badge
  class="relative outline-none has-data-unchecked:bg-muted has-data-unchecked:text-muted-foreground has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-1 has-focus-visible:ring-offset-background"
>
  <Checkbox class="peer sr-only absolute" checked {id} />
  <CheckIcon aria-hidden="true" class="hidden peer-data-[state=checked]:block" />
  <label class="cursor-pointer select-none after:absolute after:inset-0" for={id}>
    Selectable
  </label>
</Badge>
