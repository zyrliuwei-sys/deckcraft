import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { deckcraftLinks } from '@/config/deckcraft';
import { m } from '@/paraglide/messages.js';
import { getLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { DeckcraftHome, homeFaq } from '@/blocks/deckcraft/home';

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
          children: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: envConfigs.app_name,
              url: deckcraftLinks.site,
              description,
              inLanguage: ['en', 'zh'],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: envConfigs.app_name,
              applicationCategory: 'BusinessApplication',
              applicationSubCategory: 'Presentation software',
              operatingSystem: 'macOS, Windows, Linux, Web browser',
              softwareVersion: deckcraftLinks.version,
              license: 'https://opensource.org/licenses/MIT',
              url: deckcraftLinks.site,
              downloadUrl: `${deckcraftLinks.site}/download`,
              screenshot: `${deckcraftLinks.site}/imgs/deckcraft/editor.png`,
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: m['dc.howto.title']({}, { locale }).replaceAll('*', ''),
              step: (['open', 'design', 'animate', 'present'] as const).map(
                (key, index) => ({
                  '@type': 'HowToStep',
                  position: index + 1,
                  name: m[`dc.howto.${key}.title`]({}, { locale }),
                  text: m[`dc.howto.${key}.body`]({}, { locale }),
                })
              ),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: homeFaq(locale).map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ]),
        },
      ],
    };
  },
  component: DeckcraftHome,
});
