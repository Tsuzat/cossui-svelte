<script lang="ts">
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import Paperclip from '@lucide/svelte/icons/paperclip';
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

<div class="flex w-full max-w-xl flex-col gap-3">
  <Composer
    bind:value
    onSubmit={(draft) => {
      notice = `Sent: ${getComposerText(draft)}`;
      value = [];
    }}
  >
    <ComposerInput as="textarea" aria-label="Plain message" placeholder="Write a message…" />
    <ComposerActions>
      <ComposerActionGroup>
        <Button
          aria-label="Attach a file"
          size="icon"
          type="button"
          variant="ghost"
          onclick={() => (notice = 'Attach a file')}
        >
          <Paperclip aria-hidden="true" />
        </Button>
      </ComposerActionGroup>
      <ComposerActionGroup align="end">
        <ComposerSubmit aria-label="Send message" size="icon">
          <ArrowUp aria-hidden="true" />
        </ComposerSubmit>
      </ComposerActionGroup>
    </ComposerActions>
  </Composer>
  <p class="min-h-5 text-muted-foreground text-sm" role="status">{notice}</p>
</div>
