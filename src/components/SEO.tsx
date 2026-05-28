import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}

export default function SEO({
  title,
  description = "SanskarVault is a modern platform for previous year papers, AI-generated notes, coding resources, semester materials and smart exam preparation tools.",
  keywords = "PYQ, Previous Year Papers, AI Notes, BTech Papers, Semester Notes, Coding Resources, Study Platform, Engineering Papers, AI Study Tools",
  author = "SanskarVault"
}: SEOProps) {
  const fullTitle = title 
    ? `${title} | SanskarVault`
    : "SanskarVault - Previous Year Papers, AI Notes & Study Resources";

  useEffect(() => {
    // 1. Update document title
    document.title = fullTitle;

    // 2. Helper to set/update meta tag
    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setOgTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update standard meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', author);

    // Update Open Graph (OG) meta tags for social media sharing
    setOgTag('og:title', fullTitle);
    setOgTag('og:description', description);
    setOgTag('og:type', 'website');
    setOgTag('og:site_name', 'SanskarVault');
  }, [fullTitle, description, keywords, author]);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </>
  );
}
