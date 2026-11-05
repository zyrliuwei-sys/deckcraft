import { createFileRoute } from '@tanstack/react-router';

import { deckcraftLinks } from '@/config/deckcraft';
import { m } from '@/paraglide/messages.js';
import { getLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { GuidesIndex } from '@/blocks/deckcraft/articles';

export const Route = createFileRoute('/guides/')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en';
    const urlFor = (loc: typeof locale) =>
      localizeUrl(`${deckcraftLinks.site}/guides`, { locale: loc }).href;
    return {
      meta: [
        { title: m['dc.articles.meta']({}, { locale }) },
        {
          name: 'description',
          content: m['dc.articles.description']({}, { locale }),
        },
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
    };
  },
  component: GuidesIndex,
});
