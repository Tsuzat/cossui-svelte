<script lang="ts">
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
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
    class="rounded-[calc(--spacing(5.5)+1px)] [--composer-padding:--spacing(1)] before:rounded-[--spacing(5.5)] data-[layout=adaptive]:not-data-multiline:px-[calc(--spacing(1)-1px)] sm:rounded-[calc(--spacing(5)+1px)] sm:before:rounded-[--spacing(5)]"
    layout="adaptive"
    bind:value
    onSubmit={(draft) => {
      notice = `Sent: ${getComposerText(draft)}`;
      value = [];
    }}
  >
    <ComposerInput aria-label="Message" class="px-2" placeholder="Write a message…" />
    <ComposerActions class="mx-[calc(--spacing(1)-1px)]">
      <ComposerActionGroup align="end">
        <ComposerSubmit aria-label="Send message" class="rounded-full" size="icon">
          <ArrowUp aria-hidden="true" />
        </ComposerSubmit>
      </ComposerActionGroup>
    </ComposerActions>
  </Composer>
  <p class="min-h-5 text-muted-foreground text-sm" role="status">{notice}</p>
</div>
