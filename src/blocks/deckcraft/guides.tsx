import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Monitor,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { m } from '@/paraglide/messages.js';
import { DeckcraftFooter, DeckcraftHeader } from '@/blocks/deckcraft/chrome';

import '@/styles/deckcraft-guides.css';

const release =
  'https://github.com/storytold/deckcraft/releases/download/v0.7.0/';
const releases = 'https://github.com/storytold/deckcraft/releases/tag/v0.7.0';
const repository = 'https://github.com/storytold/deckcraft';
function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="dc-site">
      <DeckcraftHeader />
      <main className="dc-page-main dc-guides">{children}</main>
      <DeckcraftFooter />
    </div>
  );
}
function External({
  href,
  children,
  className = 'dc-link',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}
function AlphaNote() {
  return (
    <aside className="dc-guide-note">
      <span className="dc-guide-note-dot" />
      <div>
        <strong>{m['dc.guide.alpha']()}</strong>
        <p>{m['dc.guide.alpha.body']()}</p>
      </div>
    </aside>
  );
}
export function DownloadGuide() {
  const [platform, setPlatform] = useState<'mac' | 'windows' | 'linux'>('mac');
  const searchString = useLocation({
    select: (location) => location.searchStr,
  });
  useEffect(() => {
    const requested = new URLSearchParams(searchString).get('platform');
    if (requested === 'macos') setPlatform('mac');
    else if (requested === 'windows' || requested === 'linux')
      setPlatform(requested);
  }, [searchString]);
  const platforms = [
    {
      id: 'mac' as const,
      label: m['dc.guide.download.mac'](),
      caption: m['dc.guide.download.mac.caption'](),
      button: m['dc.guide.download.mac.button'](),
      format: m['dc.guide.download.universal'](),
      file: 'deckcraft-0.7.0-macos-universal.dmg',
      steps: [
        m['dc.guide.download.mac.1'](),
        m['dc.guide.download.mac.2'](),
        m['dc.guide.download.mac.3'](),
      ],
    },
    {
      id: 'windows' as const,
      label: m['dc.guide.download.windows'](),
      caption: m['dc.guide.download.win.caption'](),
      button: m['dc.guide.download.win.button'](),
      format: m['dc.guide.download.x64'](),
      file: 'deckcraft-0.7.0-windows-x64.msi',
      steps: [
        m['dc.guide.download.win.1'](),
        m['dc.guide.download.win.2'](),
        m['dc.guide.download.win.3'](),
      ],
    },
    {
      id: 'linux' as const,
      label: m['dc.guide.download.linux'](),
      caption: m['dc.guide.download.linux.caption'](),
      button: m['dc.guide.download.linux.button'](),
      format: m['dc.guide.download.appimage'](),
      file: 'deckcraft-0.7.0-linux-x86_64.AppImage',
      steps: [
        m['dc.guide.download.linux.1'](),
        m['dc.guide.download.linux.2'](),
        m['dc.guide.download.linux.3'](),
      ],
    },
  ];
  const current = platforms.find((item) => item.id === platform)!;
  return (
    <Shell>
      <section className="dc-container dc-guide-hero">
        <p className="dc-eyebrow">{m['dc.guide.download.eyebrow']()}</p>
        <h1>{m['dc.guide.download.title']()}</h1>
        <p className="dc-lead">{m['dc.guide.download.intro']()}</p>
      </section>
      <section className="dc-container">
        <div className="dc-download-panel">
          <div className="dc-download-choice">
            <p className="dc-guide-release">
              <span />
              {m['dc.guide.release']()}
            </p>
            <div
              className="dc-platform-tabs"
              role="group"
              aria-label={m['dc.guide.download.meta']()}
            >
              {platforms.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={platform === item.id}
                  className={platform === item.id ? 'is-active' : ''}
                  onClick={() => setPlatform(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="dc-platform-content" aria-live="polite">
              <Monitor size={38} strokeWidth={1.2} aria-hidden="true" />
              <h2>{current.label}</h2>
              <p>{current.caption}</p>
              <a className="dc-button" href={release + current.file}>
                <Download size={17} aria-hidden="true" />
                {current.button}
              </a>
              <small>{current.format}</small>
              <div className="dc-alternative-downloads">
                {platform === 'windows' && (
                  <>
                    <a
                      href={
                        release + 'deckcraft-0.7.0-windows-x64-portable.zip'
                      }
                    >
                      {m['dc.guide.download.portable']()}
                    </a>
                    <a href={release + 'deckcraft-0.7.0-windows-arm64.msi'}>
                      {m['dc.guide.download.arm']()}
                    </a>
                  </>
                )}
                {platform === 'linux' && (
                  <>
                    <a href={release + 'deckcraft-0.7.0-linux-x86_64.deb'}>
                      {m['dc.guide.download.deb']()}
                    </a>
                    <a href={release + 'deckcraft-0.7.0-linux-x86_64.rpm'}>
                      {m['dc.guide.download.rpm']()}
                    </a>
                    <External href={releases}>
                      {m['dc.guide.download.linux.arm']()}
                    </External>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="dc-install-instructions">
            <h2>{m['dc.guide.download.install']()}</h2>
            <ol>
              {current.steps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <AlphaNote />
          </div>
        </div>
        <div className="dc-download-sources">
          <External href="https://github.com/storytold/deckcraft/releases">
            {m['dc.guide.download.all']()}
          </External>
          <External href={release + 'SHA256SUMS.txt'}>
            {m['dc.guide.download.checksums']()}
          </External>
          <External href={repository}>
            {m['dc.guide.download.source']()}
          </External>
        </div>
        <p className="dc-source-note">{m['dc.guide.download.note']()}</p>
      </section>
      <section className="dc-container dc-guide-browser">
        <div>
          <p className="dc-eyebrow">{m['dc.guide.download.browser.title']()}</p>
          <h2>{m['dc.guide.download.browser.body']()}</h2>
        </div>
        <Link href="/app" className="dc-button">
          {m['dc.guide.open']()}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </Shell>
  );
}

export function TutorialsGuide() {
  const [step, setStep] = useState(0);
  const searchString = useLocation({
    select: (location) => location.searchStr,
  });
  useEffect(() => {
    if (new URLSearchParams(searchString).get('step') === 'animation')
      setStep(3);
  }, [searchString]);
  const steps = [
    {
      title: m['dc.guide.step1.title'](),
      body: m['dc.guide.step1.body'](),
      tips: [
        m['dc.guide.step1.a'](),
        m['dc.guide.step1.b'](),
        m['dc.guide.step1.c'](),
      ],
      alt: m['dc.guide.step1.alt'](),
      image: 'editor.png',
    },
    {
      title: m['dc.guide.step2.title'](),
      body: m['dc.guide.step2.body'](),
      tips: [
        m['dc.guide.step2.a'](),
        m['dc.guide.step2.b'](),
        m['dc.guide.step2.c'](),
      ],
      alt: m['dc.guide.step2.alt'](),
      image: 'format-pane.png',
    },
    {
      title: m['dc.guide.step3.title'](),
      body: m['dc.guide.step3.body'](),
      tips: [
        m['dc.guide.step3.a'](),
        m['dc.guide.step3.b'](),
        m['dc.guide.step3.c'](),
      ],
      alt: m['dc.guide.step3.alt'](),
      image: 'shape-format.png',
    },
    {
      title: m['dc.guide.step4.title'](),
      body: m['dc.guide.step4.body'](),
      tips: [
        m['dc.guide.step4.a'](),
        m['dc.guide.step4.b'](),
        m['dc.guide.step4.c'](),
      ],
      alt: m['dc.guide.step4.alt'](),
      image: 'slide-sorter.png',
    },
    {
      title: m['dc.guide.step5.title'](),
      body: m['dc.guide.step5.body'](),
      tips: [
        m['dc.guide.step5.a'](),
        m['dc.guide.step5.b'](),
        m['dc.guide.step5.c'](),
      ],
      alt: m['dc.guide.step5.alt'](),
      image: 'dark-mode.png',
    },
  ];
  const current = steps[step];
  return (
    <Shell>
      <section className="dc-container dc-guide-hero">
        <p className="dc-eyebrow">{m['dc.guide.tutorials.eyebrow']()}</p>
        <h1>{m['dc.guide.tutorials.title']()}</h1>
        <p className="dc-lead">{m['dc.guide.tutorials.intro']()}</p>
        <Link className="dc-button" href="/app">
          {m['dc.guide.open']()}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
      <section className="dc-container dc-tutorial-layout">
        <nav className="dc-step-nav" aria-label={m['dc.guide.tutorials.nav']()}>
          <p>{m['dc.guide.tutorials.nav']()}</p>
          {steps.map((item, index) => (
            <button
              type="button"
              key={item.title}
              aria-current={step === index ? 'step' : undefined}
              onClick={() => setStep(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.title}
              <ChevronRight size={15} aria-hidden="true" />
            </button>
          ))}
        </nav>
        <article className="dc-tutorial-article" aria-live="polite">
          <div className="dc-step-heading">
            <span>{String(step + 1).padStart(2, '0')} / 05</span>
            <h2>{current.title}</h2>
          </div>
          <p className="dc-tutorial-intro">{current.body}</p>
          <figure>
            <img
              src={'/imgs/deckcraft/' + current.image}
              alt={current.alt}
              width={1600}
              height={1000}
              loading="lazy"
            />
            <figcaption>{current.alt}</figcaption>
          </figure>
          <ul className="dc-step-tips">
            {current.tips.map((tip) => (
              <li key={tip}>
                <Check size={17} aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
          <div className="dc-step-pagination">
            <button
              className="dc-button-secondary"
              type="button"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              <ChevronLeft size={16} aria-hidden="true" />
              {m['dc.guide.tutorials.previous']()}
            </button>
            {step < 4 ? (
              <button
                className="dc-button"
                type="button"
                onClick={() => setStep(step + 1)}
              >
                {m['dc.guide.tutorials.next']()}
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            ) : (
              <Link href="/app" className="dc-button">
                {m['dc.guide.open']()}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
          <p className="dc-source-note">
            <External href={repository + '#what-works-today'}>
              {m['dc.guide.tutorials.source']()}
            </External>
          </p>
        </article>
      </section>
      <div className="dc-container dc-guide-bottom-note">
        <AlphaNote />
      </div>
    </Shell>
  );
}

export function CompareGuide() {
  const rows = [
    [
      m['dc.guide.compare.license'](),
      m['dc.guide.compare.license.dc'](),
      m['dc.guide.compare.license.pp'](),
    ],
    [
      m['dc.guide.compare.cost'](),
      m['dc.guide.compare.cost.dc'](),
      m['dc.guide.compare.cost.pp'](),
    ],
    [
      m['dc.guide.compare.platform'](),
      m['dc.guide.compare.platform.dc'](),
      m['dc.guide.compare.platform.pp'](),
    ],
    [
      m['dc.guide.compare.workflow'](),
      m['dc.guide.compare.workflow.dc'](),
      m['dc.guide.compare.workflow.pp'](),
    ],
    [
      m['dc.guide.compare.format'](),
      m['dc.guide.compare.format.dc'](),
      m['dc.guide.compare.format.pp'](),
    ],
    [
      m['dc.guide.compare.automation'](),
      m['dc.guide.compare.automation.dc'](),
      m['dc.guide.compare.automation.pp'](),
    ],
  ];
  return (
    <Shell>
      <section className="dc-container dc-guide-hero">
        <p className="dc-eyebrow">{m['dc.guide.compare.eyebrow']()}</p>
        <h1>{m['dc.guide.compare.title']()}</h1>
        <p className="dc-lead">{m['dc.guide.compare.intro']()}</p>
      </section>
      <section className="dc-container">
        <div className="dc-compare-scroll">
          <table className="dc-comparison-table">
            <caption>{m['dc.guide.compare.table.caption']()}</caption>
            <thead>
              <tr>
                <th scope="col">{m['dc.guide.compare.feature']()}</th>
                <th scope="col">
                  <span className="dc-compare-brand">
                    {envConfigs.app_name}
                  </span>
                  <small>{m['dc.guide.alpha']()}</small>
                </th>
                <th scope="col">{m['dc.guide.compare.powerpoint']()}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dc-compare-sources">
          <strong>{m['dc.guide.compare.sources']()}</strong>
          <External href={repository + '#what-works-today'}>
            {m['dc.guide.compare.docs']()}
          </External>
          <External href="https://www.microsoft.com/en-us/microsoft-365/powerpoint">
            {m['dc.guide.compare.ms']()}
          </External>
          <External href="https://www.microsoft.com/en-us/microsoft-365/free-office-online-for-the-web">
            {m['dc.guide.compare.free']()}
          </External>
        </div>
      </section>
      <section className="dc-container dc-choice-grid">
        <article>
          <span className="dc-choice-symbol" aria-hidden="true">
            ↗
          </span>
          <h2>{m['dc.guide.compare.dc.title']()}</h2>
          <p>{m['dc.guide.compare.dc.body']()}</p>
          <Link href="/app" className="dc-link">
            {m['dc.guide.open']()}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </article>
        <article>
          <span
            className="dc-choice-symbol dc-choice-symbol-neutral"
            aria-hidden="true"
          >
            ⊞
          </span>
          <h2>{m['dc.guide.compare.pp.title']()}</h2>
          <p>{m['dc.guide.compare.pp.body']()}</p>
          <External href="https://www.microsoft.com/en-us/microsoft-365/powerpoint">
            {m['dc.guide.compare.ms']()}
          </External>
        </article>
      </section>
      <section className="dc-container dc-compare-caveat">
        <h2>{m['dc.guide.compare.caveat']()}</h2>
        <p>{m['dc.guide.compare.caveat.body']()}</p>
        <Link href="/download" className="dc-link">
          {m['dc.guide.download.meta']()}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </Shell>
  );
}
