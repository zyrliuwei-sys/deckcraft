import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Download,
  Feather,
  FileCheck2,
  Laptop,
  Monitor,
  MousePointer2,
  Plus,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { deckcraftLinks } from '@/config/deckcraft';
import { m } from '@/paraglide/messages.js';

import { DeckcraftFooter, DeckcraftHeader } from './chrome';

function SlidePreview() {
  const [slide, setSlide] = useState(0);
  const slides = [
    {
      label: m['dc.slide.one.label'](),
      title: m['dc.slide.one.title'](),
      body: m['dc.slide.one.body'](),
    },
    {
      label: m['dc.slide.two.label'](),
      title: m['dc.slide.two.title'](),
      body: m['dc.slide.two.body'](),
    },
    {
      label: m['dc.slide.three.label'](),
      title: m['dc.slide.three.title'](),
      body: m['dc.slide.three.body'](),
    },
  ];
  return (
    <div className="dc-hero-visual dc-reveal">
      <div className="dc-slide-stage">
        <div className="dc-slide-back" aria-hidden="true" />
        <div
          key={slide}
          className={`dc-slide dc-slide-${slide}`}
          role="tabpanel"
          id="dc-slide-panel"
          aria-labelledby={`dc-slide-tab-${slide}`}
        >
          <div className="dc-slide-copy">
            <span className="dc-slide-label">{slides[slide].label}</span>
            <h2>{slides[slide].title}</h2>
            <p>{slides[slide].body}</p>
            <div className="dc-slide-footer">
              <span>{m['dc.slide.footer']()}</span>
              <span>0{slide + 1}</span>
            </div>
          </div>
          <div className="dc-slide-art" aria-hidden="true">
            <div className="dc-slide-sculpture">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
      <div className="dc-visual-note">
        <MousePointer2 size={17} />
        <span>{m['dc.hero.visual_note']()}</span>
      </div>
      <div className="dc-preview-caption">
        <p>
          <Sparkles size={12} />
          {m['dc.hero.preview_caption']()}
        </p>
        <div
          className="dc-preview-tabs"
          role="tablist"
          aria-label={m['dc.hero.preview_label']()}
        >
          {slides.map((item, index) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              id={`dc-slide-tab-${index}`}
              aria-selected={slide === index}
              aria-controls="dc-slide-panel"
              aria-label={item.label}
              tabIndex={slide === index ? 0 : -1}
              onClick={() => setSlide(index)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                  event.preventDefault();
                  const next =
                    (index +
                      (event.key === 'ArrowRight' ? 1 : -1) +
                      slides.length) %
                    slides.length;
                  setSlide(next);
                  document.getElementById(`dc-slide-tab-${next}`)?.focus();
                }
              }}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <>
      <div className="dc-announcement">
        <span>
          <Code2 size={13} />
          {m['dc.announcement']()}
        </span>
        <a href={deckcraftLinks.github} target="_blank" rel="noreferrer">
          {m['dc.announcement.link']()}
          <ArrowRight size={12} />
        </a>
      </div>
      <section className="dc-hero" id="overview">
        <div className="dc-container dc-hero-inner">
          <div className="dc-hero-copy dc-reveal">
            <span className="dc-eyebrow">{m['dc.hero.eyebrow']()}</span>
            <h1>
              {m['dc.hero.title_one']()}
              <span>{m['dc.hero.title_two']()}</span>
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
            <div className="dc-hero-facts">
              <span>
                <Check size={13} />
                {m['dc.hero.free']()}
              </span>
              <span>
                <Check size={13} />
                {m['dc.hero.no_account']()}
              </span>
              <span>
                <Check size={13} />
                {m['dc.hero.your_files']()}
              </span>
            </div>
          </div>
          <SlidePreview />
        </div>
      </section>
    </>
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
        <h2 className="dc-section-heading">{m['dc.features.title']()}</h2>
        <p className="dc-lead">{m['dc.features.description']()}</p>
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
                  <ChevronDown
                    size={17}
                    style={
                      active === index
                        ? { transform: 'rotate(180deg)' }
                        : undefined
                    }
                  />
                </button>
                {active === index && (
                  <div
                    className="dc-feature-content"
                    id={`dc-feature-${index}`}
                    role="region"
                    aria-labelledby={`dc-feature-button-${index}`}
                  >
                    <p>{feature.description}</p>
                    <Link className="dc-link" href="/tutorials">
                      {m['dc.features.learn']()}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          <figure className="dc-feature-figure">
            <img
              key={active}
              src={`/imgs/deckcraft/${features[active].image}`}
              alt={features[active].alt}
              width="1600"
              height="1000"
              loading="lazy"
            />
            <figcaption>{m['dc.features.caption']()}</figcaption>
          </figure>
        </div>
        <div className="dc-proof-strip">
          <span>
            <FileCheck2 size={16} />
            {m['dc.proof.pptx']()}
          </span>
          <span>
            <Feather size={16} />
            {m['dc.proof.rust']()}
          </span>
          <span>
            <Monitor size={16} />
            {m['dc.proof.platforms']()}
          </span>
          <span>
            <ShieldCheck size={16} />
            {m['dc.proof.license']()}
          </span>
        </div>
      </div>
    </section>
  );
}

function Freedom() {
  return (
    <section className="dc-section dc-freedom">
      <div className="dc-container dc-freedom-inner">
        <div className="dc-freedom-copy">
          <h2 className="dc-section-heading">{m['dc.freedom.title']()}</h2>
          <p className="dc-lead">{m['dc.freedom.body']()}</p>
          <ul className="dc-check-list">
            <li>
              <CheckCircle2 size={16} />
              {m['dc.freedom.one']()}
            </li>
            <li>
              <CheckCircle2 size={16} />
              {m['dc.freedom.two']()}
            </li>
            <li>
              <CheckCircle2 size={16} />
              {m['dc.freedom.three']()}
            </li>
          </ul>
          <Link href="/compare" className="dc-link">
            {m['dc.freedom.compare']()}
            <ArrowRight size={16} />
          </Link>
          <div>
            <a
              className="dc-rust-label"
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
        <figure className="dc-freedom-figure">
          <img
            src="/imgs/deckcraft/dark-mode.png"
            width="1600"
            height="1000"
            alt={m['dc.freedom.alt']()}
            loading="lazy"
          />
        </figure>
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
      icon: Code2,
      name: 'Linux',
      body: m['dc.downloads.linux'](),
      link: '/download?platform=linux',
    },
  ];
  return (
    <section className="dc-section" id="download">
      <div className="dc-container">
        <div className="dc-section-topline">
          <div>
            <h2 className="dc-section-heading">{m['dc.downloads.title']()}</h2>
            <p className="dc-lead">{m['dc.downloads.body']()}</p>
          </div>
          <Link href="/app" className="dc-link">
            {m['dc.downloads.browser']()}
            <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="dc-download-grid">
          {platforms.map((platform) => (
            <div className="dc-download-card" key={platform.name}>
              <platform.icon size={30} strokeWidth={1.4} />
              <h3>{platform.name}</h3>
              <p>{platform.body}</p>
              <Link href={platform.link} className="dc-link">
                {m['dc.downloads.get']()} {platform.name}
                <ArrowDown size={14} />
              </Link>
            </div>
          ))}
        </div>
        <p className="dc-download-footnote">
          {m['dc.downloads.note']()}{' '}
          <a href={deckcraftLinks.release} target="_blank" rel="noreferrer">
            {m['dc.downloads.notes']()}
            <span aria-hidden="true"> ↗</span>
          </a>
        </p>
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section className="dc-section dc-learn-section" id="resources">
      <div className="dc-container">
        <h2 className="dc-section-heading">{m['dc.resources.title']()}</h2>
        <p className="dc-lead">{m['dc.resources.body']()}</p>
        <div className="dc-resource-grid">
          <Link href="/tutorials" className="dc-resource">
            <div className="dc-resource-art">
              <img
                src="/imgs/deckcraft/editor.png"
                width="1600"
                height="1000"
                alt={m['dc.resources.start.alt']()}
                loading="lazy"
              />
            </div>
            <h3>{m['dc.resources.start.title']()}</h3>
            <p>{m['dc.resources.start.body']()}</p>
            <span className="dc-link">
              {m['dc.resources.start.link']()}
              <ArrowRight size={14} />
            </span>
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
            <h3>{m['dc.resources.motion.title']()}</h3>
            <p>{m['dc.resources.motion.body']()}</p>
            <span className="dc-link">
              {m['dc.resources.motion.link']()}
              <ArrowRight size={14} />
            </span>
          </Link>
          <Link href="/compare" className="dc-resource">
            <div
              className="dc-resource-art dc-comparison-art"
              aria-hidden="true"
            >
              <span>
                <img src="/logo.svg" alt="" width="44" height="44" />
              </span>
              <b>vs.</b>
              <span>P</span>
            </div>
            <h3>{m['dc.resources.compare.title']()}</h3>
            <p>{m['dc.resources.compare.body']()}</p>
            <span className="dc-link">
              {m['dc.resources.compare.link']()}
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const questions = [
    { q: m['dc.faq.free.q'](), a: m['dc.faq.free.a']() },
    { q: m['dc.faq.pptx.q'](), a: m['dc.faq.pptx.a']() },
    { q: m['dc.faq.browser.q'](), a: m['dc.faq.browser.a']() },
    { q: m['dc.faq.account.q'](), a: m['dc.faq.account.a']() },
    { q: m['dc.faq.official.q'](), a: m['dc.faq.official.a']() },
  ];
  return (
    <section className="dc-section" id="faq">
      <div className="dc-container dc-faq-layout">
        <div>
          <h2 className="dc-section-heading">{m['dc.faq.title']()}</h2>
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
            <a href="#overview">{m['dc.nav.overview']()}</a>
            <a href="#features">{m['dc.nav.features']()}</a>
            <a href="#download">{m['dc.nav.download']()}</a>
            <a href="#resources">{m['dc.nav.resources']()}</a>
            <a href="#faq">{m['dc.nav.faq']()}</a>
            <Link href="/app" className="dc-link">
              {m['dc.nav.try']()}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </nav>
        <FeatureTour />
        <Freedom />
        <Downloads />
        <Resources />
        <FAQ />
        <section className="dc-final-cta">
          <div className="dc-container dc-final-inner">
            <div>
              <h2 className="dc-section-heading">{m['dc.final.title']()}</h2>
              <p>{m['dc.final.body']()}</p>
            </div>
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
