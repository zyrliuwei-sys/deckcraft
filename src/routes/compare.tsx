import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { CompareGuide } from '@/blocks/deckcraft/guides';

export const Route = createFileRoute('/compare')({
  loader: () => {
    const locale = getLocale();
    return {
      title: m['dc.guide.compare.meta']({}, { locale }),
      description: m['dc.guide.compare.description']({}, { locale }),
      locale,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | ${envConfigs.app_name}` },
          { name: 'description', content: loaderData.description },
        ]
      : [],
    links: [
      {
        rel: 'canonical',
        href: `https://deckcraft.me${loaderData?.locale === 'zh' ? '/zh' : ''}/compare`,
      },
    ],
  }),
  component: CompareGuide,
});
