<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import ChatMemberList from './chat-members.svelte';

  let {
    label,
    heading,
    members,
    ...restProps
  }: ComponentProps<typeof ChatMemberList> & {
    label: string;
    heading?: Snippet | string;
  } = $props();
</script>

{#if members.length}
  <section aria-label={label} class="flex flex-col gap-4">
    {#if heading}
      <h3 class="m-0 flex items-center gap-2 font-medium text-muted-foreground text-xs">
        {#if typeof heading === 'string'}{heading}{:else}{@render heading()}{/if}
      </h3>
    {/if}
    <ChatMemberList {members} {...restProps} />
  </section>
{/if}
