# coss Segmented Control Pattern

A segmented control is a shared visual treatment, not a standalone behavior. Choose the underlying primitive from the interaction before applying the styling.

## Choose the behavior

| Intent | Use | State model |
| --- | --- | --- |
| Choose one value, especially in a form | Radio Group | Exactly one mutually exclusive value |
| Navigate to another URL or route | Links | Browser navigation with `aria-current="page"` on the current link |
| Apply an exclusive filter or reversible mode | Toggle Group | At most one pressed item by default; the current item may be cleared |
| Switch between associated content panels | Tabs | Each tab controls a matching panel |

Do not use Tabs for navigation links, form values, or filters merely because the result should look segmented. Do not use Toggle Group when one value must always remain selected; use Radio Group instead.

## Install a particle

| Implementation | Small | Default | Large |
| --- | --- | --- | --- |
| Radio Group | `p-radio-group-7` | `p-radio-group-8` | `p-radio-group-9` |
| Navigation links | `p-navigation-2` | `p-navigation-1` | `p-navigation-3` |
| Tabs | `p-tabs-14` | `p-tabs-1` | `p-tabs-15` |

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/p-radio-group-8.json
```

Installing a particle also installs the primitive it uses. The shared styling lives in the `tabs` item (`#lib/components/ui/tabs/segmented-control.ts`), so it comes with any particle that depends on `tabs`.

There is no Toggle Group segmented particle. Use the shared styling directly only when a reversible mode genuinely allows no active option.

## Custom composition

Install `tabs` to get the styling module when no particle matches:

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/tabs.json
```

```svelte
<script lang="ts">
  import {
    segmentedControlItemVariants,
    segmentedControlRootClassName
  } from '#lib/components/ui/tabs/segmented-control.js';

  const itemClass = segmentedControlItemVariants({ size: 'default', state: 'current' });
</script>

<nav aria-label="Project sections">
  <div class={segmentedControlRootClassName}>
    <a aria-current="page" class={itemClass} href="#overview">Overview</a>
    <a class={itemClass} href="#activity">Activity</a>
  </div>
</nav>
```

Apply `segmentedControlRootClassName` to the group surface and generate one item class with the matching state selector (`tailwind-variants`, so extra classes go in `class`: `segmentedControlItemVariants({ state: 'checked', class: 'grow' })`):

- `state: "checked"` for Radio Group
- `state: "current"` for navigation links
- `state: "pressed"` for Toggle Group
- `size: "sm" | "default" | "lg"`

For a segmented radio presentation, use `RadioPrimitive.Root` from `#lib/components/ui/radio-group/index.js` (not `Radio`) so the native-looking indicator is not rendered, inside a `RadioGroup` with the root class. Keep a `value` (or a bound one) when the interface requires one option to remain selected.

Tabs do not use the shared state recipe because they keep their animated indicator. They use the shared size map and `segmentedControlItemLayoutClassName`: set `size="sm" | "default" | "lg"` on `TabsList`, and use a `TabsTab` `size` only as an item-level override.

Reuse the shared root, item, and layout recipes instead of copying their classes into a new segmented particle. This keeps Tabs and the radio, navigation, and toggle implementations optically aligned.
