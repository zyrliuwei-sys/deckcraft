import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { useTheme } from 'next-themes';

import { useSession } from '@/core/auth/client';
import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { deckcraftLinks } from '@/config/deckcraft';
import { m } from '@/paraglide/messages.js';
import { SiteUserMenu } from '@/components/site-user-menu';

import '@/styles/deckcraft.css';

/** Renders `*phrase*` segments of a message with the highlighter mark. */
export function Marked({ text }: { text: string }) {
  return (
    <>
      {text
        .split('*')
        .map((part, index) =>
          index % 2 ? <mark key={index}>{part}</mark> : part
        )}
    </>
  );
}

/**
 * The brand's signature container: media set inside a 16:9-minded slide
 * frame with crop marks, captioned below like a speaker note.
 */
export function SlideFrame({
  children,
  caption,
  stage = false,
  className = '',
}: {
  children: ReactNode;
  caption?: string;
  stage?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={['dc-frame', stage && 'dc-frame-stage', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="dc-frame-crop">
        <div className="dc-frame-surface">{children}</div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function DeckcraftHeader() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session } = useSession();
  useEffect(() => setMounted(true), []);
  const links = [
    { href: '/#features', label: m['dc.nav.features']() },
    { href: '/download', label: m['dc.nav.download']() },
    { href: '/tutorials', label: m['dc.nav.learn']() },
    { href: '/compare', label: m['dc.nav.compare']() },
  ];
  return (
    <header className="dc-header">
      <div className="dc-container dc-header-inner">
        <Link href="/" className="dc-brand" aria-label={envConfigs.app_name}>
          <img src="/logo.svg" alt="" width="34" height="34" />
          <span>{envConfigs.app_name.toLowerCase()}</span>
        </Link>
        <nav className="dc-desktop-nav" aria-label={m['dc.nav.main']()}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="dc-header-actions">
          <div className="dc-theme-switch">
            {(['light', 'dark'] as const).map((theme) => (
              <button
                key={theme}
                type="button"
                aria-label={
                  theme === 'light'
                    ? m['common.nav.theme_light']()
                    : m['common.nav.theme_dark']()
                }
                title={
                  theme === 'light'
                    ? m['common.nav.theme_light']()
                    : m['common.nav.theme_dark']()
                }
                aria-pressed={mounted && resolvedTheme === theme}
                onClick={() => setTheme(theme)}
              >
                {theme === 'light' ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            ))}
          </div>
          {session?.user ? (
            <SiteUserMenu
              key={session.user.id}
              name={session.user.name}
              email={session.user.email}
              image={session.user.image}
            />
          ) : (
            <Link className="dc-login-link" href="/sign-in">
              {m['common.nav.sign_in']()}
            </Link>
          )}
          <a
            className="dc-github-link"
            href={deckcraftLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label={m['dc.nav.github']()}
          >
            <Github size={19} />
          </a>
          <Link href="/app" className="dc-button dc-header-open">
            {m['dc.open']()}
            <ArrowUpRight size={15} />
          </Link>
          <button
            className="dc-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="dc-mobile-nav"
            aria-label={open ? m['dc.nav.close']() : m['dc.nav.menu']()}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="dc-mobile-nav"
          className="dc-mobile-nav"
          aria-label={m['dc.nav.main']()}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <ArrowUpRight size={16} />
            </Link>
          ))}
          <Link href="/app" onClick={() => setOpen(false)}>
            {m['dc.open']()}
            <ArrowRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}

export function DeckcraftFooter() {
  return (
    <footer className="dc-footer">
      <div className="dc-container">
        <div className="dc-footer-main">
          <div className="dc-footer-brand">
            <Link href="/" className="dc-brand">
              <img src="/logo.svg" alt="" width="34" height="34" />
              <span>{envConfigs.app_name.toLowerCase()}</span>
            </Link>
            <p>{m['dc.footer.tagline']()}</p>
          </div>
          <div>
            <h3>{m['dc.footer.explore']()}</h3>
            <Link href="/app">{m['dc.open']()}</Link>
            <Link href="/download">{m['dc.nav.download']()}</Link>
            <Link href="/compare">{m['dc.nav.compare']()}</Link>
          </div>
          <div>
            <h3>{m['dc.footer.resources']()}</h3>
            <Link href="/tutorials">{m['dc.nav.learn']()}</Link>
            <a href={deckcraftLinks.github} target="_blank" rel="noreferrer">
              GitHub
              <ArrowUpRight size={12} />
            </a>
            <a href={deckcraftLinks.community} target="_blank" rel="noreferrer">
              {m['dc.footer.community']()}
              <ArrowUpRight size={12} />
            </a>
          </div>
          <div>
            <h3>{m['dc.footer.project']()}</h3>
            <a href={`mailto:${deckcraftLinks.supportEmail}`}>
              {m['dc.footer.support']()}
            </a>
            <a href={deckcraftLinks.official} target="_blank" rel="noreferrer">
              {m['dc.footer.official']()}
              <ArrowUpRight size={12} />
            </a>
            <a href={deckcraftLinks.license} target="_blank" rel="noreferrer">
              {m['dc.footer.license']()}
            </a>
            <a href={deckcraftLinks.roadmap} target="_blank" rel="noreferrer">
              {m['dc.footer.roadmap']()}
            </a>
          </div>
        </div>
        <div className="dc-footer-disclosure">
          <p>{m['dc.footer.independent']()}</p>
          <p>{m['dc.footer.trademark']()}</p>
        </div>
        <div className="dc-footer-bottom">
          <span>
            © {new Date().getFullYear()} {envConfigs.app_name}
          </span>
          <div>
            <Link href="/privacy-policy">{m['dc.footer.privacy']()}</Link>
            <Link href="/terms-of-service">{m['dc.footer.terms']()}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
