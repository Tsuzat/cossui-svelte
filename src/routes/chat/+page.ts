import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    SEO: {
      description:
        'Beautifully crafted Svelte chat components. Explore replies, reactions, mentions, and every state in between. Built with ShardsUI and Tailwind CSS.',
      title: 'Chat UI — Make room for conversation — coss ui-svelte'
    }
  };
};
