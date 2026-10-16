<script lang="ts">
  import { Avatar, AvatarFallback } from '#lib/components/ui/avatar/index.js';
  import { cn } from '#lib/utils.js';
  import { CHAT_MEMBERS, type MemberId } from './chat-demo-state';

  let { member, class: className }: { member: MemberId; class?: string } = $props();
</script>

<Avatar aria-hidden="true" class={cn('size-7 text-[.625rem]', className)}>
  <AvatarFallback class={CHAT_MEMBERS[member].color}>{CHAT_MEMBERS[member].initials}</AvatarFallback
  >
</Avatar>
