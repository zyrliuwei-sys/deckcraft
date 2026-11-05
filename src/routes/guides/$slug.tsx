import { createFileRoute, notFound } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { deckcraftLinks } from '@/config/deckcraft';
import { m } from '@/paraglide/messages.js';
import { getLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { GuideArticle } from '@/blocks/deckcraft/articles';
import { getGuide } from '@/content/guides';

export const Route = createFileRoute('/guides/$slug')({
  loader: ({ params }) => {
    const locale = getLocale();
    const guide = getGuide(params.slug, locale);
    if (!guide) throw notFound();
    return { guide, locale };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { guide, locale } = loaderData;
    const urlFor = (path: string, loc = locale) =>
      localizeUrl(`${deckcraftLinks.site}${path}`, { locale: loc }).href;
    const path = `/guides/${guide.slug}`;
    const canonical = urlFor(path);
    return {
      meta: [
        { title: guide.title },
        { name: 'description', content: guide.description },
        { property: 'og:title', content: guide.title },
        { property: 'og:description', content: guide.description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: canonical },
        {
          property: 'og:image',
          content: `${deckcraftLinks.site}${guide.image}`,
        },
        { property: 'og:image:alt', content: guide.imageAlt },
        { property: 'article:modified_time', content: guide.updatedAt },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [
        { rel: 'canonical', href: canonical },
        ...locales.map((loc) => ({
          rel: 'alternate',
          hrefLang: loc,
          href: urlFor(path, loc),
        })),
        { rel: 'alternate', hrefLang: 'x-default', href: urlFor(path, 'en') },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: guide.title,
              description: guide.description,
              image: `${deckcraftLinks.site}${guide.image}`,
              dateModified: guide.updatedAt,
              inLanguage: locale,
              mainEntityOfPage: canonical,
              author: {
                '@type': 'Organization',
                name: envConfigs.app_name,
                url: deckcraftLinks.site,
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: m['dc.articles.home']({}, { locale }),
                  item: urlFor('/'),
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: m['dc.articles.nav']({}, { locale }),
                  item: urlFor('/guides'),
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: guide.title,
                  item: canonical,
                },
              ],
            },
          ]).replaceAll('<', '\\u003c'),
        },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { guide, locale } = Route.useLoaderData();
  return <GuideArticle slug={guide.slug} locale={locale} />;
}
