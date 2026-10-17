import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Code2,
  Download,
  Feather,
  FileCheck2,
  Laptop,
  Monitor,
  Plus,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { deckcraftLinks } from '@/config/deckcraft';
import { m } from '@/paraglide/messages.js';

import { DeckcraftFooter, DeckcraftHeader, Marked, SlideFrame } from './chrome';

function Hero() {
  return (
    <section className="dc-hero" id="overview">
      <div className="dc-container dc-hero-inner">
        <div className="dc-hero-copy dc-reveal">
          <p className="dc-eyebrow">{m['dc.hero.eyebrow']()}</p>
          <h1>
            <mark>{m['dc.hero.title_one']()}</mark> {m['dc.hero.title_two']()}
          </h1>
          <p className="dc-hero-description">{m['dc.hero.description']()}</p>
          <div className="dc-hero-actions">
            <Link className="dc-button" href="/app">
              {m['dc.open']()}
              <ArrowUpRight size={16} />
            </Link>
            <Link className="dc-button dc-button-secondary" href="/download">
              <Download size={16} />
              {m['dc.download']()}
            </Link>
          </div>
        </div>
        <SlideFrame
          className="dc-hero-frame dc-reveal"
          caption={m['dc.hero.caption']()}
          stage
        >
          <img
            src="/imgs/deckcraft/editor.png"
            alt={m['dc.features.create.alt']()}
            width="1600"
            height="1000"
            fetchPriority="high"
          />
        </SlideFrame>
      </div>
      <div className="dc-container">
        <ul className="dc-proof-strip">
          <li>
            <FileCheck2 size={17} strokeWidth={1.6} />
            {m['dc.proof.pptx']()}
          </li>
          <li>
            <Feather size={17} strokeWidth={1.6} />
            {m['dc.proof.rust']()}
          </li>
          <li>
            <Monitor size={17} strokeWidth={1.6} />
            {m['dc.proof.platforms']()}
          </li>
          <li>
            <ShieldCheck size={17} strokeWidth={1.6} />
            {m['dc.proof.license']()}
          </li>
        </ul>
      </div>
    </section>
  );
}

