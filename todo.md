# Codebase Review and Recommendations

This document outlines the findings from a comprehensive review of the TITANCODE Next.js codebase, focusing on best practices, security, and SEO.

## Security Findings

### 2. Contact Form HTML Injection (Medium Risk) DONE

*   **Location:** [`src/app/api/contact/route.ts:32`](./src/app/api/contact/route.ts:32)
*   **Issue:** The contact form API constructs the email body using string concatenation with user-provided data. This could allow a malicious user to inject arbitrary HTML into the email.
*   **Recommendation:** Sanitize the `name`, `email`, and `message` fields before including them in the email body. Use a library like `dompurify` to strip out any potentially malicious HTML.

## SEO Findings

### 1. Client-Side Internationalization (i18n) (High Impact) DONE

*   **Location:** [`src/app/language-context.tsx`](./src/app/language-context.tsx)
*   **Issue:** The current i18n implementation is client-side only, which is detrimental to SEO. Search engines will likely only index the default language ("en").
*   **Recommendation:** Implement Next.js's built-in i18n routing. This will create unique URLs for each language (e.g., `/en/about`, `/pl/about`), allowing search engines to discover and index all language versions of your pages.

### 2. Missing Per-Page Metadata (High Impact) DONE

*   **Location:** [`src/app/about/page.tsx`](./src/app/about/page.tsx) and other pages.
*   **Issue:** Pages are implemented as client components and lack their own `metadata` export. They fall back to the generic metadata in the root layout.
*   **Recommendation:** Convert pages to server components where possible and add a unique, descriptive `metadata` export to each page. For client components that need dynamic titles, use the `title.template` in the root layout's metadata.
*   **COMPLETED:** Added comprehensive metadata exports to all pages using separate metadata.ts files:
    - Home page (`/[lang]/metadata.ts`)
    - About page (`/[lang]/about/metadata.ts`)
    - Services page (`/[lang]/services/metadata.ts`)
    - Contact page (`/[lang]/contact/metadata.ts`)
    - Portfolio page (`/[lang]/portfolio/metadata.ts`)
    - Calculate Estimate page (`/[lang]/calculate-estimate/metadata.ts`)
    - Individual portfolio project pages (`/[lang]/portfolio/nanobid/metadata.ts`, `/[lang]/portfolio/kurs8klasisty/metadata.ts`)
*   **Features Added:**
    - Unique titles and descriptions for each page
    - Relevant keywords for better SEO
    - OpenGraph metadata for social media sharing
    - Twitter Card metadata
    - Language alternates for multilingual SEO
    - Proper locale handling (en_US/pl_PL)
    - Dynamic metadata generation based on current language
    - Separation of client components and server metadata

### 3. Hardcoded Language and Locale (Medium Impact)

*   **Location:** [`src/app/layout.tsx:95`](./src/app/layout.tsx:95) and [`src/app/layout.tsx:68`](./src/app/layout.tsx:68)
*   **Issue:** The `lang` attribute and `openGraph.locale` are hardcoded, which is not ideal for a multilingual site.
*   **Recommendation:** When implementing i18n routing, dynamically set the `lang` attribute and `openGraph.locale` based on the current language.

### 4. Placeholder URLs (Medium Impact)

*   **Location:** [`src/app/layout.tsx`](./src/app/layout.tsx)
*   **Issue:** The `metadataBase` and other URLs in the `metadata` object are using a placeholder domain.
*   **Recommendation:** Replace all instances of `https://example.com` with your actual domain.

### 5. Missing SEO-Related Files (Low Impact)

*   **Issue:** The `public` directory and several SEO-related files (`og-image.png`, `twitter-image.png`, `apple-touch-icon.png`, `site.webmanifest`) are missing.
*   **Recommendation:** Create the `public` directory and add the missing files. Ensure they are optimized for size and quality.

## Next Steps

1.  **Prioritize and implement the recommended changes.** The i18n and metadata issues should be the highest priority.
2.  **Conduct a full accessibility audit.** Ensure the site is usable for people with disabilities.
3.  **Set up a sitemap.** Create a `sitemap.ts` file to dynamically generate a sitemap for your pages.
4.  **Create a `robots.txt` file.** This file will instruct search engine crawlers on how to crawl your site.