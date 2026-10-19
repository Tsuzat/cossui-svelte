# coss Map (cossui-svelte only)

## When to use

- Interactive maps with markers, popups, routes, arcs, GeoJSON overlays and clusters, themed light/dark.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/map.json
```

```bash
npm install maplibre-gl
```

Uses [MapLibre GL](https://maplibre.org) with Carto basemaps that follow the light/dark theme. Coordinates are `[longitude, latitude]`.

## Canonical imports

```svelte
<script lang="ts">
  import {
    Map,
    MapArc,
    MapClusterLayer,
    MapControls,
    MapGeoJSON,
    MapMarker,
    MapPopup,
    MapRoute,
    MarkerContent,
    MarkerLabel,
    MarkerPopup,
    MarkerTooltip,
    useMap
  } from '#lib/components/ui/map/index.js';
</script>
```

Types: `MapViewport`, `MapArcDatum`, `MapArcEvent`, `MapArcProps`, `MapGeoJSONEvent`, `MapGeoJSONProps`.

## Minimal pattern

```svelte
<Map class="h-80" center={[-74.006, 40.7128]} zoom={10}>
  <MapControls />
  <MapMarker longitude={-74.006} latitude={40.7128}>
    <MarkerContent />
    <MarkerTooltip>New York</MarkerTooltip>
  </MapMarker>
</Map>
```

Give `Map` a height. `Map` props: `center`, `zoom`, `theme` (auto from the app theme), `styles` (`{ light, dark }` style URLs), `viewport` + `onviewportchange`, `map` (bindable MapLibre instance), `blank`, `loading`, `projection`, `options` (raw MapLibre options), `onstyleloaded`.

## Patterns from coss particles

- **Imperative camera**: `bind:map` and call MapLibre methods (`map?.flyTo({ center, zoom })`) — `p-map-5`. Inside child components, `useMap()` gives `{ map, isLoaded, isStyleReady, resolvedTheme }`.
- **Markers**: `MapMarker` (`longitude`, `latitude`, `draggable`, `anchor`, `offset`, `rotation`, `onclick`, `ondragstart/ondrag/ondragend`) composed with `MarkerContent` (custom marker body), `MarkerLabel`, `MarkerTooltip` (hover), `MarkerPopup` (click).
- **Standalone popup**: `MapPopup` at coordinates with `closeButton`, `closeOnClick`, `closeOnMove`, `maxWidth`, `onclose` — toggle it with `{#if}` (`p-map-11`).
- **Routes**: `MapRoute coordinates={[…]}` with `color`, `width`, `opacity`, `dashArray`, `interactive` and mouse handlers.
- **Controls**: `MapControls position="bottom-right"` with `showZoom` (default on), `showCompass`, `showLocate` (`onlocate`), `showFullscreen`.
- **Overlays**: `MapGeoJSON` (polygons/lines), `MapArc` (great-circle arcs), `MapClusterLayer` (clustered points with click-to-popup).

## Common pitfalls

- Passing `[lat, lng]` — MapLibre uses `[lng, lat]`.
- No height on `Map`.
- Touching `map` before it loads — guard with `map?.` / `useMap().isLoaded`.
- Firefox may not clip rounded corners on maps (known issue in `BUGS.md`).

## Useful particle references

- analytics markers sized by users: `p-map-1`
- shipping arcs on a rotating globe (`MapArc`, globe projection): `p-map-2`
- delivery tracking with animated route: `p-map-3`
- EV stations with status markers: `p-map-4`
- fly-to destination picker: `p-map-5`
- cycling trail with stats overlay: `p-map-6`
- heatmap-style markers: `p-map-7`
- all controls: `p-map-8`
- GeoJSON polygon: `p-map-9`
- clusters with popup: `p-map-10`
- dismissible popup: `p-map-11`
