<script lang="ts">
  import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
  import CheckCheckIcon from '@lucide/svelte/icons/check-check';
  import ClockIcon from '@lucide/svelte/icons/clock';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    ChatDeliveryIndicator,
    ChatMessageBubble,
    ChatMemberSection,
    ChatMessageInfo as ChatMessageInfoView
  } from '#lib/components/ui/chat/index.js';
  import {
    Drawer,
    DrawerClose,
    DrawerDescription,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle
  } from '#lib/components/ui/drawer/index.js';
  import { cn } from '#lib/utils.js';
  import ChatDemoMemberAvatar from './chat-demo-member-avatar.svelte';
  import ChatDemoMessageBody from './chat-demo-message-body.svelte';
  import { DELIVERY_LABELS, getMessageDelivery, groupMessageReceipts } from './chat-demo-receipts';
  import { CHAT_MEMBERS, type ChatMessage, type MemberId } from './chat-demo-state';

  type Props = {
    message?: ChatMessage;
    recipients: readonly MemberId[];
    replyMessage?: ChatMessage;
    position: 'bottom' | 'right';
    open: boolean;
    onClosed: () => void;
    returnFocus: () => HTMLElement | null;
  };

  let {
    message,
    recipients,
    replyMessage,
    position,
    open = $bindable(),
    onClosed,
    returnFocus
  }: Props = $props();

  const sections = [
    { key: 'read', label: 'Read by', icon: CheckCheckIcon },
    { key: 'delivered', label: 'Delivered to', icon: CheckCheckIcon },
    { key: 'pending', label: 'Pending delivery', icon: ClockIcon }
  ] as const;

  let back = $state<HTMLElement | null>(null);

  const groups = $derived(
    message ? groupMessageReceipts(message, recipients) : { read: [], delivered: [], pending: [] }
  );
  const visibleSections = $derived(sections.filter(({ key }) => groups[key].length > 0));
  const delivery = $derived(message ? getMessageDelivery(message, recipients) : 'sent');
</script>

<Drawer {position} bind:open onOpenChangeComplete={(isOpen) => !isOpen && onClosed()}>
  {#if message}
    <DrawerPopup
      variant="inset"
      initialFocus={back ?? true}
      finalFocus={() => returnFocus() ?? true}
      class={position === 'bottom' ? '[--drawer-height:92dvh]' : undefined}
    >
      <DrawerHeader>
        <div class="flex items-start gap-2">
          <DrawerClose
            bind:ref={back}
            class={buttonVariants({ variant: 'ghost', size: 'icon-sm' })}
            aria-label="Back to conversation"
          >
            <ArrowLeftIcon />
          </DrawerClose>
          <div class="flex min-w-0 flex-1 flex-col gap-2">
            <DrawerTitle>Message info</DrawerTitle>
            <DrawerDescription>The studio</DrawerDescription>
          </div>
        </div>
      </DrawerHeader>
      <DrawerPanel>
        <ChatMessageInfoView>
          {#snippet bubble()}
            <ChatMessageBubble side="outgoing">
              <ChatDemoMessageBody {message} {replyMessage} />
            </ChatMessageBubble>
          {/snippet}
          {#snippet metadata()}
            <time>{message.dateLabel}, {message.time}</time>
            <ChatDeliveryIndicator status={delivery} label={DELIVERY_LABELS[delivery]} />
          {/snippet}
          {#each visibleSections as { key, label, icon: Icon } (key)}
            <ChatMemberSection
              {label}
              members={groups[key].map((receipt) => ({
                id: receipt.member,
                name: CHAT_MEMBERS[receipt.member].name
              }))}
            >
              {#snippet heading()}
                <Icon
                  aria-hidden="true"
                  class={cn(
                    'size-3.5',
                    key === 'read' ? 'text-sky-600 dark:text-sky-400' : 'text-muted-foreground'
                  )}
                />
                {label}
              {/snippet}
              {#snippet avatar(entry)}
                <ChatDemoMemberAvatar member={entry.id as MemberId} />
              {/snippet}
              {#snippet action(entry)}
                {@const receipt = groups[key].find((item) => item.member === entry.id)}
                <span class="text-muted-foreground text-xs tabular-nums">
                  {receipt?.readAt ?? receipt?.deliveredAt ?? 'Pending'}
                </span>
              {/snippet}
            </ChatMemberSection>
          {/each}
        </ChatMessageInfoView>
      </DrawerPanel>
    </DrawerPopup>
  {/if}
</Drawer>
