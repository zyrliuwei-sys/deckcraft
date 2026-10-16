import { useEffect, useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Download,
  Maximize,
  RotateCw,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { deckcraftLinks } from '@/config/deckcraft';
import { m } from '@/paraglide/messages.js';

import '@/styles/deckcraft.css';
import '@/styles/deckcraft-editor.css';

export const Route = createFileRoute('/app')({
  head: () => ({
    meta: [
      { title: m['dc.app.title']() },
      { name: 'description', content: m['dc.app.description']() },
    ],
    links: [{ rel: 'canonical', href: `${deckcraftLinks.site}/app` }],
  }),
  component: EditorPage,
});

function EditorPage() {
  const [loaded, setLoaded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [blank, setBlank] = useState(false);
  const [slow, setSlow] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    setSlow(false);
    const timeout = window.setTimeout(() => setSlow(true), 30_000);
    const timer = window.setInterval(() => {
      const doc = frame.current?.contentDocument;
      if (
        doc?.querySelector('canvas') &&
        !doc.querySelector('#deckcraft_loading')
      ) {
        setLoaded(true);
        window.clearInterval(timer);
        window.clearTimeout(timeout);
      }
    }, 300);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(timeout);
    };
  }, [attempt, blank]);
  return (
    <div className="dc-site dc-editor-page">
      <header className="dc-editor-header">
        <Link href="/" className="dc-brand">
          <img src="/logo.svg" width="28" height="28" alt="" />
          <span>{envConfigs.app_name.toLowerCase()}</span>
        </Link>
        <span className="dc-editor-version">{m['dc.app.version']()}</span>
        <nav aria-label={m['dc.app.tools']()}>
          <button
            type="button"
            onClick={() => {
              if (window.confirm(m['dc.app.confirm_reset']())) {
                setBlank(!blank);
                setLoaded(false);
              }
            }}
          >
            {blank ? m['dc.app.sample']() : m['dc.app.blank']()}
          </button>
          <Link href="/tutorials">
            <BookOpen size={15} />
            <span>{m['dc.nav.learn']()}</span>
          </Link>
          <Link href="/download">
            <Download size={15} />
            <span>{m['dc.download']()}</span>
          </Link>
          <a
            href={blank ? '/editor/?blank' : '/editor/'}
            target="_blank"
            rel="noreferrer"
            aria-label={m['dc.app.new_tab']()}
          >
            <Maximize size={16} />
            <span>{m['dc.app.new_tab']()}</span>
          </a>
        </nav>
      </header>
      <div className="dc-editor-notice">
        <span>{m['dc.app.notice']()}</span>
        <a href={deckcraftLinks.roadmap} target="_blank" rel="noreferrer">
          {m['dc.app.alpha']()}
          <ArrowUpRight size={12} />
        </a>
      </div>
      <main className="dc-editor-canvas">
        {!loaded && (
          <div className="dc-editor-loading" role="status">
            <img src="/logo.svg" alt="" width="52" height="52" />
            <h1>{m['dc.app.loading']()}</h1>
            <p>{m['dc.app.loading_note']()}</p>
            {slow && (
              <div className="dc-editor-fallback">
                <p>{m['dc.app.slow']()}</p>
                <a
                  className="dc-button"
                  href={blank ? '/editor/?blank&webgl' : '/editor/?webgl'}
                  target="_blank"
                  rel="noreferrer"
                >
                  {m['dc.app.compatibility']()}
                  <ArrowUpRight size={15} />
                </a>
                <Link href="/download" className="dc-link">
                  {m['dc.download']()}
                </Link>
              </div>
            )}
          </div>
        )}
        <iframe
          ref={frame}
          key={`${attempt}-${blank}`}
          title={m['dc.app.iframe_title']()}
          src={blank ? '/editor/?blank' : '/editor/'}
          allow="fullscreen; clipboard-read; clipboard-write"
          allowFullScreen
        />
      </main>
      <footer className="dc-editor-status">
        <Link href="/">
          <ArrowLeft size={12} />
          {m['dc.app.back']()}
        </Link>
        <span>{m['dc.app.help']()}</span>
        <button
          type="button"
          onClick={() => {
            setLoaded(false);
            setAttempt(attempt + 1);
          }}
        >
          <RotateCw size={12} />
          {m['dc.app.reload']()}
        </button>
      </footer>
    </div>
  );
}
