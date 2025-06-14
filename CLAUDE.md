# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

This is a Next.js 15 finance tracking application designed as a PWA (Progressive Web App) using the App Router with MongoDB for data persistence and NextAuth.js for authentication. The app follows a mobile-first design approach, with responsive layouts that scale to desktop and other screen sizes.

### Database Architecture
- **Dual MongoDB setup**: Uses both native MongoDB driver and Mongoose
  - Native driver (`src/lib/database/mongodb.js`) for NextAuth adapter
  - Mongoose (`src/lib/database/mongoose.js`) for application models
- **Environment variables required**: `MONGODB_URI`, `MONGODB_DB`, `NEXTAUTH_SECRET`

### Authentication Flow
- NextAuth.js with Google OAuth provider
- JWT-based sessions for stateless authentication
- Custom middleware (`src/middleware.js`) handles route protection:
  - Authenticated users accessing `/auth/*` → redirected to `/dashboard`
  - Non-authenticated users accessing `/dashboard/*` → redirected to `/auth/signin`
- MongoDB adapter stores user data via native driver

### Application Structure
- **Public routes**: Landing page (`src/app/page.js`)
- **Auth routes**: Sign in/up pages (`src/app/auth/`)
- **Protected routes**: Dashboard area (`src/app/dashboard/`)
- **Component Architecture**:
  - `src/components/` - Global reusable components (buttons, forms, UI primitives)
  - `src/app/dashboard/components/` - Dashboard-specific components
  - `src/app/dashboard/transactions/components/` - Transaction page-specific components
  - Each page/section has its own `components/` folder for page-specific components

### Key Implementation Details
- User model defined in Mongoose (`src/models/User.js`)
- Custom sign-in page at `/auth/signin`
- Dashboard uses mobile-responsive layout with SideNav and MobileHeader
- Tailwind CSS with Tailwind Merge for styling
- Framer Motion available for animations

### PWA Configuration
- Web app manifest at `/public/manifest.json` with standalone display mode
- PWA icons in multiple sizes at `/public/icons/`
- Apple-specific meta tags for iOS home screen support
- Mobile-first responsive design with proper viewport settings

### Page Transitions
- iOS-style page transitions using Framer Motion
- `PageTransition` component for slide animations between dashboard routes
- `DashboardPageWrapper` for subtle fade-up animations on individual pages
- Smooth, native-feeling animations with iOS-like easing curves