function FeatureTour() {
  const [active, setActive] = useState(0);
  const features = [
    {
      title: m['dc.features.create.title'](),
      description: m['dc.features.create.body'](),
      image: 'editor.png',
      alt: m['dc.features.create.alt'](),
    },
    {
      title: m['dc.features.design.title'](),
      description: m['dc.features.design.body'](),
      image: 'format-pane.png',
      alt: m['dc.features.design.alt'](),
    },
    {
      title: m['dc.features.animate.title'](),
      description: m['dc.features.animate.body'](),
      image: 'slide-sorter.png',
      alt: m['dc.features.animate.alt'](),
    },
    {
      title: m['dc.features.present.title'](),
      description: m['dc.features.present.body'](),
      image: 'dark-mode.png',
      alt: m['dc.features.present.alt'](),
    },
  ];
  return (
    <section className="dc-section" id="features">
      <div className="dc-container">
        <header className="dc-section-header">
          <h2 className="dc-section-heading">
            <Marked text={m['dc.features.title']()} />
          </h2>
          <p className="dc-lead">{m['dc.features.description']()}</p>
        </header>
        <div className="dc-features-layout">
          <div className="dc-feature-tabs">
            {features.map((feature, index) => (
              <div
                className="dc-feature-tab"
                key={feature.title}
                aria-current={active === index ? 'true' : undefined}
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-expanded={active === index}
                  aria-controls={`dc-feature-${index}`}
                  id={`dc-feature-button-${index}`}
                >
                  {feature.title}
                  <ChevronDown size={17} />
                </button>
                <div
                  className="dc-feature-content"
                  id={`dc-feature-${index}`}
                  role="region"
                  aria-labelledby={`dc-feature-button-${index}`}
                  hidden={active !== index}
                >
                  <p>{feature.description}</p>
                  <Link className="dc-link" href="/tutorials">
                    {m['dc.features.learn']()}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <SlideFrame caption={m['dc.features.caption']()}>
            <img
              key={active}
              src={`/imgs/deckcraft/${features[active].image}`}
              alt={features[active].alt}
              width="1600"
              height="1000"
              loading="lazy"
            />
          </SlideFrame>
        </div>
      </div>
    </section>
  );
}

function About() {
  const blocks = [
    { title: m['dc.about.slides.title'](), body: m['dc.about.slides.body']() },
    { title: m['dc.about.pptx.title'](), body: m['dc.about.pptx.body']() },
    { title: m['dc.about.online.title'](), body: m['dc.about.online.body']() },
    { title: m['dc.about.who.title'](), body: m['dc.about.who.body']() },
  ];
  return (
    <section className="dc-section dc-about" id="what-is-deckcraft">
      <div className="dc-container dc-about-layout">
        <div className="dc-about-intro">
          <h2 className="dc-section-heading">
            <Marked text={m['dc.about.title']()} />
          </h2>
          <p className="dc-about-lede">{m['dc.about.p1']()}</p>
          <p>{m['dc.about.p2']()}</p>
          <Link href="/app" className="dc-link">
            {m['dc.about.cta']()}
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="dc-about-grid">
          {blocks.map((block) => (
            <article key={block.title}>
              <h3>{block.title}</h3>
              <p>{block.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowTo() {
  const steps = [
    { title: m['dc.howto.open.title'](), body: m['dc.howto.open.body']() },
    { title: m['dc.howto.design.title'](), body: m['dc.howto.design.body']() },
    {
      title: m['dc.howto.animate.title'](),
      body: m['dc.howto.animate.body'](),
    },
    {
      title: m['dc.howto.present.title'](),
      body: m['dc.howto.present.body'](),
    },
  ];
  return (
    <section className="dc-section dc-howto" id="how-to">
      <div className="dc-container">
        <header className="dc-section-header">
          <h2 className="dc-section-heading">
            <Marked text={m['dc.howto.title']()} />
          </h2>
          <p className="dc-lead">{m['dc.howto.body']()}</p>
        </header>
        <ol className="dc-sorter">
          {steps.map((step) => (
            <li key={step.title}>
              <div className="dc-sorter-slide">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Freedom() {
  return (
    <section className="dc-section dc-freedom">
      <div className="dc-container dc-freedom-inner">
        <SlideFrame caption={m['dc.freedom.caption']()} stage>
          <img
            src="/imgs/deckcraft/dark-mode.png"
            width="1600"
            height="1000"
            alt={m['dc.freedom.alt']()}
            loading="lazy"
          />
        </SlideFrame>
        <div className="dc-freedom-copy">
          <h2 className="dc-section-heading">
            <Marked text={m['dc.freedom.title']()} />
          </h2>
          <p className="dc-lead">{m['dc.freedom.body']()}</p>
          <ul className="dc-check-list">
            <li>{m['dc.freedom.one']()}</li>
            <li>{m['dc.freedom.two']()}</li>
            <li>{m['dc.freedom.three']()}</li>
          </ul>
          <div className="dc-inline-links">
            <Link href="/compare" className="dc-link">
              {m['dc.freedom.compare']()}
              <ArrowRight size={15} />
            </Link>
            <a
              className="dc-link dc-link-quiet"
              href={deckcraftLinks.github}
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={15} />
              {m['dc.freedom.rust']()}
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Downloads() {
  const platforms = [
    {
      icon: Laptop,
      name: 'macOS',
      body: m['dc.downloads.mac'](),
      link: '/download?platform=macos',
    },
    {
      icon: Monitor,
      name: 'Windows',
      body: m['dc.downloads.windows'](),
      link: '/download?platform=windows',
    },
    {
      icon: Terminal,
      name: 'Linux',
      body: m['dc.downloads.linux'](),
      link: '/download?platform=linux',
    },
  ];
  return (
    <section className="dc-section dc-downloads" id="download">
      <div className="dc-container dc-downloads-layout">
        <div>
          <h2 className="dc-section-heading">
            <Marked text={m['dc.downloads.title']()} />
          </h2>
          <p className="dc-lead">{m['dc.downloads.body']()}</p>
          <Link href="/app" className="dc-link">
            {m['dc.downloads.browser']()}
            <ArrowUpRight size={15} />
          </Link>
        </div>
        <div>
          <ul className="dc-platform-list">
            {platforms.map((platform) => (
              <li key={platform.name}>
                <Link href={platform.link}>
                  <platform.icon size={24} strokeWidth={1.4} />
                  <span>
                    <strong>{platform.name}</strong>
                    <small>{platform.body}</small>
                  </span>
                  <span className="dc-platform-cta">
                    {m['dc.downloads.get']()}
                    <Download size={15} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="dc-download-footnote">
            {m['dc.downloads.note']()}{' '}
            <a href={deckcraftLinks.release} target="_blank" rel="noreferrer">
              {m['dc.downloads.notes']()}
              <ArrowUpRight size={12} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section className="dc-section" id="resources">
      <div className="dc-container">
        <header className="dc-section-header">
          <h2 className="dc-section-heading">
            <Marked text={m['dc.resources.title']()} />
          </h2>
          <p className="dc-lead">{m['dc.resources.body']()}</p>
        </header>
        <div className="dc-resource-grid">
          <Link href="/tutorials" className="dc-resource dc-resource-feature">
            <div className="dc-resource-art">
              <img
                src="/imgs/deckcraft/sample-deck.png"
                width="1600"
                height="1000"
                alt={m['dc.resources.start.alt']()}
                loading="lazy"
              />
            </div>
            <div className="dc-resource-copy">
              <h3>{m['dc.resources.start.title']()}</h3>
              <p>{m['dc.resources.start.body']()}</p>
              <span className="dc-link">
                {m['dc.resources.start.link']()}
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
          <Link href="/tutorials?step=animation" className="dc-resource">
            <div className="dc-resource-art">
              <img
                src="/imgs/deckcraft/slide-sorter.png"
                width="1600"
                height="1000"
                alt={m['dc.resources.motion.alt']()}
                loading="lazy"
              />
            </div>
            <div className="dc-resource-copy">
              <h3>{m['dc.resources.motion.title']()}</h3>
              <p>{m['dc.resources.motion.body']()}</p>
              <span className="dc-link">
                {m['dc.resources.motion.link']()}
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
          <Link href="/compare" className="dc-resource dc-resource-text">
            <div className="dc-resource-copy">
              <h3>{m['dc.resources.compare.title']()}</h3>
              <p>{m['dc.resources.compare.body']()}</p>
              <span className="dc-link">
                {m['dc.resources.compare.link']()}
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

type Locale = 'en' | 'zh';

export function homeFaq(locale?: Locale) {
  const o = locale ? { locale } : undefined;
  return [
    { q: m['dc.faq.free.q']({}, o), a: m['dc.faq.free.a']({}, o) },
    { q: m['dc.faq.make.q']({}, o), a: m['dc.faq.make.a']({}, o) },
    { q: m['dc.faq.pptx.q']({}, o), a: m['dc.faq.pptx.a']({}, o) },
    { q: m['dc.faq.browser.q']({}, o), a: m['dc.faq.browser.a']({}, o) },
    { q: m['dc.faq.platforms.q']({}, o), a: m['dc.faq.platforms.a']({}, o) },
    {
      q: m['dc.faq.alternative.q']({}, o),
      a: m['dc.faq.alternative.a']({}, o),
    },
    { q: m['dc.faq.account.q']({}, o), a: m['dc.faq.account.a']({}, o) },
    { q: m['dc.faq.official.q']({}, o), a: m['dc.faq.official.a']({}, o) },
  ];
}

function FAQ() {
  const questions = homeFaq();
  return (
    <section className="dc-section" id="faq">
      <div className="dc-container dc-faq-layout">
        <div className="dc-faq-intro">
          <h2 className="dc-section-heading">
            <Marked text={m['dc.faq.title']()} />
          </h2>
          <p className="dc-lead">{m['dc.faq.body']()}</p>
          <a
            href={deckcraftLinks.github}
            target="_blank"
            rel="noreferrer"
            className="dc-link"
          >
            {m['dc.faq.source']()}
            <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="dc-faq-list">
          {questions.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <Plus size={18} />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DeckcraftHome() {
  return (
    <div className="dc-site">
      <DeckcraftHeader />
      <main>
        <Hero />
        <nav className="dc-subnav" aria-label={m['dc.nav.sections']()}>
          <div className="dc-container dc-subnav-inner">
            <a href="#features">{m['dc.nav.features']()}</a>
            <a href="#what-is-deckcraft">{m['dc.nav.about']()}</a>
            <a href="#how-to">{m['dc.nav.howto']()}</a>
            <a href="#download">{m['dc.nav.download']()}</a>
            <a href="#faq">{m['dc.nav.faq']()}</a>
            <Link href="/app" className="dc-link">
              {m['dc.nav.try']()}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </nav>
        <FeatureTour />
        <About />
        <HowTo />
        <Freedom />
        <Downloads />
        <Resources />
        <FAQ />
        <section className="dc-final-cta">
          <div className="dc-container dc-final-inner">
            <h2 className="dc-section-heading">
              <Marked text={m['dc.final.title']()} />
            </h2>
            <p>{m['dc.final.body']()}</p>
            <Link href="/app" className="dc-button">
              {m['dc.open']()}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <DeckcraftFooter />
    </div>
  );
}
