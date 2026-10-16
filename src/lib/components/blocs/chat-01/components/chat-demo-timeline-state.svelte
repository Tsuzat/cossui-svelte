<script lang="ts">
  import BanIcon from '@lucide/svelte/icons/ban';
  import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
  import LockIcon from '@lucide/svelte/icons/lock';
  import LogOutIcon from '@lucide/svelte/icons/log-out';
  import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
  import UserXIcon from '@lucide/svelte/icons/user-x';
  import { Button } from '#lib/components/ui/button/index.js';
  import { ChatEmptyState, ChatLoadingState } from '#lib/components/ui/chat/index.js';
  import type { ChatScenario } from './chat-demo-state';

  type Props = {
    scenario: ChatScenario;
    onRecover: () => void;
    memberCount: number;
    joined: boolean;
    onJoin: () => void;
  };

  let { scenario, onRecover, memberCount, joined, onJoin }: Props = $props();

  const content = $derived(
    (
      {
        empty: {
          title: joined ? 'A little hello goes a long way' : 'Join the event chat',
          description: joined
            ? 'Start the conversation. Everyone in the group can join in.'
            : 'Talk with the host and other guests who are going. Only people who join can read or send messages.',
          Icon: MessageCircleIcon
        },
        error: {
          title: 'Couldn’t load the conversation',
          description: 'Your draft is safe. Try loading the messages again.',
          Icon: CircleAlertIcon
        },
        'access-lost': {
          title: 'This conversation is no longer available',
          description: 'You no longer have access. Contact the group admin if this seems wrong.',
          Icon: LockIcon
        },
        removed: {
          title: 'You were removed from this chat',
          description:
            'A host removed you. You can rejoin through your ticket invitation. Your ticket for the event is still valid.',
          Icon: UserXIcon
        },
        banned: {
          title: 'You were banned from this chat',
          description:
            'You can’t rejoin unless a host lifts the ban. Your ticket for the event is still valid.',
          Icon: BanIcon
        },
        left: {
          title: 'You left this chat',
          description:
            'You’ll no longer receive messages from this group. Your ticket for the event is still valid.',
          Icon: LogOutIcon
        }
      } as Record<string, { title: string; description: string; Icon: typeof BanIcon }>
    )[scenario]
  );
</script>

{#if scenario === 'loading'}
  <ChatLoadingState label="Loading conversation">
    <Button variant="outline" size="sm" onclick={onRecover}>Finish loading preview</Button>
  </ChatLoadingState>
{:else if content}
  {@const Icon = content.Icon}
  <ChatEmptyState title={content.title} description={content.description}>
    {#snippet icon()}
      <Icon aria-hidden="true" />
    {/snippet}
    {#if scenario === 'empty' && !joined}
      <div class="flex flex-col items-center gap-2">
        <Button onclick={onJoin}>Join chat</Button>
        <p class="text-muted-foreground text-xs">
          {memberCount}
          {memberCount === 1 ? 'person is' : 'people are'} already in the chat
        </p>
      </div>
    {/if}
    {#if scenario === 'error'}
      <Button variant="outline" size="sm" onclick={onRecover}>Try again</Button>
    {/if}
    {#if scenario === 'left' || scenario === 'removed'}
      <Button onclick={onRecover}>Rejoin chat</Button>
    {/if}
  </ChatEmptyState>
{/if}
