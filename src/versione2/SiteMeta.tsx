import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from './siteConfig';

function meta(key: string, value: string, property = false) {
  const attribute = property ? 'property' : 'name';
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = value;
}

export function SiteMeta({
  title,
  description,
  image = '/media/cosimo/55308600189-1080.jpg',
}: {
  title: string;
  description: string;
  image?: string;
}) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = `${title} — Cosimo Maietta`;
    const url = new URL(pathname.replace(/\/$/, '') || '/', siteConfig.url).href;
    meta('description', description);
    meta('robots', siteConfig.preview ? 'noindex, nofollow' : 'index, follow');
    meta('og:title', document.title, true);
    meta('og:description', description, true);
    meta('og:type', 'website', true);
    meta('og:url', url, true);
    meta('og:image', new URL(image, siteConfig.url).href, true);
    meta('twitter:card', 'summary_large_image');
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, image, pathname]);
  return null;
}
