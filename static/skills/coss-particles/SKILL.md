---
name: coss-particles
description: Index of all cossui-svelte particle examples. Use when implementing UI features to find copy-paste-ready Svelte 5 component patterns built on coss primitives. Each particle has a description and a JSON URL for easy installation.
compatibility: Requires Svelte 5 and cossui-svelte components installed in the project.
license: MIT
metadata:
  author: cosscom
---

# COSS UI Particles Index

Particles are copy-paste-ready Svelte 5 UI patterns built on [cossui-svelte](https://cossui-svelte.com) primitives. Browse them visually at <https://cossui-svelte.com/particles>.

## How to use this skill

1. Describe the UI you need (e.g. "a form with validation", "a dialog with a form inside", "tabs with icons").
2. Search this index for matching particles by component type and description.
3. Fetch the JSON URL to get the full source code of the particle, or install it with the CLI.
4. Adapt the particle code to your needs. For component APIs and pitfalls, see the `coss` skill.

## JSON URL pattern

Each particle has a JSON manifest at:
```
https://cossui-svelte.com/r/<particle-name>.json
```
For example: `https://cossui-svelte.com/r/p-accordion-1.json`

Install a particle (and the UI components it depends on):
```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/p-accordion-1.json
```

## Source code

Particle source files live in the cossui-svelte repo at `src/lib/components/particles/<folder>/p-<name>-<N>.svelte` (chart particles live in the `charts` folder).

## Updating this index

This index is generated from the particle files in `src/lib/components/particles` and the descriptions in `src/lib/registry/generated-particle-metadata.ts`. Placeholder particles (TODO stubs) are omitted. The full installable list is `https://cossui-svelte.com/r/registry.json` (items whose name starts with `p-`).

Total: **682 particles** across **68 component types**

## Component types

- [accordion](#accordion) (4)
- [alert](#alert) (7)
- [alert-dialog](#alert-dialog) (22)
- [aspect-ratio](#aspect-ratio) (4)
- [autocomplete](#autocomplete) (15)
- [avatar](#avatar) (15)
- [badge](#badge) (21)
- [breadcrumb](#breadcrumb) (8)
- [button](#button) (40)
- [calendar](#calendar) (25)
- [card](#card) (11)
- [chart](#chart) (10)
- [checkbox](#checkbox) (13)
- [checkbox-group](#checkbox-group) (5)
- [collapsible](#collapsible) (1)
- [colorpicker](#colorpicker) (6)
- [combobox](#combobox) (20)
- [command](#command) (2)
- [composer](#composer) (11)
- [context-menu](#context-menu) (8)
- [cropper](#cropper) (12)
- [date-picker](#date-picker) (9)
- [dialog](#dialog) (6)
- [drawer](#drawer) (15)
- [empty](#empty) (1)
- [field](#field) (18)
- [fieldset](#fieldset) (1)
- [file-upload](#file-upload) (14)
- [form](#form) (2)
- [frame](#frame) (4)
- [group](#group) (22)
- [input](#input) (28)
- [input-group](#input-group) (28)
- [kbd](#kbd) (1)
- [link-preview](#link-preview) (1)
- [map](#map) (11)
- [menu](#menu) (9)
- [meter](#meter) (4)
- [navigation](#navigation) (3)
- [number-field](#number-field) (15)
- [otp-field](#otp-field) (9)
- [pagination](#pagination) (3)
- [places-autocomplete](#places-autocomplete) (1)
- [popover](#popover) (4)
- [preview-card](#preview-card) (1)
- [progress](#progress) (3)
- [radio-group](#radio-group) (11)
- [scroll-area](#scroll-area) (5)
- [select](#select) (24)
- [separator](#separator) (1)
- [sheet](#sheet) (3)
- [sidebar](#sidebar) (13)
- [skeleton](#skeleton) (2)
- [slider](#slider) (23)
- [spinner](#spinner) (1)
- [starrating](#starrating) (6)
- [stepper](#stepper) (16)
- [switch](#switch) (9)
- [table](#table) (10)
- [tabs](#tabs) (15)
- [textarea](#textarea) (15)
- [timeline](#timeline) (12)
- [toast](#toast) (13)
- [toggle](#toggle) (8)
- [toggle-group](#toggle-group) (9)
- [toolbar](#toolbar) (1)
- [tooltip](#tooltip) (4)
- [tree](#tree) (8)

---

### accordion

- Basic accordion | [JSON](https://cossui-svelte.com/r/p-accordion-1.json)
- Accordion with one panel open | [JSON](https://cossui-svelte.com/r/p-accordion-2.json)
- Accordion allowing multiple panels open | [JSON](https://cossui-svelte.com/r/p-accordion-3.json)
- Controlled accordion | [JSON](https://cossui-svelte.com/r/p-accordion-4.json)

### alert

- Basic alert | [JSON](https://cossui-svelte.com/r/p-alert-1.json)
- Alert with icon | [JSON](https://cossui-svelte.com/r/p-alert-2.json)
- Alert with icon and action buttons | [JSON](https://cossui-svelte.com/r/p-alert-3.json)
- Info alert | [JSON](https://cossui-svelte.com/r/p-alert-4.json)
- Success alert | [JSON](https://cossui-svelte.com/r/p-alert-5.json)
- Warning alert | [JSON](https://cossui-svelte.com/r/p-alert-6.json)
- Error alert | [JSON](https://cossui-svelte.com/r/p-alert-7.json)

### alert-dialog

- Alert dialog | [JSON](https://cossui-svelte.com/r/p-alert-dialog-1.json)
- Alert dialog with bare footer | [JSON](https://cossui-svelte.com/r/p-alert-dialog-2.json)
- Basic confirmation alert dialog | [JSON](https://cossui-svelte.com/r/p-alert-dialog-313.json)
- Alert dialog with a warning icon | [JSON](https://cossui-svelte.com/r/p-alert-dialog-314.json)
- Scrollable dialog with a native scrollbar | [JSON](https://cossui-svelte.com/r/p-alert-dialog-315.json)
- Scrollable dialog with a custom scrollbar | [JSON](https://cossui-svelte.com/r/p-alert-dialog-316.json)
- Scrollable dialog with a sticky header | [JSON](https://cossui-svelte.com/r/p-alert-dialog-317.json)
- Scrollable dialog with a sticky footer | [JSON](https://cossui-svelte.com/r/p-alert-dialog-318.json)
- Terms & conditions dialog that unlocks the agree button once you've scrolled to the bottom | [JSON](https://cossui-svelte.com/r/p-alert-dialog-319.json)
- Delete confirmation dialog gated by typing the project name | [JSON](https://cossui-svelte.com/r/p-alert-dialog-320.json)
- Newsletter subscription dialog | [JSON](https://cossui-svelte.com/r/p-alert-dialog-321.json)
- Feedback dialog with a textarea and helpful links | [JSON](https://cossui-svelte.com/r/p-alert-dialog-322.json)
- Rating dialog with a numeric scale and comment field | [JSON](https://cossui-svelte.com/r/p-alert-dialog-323.json)
- OTP verification dialog with automatic code checking | [JSON](https://cossui-svelte.com/r/p-alert-dialog-324.json)
- Sign up dialog with name, email and password fields | [JSON](https://cossui-svelte.com/r/p-alert-dialog-325.json)
- Sign in dialog with a remember me checkbox | [JSON](https://cossui-svelte.com/r/p-alert-dialog-326.json)
- Invite team members dialog with a copyable magic link | [JSON](https://cossui-svelte.com/r/p-alert-dialog-327.json)
- Update card details dialog with auto-formatted inputs | [JSON](https://cossui-svelte.com/r/p-alert-dialog-328.json)
- Checkout dialog with plan selection and card details | [JSON](https://cossui-svelte.com/r/p-alert-dialog-329.json)
- Change plan dialog with a feature checklist | [JSON](https://cossui-svelte.com/r/p-alert-dialog-330.json)
- Edit profile dialog with avatar and background image uploads | [JSON](https://cossui-svelte.com/r/p-alert-dialog-331.json)
- Multi-step onboarding dialog with progress dots | [JSON](https://cossui-svelte.com/r/p-alert-dialog-332.json)

### aspect-ratio

- Ratio 1:1 | [JSON](https://cossui-svelte.com/r/p-aspect-ratio-1.json)
- Ratio 9:16 | [JSON](https://cossui-svelte.com/r/p-aspect-ratio-2.json)
- Ratio 16:9 | [JSON](https://cossui-svelte.com/r/p-aspect-ratio-3.json)
- Ratio 21:9 | [JSON](https://cossui-svelte.com/r/p-aspect-ratio-4.json)

### autocomplete

- Basic autocomplete | [JSON](https://cossui-svelte.com/r/p-autocomplete-1.json)
- Disabled autocomplete | [JSON](https://cossui-svelte.com/r/p-autocomplete-2.json)
- Small autocomplete | [JSON](https://cossui-svelte.com/r/p-autocomplete-3.json)
- Large autocomplete | [JSON](https://cossui-svelte.com/r/p-autocomplete-4.json)
- Autocomplete with label | [JSON](https://cossui-svelte.com/r/p-autocomplete-5.json)
- Autocomplete autofilling the input with the highlighted item | [JSON](https://cossui-svelte.com/r/p-autocomplete-6.json)
- Autocomplete auto highlighting the first option | [JSON](https://cossui-svelte.com/r/p-autocomplete-7.json)
- Autocomplete with clear button | [JSON](https://cossui-svelte.com/r/p-autocomplete-8.json)
- Autocomplete with trigger and clear buttons | [JSON](https://cossui-svelte.com/r/p-autocomplete-9.json)
- Autocomplete with grouped items | [JSON](https://cossui-svelte.com/r/p-autocomplete-10.json)
- Autocomplete with limited number of results | [JSON](https://cossui-svelte.com/r/p-autocomplete-11.json)
- Autocomplete with async items loading | [JSON](https://cossui-svelte.com/r/p-autocomplete-12.json)
- Autocomplete form | [JSON](https://cossui-svelte.com/r/p-autocomplete-13.json)
- Autocomplete form | [JSON](https://cossui-svelte.com/r/p-autocomplete-14.json)
- Pill-shaped autocomplete | [JSON](https://cossui-svelte.com/r/p-autocomplete-15.json)

### avatar

- Avatar with image and fallback | [JSON](https://cossui-svelte.com/r/p-avatar-1.json)
- Fallback-only avatar | [JSON](https://cossui-svelte.com/r/p-avatar-2.json)
- Avatars with different sizes | [JSON](https://cossui-svelte.com/r/p-avatar-3.json)
- Avatars with different radii | [JSON](https://cossui-svelte.com/r/p-avatar-4.json)
- Overlapping avatar group | [JSON](https://cossui-svelte.com/r/p-avatar-5.json)
- Avatar with user icon fallback | [JSON](https://cossui-svelte.com/r/p-avatar-6.json)
- Avatar with emerald status dot | [JSON](https://cossui-svelte.com/r/p-avatar-7.json)
- Avatar with muted status dot | [JSON](https://cossui-svelte.com/r/p-avatar-8.json)
- Rounded avatar with top-right emerald status | [JSON](https://cossui-svelte.com/r/p-avatar-9.json)
- Avatar with notification badge | [JSON](https://cossui-svelte.com/r/p-avatar-10.json)
- Rounded avatar with notification badge | [JSON](https://cossui-svelte.com/r/p-avatar-11.json)
- Avatar with verified badge | [JSON](https://cossui-svelte.com/r/p-avatar-12.json)
- Small overlapping avatar group | [JSON](https://cossui-svelte.com/r/p-avatar-13.json)
- Large overlapping avatar group | [JSON](https://cossui-svelte.com/r/p-avatar-14.json)
- Avatar button with a dropdown chevron indicator | [JSON](https://cossui-svelte.com/r/p-avatar-95.json)

### badge

- Basic badge | [JSON](https://cossui-svelte.com/r/p-badge-1.json)
- Outline badge | [JSON](https://cossui-svelte.com/r/p-badge-2.json)
- Secondary badge | [JSON](https://cossui-svelte.com/r/p-badge-3.json)
- Destructive badge | [JSON](https://cossui-svelte.com/r/p-badge-4.json)
- Info badge | [JSON](https://cossui-svelte.com/r/p-badge-5.json)
- Success badge | [JSON](https://cossui-svelte.com/r/p-badge-6.json)
- Warning badge | [JSON](https://cossui-svelte.com/r/p-badge-7.json)
- Error badge | [JSON](https://cossui-svelte.com/r/p-badge-8.json)
- Small badge | [JSON](https://cossui-svelte.com/r/p-badge-9.json)
- Large badge | [JSON](https://cossui-svelte.com/r/p-badge-10.json)
- Badge with icon | [JSON](https://cossui-svelte.com/r/p-badge-11.json)
- Badge with link | [JSON](https://cossui-svelte.com/r/p-badge-12.json)
- Badge with count | [JSON](https://cossui-svelte.com/r/p-badge-13.json)
- Full rounded badge (pill) | [JSON](https://cossui-svelte.com/r/p-badge-14.json)
- Badge with number after text | [JSON](https://cossui-svelte.com/r/p-badge-15.json)
- Status badge - Paid | [JSON](https://cossui-svelte.com/r/p-badge-16.json)
- Status badge - Pending | [JSON](https://cossui-svelte.com/r/p-badge-17.json)
- Status badge - Failed | [JSON](https://cossui-svelte.com/r/p-badge-18.json)
- Selectable badge with checkbox | [JSON](https://cossui-svelte.com/r/p-badge-19.json)
- Removable badge | [JSON](https://cossui-svelte.com/r/p-badge-20.json)
- Notification button with a dismissible unread count badge | [JSON](https://cossui-svelte.com/r/p-badge-100.json)

### breadcrumb

- Breadcrumb with menu example | [JSON](https://cossui-svelte.com/r/p-breadcrumb-1.json)
- Breadcrumb with custom separator | [JSON](https://cossui-svelte.com/r/p-breadcrumb-2.json)
- Breadcrumb with home icon for home link only | [JSON](https://cossui-svelte.com/r/p-breadcrumb-3.json)
- Breadcrumb with folders icon menu | [JSON](https://cossui-svelte.com/r/p-breadcrumb-4.json)
- Breadcrumb with icons before text | [JSON](https://cossui-svelte.com/r/p-breadcrumb-5.json)
- Breadcrumb with dot separators | [JSON](https://cossui-svelte.com/r/p-breadcrumb-6.json)
- Breadcrumb with select dropdown | [JSON](https://cossui-svelte.com/r/p-breadcrumb-7.json)
- Breadcrumb in a bordered card container | [JSON](https://cossui-svelte.com/r/p-breadcrumb-100.json)

### button

- Default button | [JSON](https://cossui-svelte.com/r/p-button-1.json)
- Outline button | [JSON](https://cossui-svelte.com/r/p-button-2.json)
- Secondary button | [JSON](https://cossui-svelte.com/r/p-button-3.json)
- Destructive button | [JSON](https://cossui-svelte.com/r/p-button-4.json)
- Destructive outline button | [JSON](https://cossui-svelte.com/r/p-button-5.json)
- Ghost button | [JSON](https://cossui-svelte.com/r/p-button-6.json)
- Link button | [JSON](https://cossui-svelte.com/r/p-button-7.json)
- Extra-small button | [JSON](https://cossui-svelte.com/r/p-button-8.json)
- Small button | [JSON](https://cossui-svelte.com/r/p-button-9.json)
- Large button | [JSON](https://cossui-svelte.com/r/p-button-10.json)
- Extra-large button | [JSON](https://cossui-svelte.com/r/p-button-11.json)
- Disabled button | [JSON](https://cossui-svelte.com/r/p-button-12.json)
- Icon button | [JSON](https://cossui-svelte.com/r/p-button-13.json)
- Small icon button | [JSON](https://cossui-svelte.com/r/p-button-14.json)
- Large icon button | [JSON](https://cossui-svelte.com/r/p-button-15.json)
- Button with icon | [JSON](https://cossui-svelte.com/r/p-button-16.json)
- Link rendered as button | [JSON](https://cossui-svelte.com/r/p-button-17.json)
- Custom loading button with manual Spinner | [JSON](https://cossui-svelte.com/r/p-button-18.json)
- Expandable show more/less toggle button | [JSON](https://cossui-svelte.com/r/p-button-19.json)
- Back link button with chevron | [JSON](https://cossui-svelte.com/r/p-button-20.json)
- Card-style button with heading and description | [JSON](https://cossui-svelte.com/r/p-button-21.json)
- Directional pad control buttons | [JSON](https://cossui-svelte.com/r/p-button-22.json)
- Outline like button with count | [JSON](https://cossui-svelte.com/r/p-button-23.json)
- Social login icon buttons | [JSON](https://cossui-svelte.com/r/p-button-24.json)
- Star button with count badge | [JSON](https://cossui-svelte.com/r/p-button-26.json)
- Button group with QR code icon and sign in | [JSON](https://cossui-svelte.com/r/p-button-27.json)
- Button with avatar | [JSON](https://cossui-svelte.com/r/p-button-28.json)
- Pill-shaped button with rounded-full styling | [JSON](https://cossui-svelte.com/r/p-button-29.json)
- Button with animated arrow on hover | [JSON](https://cossui-svelte.com/r/p-button-30.json)
- Button with keyboard shortcut indicator | [JSON](https://cossui-svelte.com/r/p-button-31.json)
- Button with notification badge | [JSON](https://cossui-svelte.com/r/p-button-32.json)
- Paired buttons (Cancel/Save) | [JSON](https://cossui-svelte.com/r/p-button-33.json)
- Button with animated status dot | [JSON](https://cossui-svelte.com/r/p-button-34.json)
- Icon-only copy button with feedback | [JSON](https://cossui-svelte.com/r/p-button-35.json)
- Copy button with feedback | [JSON](https://cossui-svelte.com/r/p-button-36.json)
- Rotating icon button (FAB-style toggle) | [JSON](https://cossui-svelte.com/r/p-button-37.json)
- Social login buttons (Google, X, GitHub) | [JSON](https://cossui-svelte.com/r/p-button-38.json)
- Hamburger menu button with animated icon | [JSON](https://cossui-svelte.com/r/p-button-39.json)
- Download button with progress and cancel action | [JSON](https://cossui-svelte.com/r/p-button-40.json)
- Button using the built-in loading prop | [JSON](https://cossui-svelte.com/r/p-button-41.json)

### calendar

- Basic calendar | [JSON](https://cossui-svelte.com/r/p-calendar-1.json)
- Calendar with custom cell size | [JSON](https://cossui-svelte.com/r/p-calendar-2.json)
- Calendar with date range selection | [JSON](https://cossui-svelte.com/r/p-calendar-3.json)
- Calendar with month/year dropdown navigation | [JSON](https://cossui-svelte.com/r/p-calendar-4.json)
- Calendar with custom Select dropdown for month/year | [JSON](https://cossui-svelte.com/r/p-calendar-5.json)
- Calendar with Combobox dropdown for month/year | [JSON](https://cossui-svelte.com/r/p-calendar-6.json)
- Calendar with disabled dates | [JSON](https://cossui-svelte.com/r/p-calendar-7.json)
- Calendar with multiple date selection | [JSON](https://cossui-svelte.com/r/p-calendar-8.json)
- Calendar with rounded day buttons | [JSON](https://cossui-svelte.com/r/p-calendar-9.json)
- Calendar with rounded range selection style | [JSON](https://cossui-svelte.com/r/p-calendar-10.json)
- Calendar with right-aligned navigation | [JSON](https://cossui-svelte.com/r/p-calendar-11.json)
- Calendar with week numbers | [JSON](https://cossui-svelte.com/r/p-calendar-12.json)
- Calendar with year-only combobox dropdown | [JSON](https://cossui-svelte.com/r/p-calendar-13.json)
- Calendar without arrow navigation (dropdown only) | [JSON](https://cossui-svelte.com/r/p-calendar-14.json)
- Calendar with current month button | [JSON](https://cossui-svelte.com/r/p-calendar-15.json)
- Calendar with today button | [JSON](https://cossui-svelte.com/r/p-calendar-16.json)
- Calendar with date input | [JSON](https://cossui-svelte.com/r/p-calendar-17.json)
- Calendar with time input | [JSON](https://cossui-svelte.com/r/p-calendar-18.json)
- Calendar with time slots (appointment picker) | [JSON](https://cossui-svelte.com/r/p-calendar-19.json)
- Calendar with date presets | [JSON](https://cossui-svelte.com/r/p-calendar-20.json)
- Range calendar with date presets | [JSON](https://cossui-svelte.com/r/p-calendar-21.json)
- Two months calendar | [JSON](https://cossui-svelte.com/r/p-calendar-22.json)
- Three months calendar | [JSON](https://cossui-svelte.com/r/p-calendar-23.json)
- Pricing calendar with custom day buttons | [JSON](https://cossui-svelte.com/r/p-calendar-24.json)
- Calendar with 24-hour autocomplete time input | [JSON](https://cossui-svelte.com/r/p-calendar-25.json)

### card

- A basic card with header and footer | [JSON](https://cossui-svelte.com/r/p-card-1.json)
- Authentication card with actions | [JSON](https://cossui-svelte.com/r/p-card-2.json)
- Authentication card with separators | [JSON](https://cossui-svelte.com/r/p-card-3.json)
- Framed card with footer | [JSON](https://cossui-svelte.com/r/p-card-4.json)
- Framed card with header | [JSON](https://cossui-svelte.com/r/p-card-5.json)
- Framed card with header and footer | [JSON](https://cossui-svelte.com/r/p-card-6.json)
- Framed card with no rounded bottom | [JSON](https://cossui-svelte.com/r/p-card-7.json)
- Card within a frame and footer | [JSON](https://cossui-svelte.com/r/p-card-8.json)
- Card within a frame and footer | [JSON](https://cossui-svelte.com/r/p-card-9.json)
- Card within a frame with header and footer | [JSON](https://cossui-svelte.com/r/p-card-10.json)
- CardFrame with header action | [JSON](https://cossui-svelte.com/r/p-card-11.json)

### chart

- Radial Chart with Labels | [JSON](https://cossui-svelte.com/r/p-chart-1.json)
- Radial Chart with Text | [JSON](https://cossui-svelte.com/r/p-chart-2.json)
- Radial Chart - Stacked | [JSON](https://cossui-svelte.com/r/p-chart-3.json)
- Radar Chart - Custom Labelp | [JSON](https://cossui-svelte.com/r/p-chart-4.json)
- Area Chart - Axes | [JSON](https://cossui-svelte.com/r/p-chart-5.json)
- Line Chart with Labels | [JSON](https://cossui-svelte.com/r/p-chart-6.json)
- Pie Chart - Interactive | [JSON](https://cossui-svelte.com/r/p-chart-7.json)
- Pie Chart - Custom Label | [JSON](https://cossui-svelte.com/r/p-chart-8.json)
- Bar Chart - Multiple | [JSON](https://cossui-svelte.com/r/p-chart-9.json)
- Bar Chart - Horizontal Mixed | [JSON](https://cossui-svelte.com/r/p-chart-10.json)

### checkbox

- Basic checkbox | [JSON](https://cossui-svelte.com/r/p-checkbox-1.json)
- Disabled checkbox | [JSON](https://cossui-svelte.com/r/p-checkbox-2.json)
- Checkbox with description | [JSON](https://cossui-svelte.com/r/p-checkbox-3.json)
- Card-style checkbox | [JSON](https://cossui-svelte.com/r/p-checkbox-4.json)
- Checkbox form | [JSON](https://cossui-svelte.com/r/p-checkbox-5.json)
- Checkbox with a custom accent color | [JSON](https://cossui-svelte.com/r/p-checkbox-134.json)
- Checkboxes laid out horizontally | [JSON](https://cossui-svelte.com/r/p-checkbox-139.json)
- Right aligned checkbox | [JSON](https://cossui-svelte.com/r/p-checkbox-140.json)
- Checkbox that reveals an additional-info field when checked | [JSON](https://cossui-svelte.com/r/p-checkbox-142.json)
- Checkbox card with a label and sublabel | [JSON](https://cossui-svelte.com/r/p-checkbox-144.json)
- Grid of icon checkbox cards | [JSON](https://cossui-svelte.com/r/p-checkbox-147.json)
- Days-of-the-week checkbox group | [JSON](https://cossui-svelte.com/r/p-checkbox-149.json)
- Dark mode toggle styled as a checkbox | [JSON](https://cossui-svelte.com/r/p-checkbox-150.json)

### checkbox-group

- Basic checkbox group | [JSON](https://cossui-svelte.com/r/p-checkbox-group-1.json)
- Checkbox group with disabled items | [JSON](https://cossui-svelte.com/r/p-checkbox-group-2.json)
- Checkbox group with parent checkbox | [JSON](https://cossui-svelte.com/r/p-checkbox-group-3.json)
- Nested checkbox group with parent | [JSON](https://cossui-svelte.com/r/p-checkbox-group-4.json)
- Checkbox group form | [JSON](https://cossui-svelte.com/r/p-checkbox-group-5.json)

### collapsible

- Basic collapsible | [JSON](https://cossui-svelte.com/r/p-collapsible-1.json)

### colorpicker

- Full featured Color picker | [JSON](https://cossui-svelte.com/r/p-colorpicker-1.json)
- Minimal color picker with sliders | [JSON](https://cossui-svelte.com/r/p-colorpicker-2.json)
- Non editable swatches Color picker | [JSON](https://cossui-svelte.com/r/p-colorpicker-3.json)
- Sliders only | [JSON](https://cossui-svelte.com/r/p-colorpicker-4.json)
- Color picker with custom swatches and text input | [JSON](https://cossui-svelte.com/r/p-colorpicker-5.json)
- Color picker with custom swatches and no text input | [JSON](https://cossui-svelte.com/r/p-colorpicker-6.json)

### combobox

- Basic combobox | [JSON](https://cossui-svelte.com/r/p-combobox-1.json)
- Disabled combobox | [JSON](https://cossui-svelte.com/r/p-combobox-2.json)
- Small combobox | [JSON](https://cossui-svelte.com/r/p-combobox-3.json)
- Large combobox | [JSON](https://cossui-svelte.com/r/p-combobox-4.json)
- Combobox with label | [JSON](https://cossui-svelte.com/r/p-combobox-5.json)
- Combobox auto highlighting the first option | [JSON](https://cossui-svelte.com/r/p-combobox-6.json)
- Combobox with clear button | [JSON](https://cossui-svelte.com/r/p-combobox-7.json)
- Combobox with grouped items | [JSON](https://cossui-svelte.com/r/p-combobox-8.json)
- Combobox with multiple selection | [JSON](https://cossui-svelte.com/r/p-combobox-9.json)
- Combobox with input inside popup | [JSON](https://cossui-svelte.com/r/p-combobox-10.json)
- Combobox form | [JSON](https://cossui-svelte.com/r/p-combobox-11.json)
- Combobox multiple form | [JSON](https://cossui-svelte.com/r/p-combobox-12.json)
- Combobox with start addon | [JSON](https://cossui-svelte.com/r/p-combobox-13.json)
- Combobox multiple with start addon | [JSON](https://cossui-svelte.com/r/p-combobox-14.json)
- Pill-shaped combobox | [JSON](https://cossui-svelte.com/r/p-combobox-15.json)
- Timezone combobox | [JSON](https://cossui-svelte.com/r/p-combobox-16.json)
- Timezone combobox with search input | [JSON](https://cossui-svelte.com/r/p-combobox-17.json)
- Combobox with select trigger | [JSON](https://cossui-svelte.com/r/p-combobox-18.json)
- Combobox multiple with stacked chips | [JSON](https://cossui-svelte.com/r/p-combobox-19.json)
- Combobox multiple with stacked divided chips | [JSON](https://cossui-svelte.com/r/p-combobox-20.json)

### command

- Command palette with dialog | [JSON](https://cossui-svelte.com/r/p-command-1.json)
- Command palette with AI assistant | [JSON](https://cossui-svelte.com/r/p-command-2.json)

### composer

- Composer with people, teams, and slash suggestions | [JSON](https://cossui-svelte.com/r/p-composer-1.json)
- Composer with asynchronous mention suggestions | [JSON](https://cossui-svelte.com/r/p-composer-2.json)
- Composer pinned below scrollable drawer content | [JSON](https://cossui-svelte.com/r/p-composer-3.json)
- Composer surface with a native textarea | [JSON](https://cossui-svelte.com/r/p-composer-4.json)
- Composer with a custom suggestion list | [JSON](https://cossui-svelte.com/r/p-composer-5.json)
- Composer with distinct person, team, and action chips | [JSON](https://cossui-svelte.com/r/p-composer-6.json)
- Contenteditable composer with Send beside a short draft | [JSON](https://cossui-svelte.com/r/p-composer-7.json)
- Textarea composer with Send beside a short draft | [JSON](https://cossui-svelte.com/r/p-composer-8.json)
- Rounded adaptive composer with circular actions | [JSON](https://cossui-svelte.com/r/p-composer-9.json)
- Composer with leading buttons for mentions and slash actions | [JSON](https://cossui-svelte.com/r/p-composer-10.json)
- Compact rounded adaptive composer with a circular send button | [JSON](https://cossui-svelte.com/r/p-composer-11.json)

### context-menu

- Basic context menu | [JSON](https://cossui-svelte.com/r/p-context-menu-1.json)
- Context menu with link items | [JSON](https://cossui-svelte.com/r/p-context-menu-2.json)
- Nested context menu | [JSON](https://cossui-svelte.com/r/p-context-menu-3.json)
- Context menu with checkbox items | [JSON](https://cossui-svelte.com/r/p-context-menu-4.json)
- Context menu with group labels | [JSON](https://cossui-svelte.com/r/p-context-menu-5.json)
- Context menu with icons | [JSON](https://cossui-svelte.com/r/p-context-menu-6.json)
- Context menu with radio group | [JSON](https://cossui-svelte.com/r/p-context-menu-7.json)
- Context menu with switch checkbox items | [JSON](https://cossui-svelte.com/r/p-context-menu-8.json)

### cropper

- Crops images to a specific aspect ratio and size | [JSON](https://cossui-svelte.com/r/p-cropper-1.json)
- Basic cropper | [JSON](https://cossui-svelte.com/r/p-cropper-2.json)
- Cropper with aspect ratio 16:9 | [JSON](https://cossui-svelte.com/r/p-cropper-3.json)
- Cropper with custom crop area color | [JSON](https://cossui-svelte.com/r/p-cropper-4.json)
- Cropper with custom mask overlay | [JSON](https://cossui-svelte.com/r/p-cropper-5.json)
- Cropper with full size crop area | [JSON](https://cossui-svelte.com/r/p-cropper-6.json)
- Cropper with full-rounded mask | [JSON](https://cossui-svelte.com/r/p-cropper-7.json)
- Cropper with zoom slider | [JSON](https://cossui-svelte.com/r/p-cropper-8.json)
- Cropper with custom zoom limits | [JSON](https://cossui-svelte.com/r/p-cropper-9.json)
- Cropper with crop data output | [JSON](https://cossui-svelte.com/r/p-cropper-10.json)
- Cropper with image preview | [JSON](https://cossui-svelte.com/r/p-cropper-11.json)
- Cropper with aspect ratio switcher and grid overlay | [JSON](https://cossui-svelte.com/r/p-cropper-12.json)

### date-picker

- Basic date picker | [JSON](https://cossui-svelte.com/r/p-date-picker-1.json)
- Date range picker | [JSON](https://cossui-svelte.com/r/p-date-picker-2.json)
- Date picker with field and dropdown navigation | [JSON](https://cossui-svelte.com/r/p-date-picker-3.json)
- Date picker with presets | [JSON](https://cossui-svelte.com/r/p-date-picker-4.json)
- Date picker with input | [JSON](https://cossui-svelte.com/r/p-date-picker-5.json)
- Date picker that closes on select | [JSON](https://cossui-svelte.com/r/p-date-picker-6.json)
- Multiple dates picker | [JSON](https://cossui-svelte.com/r/p-date-picker-7.json)
- Date picker with select-like trigger | [JSON](https://cossui-svelte.com/r/p-date-picker-8.json)
- Two months calendar with range date | [JSON](https://cossui-svelte.com/r/p-date-picker-9.json)

### dialog

- Dialog with form | [JSON](https://cossui-svelte.com/r/p-dialog-1.json)
- Dialog opened from menu | [JSON](https://cossui-svelte.com/r/p-dialog-2.json)
- Nested dialogs | [JSON](https://cossui-svelte.com/r/p-dialog-3.json)
- Dialog with close confirmation | [JSON](https://cossui-svelte.com/r/p-dialog-4.json)
- Dialog with long content | [JSON](https://cossui-svelte.com/r/p-dialog-5.json)
- Dialog with bare footer | [JSON](https://cossui-svelte.com/r/p-dialog-6.json)

### drawer

- Simple bottom drawer with close button | [JSON](https://cossui-svelte.com/r/p-drawer-1.json)
- Bottom drawer without drag bar | [JSON](https://cossui-svelte.com/r/p-drawer-2.json)
- Drawer with close button | [JSON](https://cossui-svelte.com/r/p-drawer-3.json)
- Inset variant drawers for all four positions | [JSON](https://cossui-svelte.com/r/p-drawer-4.json)
- Straight variant drawers for all four positions | [JSON](https://cossui-svelte.com/r/p-drawer-5.json)
- Scrollable content with terms and conditions | [JSON](https://cossui-svelte.com/r/p-drawer-6.json)
- Nested bottom drawers with centered content | [JSON](https://cossui-svelte.com/r/p-drawer-7.json)
- Nested right drawers with inset variant | [JSON](https://cossui-svelte.com/r/p-drawer-8.json)
- Bottom drawer with snap points | [JSON](https://cossui-svelte.com/r/p-drawer-9.json)
- Edit profile form with default and bare footer variants | [JSON](https://cossui-svelte.com/r/p-drawer-10.json)
- Mobile menu drawer from the left | [JSON](https://cossui-svelte.com/r/p-drawer-11.json)
- Responsive edit profile: dialog on desktop, drawer on mobile | [JSON](https://cossui-svelte.com/r/p-drawer-12.json)
- Responsive actions menu: menu on desktop, drawer on mobile | [JSON](https://cossui-svelte.com/r/p-drawer-13.json)
- Left drawer with swipe area | [JSON](https://cossui-svelte.com/r/p-drawer-14.json)
- Composer pinned below scrollable drawer content in a bottom drawer | [JSON](https://cossui-svelte.com/r/p-drawer-15.json)

### empty

- Empty state with icon and actions | [JSON](https://cossui-svelte.com/r/p-empty-1.json)

### field

- Field with description | [JSON](https://cossui-svelte.com/r/p-field-1.json)
- Field with required indicator | [JSON](https://cossui-svelte.com/r/p-field-2.json)
- Field in disabled state | [JSON](https://cossui-svelte.com/r/p-field-3.json)
- Field showing validation error | [JSON](https://cossui-svelte.com/r/p-field-4.json)
- Show field validity state | [JSON](https://cossui-svelte.com/r/p-field-5.json)
- Input group with field | [JSON](https://cossui-svelte.com/r/p-field-6.json)
- Field with autocomplete | [JSON](https://cossui-svelte.com/r/p-field-7.json)
- Field with combobox | [JSON](https://cossui-svelte.com/r/p-field-8.json)
- Field with multiple selection combobox | [JSON](https://cossui-svelte.com/r/p-field-9.json)
- Field with textarea | [JSON](https://cossui-svelte.com/r/p-field-10.json)
- Field with select | [JSON](https://cossui-svelte.com/r/p-field-11.json)
- Field with checkbox | [JSON](https://cossui-svelte.com/r/p-field-12.json)
- Field with checkbox group | [JSON](https://cossui-svelte.com/r/p-field-13.json)
- Field with radio group | [JSON](https://cossui-svelte.com/r/p-field-14.json)
- Field with toggle switch | [JSON](https://cossui-svelte.com/r/p-field-15.json)
- Field with slider | [JSON](https://cossui-svelte.com/r/p-field-16.json)
- Field with number field | [JSON](https://cossui-svelte.com/r/p-field-17.json)
- Complete form built with field | [JSON](https://cossui-svelte.com/r/p-field-18.json)

### fieldset

- Fieldset with multiple fields | [JSON](https://cossui-svelte.com/r/p-fieldset-1.json)

### file-upload

- Basic image uploader | [JSON](https://cossui-svelte.com/r/p-file-upload-1.json)
- Avatar upload button | [JSON](https://cossui-svelte.com/r/p-file-upload-2.json)
- Avatar uploader with droppable area | [JSON](https://cossui-svelte.com/r/p-file-upload-3.json)
- Single image uploader with max size | [JSON](https://cossui-svelte.com/r/p-file-upload-4.json)
- Single image uploader with max size, drop area and button | [JSON](https://cossui-svelte.com/r/p-file-upload-5.json)
- Multiple image uploader with image grid | [JSON](https://cossui-svelte.com/r/p-file-upload-6.json)
- Multiple image uploader with image list | [JSON](https://cossui-svelte.com/r/p-file-upload-7.json)
- Single file uploader with max size | [JSON](https://cossui-svelte.com/r/p-file-upload-8.json)
- Multiple files uploader with list | [JSON](https://cossui-svelte.com/r/p-file-upload-9.json)
- Multiple files uploader with list inside the drop area | [JSON](https://cossui-svelte.com/r/p-file-upload-10.json)
- Multiple files uploader with table | [JSON](https://cossui-svelte.com/r/p-file-upload-11.json)
- Mixed content uploader with card grid | [JSON](https://cossui-svelte.com/r/p-file-upload-12.json)
- File uploader with simulated progress tracking | [JSON](https://cossui-svelte.com/r/p-file-upload-13.json)
- Avatar uploader with crop dialog | [JSON](https://cossui-svelte.com/r/p-file-upload-14.json)

### form

- Input in a form | [JSON](https://cossui-svelte.com/r/p-form-1.json)
- Form with zod validation | [JSON](https://cossui-svelte.com/r/p-form-2.json)

### frame

- Basic frame | [JSON](https://cossui-svelte.com/r/p-frame-1.json)
- Frame with collapsible content and delete button | [JSON](https://cossui-svelte.com/r/p-frame-2.json)
- Frame with multiple separated panels | [JSON](https://cossui-svelte.com/r/p-frame-3.json)
- Frame with multiple stacked panels | [JSON](https://cossui-svelte.com/r/p-frame-4.json)

### group

- Basic group | [JSON](https://cossui-svelte.com/r/p-group-1.json)
- Group with input | [JSON](https://cossui-svelte.com/r/p-group-2.json)
- Small group | [JSON](https://cossui-svelte.com/r/p-group-3.json)
- Large group | [JSON](https://cossui-svelte.com/r/p-group-4.json)
- Group with disabled button | [JSON](https://cossui-svelte.com/r/p-group-5.json)
- Group with default button | [JSON](https://cossui-svelte.com/r/p-group-6.json)
- Group with start text | [JSON](https://cossui-svelte.com/r/p-group-7.json)
- Group with end text | [JSON](https://cossui-svelte.com/r/p-group-8.json)
- Vertical group | [JSON](https://cossui-svelte.com/r/p-group-9.json)
- Nested groups | [JSON](https://cossui-svelte.com/r/p-group-10.json)
- Group with popup | [JSON](https://cossui-svelte.com/r/p-group-11.json)
- Group with input group | [JSON](https://cossui-svelte.com/r/p-group-12.json)
- Group with menu | [JSON](https://cossui-svelte.com/r/p-group-13.json)
- Group with select | [JSON](https://cossui-svelte.com/r/p-group-14.json)
- Group with search | [JSON](https://cossui-svelte.com/r/p-group-15.json)
- Group with add button and input | [JSON](https://cossui-svelte.com/r/p-group-16.json)
- Group with input and currency text | [JSON](https://cossui-svelte.com/r/p-group-17.json)
- Group with select and input | [JSON](https://cossui-svelte.com/r/p-group-18.json)
- Group with input and select | [JSON](https://cossui-svelte.com/r/p-group-19.json)
- Group with input and text button | [JSON](https://cossui-svelte.com/r/p-group-20.json)
- Group with two number inputs for range | [JSON](https://cossui-svelte.com/r/p-group-22.json)
- Group with filter label, combobox multi-select, and remove button | [JSON](https://cossui-svelte.com/r/p-group-23.json)

### input

- Basic input | [JSON](https://cossui-svelte.com/r/p-input-1.json)
- Small input | [JSON](https://cossui-svelte.com/r/p-input-2.json)
- Large input | [JSON](https://cossui-svelte.com/r/p-input-3.json)
- Disabled input | [JSON](https://cossui-svelte.com/r/p-input-4.json)
- File input | [JSON](https://cossui-svelte.com/r/p-input-5.json)
- Input with label | [JSON](https://cossui-svelte.com/r/p-input-6.json)
- Input with button using Group | [JSON](https://cossui-svelte.com/r/p-input-7.json)
- Input with start text and end tooltip | [JSON](https://cossui-svelte.com/r/p-input-8.json)
- Password input with toggle visibility | [JSON](https://cossui-svelte.com/r/p-input-9.json)
- Input group mimicking a URL bar | [JSON](https://cossui-svelte.com/r/p-input-10.json)
- Input group with keyboard shortcut | [JSON](https://cossui-svelte.com/r/p-input-11.json)
- Input group with start loading spinner | [JSON](https://cossui-svelte.com/r/p-input-12.json)
- Input with label and required indicator | [JSON](https://cossui-svelte.com/r/p-input-13.json)
- Input with optional label | [JSON](https://cossui-svelte.com/r/p-input-14.json)
- Input with custom border and background | [JSON](https://cossui-svelte.com/r/p-input-15.json)
- Input group with end loading spinner | [JSON](https://cossui-svelte.com/r/p-input-16.json)
- Read-only input | [JSON](https://cossui-svelte.com/r/p-input-17.json)
- Input with characters remaining counter | [JSON](https://cossui-svelte.com/r/p-input-18.json)
- Pill-shaped input | [JSON](https://cossui-svelte.com/r/p-input-19.json)
- Credit card number input with auto-formatting | [JSON](https://cossui-svelte.com/r/p-input-100.json)
- Credit card expiry date input with auto-formatting | [JSON](https://cossui-svelte.com/r/p-input-101.json)
- Credit card CVC/code input with auto-formatting | [JSON](https://cossui-svelte.com/r/p-input-102.json)
- Combined credit card number, expiry, and CVC inputs with auto-formatting | [JSON](https://cossui-svelte.com/r/p-input-103.json)
- Phone number input with country code selection and auto-formatting | [JSON](https://cossui-svelte.com/r/p-input-147.json)
- Input with input mask | [JSON](https://cossui-svelte.com/r/p-input-155.json)
- Timestamp input with input mask | [JSON](https://cossui-svelte.com/r/p-input-156.json)
- Numeric range input with min and max fields | [JSON](https://cossui-svelte.com/r/p-input-157.json)
- IP address, subnet mask, and gateway inputs with auto-formatting | [JSON](https://cossui-svelte.com/r/p-input-200.json)

### input-group

- Basic input group | [JSON](https://cossui-svelte.com/r/p-input-group-1.json)
- Input group with end icon | [JSON](https://cossui-svelte.com/r/p-input-group-2.json)
- Input group with start text | [JSON](https://cossui-svelte.com/r/p-input-group-3.json)
- Input group with end text | [JSON](https://cossui-svelte.com/r/p-input-group-4.json)
- Input group with start and end text | [JSON](https://cossui-svelte.com/r/p-input-group-5.json)
- Input group with number field | [JSON](https://cossui-svelte.com/r/p-input-group-6.json)
- Input group with end tooltip | [JSON](https://cossui-svelte.com/r/p-input-group-7.json)
- Input group with icon button | [JSON](https://cossui-svelte.com/r/p-input-group-8.json)
- Input group with button | [JSON](https://cossui-svelte.com/r/p-input-group-9.json)
- Input group with badge | [JSON](https://cossui-svelte.com/r/p-input-group-10.json)
- Input group with keyboard shortcut | [JSON](https://cossui-svelte.com/r/p-input-group-11.json)
- Input group with inner label | [JSON](https://cossui-svelte.com/r/p-input-group-12.json)
- Small input group | [JSON](https://cossui-svelte.com/r/p-input-group-13.json)
- Large input group | [JSON](https://cossui-svelte.com/r/p-input-group-14.json)
- Disabled input group | [JSON](https://cossui-svelte.com/r/p-input-group-15.json)
- Input group with loading spinner | [JSON](https://cossui-svelte.com/r/p-input-group-16.json)
- Input group with textarea | [JSON](https://cossui-svelte.com/r/p-input-group-17.json)
- Input group with badge and menu | [JSON](https://cossui-svelte.com/r/p-input-group-18.json)
- Mini editor built with input group and toggle | [JSON](https://cossui-svelte.com/r/p-input-group-19.json)
- Input group with search icon | [JSON](https://cossui-svelte.com/r/p-input-group-20.json)
- Input group with start tooltip | [JSON](https://cossui-svelte.com/r/p-input-group-21.json)
- Input group with clear button | [JSON](https://cossui-svelte.com/r/p-input-group-22.json)
- Search input group with loader and voice button | [JSON](https://cossui-svelte.com/r/p-input-group-23.json)
- Input group with character counter | [JSON](https://cossui-svelte.com/r/p-input-group-24.json)
- Password input with strength indicator | [JSON](https://cossui-svelte.com/r/p-input-group-26.json)
- Code snippet input with language selector | [JSON](https://cossui-svelte.com/r/p-input-group-27.json)
- Message composer with attachment buttons | [JSON](https://cossui-svelte.com/r/p-input-group-28.json)
- Chat input with voice and send buttons | [JSON](https://cossui-svelte.com/r/p-input-group-29.json)

### kbd

- Keyboard shortcuts display | [JSON](https://cossui-svelte.com/r/p-kbd-1.json)

### link-preview

- A component that displays a preview of a link on mouse hover | [JSON](https://cossui-svelte.com/r/p-link-preview-1.json)

### map

- Global analytics map with markers sized by active users per city | [JSON](https://cossui-svelte.com/r/p-map-1.json)
- Global shipping routes visualized as animated arcs from a hub on a rotating globe | [JSON](https://cossui-svelte.com/r/p-map-2.json)
- Delivery tracking map with animated route and courier marker | [JSON](https://cossui-svelte.com/r/p-map-3.json)
- EV charging stations with live availability status markers | [JSON](https://cossui-svelte.com/r/p-map-4.json)
- Destination picker with animated fly-to transitions | [JSON](https://cossui-svelte.com/r/p-map-5.json)
- Cycling trail map with route line and activity stats overlay | [JSON](https://cossui-svelte.com/r/p-map-6.json)
- Heatmap-style markers showing visitor traffic hotspots | [JSON](https://cossui-svelte.com/r/p-map-7.json)
- Map with zoom, compass, locate, and fullscreen controls | [JSON](https://cossui-svelte.com/r/p-map-8.json)
- Map with a GeoJSON polygon overlay | [JSON](https://cossui-svelte.com/r/p-map-9.json)
- Clustered markers with a popup showing details on click | [JSON](https://cossui-svelte.com/r/p-map-10.json)
- Map with a dismissible popup and a button to show it again | [JSON](https://cossui-svelte.com/r/p-map-11.json)

### menu

- Basic menu | [JSON](https://cossui-svelte.com/r/p-menu-1.json)
- Menu with hover | [JSON](https://cossui-svelte.com/r/p-menu-2.json)
- Menu with checkbox | [JSON](https://cossui-svelte.com/r/p-menu-3.json)
- Menu with radio group | [JSON](https://cossui-svelte.com/r/p-menu-4.json)
- Menu with link | [JSON](https://cossui-svelte.com/r/p-menu-5.json)
- Menu with group labels | [JSON](https://cossui-svelte.com/r/p-menu-6.json)
- Nested menu | [JSON](https://cossui-svelte.com/r/p-menu-7.json)
- Menu close on click | [JSON](https://cossui-svelte.com/r/p-menu-8.json)
- Menu with checkbox items as switches | [JSON](https://cossui-svelte.com/r/p-menu-9.json)

### meter

- Basic meter | [JSON](https://cossui-svelte.com/r/p-meter-1.json)
- Simple meter | [JSON](https://cossui-svelte.com/r/p-meter-2.json)
- Meter with formatted value | [JSON](https://cossui-svelte.com/r/p-meter-3.json)
- Meter with range | [JSON](https://cossui-svelte.com/r/p-meter-4.json)

### navigation

- Segmented navigation built with links | [JSON](https://cossui-svelte.com/r/p-navigation-1.json)
- Small segmented navigation built with links | [JSON](https://cossui-svelte.com/r/p-navigation-2.json)
- Large segmented navigation built with links | [JSON](https://cossui-svelte.com/r/p-navigation-3.json)

### number-field

- Basic number field | [JSON](https://cossui-svelte.com/r/p-number-field-1.json)
- Small number field | [JSON](https://cossui-svelte.com/r/p-number-field-2.json)
- Large number field | [JSON](https://cossui-svelte.com/r/p-number-field-3.json)
- Disabled number field | [JSON](https://cossui-svelte.com/r/p-number-field-4.json)
- Number field with label | [JSON](https://cossui-svelte.com/r/p-number-field-5.json)
- Number field with scrub | [JSON](https://cossui-svelte.com/r/p-number-field-6.json)
- Number field with range | [JSON](https://cossui-svelte.com/r/p-number-field-7.json)
- Number field with formatted value | [JSON](https://cossui-svelte.com/r/p-number-field-8.json)
- Number field with step | [JSON](https://cossui-svelte.com/r/p-number-field-9.json)
- Number field in form | [JSON](https://cossui-svelte.com/r/p-number-field-10.json)
- Pill-shaped number field | [JSON](https://cossui-svelte.com/r/p-number-field-11.json)
- Vote counter with up and down buttons | [JSON](https://cossui-svelte.com/r/p-number-field-100.json)
- Rounded vote counter with up and down buttons | [JSON](https://cossui-svelte.com/r/p-number-field-101.json)
- Volume control with an icon that reflects the current level | [JSON](https://cossui-svelte.com/r/p-number-field-102.json)
- Currency input with locale-aware formatting and chevron steppers | [JSON](https://cossui-svelte.com/r/p-number-field-103.json)

### otp-field

- Basic OTP field | [JSON](https://cossui-svelte.com/r/p-otp-field-1.json)
- Large OTP field | [JSON](https://cossui-svelte.com/r/p-otp-field-2.json)
- OTP field with separator | [JSON](https://cossui-svelte.com/r/p-otp-field-3.json)
- OTP field with label | [JSON](https://cossui-svelte.com/r/p-otp-field-4.json)
- OTP field with custom sanitization | [JSON](https://cossui-svelte.com/r/p-otp-field-6.json)
- OTP field with auto validation | [JSON](https://cossui-svelte.com/r/p-otp-field-7.json)
- Alphanumeric OTP field | [JSON](https://cossui-svelte.com/r/p-otp-field-8.json)
- OTP field with placeholder hints | [JSON](https://cossui-svelte.com/r/p-otp-field-9.json)
- Masked OTP field | [JSON](https://cossui-svelte.com/r/p-otp-field-10.json)

### pagination

- Pagination example | [JSON](https://cossui-svelte.com/r/p-pagination-1.json)
- Pagination with previous and next buttons only | [JSON](https://cossui-svelte.com/r/p-pagination-2.json)
- Pagination with select, and previous and next buttons | [JSON](https://cossui-svelte.com/r/p-pagination-3.json)

### places-autocomplete

- Address validation powered by the Google Places API | [JSON](https://cossui-svelte.com/r/p-places-autocomplete-1.json)

### popover

- Popover with a form | [JSON](https://cossui-svelte.com/r/p-popover-1.json)
- Popover with close button | [JSON](https://cossui-svelte.com/r/p-popover-2.json)
- Animated popovers | [JSON](https://cossui-svelte.com/r/p-popover-3.json)
- Split button with popover to confirm multiple occurrences | [JSON](https://cossui-svelte.com/r/p-popover-4.json)

### preview-card

- Preview card with popup | [JSON](https://cossui-svelte.com/r/p-preview-card-1.json)

### progress

- Basic progress bar | [JSON](https://cossui-svelte.com/r/p-progress-1.json)
- Progress with label and value | [JSON](https://cossui-svelte.com/r/p-progress-2.json)
- Progress with formatted value | [JSON](https://cossui-svelte.com/r/p-progress-3.json)

### radio-group

- Basic radio group | [JSON](https://cossui-svelte.com/r/p-radio-group-1.json)
- Disabled radio group | [JSON](https://cossui-svelte.com/r/p-radio-group-2.json)
- Radio group with description | [JSON](https://cossui-svelte.com/r/p-radio-group-3.json)
- Radio group card | [JSON](https://cossui-svelte.com/r/p-radio-group-4.json)
- Radio group in form | [JSON](https://cossui-svelte.com/r/p-radio-group-5.json)
- Theme selector with image cards | [JSON](https://cossui-svelte.com/r/p-radio-group-6.json)
- Small segmented control built with a radio group | [JSON](https://cossui-svelte.com/r/p-radio-group-7.json)
- Segmented control built with a radio group | [JSON](https://cossui-svelte.com/r/p-radio-group-8.json)
- Large segmented control built with a radio group | [JSON](https://cossui-svelte.com/r/p-radio-group-9.json)
- Color palette radio cards in a four-column grid | [JSON](https://cossui-svelte.com/r/p-radio-group-10.json)
- Membership plan radio cards with price and free trial badge | [JSON](https://cossui-svelte.com/r/p-radio-group-100.json)

### scroll-area

- Basic scroll area | [JSON](https://cossui-svelte.com/r/p-scroll-area-1.json)
- Horizontal scroll area | [JSON](https://cossui-svelte.com/r/p-scroll-area-2.json)
- Scroll area with both directions | [JSON](https://cossui-svelte.com/r/p-scroll-area-3.json)
- Scroll area with fading edges | [JSON](https://cossui-svelte.com/r/p-scroll-area-4.json)
- Horizontal scroll area with scrollbar gutter | [JSON](https://cossui-svelte.com/r/p-scroll-area-5.json)

### select

- Basic select | [JSON](https://cossui-svelte.com/r/p-select-1.json)
- Small select | [JSON](https://cossui-svelte.com/r/p-select-2.json)
- Large select | [JSON](https://cossui-svelte.com/r/p-select-3.json)
- Disabled select | [JSON](https://cossui-svelte.com/r/p-select-4.json)
- Select with a placeholder | [JSON](https://cossui-svelte.com/r/p-select-5.json)
- Select with groups | [JSON](https://cossui-svelte.com/r/p-select-6.json)
- Multiple select | [JSON](https://cossui-svelte.com/r/p-select-7.json)
- Select with icon | [JSON](https://cossui-svelte.com/r/p-select-8.json)
- Select options with icon | [JSON](https://cossui-svelte.com/r/p-select-9.json)
- Select with object values | [JSON](https://cossui-svelte.com/r/p-select-10.json)
- Select in form | [JSON](https://cossui-svelte.com/r/p-select-11.json)
- Select with disabled items | [JSON](https://cossui-svelte.com/r/p-select-12.json)
- Timezone select | [JSON](https://cossui-svelte.com/r/p-select-13.json)
- Status select with colored dot | [JSON](https://cossui-svelte.com/r/p-select-14.json)
- Pill-shaped select trigger | [JSON](https://cossui-svelte.com/r/p-select-15.json)
- Select with left text label | [JSON](https://cossui-svelte.com/r/p-select-16.json)
- Select with country flags | [JSON](https://cossui-svelte.com/r/p-select-17.json)
- Select with description in options only | [JSON](https://cossui-svelte.com/r/p-select-18.json)
- Select with avatars | [JSON](https://cossui-svelte.com/r/p-select-19.json)
- Rich select with avatars and usernames | [JSON](https://cossui-svelte.com/r/p-select-20.json)
- Auto width select | [JSON](https://cossui-svelte.com/r/p-select-21.json)
- Select with custom border and background | [JSON](https://cossui-svelte.com/r/p-select-22.json)
- Select with label | [JSON](https://cossui-svelte.com/r/p-select-23.json)
- Color palette select with three-color swatches | [JSON](https://cossui-svelte.com/r/p-select-24.json)

### separator

- Separator with horizontal and vertical orientations | [JSON](https://cossui-svelte.com/r/p-separator-1.json)

### sheet

- Basic sheet | [JSON](https://cossui-svelte.com/r/p-sheet-1.json)
- Sheet inset | [JSON](https://cossui-svelte.com/r/p-sheet-2.json)
- Sheet position | [JSON](https://cossui-svelte.com/r/p-sheet-3.json)

### sidebar

- Basic application sidebar with a navigation menu | [JSON](https://cossui-svelte.com/r/p-sidebar-1.json)
- Documentation sidebar with a version switcher, search and grouped navigation | [JSON](https://cossui-svelte.com/r/p-sidebar-2.json)
- Sidebar header holding a workspace switcher menu | [JSON](https://cossui-svelte.com/r/p-sidebar-3.json)
- Sidebar footer with a user menu opening upwards | [JSON](https://cossui-svelte.com/r/p-sidebar-4.json)
- Labelled sidebar group wrapping a short menu | [JSON](https://cossui-svelte.com/r/p-sidebar-5.json)
- Sidebar group with an action button next to its label | [JSON](https://cossui-svelte.com/r/p-sidebar-6.json)
- Collapsible sidebar group toggled from its label | [JSON](https://cossui-svelte.com/r/p-sidebar-7.json)
- Sidebar menu of project links with leading icons | [JSON](https://cossui-svelte.com/r/p-sidebar-8.json)
- Sidebar menu items with a per-row action menu | [JSON](https://cossui-svelte.com/r/p-sidebar-9.json)
- Sidebar menu items with trailing count badges | [JSON](https://cossui-svelte.com/r/p-sidebar-10.json)
- Sidebar menu with always-visible nested sub-menus | [JSON](https://cossui-svelte.com/r/p-sidebar-11.json)
- Sidebar menu whose sub-menus expand and collapse | [JSON](https://cossui-svelte.com/r/p-sidebar-12.json)
- Sidebar open state controlled from outside the component | [JSON](https://cossui-svelte.com/r/p-sidebar-13.json)

### skeleton

- Basic skeleton | [JSON](https://cossui-svelte.com/r/p-skeleton-1.json)
- Skeleton only | [JSON](https://cossui-svelte.com/r/p-skeleton-2.json)

### slider

- Basic slider | [JSON](https://cossui-svelte.com/r/p-slider-1.json)
- Slider with label and value | [JSON](https://cossui-svelte.com/r/p-slider-2.json)
- Disabled slider | [JSON](https://cossui-svelte.com/r/p-slider-3.json)
- Slider with reference labels | [JSON](https://cossui-svelte.com/r/p-slider-4.json)
- Slider with ticks | [JSON](https://cossui-svelte.com/r/p-slider-5.json)
- Slider with labels above | [JSON](https://cossui-svelte.com/r/p-slider-6.json)
- Range slider | [JSON](https://cossui-svelte.com/r/p-slider-7.json)
- Slider with 3 thumbs | [JSON](https://cossui-svelte.com/r/p-slider-8.json)
- Range slider with collision behavior none | [JSON](https://cossui-svelte.com/r/p-slider-9.json)
- Range slider with collision behavior swap | [JSON](https://cossui-svelte.com/r/p-slider-10.json)
- Slider with icons | [JSON](https://cossui-svelte.com/r/p-slider-11.json)
- Slider with input | [JSON](https://cossui-svelte.com/r/p-slider-12.json)
- Range slider with inputs | [JSON](https://cossui-svelte.com/r/p-slider-13.json)
- Slider with increment and decrement buttons | [JSON](https://cossui-svelte.com/r/p-slider-14.json)
- Price range slider | [JSON](https://cossui-svelte.com/r/p-slider-15.json)
- Emoji rating slider | [JSON](https://cossui-svelte.com/r/p-slider-16.json)
- Vertical slider | [JSON](https://cossui-svelte.com/r/p-slider-17.json)
- Vertical range slider | [JSON](https://cossui-svelte.com/r/p-slider-18.json)
- Vertical slider with input | [JSON](https://cossui-svelte.com/r/p-slider-19.json)
- Equalizer with vertical sliders | [JSON](https://cossui-svelte.com/r/p-slider-20.json)
- Object position sliders with reset | [JSON](https://cossui-svelte.com/r/p-slider-21.json)
- Price slider with histogram | [JSON](https://cossui-svelte.com/r/p-slider-22.json)
- Slider in form | [JSON](https://cossui-svelte.com/r/p-slider-23.json)

### spinner

- Basic spinner | [JSON](https://cossui-svelte.com/r/p-spinner-1.json)

### starrating

- Basic interactive star rating | [JSON](https://cossui-svelte.com/r/p-starrating-1.json)
- Half-star precision rating with live value display | [JSON](https://cossui-svelte.com/r/p-starrating-2.json)
- Readonly rating with review count | [JSON](https://cossui-svelte.com/r/p-starrating-3.json)
- Star rating inside a form field | [JSON](https://cossui-svelte.com/r/p-starrating-4.json)
- Star rating with a different color per star | [JSON](https://cossui-svelte.com/r/p-starrating-5.json)
- Heart rating using a custom icon | [JSON](https://cossui-svelte.com/r/p-starrating-6.json)

### stepper

- Basic stepper examples | [JSON](https://cossui-svelte.com/r/p-stepper-1.json)
- Stepper with numbers only | [JSON](https://cossui-svelte.com/r/p-stepper-2.json)
- Stepper with numbers and checkmarks | [JSON](https://cossui-svelte.com/r/p-stepper-3.json)
- Stepper with tiny buttons and checkmarks | [JSON](https://cossui-svelte.com/r/p-stepper-4.json)
- Controlled stepper with checkmarks | [JSON](https://cossui-svelte.com/r/p-stepper-5.json)
- Controlled stepper with checkmarks and loading state | [JSON](https://cossui-svelte.com/r/p-stepper-6.json)
- Stepper with mixed elements | [JSON](https://cossui-svelte.com/r/p-stepper-7.json)
- Stepper with labels | [JSON](https://cossui-svelte.com/r/p-stepper-8.json)
- Paginated stepper | [JSON](https://cossui-svelte.com/r/p-stepper-9.json)
- Progress stepper | [JSON](https://cossui-svelte.com/r/p-stepper-10.json)
- Stepper with titles and descriptions | [JSON](https://cossui-svelte.com/r/p-stepper-11.json)
- Stepper with inline titles | [JSON](https://cossui-svelte.com/r/p-stepper-12.json)
- Vertical stepper with numbers and checkmarks | [JSON](https://cossui-svelte.com/r/p-stepper-15.json)
- Controlled vertical stepper with checkmarks | [JSON](https://cossui-svelte.com/r/p-stepper-16.json)
- Vertical stepper with inline titles | [JSON](https://cossui-svelte.com/r/p-stepper-17.json)
- Vertical stepper with inline titles and descriptions | [JSON](https://cossui-svelte.com/r/p-stepper-18.json)

### switch

- Basic switch | [JSON](https://cossui-svelte.com/r/p-switch-1.json)
- Disabled switch | [JSON](https://cossui-svelte.com/r/p-switch-2.json)
- Switch with description | [JSON](https://cossui-svelte.com/r/p-switch-3.json)
- Switch card | [JSON](https://cossui-svelte.com/r/p-switch-4.json)
- Switch in form | [JSON](https://cossui-svelte.com/r/p-switch-5.json)
- Custom size switch | [JSON](https://cossui-svelte.com/r/p-switch-6.json)
- Weekly availability editor with time range combobox pickers | [JSON](https://cossui-svelte.com/r/p-switch-7.json)
- Weekly availability editor with grouped time range controls | [JSON](https://cossui-svelte.com/r/p-switch-8.json)
- Weekly availability editor with From/To labeled time groups | [JSON](https://cossui-svelte.com/r/p-switch-9.json)

### table

- Basic table | [JSON](https://cossui-svelte.com/r/p-table-1.json)
- Frame with card-style table | [JSON](https://cossui-svelte.com/r/p-table-2.json)
- Table with TanStack Table and checkboxes | [JSON](https://cossui-svelte.com/r/p-table-3.json)
- Table with TanStack Table, sorting, and pagination | [JSON](https://cossui-svelte.com/r/p-table-4.json)
- Card-style table variant | [JSON](https://cossui-svelte.com/r/p-table-5.json)
- CardFrame with TanStack Table and checkboxes | [JSON](https://cossui-svelte.com/r/p-table-6.json)
- CardFrame with card-style table | [JSON](https://cossui-svelte.com/r/p-table-7.json)
- CardFrame with TanStack Table, sorting, and pagination | [JSON](https://cossui-svelte.com/r/p-table-8.json)
- Vertical table | [JSON](https://cossui-svelte.com/r/p-table-9.json)
- Table with sticky header | [JSON](https://cossui-svelte.com/r/p-table-10.json)

### tabs

- Segmented control built with tabs | [JSON](https://cossui-svelte.com/r/p-tabs-1.json)
- Tabs with underline | [JSON](https://cossui-svelte.com/r/p-tabs-2.json)
- Vertical tabs | [JSON](https://cossui-svelte.com/r/p-tabs-3.json)
- Vertical tabs with underline | [JSON](https://cossui-svelte.com/r/p-tabs-4.json)
- Tabs with full rounded triggers | [JSON](https://cossui-svelte.com/r/p-tabs-5.json)
- Tabs with icon before name | [JSON](https://cossui-svelte.com/r/p-tabs-6.json)
- Tabs with icon before name and underline | [JSON](https://cossui-svelte.com/r/p-tabs-7.json)
- Tabs with icon only | [JSON](https://cossui-svelte.com/r/p-tabs-8.json)
- Tabs with underline and icon on top | [JSON](https://cossui-svelte.com/r/p-tabs-9.json)
- Tabs with count badge | [JSON](https://cossui-svelte.com/r/p-tabs-10.json)
- Vertical tabs with underline and icon before name | [JSON](https://cossui-svelte.com/r/p-tabs-11.json)
- Tabs with icon only and count badge | [JSON](https://cossui-svelte.com/r/p-tabs-12.json)
- Tabs with icon only and grouped tooltips | [JSON](https://cossui-svelte.com/r/p-tabs-13.json)
- Small segmented control built with tabs | [JSON](https://cossui-svelte.com/r/p-tabs-14.json)
- Large segmented control built with tabs | [JSON](https://cossui-svelte.com/r/p-tabs-15.json)

### textarea

- Basic textarea | [JSON](https://cossui-svelte.com/r/p-textarea-1.json)
- Small textarea | [JSON](https://cossui-svelte.com/r/p-textarea-2.json)
- Large textarea | [JSON](https://cossui-svelte.com/r/p-textarea-3.json)
- Disabled textarea | [JSON](https://cossui-svelte.com/r/p-textarea-4.json)
- Textarea with label | [JSON](https://cossui-svelte.com/r/p-textarea-5.json)
- Textarea in form | [JSON](https://cossui-svelte.com/r/p-textarea-6.json)
- Textarea with label and required indicator | [JSON](https://cossui-svelte.com/r/p-textarea-7.json)
- Textarea with optional label | [JSON](https://cossui-svelte.com/r/p-textarea-8.json)
- Textarea with custom border and background | [JSON](https://cossui-svelte.com/r/p-textarea-9.json)
- Read-only textarea | [JSON](https://cossui-svelte.com/r/p-textarea-10.json)
- Textarea with characters remaining counter | [JSON](https://cossui-svelte.com/r/p-textarea-11.json)
- Textarea field with required indicator | [JSON](https://cossui-svelte.com/r/p-textarea-12.json)
- Shorter textarea with fixed height | [JSON](https://cossui-svelte.com/r/p-textarea-13.json)
- Textarea with button aligned right | [JSON](https://cossui-svelte.com/r/p-textarea-14.json)
- Textarea with button aligned left | [JSON](https://cossui-svelte.com/r/p-textarea-15.json)

### timeline

- The most basic vertical timeline | [JSON](https://cossui-svelte.com/r/p-timeline-1.json)
- A more complex timeline | [JSON](https://cossui-svelte.com/r/p-timeline-2.json)
- A more complex timeline with embeded dates | [JSON](https://cossui-svelte.com/r/p-timeline-3.json)
- A Basic vertical timeline | [JSON](https://cossui-svelte.com/r/p-timeline-4.json)
- A vertical timeline with progress indicator | [JSON](https://cossui-svelte.com/r/p-timeline-5.json)
- A timeline with icons | [JSON](https://cossui-svelte.com/r/p-timeline-6.json)
- A timeline with images | [JSON](https://cossui-svelte.com/r/p-timeline-7.json)
- A timeline with titles and dates | [JSON](https://cossui-svelte.com/r/p-timeline-8.json)
- A timeline as an array | [JSON](https://cossui-svelte.com/r/p-timeline-9.json)
- A timeline showing an activity tracker | [JSON](https://cossui-svelte.com/r/p-timeline-10.json)
- Horizontal timeline with dates below | [JSON](https://cossui-svelte.com/r/p-timeline-11.json)
- Horizontal timeline with dates above | [JSON](https://cossui-svelte.com/r/p-timeline-12.json)

### toast

- Default stacked toast with title and description | [JSON](https://cossui-svelte.com/r/p-toast-1.json)
- Stacked toasts by semantic type (success, error, info, warning) | [JSON](https://cossui-svelte.com/r/p-toast-2.json)
- Loading-state stacked toast | [JSON](https://cossui-svelte.com/r/p-toast-3.json)
- Stacked toast with primary action (undo) | [JSON](https://cossui-svelte.com/r/p-toast-4.json)
- Promise-based stacked toast | [JSON](https://cossui-svelte.com/r/p-toast-5.json)
- Stacked toasts with varying content height | [JSON](https://cossui-svelte.com/r/p-toast-6.json)
- Anchored tooltip-style toast after copy | [JSON](https://cossui-svelte.com/r/p-toast-7.json)
- Anchored error toast after async failure | [JSON](https://cossui-svelte.com/r/p-toast-8.json)
- Long-running promise toast with cancel | [JSON](https://cossui-svelte.com/r/p-toast-9.json)
- Deduplicated success toast | [JSON](https://cossui-svelte.com/r/p-toast-10.json)
- Deduplicated error toast | [JSON](https://cossui-svelte.com/r/p-toast-11.json)
- Anchored deduplicated success toast | [JSON](https://cossui-svelte.com/r/p-toast-12.json)
- Anchored deduplicated error toast | [JSON](https://cossui-svelte.com/r/p-toast-13.json)

### toggle

- Basic toggle | [JSON](https://cossui-svelte.com/r/p-toggle-1.json)
- Toggle with outline | [JSON](https://cossui-svelte.com/r/p-toggle-2.json)
- Toggle with icon | [JSON](https://cossui-svelte.com/r/p-toggle-3.json)
- Small toggle | [JSON](https://cossui-svelte.com/r/p-toggle-4.json)
- Large toggle | [JSON](https://cossui-svelte.com/r/p-toggle-5.json)
- Disabled toggle | [JSON](https://cossui-svelte.com/r/p-toggle-6.json)
- Toggle icon group | [JSON](https://cossui-svelte.com/r/p-toggle-7.json)
- Bookmark toggle with tooltip and success toast | [JSON](https://cossui-svelte.com/r/p-toggle-8.json)

### toggle-group

- Basic toggle group | [JSON](https://cossui-svelte.com/r/p-toggle-group-1.json)
- Small toggle group | [JSON](https://cossui-svelte.com/r/p-toggle-group-2.json)
- Large toggle group | [JSON](https://cossui-svelte.com/r/p-toggle-group-3.json)
- Toggle group with outline | [JSON](https://cossui-svelte.com/r/p-toggle-group-4.json)
- Vertical toggle group with outline | [JSON](https://cossui-svelte.com/r/p-toggle-group-5.json)
- Disabled toggle group | [JSON](https://cossui-svelte.com/r/p-toggle-group-6.json)
- Toggle group with disabled item | [JSON](https://cossui-svelte.com/r/p-toggle-group-7.json)
- Multiple selection toggle group | [JSON](https://cossui-svelte.com/r/p-toggle-group-8.json)
- Toggle group with tooltips | [JSON](https://cossui-svelte.com/r/p-toggle-group-9.json)

### toolbar

- Toolbar with toggles, buttons, and select | [JSON](https://cossui-svelte.com/r/p-toolbar-1.json)

### tooltip

- Basic tooltip | [JSON](https://cossui-svelte.com/r/p-tooltip-1.json)
- Grouped tooltips | [JSON](https://cossui-svelte.com/r/p-tooltip-2.json)
- Toggle group animated tooltip | [JSON](https://cossui-svelte.com/r/p-tooltip-3.json)
- Vertical group with animated tooltip | [JSON](https://cossui-svelte.com/r/p-tooltip-4.json)

### tree

- Show a tree structure with nodes and children | [JSON](https://cossui-svelte.com/r/p-tree-1.json)
- Basic tree with vertical lines | [JSON](https://cossui-svelte.com/r/p-tree-2.json)
- Basic tree with icons | [JSON](https://cossui-svelte.com/r/p-tree-3.json)
- Basic tree with caret icon on the right | [JSON](https://cossui-svelte.com/r/p-tree-4.json)
- Tree with multi-select and drag and drop | [JSON](https://cossui-svelte.com/r/p-tree-5.json)
- Tree with renaming (press F2 to rename) | [JSON](https://cossui-svelte.com/r/p-tree-6.json)
- Tree with search highlight | [JSON](https://cossui-svelte.com/r/p-tree-7.json)
- Tree with filtering | [JSON](https://cossui-svelte.com/r/p-tree-8.json)
