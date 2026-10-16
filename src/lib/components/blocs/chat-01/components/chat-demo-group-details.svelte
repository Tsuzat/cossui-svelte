<script lang="ts">
  import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
  import BanIcon from '@lucide/svelte/icons/ban';
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import LogOutIcon from '@lucide/svelte/icons/log-out';
  import MicIcon from '@lucide/svelte/icons/mic';
  import MicOffIcon from '@lucide/svelte/icons/mic-off';
  import UserXIcon from '@lucide/svelte/icons/user-x';
  import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle,
    AlertDialogTrigger
  } from '#lib/components/ui/alert-dialog/index.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { ChatMemberSection } from '#lib/components/ui/chat/index.js';
  import {
    Drawer,
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger
  } from '#lib/components/ui/drawer/index.js';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';
  import ChatDemoMemberAvatar from './chat-demo-member-avatar.svelte';
  import { CHAT_MEMBERS, type MemberId } from './chat-demo-state';

  type Props = {
    open: boolean;
    onClosed: () => void;
    position: 'bottom' | 'right';
    activeMembers: readonly MemberId[];
    mutedMembers: readonly MemberId[];
    bannedMembers: readonly MemberId[];
    onToggleMute: (member: MemberId) => void;
    onRemove: (member: MemberId) => void;
    onBan: (member: MemberId) => void;
    onUnban: (member: MemberId) => void;
    canLeave: boolean;
    onLeave: () => void;
    conversationFocus: () => HTMLElement | null;
  };

  let {
    open = $bindable(),
    onClosed,
    position,
    activeMembers,
    mutedMembers,
    bannedMembers,
    onToggleMute,
    onRemove,
    onBan,
    onUnban,
    canLeave,
    onLeave,
    conversationFocus
  }: Props = $props();

  const memberNames = $derived(activeMembers.map((member) => CHAT_MEMBERS[member].name).join(', '));
  const previewNames = $derived(
    activeMembers
      .slice(0, 3)
      .map((member) => CHAT_MEMBERS[member].name)
      .join(', ')
  );

  let pendingRemoval = $state<MemberId | null>(null);
  let moderationAction = $state<'remove' | 'ban'>('remove');
  let confirmOpen = $state(false);
  let leaveConfirmOpen = $state(false);
  let leaveRequested = false;
  let trigger = $state<HTMLElement | null>(null);
  let back = $state<HTMLElement | null>(null);

  const entries = $derived(
    activeMembers.map((member) => ({ id: member, name: CHAT_MEMBERS[member].name }))
  );
  const banned = $derived(
    bannedMembers.map((member) => ({ id: member, name: CHAT_MEMBERS[member].name, dimmed: true }))
  );

  function askModeration(member: MemberId, action: 'remove' | 'ban') {
    pendingRemoval = member;
    moderationAction = action;
    confirmOpen = true;
  }
</script>

