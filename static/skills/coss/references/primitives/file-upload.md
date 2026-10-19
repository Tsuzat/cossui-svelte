# coss File Upload (hook + particles)

## When to use

- Image/avatar/file pickers with drag-and-drop, previews, size/type validation and lists.

File upload is **not a component**: it is the headless `useFileUpload` hook plus particles that compose it with Button, Avatar, Table, Dialog, Cropper, etc. The `file-upload` registry item has no code of its own.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/use-file-upload.json
```

Or install a particle, e.g. `https://cossui-svelte.com/r/p-file-upload-3.json`.

## Canonical imports

```svelte
<script lang="ts">
  import { useFileUpload } from '#lib/hooks/use-file-upload.svelte.js';
</script>
```

`formatBytes` is also exported from the hook module.

## Minimal pattern

```svelte
<script lang="ts">
  const fileUpload = useFileUpload({ accept: 'image/*', multiple: true, maxFiles: 5 });
</script>

<input bind:this={fileUpload.fileInput} {...fileUpload.inputProps} class="sr-only" />
<Button onclick={fileUpload.openFileDialog}>Choose files</Button>

{#each fileUpload.files as { id, file } (id)}
  <p>{file.name}</p>
{/each}
```

`bind:this={fileUpload.fileInput}` is required — `openFileDialog()` clicks that input.

Options: `accept`, `multiple` (`false`), `maxFiles` (`Infinity`), `maxSize` (bytes), `initialFiles` (`FileMetadata[]`), `onFilesChange`, `onFilesAdded`.

Reactive state: `files` (`{ id, file, preview? }[]`), `isDragging`, `errors`, `fileInput`, `inputProps`. Methods: `openFileDialog`, `addFiles`, `removeFile(id)`, `clearFiles`, `clearErrors`, and drop-zone handlers `handleDragEnter`, `handleDragLeave`, `handleDragOver`, `handleDrop`.

## Patterns from coss particles

Drop area:

```svelte
<button
  type="button"
  aria-label="Upload image"
  data-dragging={fileUpload.isDragging || undefined}
  onclick={fileUpload.openFileDialog}
  ondragenter={fileUpload.handleDragEnter}
  ondragleave={fileUpload.handleDragLeave}
  ondragover={fileUpload.handleDragOver}
  ondrop={fileUpload.handleDrop}
  class="… data-[dragging=true]:bg-accent/50"
>
  {#if fileUpload.files[0]?.preview}
    <img alt="Uploaded" src={fileUpload.files[0].preview} class="size-full object-cover" />
  {/if}
</button>
{#each fileUpload.errors as error (error)}
  <p class="text-destructive-foreground text-xs" role="alert">{error}</p>
{/each}
```

Avatar crop flow: on `onFilesAdded`, open a `Dialog` with a `Cropper` on the preview URL (`p-file-upload-14`).

## Common pitfalls

- Forgetting `bind:this={fileUpload.fileInput}` (the dialog never opens).
- Not rendering `errors` (size/type rejections are silent).
- Icon-only drop buttons without `aria-label`.

## Useful particle references

- basic image uploader: `p-file-upload-1`
- avatar button / droppable avatar / avatar with crop dialog: `p-file-upload-2`, `p-file-upload-3`, `p-file-upload-14`
- single image with max size (± drop area and button): `p-file-upload-4`, `p-file-upload-5`
- multiple images grid / list: `p-file-upload-6`, `p-file-upload-7`
- single file / multiple files list / list in drop area / table: `p-file-upload-8`, `p-file-upload-9`, `p-file-upload-10`, `p-file-upload-11`
- mixed content card grid: `p-file-upload-12`
- simulated progress: `p-file-upload-13`
