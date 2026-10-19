# coss Tree (cossui-svelte only)

## When to use

- Hierarchical, keyboard-navigable trees (file explorers, nested categories) with optional selection, drag and drop, renaming, search and filtering.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/tree.json
```

```bash
npm install @headless-tree/core
```

Built on [Headless Tree](https://headless-tree.lukasbach.com); features (selection, hotkeys, DnD, search, renaming) come from `@headless-tree/core`.

## Canonical imports

```svelte
<script lang="ts">
  import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core';
  import {
    Tree,
    TreeAssistiveTreeDescription,
    TreeDragLine,
    TreeItem,
    TreeLabel,
    useTree
  } from '#lib/components/ui/tree/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  type Node = { name: string; children?: string[] };
  const items: Record<string, Node> = {
    root: { name: 'Root', children: ['a'] },
    a: { name: 'Folder A', children: ['b'] },
    b: { name: 'File B' }
  };

  const tree = useTree<Node>({
    rootItemId: 'root',
    dataLoader: {
      getItem: (id) => items[id],
      getChildren: (id) => items[id].children ?? []
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => !!item.getItemData().children?.length,
    indent: 20
  });
</script>

<Tree {tree} indent={20}>
  {#each tree.current.getItems() as item (item.getId())}
    <TreeItem {item}>
      <TreeLabel>{item.getItemName()}</TreeLabel>
    </TreeItem>
  {/each}
</Tree>
```

`useTree` takes the regular Headless Tree config and returns a reactive wrapper — read the live instance from `tree.current` (`getItems()`, item `isFolder()`, `isExpanded()`, …). Keep the `indent` on `Tree` equal to the config's `indent`.

## Patterns from coss particles

- **Icons**: render folder/file icons inside `TreeLabel` based on `item.isFolder()` / `item.isExpanded()`.
- **Multi-select + drag and drop**: add `selectionFeature`, `dragAndDropFeature`, `keyboardDragAndDropFeature`, `canReorder: true`, and `onDrop: createOnDropHandler(...)`; render `<TreeDragLine />` and `<TreeAssistiveTreeDescription tree={tree.current} />` (`p-tree-5`).
- **Renaming (F2)**: `renamingFeature`, with `TreeItem`'s `child` snippet (`{ props }`) to swap in an input while renaming (`p-tree-6`).
- **Search highlight / filtering**: `searchFeature`, highlighting matches or filtering visible items (`p-tree-7`, `p-tree-8`).

## Common pitfalls

- Iterating `tree.getItems()` instead of `tree.current.getItems()` (not reactive).
- Mismatched `indent` between config and `<Tree>`.
- Adding DnD without `TreeAssistiveTreeDescription` / keyboard DnD for accessibility.

## Useful particle references

- basic / vertical lines / icons / caret on the right: `p-tree-1`, `p-tree-2`, `p-tree-3`, `p-tree-4`
- multi-select + drag and drop: `p-tree-5`
- renaming: `p-tree-6`
- search highlight / filtering: `p-tree-7`, `p-tree-8`