<Drawer {position} bind:open onOpenChangeComplete={(isOpen) => !isOpen && onClosed()}>
  <DrawerTrigger
    bind:ref={trigger}
    class="block max-w-full truncate text-start hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
    aria-label={`View group members: ${memberNames}`}
  >
    {previewNames}{activeMembers.length > 3 ? ' and others' : ''}
  </DrawerTrigger>
  <DrawerPopup
    variant="inset"
    initialFocus={back ?? true}
    finalFocus={trigger ?? true}
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
          <DrawerTitle>Group members</DrawerTitle>
          <DrawerDescription>The studio · {activeMembers.length} members</DrawerDescription>
        </div>
      </div>
    </DrawerHeader>
    <DrawerPanel>
      <div class="flex flex-col gap-7">
        <ChatMemberSection label="Current members" members={entries}>
          {#snippet avatar(entry)}
            <ChatDemoMemberAvatar member={entry.id as MemberId} />
          {/snippet}
          {#snippet badges(entry)}
            {@const member = entry.id as MemberId}
            {#if member === 'you'}<Badge variant="secondary">You</Badge>{/if}
            {#if CHAT_MEMBERS[member].role === 'host'}<Badge variant="default">Host</Badge>{/if}
            {#if CHAT_MEMBERS[member].role === 'co-host'}
              <Badge variant="default">Co-host</Badge>
            {/if}
            {#if mutedMembers.includes(member)}
              <Badge variant="error"><MicOffIcon aria-hidden="true" /> Muted</Badge>
            {/if}
          {/snippet}
          {#snippet action(entry)}
            {@const member = entry.id as MemberId}
            {#if CHAT_MEMBERS[member].role === 'guest'}
              <Menu>
                <MenuTrigger
                  class={buttonVariants({ variant: 'ghost', size: 'icon-sm' })}
                  aria-label={`More actions for ${CHAT_MEMBERS[member].name}`}
                >
                  <EllipsisIcon class="size-4" aria-hidden="true" />
                </MenuTrigger>
                <MenuPopup align="end">
                  <MenuItem onclick={() => onToggleMute(member)}>
                    {#if mutedMembers.includes(member)}
                      <MicIcon aria-hidden="true" /> Unmute
                    {:else}
                      <MicOffIcon aria-hidden="true" /> Mute
                    {/if}
                  </MenuItem>
                  <MenuItem variant="destructive" onclick={() => askModeration(member, 'remove')}>
                    <UserXIcon aria-hidden="true" /> Remove from chat
                  </MenuItem>
                  <MenuItem variant="destructive" onclick={() => askModeration(member, 'ban')}>
                    <BanIcon aria-hidden="true" /> Ban from chat
                  </MenuItem>
                </MenuPopup>
              </Menu>
            {/if}
          {/snippet}
        </ChatMemberSection>
        <ChatMemberSection label="Banned users" heading="Banned users" members={banned}>
          {#snippet avatar(entry)}
            <ChatDemoMemberAvatar member={entry.id as MemberId} />
          {/snippet}
          {#snippet action(entry)}
            <Button
              variant="outline"
              size="xs"
              aria-label={`Unban ${entry.name}`}
              onclick={() => onUnban(entry.id as MemberId)}
            >
              Unban
            </Button>
          {/snippet}
        </ChatMemberSection>
      </div>
    </DrawerPanel>
    {#if canLeave}
      <AlertDialog
        bind:open={leaveConfirmOpen}
        onOpenChange={(next) => {
          if (next) leaveRequested = false;
        }}
        onOpenChangeComplete={(isOpen) => {
          if (!isOpen && leaveRequested) onLeave();
        }}
      >
        <DrawerFooter>
          <AlertDialogTrigger
            class={buttonVariants({ variant: 'destructive-outline', size: 'sm' })}
          >
            <LogOutIcon aria-hidden="true" />
            Leave chat
          </AlertDialogTrigger>
        </DrawerFooter>
        <AlertDialogPopup finalFocus={() => (leaveRequested ? conversationFocus() : true)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave this chat?</AlertDialogTitle>
            <AlertDialogDescription>
              You’ll stop receiving messages from this group. Your ticket for the event stays valid.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
            <AlertDialogClose
              class={buttonVariants({ variant: 'destructive' })}
              onclick={() => (leaveRequested = true)}
            >
              Leave chat
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    {/if}
    <AlertDialog bind:open={confirmOpen}>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {moderationAction === 'ban' ? 'Ban' : 'Remove'}
            {pendingRemoval ? CHAT_MEMBERS[pendingRemoval].name : 'member'} from the chat?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {moderationAction === 'ban'
              ? 'They won’t be able to rejoin until you lift the ban. Their ticket stays valid.'
              : 'They’ll leave the chat but can rejoin through their ticket invitation. Their ticket stays valid.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
          <Button
            variant="destructive"
            onclick={() => {
              if (!pendingRemoval) return;
              if (moderationAction === 'ban') onBan(pendingRemoval);
              else onRemove(pendingRemoval);
              confirmOpen = false;
            }}
          >
            {moderationAction === 'ban' ? 'Ban from chat' : 'Remove from chat'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  </DrawerPopup>
</Drawer>
