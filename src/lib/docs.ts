import {
  allComponents,
  type RegistryUIEntry
} from '#lib/registry/generated-registry-components.js';

interface PageNode {
  name: string;
  type: 'page';
  url: string;
}

export interface FolderNode {
  $id: string;
  children: PageNode[];
  name: string;
  type: 'folder';
}

export interface NavTree {
  children: FolderNode[];
}

function docUrl(entry: RegistryUIEntry) {
  return `/docs/${entry.folder}`;
}

export const PAGES_NEW: string[] = Object.values(allComponents)
  .filter((entry) => entry.isnew)
  .map(docUrl);

interface DocsMeta {
  pages: string[];
  title?: string;
}

const docsMeta = import.meta.glob<DocsMeta>('/src/lib/content/docs/**/meta.json', {
  eager: true,
  import: 'default'
});

const TITLE_OVERRIDES: Record<string, string> = { index: 'Introduction' };

function humanize(slug: string) {
  if (TITLE_OVERRIDES[slug]) return TITLE_OVERRIDES[slug];
  if (slug.startsWith('use-')) return slug.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());
  return slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

function metaPage(folder: string, entry: string): PageNode {
  // `[label](href)` entries are plain links (e.g. in the Resources section)
  const link = /^\[(.+)\]\((.+)\)$/.exec(entry);
  if (link) return { name: link[1], type: 'page', url: link[2] };

  if (folder === 'components') {
    const component = allComponents[entry as keyof typeof allComponents];
    return {
      name: component?.name ?? humanize(entry),
      type: 'page',
      url: `/docs/${entry}`
    };
  }
  const url =
    folder === '(root)'
      ? entry === 'index'
        ? '/docs'
        : `/docs/${entry}`
      : `/docs/${folder}/${entry}`;
  return { name: humanize(entry), type: 'page', url };
}

/** Docs sidebar, driven by `content/docs/meta.json` and the `meta.json` of each section folder. */
export const docsNavTree: NavTree = {
  children: (docsMeta['/src/lib/content/docs/meta.json']?.pages ?? []).flatMap((folder) => {
    const meta = docsMeta[`/src/lib/content/docs/${folder}/meta.json`];
    if (!meta) return [];
    return [
      {
        $id: folder,
        children: meta.pages.map((entry) => metaPage(folder, entry)),
        name: meta.title ?? humanize(folder),
        type: 'folder' as const
      }
    ];
  })
};
