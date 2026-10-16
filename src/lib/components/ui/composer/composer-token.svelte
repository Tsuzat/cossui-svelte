<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';
  import type { ComposerTokenPart } from './composer-editor.svelte.js';

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'contenteditable'> & {
    ref?: HTMLSpanElement | null;
    variant?: 'default' | 'chip';
    token: ComposerTokenPart;
    icon?: Snippet;
    children?: Snippet;
  };

  let {
    ref = $bindable(null),
    variant = 'default',
    token,
    icon,
    children,
    class: className,
    ...restProps
  }: Props = $props();
</script>

<span
  bind:this={ref}
  class={cn(
    'wrap-break-word inline cursor-default align-baseline font-normal text-primary data-[variant=default]:font-medium data-[variant=chip]:box-decoration-clone data-[variant=chip]:rounded-md data-[variant=chip]:bg-accent data-[variant=chip]:px-1.5 data-[variant=chip]:py-px data-[variant=chip]:text-accent-foreground [&_[data-slot=composer-token-icon]:empty]:hidden [&_[data-slot=composer-token-icon]>svg]:size-3.5',
    className
  )}
  contenteditable="false"
  data-kind={token.kind}
  data-slot="composer-token"
  data-type={token.type}
  data-variant={variant}
  {...restProps}
>
  {#if variant === 'chip' && icon}
    <span
      aria-hidden="true"
      class="inline whitespace-nowrap opacity-80 after:content-['\2060\00a0'] [&>svg]:inline-block [&>svg]:align-[-0.125em]"
      data-slot="composer-token-icon"
    >
      {@render icon()}
    </span>
  {/if}
  <span data-slot="composer-token-label"
    >{#if variant === 'default'}{token.trigger}{/if}{#if children}{@render children()}{:else}{token.label}{/if}</span
  >
</span>
