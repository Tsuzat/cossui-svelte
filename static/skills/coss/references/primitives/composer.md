# coss Composer (cossui-svelte only)

## When to use

- Chat/message inputs: auto-growing input with an action row, Enter-to-send, and optional `@mentions` / `/slash` actions rendered as tokens.

## When NOT to use

- For a plain multi-line form field -> use Textarea.
- For a full chat surface (messages, bubbles) -> pair it with the Chat building blocks ([chat.md](chat.md)).

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/composer.json
```

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    Composer,
    ComposerActionGroup,
    ComposerActions,
    ComposerInput,
    ComposerItem,
    ComposerList,
    ComposerPopup,
    ComposerStatus,
    ComposerSubmit,
    ComposerToken,
    getComposerText,
    useComposerContext,
    useComposerFilter,
    type ComposerTrigger,
    type ComposerValue
  } from '#lib/components/ui/composer/index.js';
</script>
```

Also exported: `ComposerEditor` and the types `ComposerChangeDetails`, `ComposerEditorOptions`, `ComposerItemValue`, `ComposerPart`, `ComposerQuery`, `ComposerTokenPart`.

## Minimal pattern

```svelte
<script lang="ts">
  import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
  let value = $state<ComposerValue>([]);
</script>

<Composer
  bind:value
  onSubmit={(draft) => {
    send(getComposerText(draft));
    value = [];
  }}
>
  <ComposerInput as="textarea" aria-label="Message" placeholder="Write a message…" />
  <ComposerActions>
    <ComposerActionGroup align="end">
      <ComposerSubmit aria-label="Send message" size="icon">
        <ArrowUpIcon aria-hidden="true" />
      </ComposerSubmit>
    </ComposerActionGroup>
  </ComposerActions>
</Composer>
```

- The draft is structured (`ComposerValue` = text/mention/action parts); `getComposerText()` converts it to a string. Submission does **not** clear the draft — reset `value` yourself.
- Enter submits, Shift+Enter inserts a line break (`submitOnEnter="always" | "desktop" | "never"`). The submit button disables itself for empty drafts.
- `Composer` renders its own `<form>` — never nest it inside another form. `name` adds the plain text to `FormData`.
- `ComposerInput as="div"` (default, contenteditable, supports tokens) or `as="textarea"` (plain text only). One input per composer; give it `aria-label`.

## Patterns from coss particles

- **Sending state**: `submitDisabled={sending}` blocks Enter and the button while keeping the draft editable; `ComposerSubmit` is a coss `Button` (`variant`, `size`, `loading`). `allowEmpty` permits sending attachments without text. `disabled` / `readOnly` lock the input too.
- **Size**: CSS variables on `Composer`, e.g. `class="[--composer-min-rows:2] [--composer-max-rows:3] md:[--composer-max-rows:6]"` (also `--composer-padding`, `--composer-max-height`).
- **Adaptive layout**: `layout="adaptive"` puts actions beside a one-line draft and moves them below when it wraps — same markup.
- **Mentions / slash actions**: pass `triggers` and add the popup right after `ComposerInput`:

```svelte
<script lang="ts">
  const triggers: ComposerTrigger[] = [
    { character: '@', items: [{ id: 'sam', label: 'Sam Rivera', kind: 'person' }] },
    { character: '/', items: [{ id: 'summarize', label: 'Summarize', type: 'action' }] }
  ];
</script>

<Composer {triggers} onAction={(item) => run(item.id)} onSubmit={handleSubmit}>
  <ComposerInput aria-label="Message" />
  <ComposerPopup>
    <ComposerList>
      {#snippet children(item)}
        <ComposerItem value={item}>{item.label}</ComposerItem>
      {/snippet}
    </ComposerList>
  </ComposerPopup>
  <ComposerActions>…</ComposerActions>
</Composer>
```

  Selecting a mention inserts a token; items with `type: 'action'` call `onAction` instead (your app executes them).
- **Token appearance**: `renderToken` snippet on `ComposerInput`, using `<ComposerToken {token} variant="chip">` with an `icon` snippet chosen by `token.kind`.
- **Custom filter**: a trigger's `filter(item, query)`; `useComposerFilter()` exposes `contains` / `startsWith` / `endsWith`.
- **Async results**: react to `onQueryChange`, set `filter: null`, `itemsFor`, `queryKey` (opaque `ComposerQuery.key`), `status: 'loading' | 'error' | 'ready'`, `showEmpty` + `ComposerStatus` for empty/loading text.
- **Custom controls**: inside `Composer`, `useComposerContext()` gives `value`, `isEmpty`, `canSubmit`, `submit()`, `insertTrigger('@')`, `reset()` (also passed to `Composer`'s `children` snippet).
- **In a drawer**: place the composer after the scrolling `DrawerPanel`; the drawer keeps it above the software keyboard.

## Common pitfalls

- Treating `value` as a string — it is `ComposerValue`; use `getComposerText`.
- Expecting submit to clear the input.
- Nesting `Composer` in a `<form>` / `Form`.
- Using `as="textarea"` and expecting mention tokens (textarea is plain text).
- Putting `ComposerActions` before `ComposerInput` (keep input first for layout and focus order).

## Useful particle references

- people / teams / slash suggestions: `p-composer-1`
- async mentions: `p-composer-2`
- pinned below drawer content: `p-composer-3`
- native textarea surface: `p-composer-4`
- custom suggestion list / filter: `p-composer-5`
- distinct token chips: `p-composer-6`
- adaptive contenteditable / textarea: `p-composer-7`, `p-composer-8`
- rounded adaptive with circular actions / compact: `p-composer-9`, `p-composer-11`
- leading buttons that insert `@` / `/`: `p-composer-10`
