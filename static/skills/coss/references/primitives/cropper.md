# coss Cropper (cossui-svelte only)

## When to use

- Cropping an image to an aspect ratio (avatars, banners) with drag, wheel/pinch zoom and keyboard control.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/cropper.json
```

No extra dependencies (custom component).

## Canonical imports

```svelte
<script lang="ts">
  import {
    Cropper,
    CropperCropArea,
    CropperDescription,
    CropperImage,
    type Area
  } from '#lib/components/ui/cropper/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  let crop = $state<Area | null>(null);
</script>

<Cropper class="h-80" image="/photo.jpg" aspectRatio={1} onCropChange={(area) => (crop = area)}>
  <CropperDescription>Drag to reposition, scroll to zoom.</CropperDescription>
  <CropperImage />
  <CropperCropArea />
</Cropper>
```

`Cropper` props: `image`, `aspectRatio` (default `1`), `cropPadding` (`25`), `minZoom` (`1`), `maxZoom` (`3`), `zoom` (bindable), `zoomSensitivity`, `keyboardStep`, `onCropChange(area)`. `Area` is `{ x, y, width, height }` in source-image pixels — send it to the server or draw it to a canvas to produce the cropped file.

`CropperDescription` is required for accessibility (the cropper warns without it); hide it with `class="sr-only"` if needed. Give `Cropper` a height.

## Patterns from coss particles

Zoom slider bound to the cropper:

```svelte
<script lang="ts">
  let zoom = $state(1);
</script>

<Cropper class="h-80" image="/photo.jpg" bind:zoom>
  <CropperDescription class="sr-only">Crop image</CropperDescription>
  <CropperImage />
  <CropperCropArea />
</Cropper>
<Slider aria-label="Zoom" bind:value={zoom} min={1} max={3} step={0.1} />
```

Style the frame/mask with classes on `CropperCropArea` (custom color, rounded-full mask, grid overlay).

## Common pitfalls

- Omitting `CropperDescription`.
- No height on `Cropper`.
- Treating `Area` as CSS pixels of the displayed image — it is in source-image pixels.

## Useful particle references

- basic / aspect-ratio crop: `p-cropper-2`, `p-cropper-1`; 16:9: `p-cropper-3`
- custom crop-area color / mask / full-size area / round mask: `p-cropper-4`, `p-cropper-5`, `p-cropper-6`, `p-cropper-7`
- zoom slider / custom zoom limits: `p-cropper-8`, `p-cropper-9`
- crop data output / image preview: `p-cropper-10`, `p-cropper-11`
- aspect-ratio switcher with grid overlay: `p-cropper-12`
