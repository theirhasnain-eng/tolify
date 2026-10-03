import { useEffect } from 'react';

/**
 * SeoHead component for dynamic client-side SEO management
 * Manages document title, meta description, OpenGraph tags, Twitter cards, and Schema.org JSON-LD
 */
export default function SeoHead({
  title = 'DevMetrics Hub | US SaaS Growth, Developer Rates & Interactive Web Tools',
  description = 'DevMetrics Hub provides US tech growth insights, SaaS calculators, developer hourly rate estimators, and SEO web tools for engineers and founders.',
  keywords = 'US SaaS benchmarks, developer rates US, SaaS calculator, SEO meta tag generator',
  ogImage = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  ogType = 'website',
  canonicalUrl,
  schemaJson,
}) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set or create meta element
    const setMetaTag = (selector, attrName, attrValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Basic Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords);

    // 4. OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl || window.location.href);

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 6. Schema.org JSON-LD Script Injection
    const scriptId = 'json-ld-schema-script';
    let scriptElement = document.getElementById(scriptId);

    if (schemaJson) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schemaJson);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // Optional cleanup on unmount
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, schemaJson]);

  return null;
}
