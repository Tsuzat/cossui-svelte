<script lang="ts">
  import { Avatar as AvatarPrimitive } from '@shardsui/svelte/avatar';
  import type { ComponentProps } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof AvatarPrimitive.Root> &
    // Attributes for `as="a"` / `as="button"` avatars, spread onto the rendered element.
    Pick<HTMLAnchorAttributes, 'href' | 'rel' | 'target'> &
    Pick<HTMLButtonAttributes, 'disabled' | 'type'> = $props();
</script>

<AvatarPrimitive.Root
  bind:ref
  data-slot="avatar"
  class={cn(
    'relative isolate inline-flex size-(--avatar-size,--spacing(8)) shrink-0 select-none items-center justify-center overflow-hidden rounded-full align-middle font-medium text-[calc(var(--avatar-size,--spacing(8))*0.375)]/none',
    className
  )}
  {...restProps}
/>
