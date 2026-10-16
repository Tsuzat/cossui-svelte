<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let {
    text,
    mentions = [],
    class: className,
    ...restProps
  }: Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & {
    text: string;
    mentions?: readonly string[];
  } = $props();

  // Split into plain runs and highlighted `@mention` runs.
  const segments = $derived.by(() => {
    const names = new Set(mentions.map((name) => `@${name}`));
    const parts = text.split(/(@[\p{L}\p{N}_.-]+)/u);
    return parts.map((part, index) => {
      if (index > 0 && !/(?:^|\s)$/.test(parts[index - 1] ?? '')) return { plain: part };
      const mention = names.has(part) ? part : part.replace(/[.-]+$/, '');
      if (!names.has(mention)) return { plain: part };
      return { mention, rest: part.slice(mention.length) };
    });
  });
</script>

<p
  class={cn('m-0 whitespace-pre-wrap break-words text-sm leading-[1.55]', className)}
  {...restProps}
>
  {#each segments as segment, index (index)}
    {#if 'mention' in segment}<span
        ><span class="font-medium">{segment.mention}</span>{segment.rest}</span
      >{:else}{segment.plain}{/if}
  {/each}
</p>
