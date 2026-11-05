import type { AnchorHTMLAttributes } from 'react';
import type { MDXComponents } from 'mdx/types';

import { Link } from '@/core/i18n/navigation';

export function GuideFigure({
  src,
  alt,
  caption,
  width = 1600,
  height = 1000,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <figure className="dc-article-figure">
      <a href={src} target="_blank" rel="noreferrer" aria-label={alt}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
        />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export const guideMdxComponents: MDXComponents = {
  a: ({
    href = '',
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  ),
  Figure: GuideFigure,
};
