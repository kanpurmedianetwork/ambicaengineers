import React from 'react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
}

const DEFAULT_TITLE = 'Ambica Engineers | Hydraulic Components & Spares';
const DEFAULT_DESCRIPTION = 'Ambica Engineers & Lubricants: Supplier of hydraulic pumps, valves, motors, European cushion pads, and wood panel machinery since 1982. Fast dispatch.';
const BASE_URL = 'https://www.ambicaengineers.in';
const DEFAULT_IMAGE = `${BASE_URL}/images/og-image.jpg`;

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
}) => {
  const normalizedPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const fullCanonicalUrl = normalizedPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`;
  
  // Guard against SVGs for social open graph preview images
  let resolvedImage = image || DEFAULT_IMAGE;
  if (resolvedImage.toLowerCase().endsWith('.svg')) {
    resolvedImage = DEFAULT_IMAGE;
  }
  const fullImageUrl = resolvedImage.startsWith('http://') || resolvedImage.startsWith('https://') 
    ? resolvedImage 
    : `${BASE_URL}${resolvedImage.startsWith('/') ? resolvedImage : `/${resolvedImage}`}`;

  React.useEffect(() => {
    document.title = title;

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Ambica Engineers & Lubricants Ltd');
    setMeta('property', 'og:locale', 'en_IN');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', fullCanonicalUrl);
    setMeta('property', 'og:image', fullImageUrl);
    setMeta('property', 'og:image:secure_url', fullImageUrl);

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', fullImageUrl);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);
  }, [title, description, fullCanonicalUrl, fullImageUrl, type, noindex]);

  // Return null so that no duplicate <title>, <meta>, or <link> tags are rendered inside <div id="root">
  return null;
};
