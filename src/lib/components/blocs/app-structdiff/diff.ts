// HTML structure diff engine. Compares tags, ids, classes, attributes and structure,
// ignoring whitespace and ordering noise. Browser-only: relies on DOM parsing.

export type DiffStatus = 'same' | 'added' | 'removed' | 'changed';
export type AttrState = 'same' | 'added' | 'removed' | 'changed';

export interface DiffAttr {
  name: string;
  value: string;
  state: AttrState;
  /** Value on the opposite side, for changed attributes. */
  otherValue?: string;
}

export interface DiffNode {
  tag: string;
  /** `#id.class.class` suffix shown next to the tag. */
  selector: string;
  attrs: DiffAttr[];
  /** Text of a leaf element, truncated for display. */
  leafText: string;
  textDiffers: boolean;
  status: DiffStatus;
  children: DiffNode[];
}

export interface DiffStats {
  added: number;
  removed: number;
  changed: number;
}

export interface DiffResult {
  a: DiffNode[];
  b: DiffNode[];
  stats: DiffStats;
}

type Side = 'A' | 'B';

interface AttrDiff {
  added: string[];
  removed: string[];
  changed: string[];
  other: Element;
}

const LEAF_TEXT_MAX = 70;

const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]);
const INLINE_TAGS = new Set([
  'a',
  'b',
  'i',
  'em',
  'strong',
  'span',
  'small',
  'sub',
  'sup',
  'code',
  'abbr',
  'label',
  'button'
]);

type AlignOp =
  | { type: 'match'; a: Element; b: Element }
  | { type: 'del'; a: Element }
  | { type: 'ins'; b: Element };

function parse(html: string): HTMLDivElement {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  return wrap;
}

function elementChildren(el: Element): Element[] {
  return [...el.children];
}

function sig(el: Element): string {
  const id = el.id ? `#${el.id}` : '';
  const cls = el.classList.length ? `.${[...el.classList].sort().join('.')}` : '';
  return el.tagName.toLowerCase() + id + cls;
}

