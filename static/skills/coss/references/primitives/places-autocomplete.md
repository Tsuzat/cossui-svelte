# coss Places Autocomplete (cossui-svelte only)

## When to use

- Address entry with Google Places suggestions, returning a place id and coordinates.

## When NOT to use

- For suggestions from your own data -> use [Autocomplete](autocomplete.md).

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/places-autocomplete.json
```

Requires a Google Maps API key with the Places API enabled; the Google script is loaded on demand. Built on Autocomplete.

## Canonical imports

```svelte
<script lang="ts">
  import {
    PlacesAutocomplete,
    type SelectedPlace
  } from '#lib/components/ui/places-autocomplete/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  let place = $state<SelectedPlace | null>(null);
</script>

<PlacesAutocomplete
  apiKey={GOOGLE_MAPS_API_KEY}
  countryCode="us"
  onPlaceSelect={(p) => (place = p)}
/>
```

Read the key from a **public** env var (the particle imports `GOOGLE_MAPS_API_KEY` from `$app/env/public`), and restrict it by HTTP referrer and to the Places API in Google Cloud — it ships to the browser.

Props: `apiKey`, `onPlaceSelect`, `countryCode`, `value` / `defaultValue` / `onValueChange`, `debounceMs` (`300`), `placeholder`, `disabled`, `showPoweredByGoogle` (`true`), `class` / `inputClass`. `SelectedPlace` has `address`, `placeId`, `lat`, `lng`.

## Common pitfalls

- Using an unrestricted key, or a server-only secret env module (the key is needed client-side).
- Removing the "Powered by Google" attribution where Google's terms require it.
- Not wrapping it in `Field` + `FieldLabel` in forms.

## Useful particle references

- address validation: `p-places-autocomplete-1`
