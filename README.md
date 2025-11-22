# Stash Labs Landing Page

A modern, production-ready landing page built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Overview

This landing page showcases Stash Labs—a studio of three students building practical SaaS solutions for Australian small businesses. The page features:

- **Smooth scroll animations** with Framer Motion
- **Interactive product cards** for LifeCycle and TimeTally
- **Counter animations** for impact metrics
- **Modal contact form** with Airtable integration
- **Fully responsive** design optimized for all devices
- **Clean, modern aesthetic** with the Satoshi font

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Package Manager**: pnpm
- **Font**: Satoshi (via Fontshare)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Customization Guide

### 1. Update Airtable Form

In `components/CTASection.tsx`, replace the placeholder Airtable embed URL with your actual form:

```tsx
<iframe
  className="airtable-embed w-full h-[600px] bg-transparent border-0"
  src="https://airtable.com/embed/YOUR_ACTUAL_AIRTABLE_FORM_URL"
  title="Contact Form"
/>
```

To get your Airtable embed URL:
1. Create a form in Airtable
2. Click "Share form" → "Embed this form"
3. Copy the embed URL from the iframe code

### 2. Update Colors

Colors are defined in `tailwind.config.ts`:

```typescript
colors: {
  stash: {
    orange: '#FF6B35',      // Main brand color
    'orange-light': '#FF8C61',
    'orange-dark': '#E5522A',
  },
  lifecycle: {
    green: '#10B981',       // LifeCycle product color
    // ...
  },
  timetally: {
    blue: '#3B82F6',        // TimeTally product color
    // ...
  },
}
```

### 3. Update Content

All content can be edited in the respective component files:

- **Hero**: `components/HeroSection.tsx`
- **What We Do**: `components/WhatWeDoSection.tsx`
- **Products**: `components/ProductsSection.tsx` (includes product details, stats, features)
- **Why Stash Labs**: `components/WhySection.tsx`
- **Team**: `components/WhoWeAreSection.tsx`
- **Approach**: `components/ApproachSection.tsx`
- **Footer**: `components/Footer.tsx` (update social links, email, etc.)

### 4. Update Metadata

Edit SEO metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Title",
  description: "Your Description",
};
```

### 5. Add Analytics

Add your analytics provider (Google Analytics, Plausible, etc.) in `app/layout.tsx`.

For example, with Google Analytics:

```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

## Project Structure

```
stash-landing/
├── app/
│   ├── layout.tsx          # Root layout with font and metadata
│   ├── page.tsx            # Main page combining all sections
│   └── globals.css         # Global styles and Tailwind imports
├── components/
│   ├── HeroSection.tsx     # Hero with animated headline
│   ├── WhatWeDoSection.tsx # Company intro
│   ├── ProductsSection.tsx # Product cards with animations
│   ├── WhySection.tsx      # Core beliefs
│   ├── WhoWeAreSection.tsx # Team bios
│   ├── ApproachSection.tsx # Working principles
│   ├── CTASection.tsx      # Contact CTA with modal
│   ├── Footer.tsx          # Footer with links
│   └── Counter.tsx         # Animated counter component
├── hooks/
│   └── useScrollAnimation.ts # Scroll animation hook
└── tailwind.config.ts      # Tailwind configuration
```

## Key Features

### Scroll Animations

The page uses Framer Motion's `useInView` hook to trigger animations when sections come into view. Each section has staggered animations for a polished feel.

### Counter Animations

Stats in the Products section use smooth spring animations that count up when scrolled into view (`Counter.tsx`).

### Interactive Cards

Product cards have hover effects that lift the card, brighten the accent color, and extend the accent bar—creating a premium feel.

### Modal Contact Form

The CTA section opens a modal with an embedded Airtable form. The modal can be customized or replaced with any form provider.

### Responsive Design

All sections are fully responsive with mobile-first breakpoints using Tailwind's responsive utilities.

## Performance

- **Lazy loading**: Sections below the fold render efficiently
- **GPU-accelerated animations**: Uses `transform` and `opacity` for smooth 60fps animations
- **Optimized fonts**: Satoshi loaded via CDN with `display=swap`
- **Minimal JavaScript**: Only interactive components use client-side JavaScript

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

Copyright © 2025 Stash Labs. All rights reserved.

## Support

For questions or issues, contact team@stashlabs.com
