import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FilePlus2, Presentation } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';

import { Marked } from './chrome';

export function InlineEditor() {
  const [source, setSource] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'slow'>('loading');
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!source) return;
    setStatus('loading');
    const timeout = window.setTimeout(() => setStatus('slow'), 30_000);
    const timer = window.setInterval(() => {
      const doc = frame.current?.contentDocument;
      if (
        doc?.querySelector('canvas') &&
        !doc.querySelector('#deckcraft_loading')
      ) {
        setStatus('ready');
        window.clearInterval(timer);
        window.clearTimeout(timeout);
      }
    }, 300);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(timeout);
    };
  }, [source]);

  return (
    <section
      className="dc-section dc-inline-editor"
      id="editor"
      aria-labelledby="dc-editor-heading"
    >
      <div className="dc-container">
        <header className="dc-section-header">
          <h2 className="dc-section-heading" id="dc-editor-heading">
            <Marked text={m['dc.inline.title']()} />
          </h2>
          <p className="dc-lead">{m['dc.inline.body']()}</p>
        </header>
        {!source ? (
          <div className="dc-inline-launch">
            <button
              className="dc-button"
              type="button"
              onClick={() => setSource('/editor/?blank')}
            >
              <FilePlus2 size={18} />
              {m['dc.inline.blank']()}
            </button>
            <button
              className="dc-button dc-button-secondary"
              type="button"
              onClick={() => setSource('/editor/')}
            >
              <Presentation size={18} />
              {m['dc.inline.sample']()}
            </button>
          </div>
        ) : (
          <>
            <p className="dc-inline-status" role="status">
              {status === 'ready'
                ? m['dc.inline.ready']()
                : status === 'slow'
                  ? m['dc.inline.slow']()
                  : m['dc.inline.loading']()}
            </p>
            {status === 'slow' && (
              <button
                type="button"
                className="dc-button dc-button-secondary"
                onClick={() =>
                  setSource(`${source}${source.includes('?') ? '&' : '?'}webgl`)
                }
              >
                {m['dc.inline.retry']()}
              </button>
            )}
            <div className="dc-inline-viewport">
              <iframe
                ref={frame}
                key={source}
                src={source}
                title={m['dc.app.iframe_title']()}
                allow="fullscreen; clipboard-read; clipboard-write"
                allowFullScreen
                onError={() => setStatus('slow')}
              />
            </div>
          </>
        )}
        <div className="dc-inline-footer">
          <p>{m['dc.inline.note']()}</p>
          <Link
            href="/app"
            className="dc-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {m['dc.inline.separate']()}
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
