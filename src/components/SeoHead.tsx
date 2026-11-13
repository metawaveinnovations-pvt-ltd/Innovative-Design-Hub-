import React, { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  structuredData?: Record<string, unknown> | readonly Record<string, unknown>[];
}

function updateMetaTag(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export const SeoHead: React.FC<SeoHeadProps> = ({ title, description, structuredData }) => {
  useEffect(() => {
    document.title = title;
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    const scriptId = 'idh-structured-data';
    const existingScript = document.getElementById(scriptId);
    if (structuredData) {
      const scriptEl = existingScript ?? document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.setAttribute('type', 'application/ld+json');
      scriptEl.textContent = JSON.stringify(structuredData);
      if (!existingScript) {
        document.head.appendChild(scriptEl);
      }
    } else if (existingScript) {
      existingScript.remove();
    }
  }, [title, description, structuredData]);

  return null;
};
