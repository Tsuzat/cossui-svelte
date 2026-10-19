# cossui-svelte CLI Reference (Focused)

Use this guide when installing or discovering cossui-svelte components via the shadcn-svelte CLI.

## CLI Safety Rules

- Always use the project's package runner:
  - `npx shadcn-svelte@latest ...`
  - `pnpm dlx shadcn-svelte@latest ...`
  - `bunx --bun shadcn-svelte@latest ...`
- Do not invent flags. Use only the flags listed below.
- There is no `@coss/` registry namespace. Install by URL.

## Prerequisites

- A Svelte 5 / SvelteKit project with Tailwind CSS v4, initialized with `npx shadcn-svelte@latest init`.
- The `#lib` subpath import in `package.json` (components import each other through it):

```json
{
  "imports": {
    "#lib/*": "./src/lib/*"
  }
}
```

## `add` (primary)

Every component, particle, bloc, hook, and util has a registry item at `https://cossui-svelte.com/r/<name>.json`:

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/<name>.json
```

Examples:

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/dialog.json
npx shadcn-svelte@latest add https://cossui-svelte.com/r/p-select-3.json
npx shadcn-svelte@latest add https://cossui-svelte.com/r/use-is-mobile.json
```

Installing a particle or bloc also installs the UI components it depends on.

Options:

- `-c, --cwd <path>` — working directory
- `--no-deps-install` — add dependencies to `package.json` without running install
- `--skip-preflight` — ignore preflight checks
- `-y, --yes` — skip the confirmation prompt
- `-o, --overwrite` — overwrite existing files
- `--proxy <proxy>` — fetch from the registry through a proxy

There is no dry-run or diff mode. To see what an item will write before installing, fetch its JSON: it lists the files, their target paths, and dependencies.

## Discovery

- docs map for agents: `https://cossui-svelte.com/llms.txt`
- registry index (every installable item): `https://cossui-svelte.com/r/registry.json`
- component docs: `https://cossui-svelte.com/docs/components/<name>`
- particles catalog: `https://cossui-svelte.com/particles`
- blocs catalog: `https://cossui-svelte.com/blocs`

Inside the cossui-svelte repo:

- `src/lib/components/ui/<name>/` — component source
- `src/lib/components/particles/<name>/p-<name>-<N>.svelte` — particle source
- `src/lib/components/app/content/components/*.mdx` — component docs

## Manual Install Path

When users explicitly request manual setup:

1. Read the target component docs.
2. Install exactly the listed dependencies.
3. Copy all required files (including transitive local `#lib/...` imports).
4. Add the `#lib` subpath import if the project doesn't have it.
5. Validate the snippet against docs/particles patterns.

Important:

- Manual setup must include the additional theme tokens (`destructive-foreground`, `info`, `success`, `warning` families) from the [Styling](https://cossui-svelte.com/docs/styling) docs when relevant.

## Quick Output Checklist

Before returning CLI guidance:

1. runner and command are valid for the user's package manager
2. the item URL points at `https://cossui-svelte.com/r/`
3. flags are from the list above
4. resulting usage guidance matches cossui-svelte docs and particle patterns
