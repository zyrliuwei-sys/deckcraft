import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { TutorialsGuide } from '@/blocks/deckcraft/guides';

export const Route = createFileRoute('/tutorials')({
  loader: () => {
    const locale = getLocale();
    return {
      title: m['dc.guide.tutorials.meta']({}, { locale }),
      description: m['dc.guide.tutorials.description']({}, { locale }),
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
        href: `https://deckcraft.me${loaderData?.locale === 'zh' ? '/zh' : ''}/tutorials`,
      },
    ],
  }),
  component: TutorialsGuide,
});
