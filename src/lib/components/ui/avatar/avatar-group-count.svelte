<script lang="ts">
  import type { Avatar as AvatarPrimitive } from '@shardsui/svelte/avatar';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '#lib/utils.js';
  import AvatarFallback from './avatar-fallback.svelte';
  import Avatar from './avatar.svelte';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: Omit<ComponentProps<typeof AvatarPrimitive.Root>, 'children'> & {
    children?: Snippet;
  } = $props();
</script>

<Avatar
  bind:ref
  class={cn('text-muted-foreground', className)}
  data-slot="avatar-group-count"
  {...restProps}
>
  <AvatarFallback>{@render children?.()}</AvatarFallback>
</Avatar>
