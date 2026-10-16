<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';

  let inputRef = $state<HTMLInputElement | null>(null);
  let value = $state('Clear me');
</script>

<InputGroup>
  <InputGroupInput
    bind:ref={inputRef}
    aria-label="Text input with clear button"
    oninput={(e) => {
      value = (e.currentTarget as HTMLInputElement).value;
    }}
    placeholder="Enter text"
    type="text"
    {value}
  />
  {#if value}
    <InputGroupAddon align="inline-end">
      <Button
        aria-label="Clear input"
        onclick={() => {
          value = '';
          inputRef?.focus();
        }}
        size="icon-xs"
        variant="ghost"
      >
        <X aria-hidden="true" />
      </Button>
    </InputGroupAddon>
  {/if}
</InputGroup>
