# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` or `yarn dev` (starts on http://localhost:3000)
- **Build**: `npm run build` (creates production build)
- **Start production**: `npm start` (runs built application)
- **Linting**: `npm run lint` (runs Next.js ESLint)

## Architecture Overview

This is a Next.js 15 application using the App Router pattern with the following key architectural components:

### Core Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom ClashDisplay font family
- **CMS**: Sanity CMS integration for blog content management
- **Animations**: Framer Motion, Lottie Web, Swiper for interactive elements
- **Email**: Nodemailer for contact form functionality

### Project Structure
- `src/app/` - App Router pages and API routes
- `src/components/` - Reusable React components
- `src/lib/` - Utility libraries and Sanity client configuration
- `src/sanity/` - Sanity CMS configuration and schemas
- `public/` - Static assets including custom fonts, images, and animations

### Key Features
- **Multi-page website** with sections: about, contact, support, privacy, terms, FAQ, newsroom
- **Sanity CMS integration** for blog content at `/admin-blog` and `/newsroom`
- **Custom animations** using Lottie and Framer Motion
- **Responsive design** with mobile-first approach
- **Email contact form** via API route
- **Custom cursor component** for enhanced UX
- **Fullscreen navigation** and scroll-based interactions

### Sanity CMS Setup
- Admin interface accessible at `/admin-blog`
- Blog posts available at `/newsroom`
- Schema includes posts, authors, and embedded content
- Uses Sanity Vision plugin for GROQ querying

### Styling Conventions
- Uses Tailwind CSS with custom color scheme and ClashDisplay font
- Custom animations defined for marquee effects
- Mobile-first responsive design approach
- CSS-in-JS with styled-components for complex components

### Important Configuration
- **Next.js config**: Configured for SVG imports via @svgr/webpack and remote image patterns for Sanity CDN and AWS S3
- **Image optimization**: Supports WebP, includes lazy loading, optimized for multiple CDN sources
- **Font loading**: Custom ClashDisplay fonts loaded locally from `/public/fonts/`