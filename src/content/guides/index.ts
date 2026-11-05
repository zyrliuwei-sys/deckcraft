import { lazy, type ComponentType } from 'react';

export const GUIDE_SLUGS = [
  'deckcraft-slides-guide',
  'deckcraft-download-guide',
  'deckcraft-online-guide',
  'deckcraft-vs-powerpoint-guide',
] as const;

export type GuideMeta = {
  title: string;
  description: string;
  category: string;
  updatedAt: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  imageCaption: string;
  imageWidth: number;
  imageHeight: number;
  sections: { id: string; title: string }[];
};

const metas = import.meta.glob<GuideMeta>('/src/content/guides/*.mdx', {
  eager: true,
  import: 'meta',
});
const bodies = import.meta.glob<ComponentType>('/src/content/guides/*.mdx', {
  import: 'default',
});

function keyFor(slug: string, locale: string) {
  return `/src/content/guides/${slug}.${locale === 'zh' ? 'zh' : 'en'}.mdx`;
}

export function getGuide(slug: string, locale: string) {
  if (!GUIDE_SLUGS.some((candidate) => candidate === slug)) return null;
  const meta = metas[keyFor(slug, locale)];
  return meta ? { slug, ...meta } : null;
}

export function getGuides(locale: string) {
  return GUIDE_SLUGS.flatMap((slug) => {
    const guide = getGuide(slug, locale);
    return guide ? [guide] : [];
  });
}

const contentCache = new Map<string, ComponentType>();
export function getGuideContent(slug: string, locale: string) {
  const key = keyFor(slug, locale);
  let Content = contentCache.get(key);
  if (!Content) {
    Content = lazy(async () => ({ default: await bodies[key]() }));
    contentCache.set(key, Content);
  }
  return Content;
}