/** Longest-common-subsequence alignment of two sibling lists by element signature. */
function lcsAlign(a: Element[], b: Element[]): AlignOp[] {
  const sa = a.map(sig);
  const sb = b.map(sig);
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => 0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = sa[i] === sb[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  let i = 0;
  let j = 0;
  const ops: AlignOp[] = [];
  while (i < n && j < m) {
    if (sa[i] === sb[j] && dp[i][j] === dp[i + 1][j + 1] + 1) {
      ops.push({ type: 'match', a: a[i], b: b[j] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: 'del', a: a[i++] });
    } else {
      ops.push({ type: 'ins', b: b[j++] });
    }
  }
  while (i < n) ops.push({ type: 'del', a: a[i++] });
  while (j < m) ops.push({ type: 'ins', b: b[j++] });
  return ops;
}

function diffAttrs(elA: Element, elB: Element): Omit<AttrDiff, 'other'> {
  const names = new Set([...elA.attributes, ...elB.attributes].map((x) => x.name));
  const added: string[] = [];
  const removed: string[] = [];
  const changed: string[] = [];
  for (const name of names) {
    const hasA = elA.hasAttribute(name);
    const hasB = elB.hasAttribute(name);
    if (hasA && !hasB) removed.push(name);
    else if (!hasA && hasB) added.push(name);
    else if (elA.getAttribute(name) !== elB.getAttribute(name)) changed.push(name);
  }
  return { added, removed, changed };
}

function buildNode(
  el: Element,
  side: Side,
  status: WeakMap<Element, DiffStatus>,
  attrInfo: WeakMap<Element, AttrDiff>,
  textInfo: WeakSet<Element>
): DiffNode {
  const kids = elementChildren(el);
  const cls = [...el.classList].sort().join('.');
  const ad = attrInfo.get(el);

  const attrs: DiffAttr[] = [...el.attributes]
    .filter((a) => a.name !== 'class' && a.name !== 'id')
    .map((a) => {
      const attr: DiffAttr = { name: a.name, value: a.value, state: 'same' };
      if (!ad) return attr;
      if (side === 'A' && ad.removed.includes(a.name)) attr.state = 'removed';
      else if (side === 'B' && ad.added.includes(a.name)) attr.state = 'added';
      else if (ad.changed.includes(a.name)) {
        attr.state = 'changed';
        attr.otherValue = ad.other.getAttribute(a.name) ?? '';
      }
      return attr;
    });

  const text = kids.length === 0 ? (el.textContent ?? '').trim() : '';
  return {
    tag: el.tagName.toLowerCase(),
    selector: (el.id ? `#${el.id}` : '') + (cls ? `.${cls}` : ''),
    attrs,
    leafText: text.length > LEAF_TEXT_MAX ? `${text.slice(0, LEAF_TEXT_MAX)}…` : text,
    textDiffers: kids.length === 0 && textInfo.has(el),
    status: status.get(el) ?? 'same',
    children: kids.map((c) => buildNode(c, side, status, attrInfo, textInfo))
  };
}

function countStatuses(nodes: DiffNode[], status: DiffStatus): number {
  let total = 0;
  for (const node of nodes) {
    if (node.status === status) total++;
    total += countStatuses(node.children, status);
  }
  return total;
}

export function compareHtml(htmlA: string, htmlB: string): DiffResult {
  const statusA = new WeakMap<Element, DiffStatus>();
  const statusB = new WeakMap<Element, DiffStatus>();
  const attrInfo = new WeakMap<Element, AttrDiff>();
  const textInfo = new WeakSet<Element>();

  const markAll = (el: Element, map: WeakMap<Element, DiffStatus>, value: DiffStatus) => {
    map.set(el, value);
    for (const c of elementChildren(el)) markAll(c, map, value);
  };

  /** Returns true when the subtree rooted at the pair differs. */
  const diffNodes = (elA: Element, elB: Element): boolean => {
    const ad = diffAttrs(elA, elB);
    attrInfo.set(elA, { ...ad, other: elB });
    attrInfo.set(elB, { ...ad, other: elA });
    const hasAttrDiff = ad.added.length > 0 || ad.removed.length > 0 || ad.changed.length > 0;

    const kidsA = elementChildren(elA);
    const kidsB = elementChildren(elB);
    let textChanged = false;
    if (
      kidsA.length === 0 &&
      kidsB.length === 0 &&
      (elA.textContent ?? '').trim() !== (elB.textContent ?? '').trim()
    ) {
      textChanged = true;
      textInfo.add(elA);
      textInfo.add(elB);
    }

    let childChanged = false;
    for (const op of lcsAlign(kidsA, kidsB)) {
      if (op.type === 'match') {
        if (diffNodes(op.a, op.b)) childChanged = true;
      } else if (op.type === 'del') {
        markAll(op.a, statusA, 'removed');
        childChanged = true;
      } else {
        markAll(op.b, statusB, 'added');
        childChanged = true;
      }
    }

    const selfChanged = hasAttrDiff || textChanged || childChanged;
    statusA.set(elA, selfChanged ? 'changed' : 'same');
    statusB.set(elB, selfChanged ? 'changed' : 'same');
    return selfChanged;
  };

  const wrapA = parse(htmlA);
  const wrapB = parse(htmlB);
  for (const op of lcsAlign(elementChildren(wrapA), elementChildren(wrapB))) {
    if (op.type === 'match') diffNodes(op.a, op.b);
    else if (op.type === 'del') markAll(op.a, statusA, 'removed');
    else markAll(op.b, statusB, 'added');
  }

  const a = elementChildren(wrapA).map((el) => buildNode(el, 'A', statusA, attrInfo, textInfo));
  const b = elementChildren(wrapB).map((el) => buildNode(el, 'B', statusB, attrInfo, textInfo));
  return {
    a,
    b,
    stats: {
      added: countStatuses(b, 'added'),
      removed: countStatuses(a, 'removed'),
      changed: countStatuses(b, 'changed')
    }
  };
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function prettyPrint(node: Node, depth: number, lines: string[]) {
  const pad = '  '.repeat(depth);
  for (const child of node.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = (child.textContent ?? '').trim();
      if (text) lines.push(pad + escapeHtml(text));
      continue;
    }
    if (!(child instanceof Element)) continue;

    const tag = child.tagName.toLowerCase();
    const attrs = [...child.attributes]
      .map((a) => ` ${a.name}="${a.value.replace(/"/g, '&quot;')}"`)
      .join('');
    if (VOID_TAGS.has(tag)) {
      lines.push(`${pad}<${tag}${attrs}>`);
      continue;
    }
    if (child.children.length === 0 && !INLINE_TAGS.has(tag)) {
      const text = escapeHtml((child.textContent ?? '').trim());
      if (text.length <= 60 && !text.includes('\n')) {
        lines.push(`${pad}<${tag}${attrs}>${text}</${tag}>`);
        continue;
      }
    }
    lines.push(`${pad}<${tag}${attrs}>`);
    prettyPrint(child, depth + 1, lines);
    lines.push(`${pad}</${tag}>`);
  }
}

export function formatHtml(html: string): string {
  const lines: string[] = [];
  prettyPrint(parse(html), 0, lines);
  return lines.join('\n');
}
