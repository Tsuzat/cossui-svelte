<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '#lib/components/ui/collapsible/index.js';
  import { cn } from '#lib/utils.js';
  import type { AttrState, DiffNode, DiffStatus } from '../diff.js';
  // oxlint-disable-next-line import/no-cycle -- recursive component
  import TreeNode from './tree-node.svelte';

  let { node }: { node: DiffNode } = $props();

  let open = $state(true);

  const rowClass: Record<DiffStatus, string> = {
    same: '',
    added: 'bg-success/12 text-success-foreground',
    removed: 'bg-destructive/12 text-destructive-foreground',
    changed: 'bg-warning/10'
  };
  const attrClass: Record<AttrState, string> = {
    same: '',
    added: 'border-success/35 bg-success/12 text-success-foreground',
    removed: 'border-destructive/35 bg-destructive/12 text-destructive-foreground line-through',
    changed: 'cursor-help border-warning/40 bg-warning/10 text-warning-foreground'
  };
</script>

{#snippet header()}
  <span class={cn('font-semibold', node.status === 'same' ? 'text-info-foreground' : '')}
    >&lt;{node.tag}</span
  >
  <span class="font-normal text-muted-foreground">{node.selector}&gt;</span>
  {#each node.attrs as attr (attr.name)}
    <Badge
      class={cn('font-mono text-[10.5px]', attrClass[attr.state])}
      size="sm"
      title={attr.state === 'changed' ? `other side: ${attr.otherValue}` : undefined}
      variant="outline"
    >
      {attr.name}="{attr.value}"
    </Badge>
  {/each}
  {#if node.leafText}
    <span class="text-muted-foreground italic">"{node.leafText}"</span>
  {/if}
  {#if node.textDiffers}
    <Badge size="sm" variant="warning">text differs</Badge>
  {/if}
{/snippet}

<!-- w-max: the collapsible panel is overflow-hidden, so each node must grow to its widest descendant row or wide rows get clipped when the panel scrolls horizontally -->
<div class="ml-3.5 w-max" data-status={node.status}>
  {#if node.children.length === 0}
    <div
      class={cn(
        'flex w-max items-baseline gap-1.5 rounded-md py-0.5 pr-1.5 pl-5 whitespace-nowrap hover:bg-accent/50',
        rowClass[node.status]
      )}
    >
      {@render header()}
    </div>
  {:else}
    <Collapsible bind:open>
      <div
        class={cn(
          'flex w-max items-baseline gap-1.5 rounded-md py-0.5 pr-1.5 pl-1 whitespace-nowrap hover:bg-accent/50',
          rowClass[node.status]
        )}
      >
        <CollapsibleTrigger
          aria-label={open ? 'Collapse' : 'Expand'}
          class="inline-flex size-4 cursor-pointer items-center justify-center self-center rounded-sm text-muted-foreground outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
        >
          {#if open}
            <ChevronDownIcon class="size-3" />
          {:else}
            <ChevronRightIcon class="size-3" />
          {/if}
        </CollapsibleTrigger>
        {@render header()}
      </div>
      <CollapsiblePanel class="ml-1.5">
        {#each node.children as child, i (i)}
          <TreeNode node={child} />
        {/each}
      </CollapsiblePanel>
    </Collapsible>
  {/if}
</div>
