import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { deckcraftLinks } from '@/config/deckcraft';
import { m } from '@/paraglide/messages.js';
import { getLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { DeckcraftHome } from '@/blocks/deckcraft/home';

export const Route = createFileRoute('/')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = (loaderData?.locale ?? 'en') as 'en' | 'zh';
    const title = m['common.metadata.title']({}, { locale });
    const description = m['common.metadata.description']({}, { locale });
    const urlFor = (loc: string) =>
      localizeUrl(`${deckcraftLinks.site}/`, { locale: loc as 'en' | 'zh' })
        .href;
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:image',
          content: `${deckcraftLinks.site}/imgs/deckcraft/editor.png`,
        },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [
        { rel: 'canonical', href: urlFor(locale) },
        ...locales.map((loc) => ({
          rel: 'alternate',
          hrefLang: loc,
          href: urlFor(loc),
        })),
        { rel: 'alternate', hrefLang: 'x-default', href: urlFor('en') },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: envConfigs.app_name,
            url: deckcraftLinks.site,
            description,
            inLanguage: ['en', 'zh'],
          }),
        },
      ],
    };
  },
  component: DeckcraftHome,
});
