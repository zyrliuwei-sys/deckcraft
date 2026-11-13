import { Suspense } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { ArrowRight, ArrowUpRight, Clock3 } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { GuideFigure, guideMdxComponents } from '@/components/guide-content';
import {
  getGuide,
  getGuideContent,
  getGuides,
  PRACTICAL_GUIDE_SLUGS,
} from '@/content/guides';

import { DeckcraftFooter, DeckcraftHeader } from './chrome';

import '@/styles/deckcraft-articles.css';

export function FeaturedGuides({ index = false }: { index?: boolean }) {
  const guides = getGuides(getLocale());
  return (
    <section className="dc-section dc-reading" id="guides">
      <div className="dc-container">
        <header className="dc-reading-heading">
          <div>
            <p className="dc-eyebrow">{m['dc.articles.eyebrow']()}</p>
            {index ? (
              <h1>{m['dc.articles.title']()}</h1>
            ) : (
              <h2 className="dc-section-heading">{m['dc.articles.title']()}</h2>
            )}
            <p className="dc-lead">{m['dc.articles.description']()}</p>
          </div>
          {!index && (
            <Link href="/guides" className="dc-link">
              {m['dc.articles.all']()} <ArrowUpRight size={16} />
            </Link>
          )}
        </header>
        <div className="dc-reading-grid">
          {guides.map((guide, i) => (
            <article className="dc-reading-item" key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="dc-reading-image"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={guide.image}
                  alt=""
                  width={guide.imageWidth}
                  height={guide.imageHeight}
                  loading="lazy"
                />
                <span>{String(i + 1).padStart(2, '0')}</span>
              </Link>
              <p className="dc-reading-category">{guide.category}</p>
              <h3>
                <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
              </h3>
              <p>{guide.description}</p>
              <Link href={`/guides/${guide.slug}`} className="dc-link">
                {m['dc.articles.read']()} <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GuidesIndex() {
  return (
    <div className="dc-site">
      <DeckcraftHeader />
      <main className="dc-page-main">
        <FeaturedGuides index />
      </main>
      <DeckcraftFooter />
    </div>
  );
}

export function PracticalGuides() {
  if (getLocale() !== 'en') return null;
  const guides = getGuides('en').filter((guide) =>
    PRACTICAL_GUIDE_SLUGS.some((slug) => slug === guide.slug)
  );
  return (
    <section className="dc-container dc-article-related dc-practical-guides">
      <h2>{m['dc.site.practical']()}</h2>
      <p className="dc-lead">{m['dc.site.practical_body']()}</p>
      <div>
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`}>
            <span>{guide.category}</span>
            <strong>{guide.title}</strong>
            <ArrowRight size={18} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function GuideArticle({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const guide = getGuide(slug, locale)!;
  const Content = getGuideContent(slug, locale);
  const related = getGuides(locale).filter((item) => item.slug !== slug);
  return (
    <div className="dc-site">
      <DeckcraftHeader />
      <main className="dc-page-main dc-longform">
        <div className="dc-container">
          <nav
            className="dc-article-breadcrumb"
            aria-label={m['dc.articles.breadcrumb']()}
          >
            <Link href="/">{m['dc.articles.home']()}</Link>
            <span>/</span>
            <Link href="/guides">{m['dc.articles.nav']()}</Link>
            <span>/</span>
            <span aria-current="page">{guide.category}</span>
          </nav>
          <header className="dc-article-header">
            <p className="dc-eyebrow">{guide.category}</p>
            <h1>{guide.title}</h1>
            <p className="dc-lead">{guide.description}</p>
            <div className="dc-article-meta">
              <span>
                {m['dc.articles.updated']()}{' '}
                <time dateTime={guide.updatedAt}>{guide.updatedAt}</time>
              </span>
              <span>
                <Clock3 size={14} />
                {m['dc.articles.minutes']({ count: guide.readingMinutes })}
              </span>
            </div>
          </header>
          <div className="dc-article-layout">
            <aside className="dc-article-sidebar">
              <nav aria-label={m['dc.articles.contents']()}>
                <p>{m['dc.articles.contents']()}</p>
                <ol>
                  {guide.sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>{section.title}</a>
                    </li>
                  ))}
                </ol>
              </nav>
              <Link className="dc-link" href="/app">
                {m['dc.open']()} <ArrowUpRight size={15} />
              </Link>
            </aside>
            <article className="dc-article-body">
              <GuideFigure
                src={guide.image}
                alt={guide.imageAlt}
                caption={guide.imageCaption}
                width={guide.imageWidth}
                height={guide.imageHeight}
                priority
              />
              <MDXProvider components={guideMdxComponents}>
                <Suspense
                  fallback={<p role="status">{m['dc.articles.loading']()}</p>}
                >
                  <Content />
                </Suspense>
              </MDXProvider>
              <div className="dc-article-next">
                <h2>{m['dc.articles.next']()}</h2>
                <p>{m['dc.articles.next_body']()}</p>
                <div className="dc-inline-links">
                  <Link href="/#editor" className="dc-button">
                    {m['dc.articles.try_home']()} <ArrowRight size={16} />
                  </Link>
                  <Link href="/" className="dc-link">
                    {m['dc.articles.back_home']()}
                  </Link>
                </div>
              </div>
            </article>
          </div>
          <section className="dc-article-related">
            <h2>{m['dc.articles.related']()}</h2>
            <div>
              {related.map((item) => (
                <Link key={item.slug} href={`/guides/${item.slug}`}>
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                  <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <DeckcraftFooter />
    </div>
  );
}
