# TitanCode.pl — SEO audit + plan (PL focus, bilingual)

**Goal:** Get measurable organic impressions + leads in Poland (Warsaw-first) while keeping an English version for credibility and international leads.

**Reality check:** WordPress agencies rank because they have (1) more indexed pages, (2) more local authority/backlinks, (3) longer domain history. We win by (a) making Google fully understand our language/canonical structure, (b) shipping niche + location pages, (c) proving outcomes with case studies, (d) collecting basic authority links.

---

## 0) What “success” looks like (KPIs)

### Within 14 days
- Search Console shows **indexing + impressions** (even small).
- All key pages have correct canonicals + hreflang.
- Sitemap includes correct URLs and is accepted.

### Within 30–60 days
- 1–3 keywords start showing **top 20–50** positions.
- 2–5 qualified inquiries from organic/local.

---

## 1) Decide the language & URL strategy (bilingual, PL-focused)

**Recommended structure**
- Polish as primary:
  - `https://www.titancode.pl/` → Polish homepage
  - `https://www.titancode.pl/uslugi` etc.
- English as secondary:
  - `https://www.titancode.pl/en/` → English homepage
  - `https://www.titancode.pl/en/services` etc.

**Do NOT** auto-redirect users based on browser language (can confuse Google).

**Do** use:
- canonical tags
- hreflang tags
- consistent internal linking per language

---

## 2) Technical SEO audit checklist (highest priority)

### 2.1 Indexation
- Google query: `site:titancode.pl`
- In Google Search Console:
  - Pages → Indexed / Not indexed
  - Look for:
    - “Duplicate without user-selected canonical”
    - “Alternate page with proper canonical”
    - “Crawled - currently not indexed”

### 2.2 robots.txt + meta robots
- Confirm:
  - no `Disallow: /` mistakes
  - no `noindex` on key pages

### 2.3 Canonical rules (per page)
Every page must have 1 canonical that points to itself:
- PL page canonical → PL URL
- EN page canonical → EN URL

Avoid canonicalizing everything to `/en` or to `/`.

### 2.4 hreflang rules (bilingual)
Add hreflang pairs:
- On PL pages:
  - `hreflang="pl-PL"` → PL URL
  - `hreflang="en"` → EN URL
  - `hreflang="x-default"` → PL homepage (or global choice page)
- On EN pages:
  - same set, reversed

### 2.5 Sitemaps
- Generate sitemap(s) that include:
  - all PL URLs
  - all EN URLs
- Submit in Search Console.

### 2.6 Redirect consistency
Pick one canonical host:
- `https://www.titancode.pl` (recommended)

Redirect permanently:
- `http → https`
- non-www → www (or the opposite, but be consistent)
- ensure `/en` vs `/en/` is consistent

### 2.7 Core Web Vitals
You’re already performance-focused; just ensure:
- no CLS from fonts/images
- LCP element is optimized

---

## 3) Content strategy that beats “WP agencies” (PL-first)

### 3.1 You need pages Google can rank
Right now, you likely have “agency pages” (services/portfolio/about/contact). That’s not enough to rank in Warsaw.

Create **location + offer landing pages**:

#### Warsaw pages (PL)
- `/warszawa` — “Strony internetowe Warszawa” (but written premium, not spam)
- `/aplikacje-webowe-warszawa` — Web apps for local businesses
- `/sklepy-internetowe-warszawa` — E-commerce in Warsaw

#### Niche pages (PL)
Pick 1–2 niches you can genuinely deliver:
- “Strony i systemy dla szkół językowych / korepetytorów”
- “Landing + płatności (Stripe/Przelewy24) dla kursów”
- “Panele admina i automatyzacje”

Make pages like:
- `/strona-dla-szkoly-jezykowej`
- `/landing-page-dla-kursu-online`
- `/panel-administracyjny-na-zamowienie`

### 3.2 Case studies (must-have)
Add 3–6 case studies with:
- problem → approach → solution → outcome
- at least 1 hard metric (or technical outcome):
  - Lighthouse score
  - load time improvement
  - checkout conversion improvement
  - automation time saved

---

## 4) Local authority & links (fast wins)

### 4.1 Google Business Profile
Create/optimize a Warsaw listing.
- consistent NAP (Name/Address/Phone)
- add 10+ photos
- add services
- ask for 3–5 reviews

### 4.2 Directories / citations
Get listed on:
- Clutch (even minimal)
- GoodFirms
- Panorama Firm / local directories
- LinkedIn company page

### 4.3 Partner links
Ask 5 contacts (clients/friends/businesses) to link:
- “Website made by TitanCode” in footer is enough.

Goal: **10–30 referring domains** over time.

---

## 5) Conversion upgrades (to attract “big fish”)

### 5.1 Show price positioning earlier
Add a short line near CTA:
- “Projekty od 2 500 PLN. Typowo 7 000–20 000+ PLN.”

### 5.2 Add qualification fields
On contact + estimate:
- budget range
- timeline
- maintenance needed (yes/no)

### 5.3 Productized maintenance
Offer 2–3 retainers:
- 299 / 599 / custom

---

## 6) 30-day execution plan (practical)

### Week 1 — Fix indexing & language structure
- [ ] Add canonical + hreflang everywhere
- [ ] Verify redirects (www/https)
- [ ] Submit sitemap(s) to Search Console
- [ ] Check indexing errors

### Week 2 — Ship 3 PL landing pages
- [ ] “Strony internetowe Warszawa” page
- [ ] “Landing page dla kursu online” page
- [ ] “Panel admina na zamówienie” page

### Week 3 — Case studies
- [ ] Publish 2 case studies (with outcomes)
- [ ] Add 1–2 quotes/testimonials if available (optional)

### Week 4 — Links + local
- [ ] Google Business Profile
- [ ] 5 directory links
- [ ] 5 partner links

---

## 7) What I need from you (to go deeper)

To audit properly, share:
- current repo structure or key pages (routes)
- Search Console screenshots (Pages + Performance)
- robots.txt, sitemap URLs
- current language routing behavior (redirects)

---

## 8) Next step

When you open-source the code in a new convo, we’ll:
1) confirm routing rules
2) implement canonical/hreflang + sitemap
3) define PL landing pages + copy outlines
