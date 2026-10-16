import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { DownloadGuide } from '@/blocks/deckcraft/guides';

export const Route = createFileRoute('/download')({
  loader: () => {
    const locale = getLocale();
    return {
      title: m['dc.guide.download.meta']({}, { locale }),
      description: m['dc.guide.download.description']({}, { locale }),
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
        href: `https://deckcraft.me${loaderData?.locale === 'zh' ? '/zh' : ''}/download`,
      },
    ],
  }),
  component: DownloadGuide,
});
