# SEO & Google Tag Manager Setup Guide

## ✅ What's Already Done

### 1. **Favicon Setup** ✓
All your favicon files from `/public` are now configured:
- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png
- Android Chrome icons
- Site manifest

### 2. **SEO Optimization** ✓
- Meta tags (title, description, keywords)
- Open Graph tags (Facebook, LinkedIn)
- Twitter Cards
- Canonical URLs
- Robots meta tags
- Structured data (JSON-LD for Organization & Products)
- Sitemap (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)

### 3. **Google Tag Manager** ✓
GTM code is ready to activate - just add your GTM ID!

---

## 🚀 Setup Instructions

### Google Tag Manager Setup

1. **Create a GTM Account**
   - Go to https://tagmanager.google.com/
   - Click "Create Account"
   - Account Name: "Stash Labs"
   - Container Name: "Stash Labs Website"
   - Target Platform: Web
   - Click "Create"

2. **Get Your GTM ID**
   - After creation, you'll see your GTM ID (format: `GTM-XXXXXXX`)
   - Copy this ID

3. **Add GTM ID to Your Project**
   - Open `.env.local` file
   - Replace the empty value with your GTM ID:
   ```env
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

4. **Restart Your Dev Server**
   ```bash
   pnpm dev
   ```

5. **Verify GTM Installation**
   - Install [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
   - Open your site
   - Click the extension - you should see your GTM container

---

## 📊 Post-Deployment SEO Checklist

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: `https://stashlabs.com`
3. Verify ownership (DNS or HTML file method)
4. Submit sitemap: `https://stashlabs.com/sitemap.xml`

### Google Analytics (via GTM)
1. Create GA4 property at https://analytics.google.com
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. In GTM, add a new tag:
   - Tag Type: Google Analytics: GA4 Configuration
   - Measurement ID: Your GA4 ID
   - Trigger: All Pages

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add your site
3. Submit sitemap: `https://stashlabs.com/sitemap.xml`

---

## 🔍 SEO Best Practices Implemented

### Technical SEO ✓
- [x] Semantic HTML5 structure
- [x] Mobile-responsive design
- [x] Fast page load (Next.js optimization)
- [x] HTTPS (ensure on production)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Structured data (Schema.org)
- [x] Canonical URLs
- [x] Meta descriptions under 160 characters
- [x] Proper heading hierarchy (H1, H2, H3)

### On-Page SEO ✓
- [x] Unique page title
- [x] Descriptive meta description
- [x] Keywords targeting Australian SMBs
- [x] Alt text for images (ensure you add this for any future images)
- [x] Internal linking structure
- [x] External links to product sites

### Social Media SEO ✓
- [x] Open Graph tags (Facebook, LinkedIn)
- [x] Twitter Card tags
- [x] Social media profile links in footer

---

## 📈 Tracking Setup Recommendations

### Recommended GTM Tags to Add:

1. **Google Analytics 4**
   - Pageviews
   - Scroll depth
   - Outbound link clicks

2. **Event Tracking**
   - "Get in touch" button clicks
   - Product link clicks (LifeCycle, TimeTally)
   - Social media link clicks
   - Form submissions (Airtable form)

3. **Conversion Tracking**
   - Contact form submissions
   - Click to product sites

---

## 🎯 Keywords Optimized For

- Stash Labs
- Australian SaaS
- SMB software Australia
- Sydney tech startups
- LifeCycle expiry tracking
- TimeTally payroll software
- Australian small business software
- Student-built SaaS

---

## 🔧 Environment Variables

Create `.env.local` in your project root:

```env
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Note:** Never commit `.env.local` to git! It's already in `.gitignore`.

For production (Vercel/Netlify), add this environment variable in your deployment settings.

---

## ✨ Testing Your Setup

### Test SEO
- [Google Rich Results Test](https://search.google.com/test/rich-results) - Test structured data
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance & SEO score
- [Open Graph Debugger](https://www.opengraph.xyz/) - Social media previews

### Test GTM
- GTM Preview Mode (in GTM interface)
- Google Tag Assistant Chrome Extension
- Check browser console for dataLayer events

---

## 📝 Notes

- **Domain**: Update `https://stashlabs.com` in `layout.tsx` if your actual domain is different
- **Sitemap**: Auto-generated at `/sitemap.xml` - crawlers will find it automatically
- **Structured Data**: Includes Organization and Product information for rich search results
- **No sitemap plugins needed**: Next.js generates it automatically from `app/sitemap.ts`

---

## 🚨 Before Going Live

- [ ] Add GTM ID to environment variables
- [ ] Update domain in `layout.tsx` if not `stashlabs.com`
- [ ] Test all GTM tags in Preview mode
- [ ] Verify favicon appears in browser tab
- [ ] Test social sharing on Twitter/LinkedIn
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics in GTM
- [ ] Configure conversion tracking

---

## 🎉 You're All Set!

Your site now has:
- ✅ Professional SEO setup
- ✅ Google Tag Manager integration
- ✅ Automatic sitemap generation
- ✅ Favicon on all devices
- ✅ Rich social media previews
- ✅ Structured data for search engines

Just add your GTM ID and you're ready to track and analyze!
