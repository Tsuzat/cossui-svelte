<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import GripIcon from '@lucide/svelte/icons/grip';
  import PencilIcon from '@lucide/svelte/icons/pencil';
  import XIcon from '@lucide/svelte/icons/x';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardPanel } from '#lib/components/ui/card/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { OTPField, OTPFieldInput } from '#lib/components/ui/otp-field/index.js';
  import { Spinner } from '#lib/components/ui/spinner/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';

  let code = $state('4271');
  let email = $state('riley.parker88@example.com');
  let draft = $state('');
  let editing = $state(false);
  let inputRef = $state<HTMLInputElement | null>(null);
  const valid = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.trim()));

  let resending = $state(false);

  async function resend() {
    if (resending) return;
    resending = true;
    try {
      // Placeholder for the real "resend code" request.
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toastManager.add({ title: `Verification code sent to ${email}`, type: 'success' });
    } finally {
      resending = false;
    }
  }

  function startEdit() {
    draft = email;
    editing = true;
  }

  function cancelEdit() {
    editing = false;
  }

  function saveEdit() {
    if (!valid) return;
    if (draft.trim() !== email) {
      email = draft.trim();
      code = '';
    }
    editing = false;
  }

  $effect(() => {
    if (editing) inputRef?.focus();
  });
</script>

<Card class="w-full max-w-md rounded-3xl">
  <CardPanel class="flex flex-col gap-6 p-6">
    <header class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <span class="flex size-14 items-center justify-center rounded-full bg-muted">
          <GripIcon class="size-6" />
        </span>
        <h2 class="text-xl font-bold tracking-tight">Verification code</h2>
      </div>
      <Button variant="ghost" size="icon" class="rounded-full bg-muted" aria-label="Close">
        <XIcon />
      </Button>
    </header>
    <div class="flex flex-col gap-2">
      <p class="text-muted-foreground text-sm">A 4 digit code was just sent to this address</p>
      {#if editing}
        <form
          class="flex items-center gap-2"
          onsubmit={(e) => {
            e.preventDefault();
            saveEdit();
          }}
        >
          <Input
            bind:ref={inputRef}
            bind:value={draft}
            type="email"
            aria-label="Email address"
            aria-invalid={draft !== '' && !valid}
            onkeydown={(e) => e.key === 'Escape' && cancelEdit()}
          />
          <Button type="submit" size="icon" disabled={!valid} aria-label="Save email">
            <CheckIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Cancel"
            onclick={cancelEdit}
          >
            <XIcon />
          </Button>
        </form>
      {:else}
        <div class="flex items-center gap-3">
          <span class="font-semibold">{email}</span>
          <button
            type="button"
            class="flex items-center gap-1 text-sm hover:underline"
            onclick={startEdit}
          >
            <PencilIcon class="size-3.5" /> Edit
          </button>
        </div>
      {/if}
    </div>
    <form class="flex flex-col gap-6">
      <OTPField bind:value={code} maxlength={4} class="justify-between">
        {#snippet children({ cells })}
          {#each cells as cell (cell)}
            <OTPFieldInput
              {cell}
              class="size-16 rounded-2xl bg-muted text-2xl sm:size-16 sm:text-2xl"
            />
          {/each}
        {/snippet}
      </OTPField>
      <p class="text-muted-foreground text-center text-sm">
        Nothing arrived yet?
        <button
          type="button"
          class="text-foreground inline-flex items-center gap-1.5 font-semibold disabled:opacity-64"
          disabled={resending}
          onclick={resend}
        >
          {#if resending}<Spinner class="size-3.5" />{/if}
          Send it again
        </button>
      </p>
      <div class="flex flex-col gap-3">
        <Button type="submit" size="lg" class="rounded-full">Confirm Code</Button>
        <Button type="button" variant="outline" size="lg" class="rounded-full">Dismiss</Button>
      </div>
    </form>
  </CardPanel>
</Card>
