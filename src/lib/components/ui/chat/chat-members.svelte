<script lang="ts" module>
  export type ChatMemberEntry = {
    id: string;
    name: string;
    dimmed?: boolean;
  };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let {
    members,
    avatar,
    badges,
    action,
    class: className,
    ...restProps
  }: Omit<HTMLAttributes<HTMLUListElement>, 'children'> & {
    members: readonly ChatMemberEntry[];
    /** Leading avatar, rendered per member. */
    avatar?: Snippet<[ChatMemberEntry]>;
    /** Badges shown after the name. */
    badges?: Snippet<[ChatMemberEntry]>;
    /** Trailing action or status. */
    action?: Snippet<[ChatMemberEntry]>;
  } = $props();
</script>

<ul
  data-slot="chat-member-list"
  class={cn('m-0 flex list-none flex-col gap-2 p-0', className)}
  {...restProps}
>
  {#each members as member (member.id)}
    <li class="flex min-w-0 items-center gap-3">
      {@render avatar?.(member)}
      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-x-1.5 gap-y-1">
        <span
          class={cn('truncate text-sm', member.dimmed ? 'text-muted-foreground' : 'font-medium')}
        >
          {member.name}
        </span>
        {@render badges?.(member)}
      </div>
      {@render action?.(member)}
    </li>
  {/each}
</ul>
