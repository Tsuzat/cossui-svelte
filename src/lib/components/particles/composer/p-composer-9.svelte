<script lang="ts">
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import Plus from '@lucide/svelte/icons/plus';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Composer,
    ComposerActionGroup,
    ComposerActions,
    ComposerInput,
    ComposerSubmit,
    getComposerText,
    type ComposerValue
  } from '#lib/components/ui/composer/index.js';

  let value = $state<ComposerValue>([]);
  let notice = $state('');
</script>

<div class="flex w-full max-w-xl flex-col gap-2">
  <Composer
    class="rounded-[calc(--spacing(6.5)+1px)] before:rounded-[--spacing(6.5)] sm:rounded-[calc(--spacing(6)+1px)] sm:before:rounded-[--spacing(6)]"
    layout="adaptive"
    bind:value
    onSubmit={(draft) => {
      notice = `Sent: ${getComposerText(draft)}`;
      value = [];
    }}
  >
    <ComposerInput aria-label="Message" placeholder="Write a message…" />
    <ComposerActions>
      <ComposerActionGroup>
        <Button
          aria-label="Add an attachment"
          class="rounded-full"
          size="icon"
          type="button"
          variant="ghost"
          onclick={() => (notice = 'Add an attachment')}
        >
          <Plus aria-hidden="true" />
        </Button>
      </ComposerActionGroup>
      <ComposerActionGroup align="end">
        <ComposerSubmit aria-label="Send message" class="rounded-full" size="icon">
          <ArrowUp aria-hidden="true" />
        </ComposerSubmit>
      </ComposerActionGroup>
    </ComposerActions>
  </Composer>
  <p class="min-h-5 text-muted-foreground text-sm" role="status">{notice}</p>
</div>
