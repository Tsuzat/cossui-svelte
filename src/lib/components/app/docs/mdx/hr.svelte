<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, ...restProps }: HTMLAttributes<HTMLHRElement> = $props();
</script>

<hr class={cn('my-4 md:my-8', className)} {...restProps} />
