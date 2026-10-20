<script lang="ts">
  import { Avatar as AvatarPrimitive } from '@shardsui/svelte/avatar';
  import type { ComponentProps } from 'svelte';
  import { cn } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof AvatarPrimitive.Fallback> = $props();
</script>

<AvatarPrimitive.Fallback
  bind:ref
  class={cn('flex size-full items-center justify-center rounded-[inherit] bg-border', className)}
  data-slot="avatar-fallback"
  {...restProps}
></AvatarPrimitive.Fallback>
