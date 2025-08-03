# GoPace - Running Calculator Application

## Project Overview
GoPace is a Next.js-based web application providing running pace calculation tools. It's a production website (gopace.run) that helps runners calculate finish times, required paces, and race splits for common distances (5K, 10K, half marathon, marathon).

## Technology Stack
- **Framework**: Next.js 15.4.4 (App Router)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Analytics**: Vercel Analytics
- **Monetization**: Google AdSense integration
- **Deployment**: Vercel Platform

## Development Commands

### Core Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Available Scripts (from package.json)
- `dev`: Starts Next.js development server
- `build`: Creates production build
- `start`: Runs production server
- `lint`: Runs ESLint with Next.js configuration

## Project Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with SEO metadata
│   ├── page.tsx           # Main pace calculator (home page)
│   ├── pace-predictor/    # Race time prediction tool
│   ├── privacy/           # Privacy policy page
│   ├── tools/             # Tools directory page
│   └── split-calculator/  # Race split planning tool
├── components/            # Reusable React components
│   ├── Card.tsx          # Container component for forms
│   ├── DistanceSelect.tsx # Distance selection component
│   ├── Navbar.tsx        # Navigation with mobile support
│   ├── SEOTextBlock.tsx  # SEO footer content
│   ├── TimeDisplay.tsx   # Time formatting component
│   ├── TimeInput.tsx     # Time input component
│   └── ToolPageLayout.tsx # Layout wrapper for tool pages
└── utils/                # Utility functions
    └── formatTime.ts     # Time formatting helper
```

### Key Architectural Patterns

#### 1. Component Structure
- **Layout Components**: `ToolPageLayout` provides consistent structure for tool pages
- **Card System**: Consistent `Card` wrapper for form content
- **Responsive Design**: Mobile-first approach with responsive navigation

#### 2. State Management
- **Local State**: Uses React `useState` for form state management
- **Client Components**: All interactive components use `'use client'` directive
- **No External State Library**: Simple local state sufficient for current needs

#### 3. Styling Approach
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS Layer**: Global styles in `globals.css` with Tailwind layers
- **Consistent Design System**: 
  - Blue color scheme (`blue-600` primary)
  - Gray backgrounds (`gray-50`)
  - Rounded corners (`rounded-lg`, `rounded-xl`)
  - Shadow system for depth

#### 4. SEO & Performance
- **Metadata API**: Comprehensive SEO metadata in root layout
- **Image Optimization**: Next.js Image component with proper sizing
- **Font Optimization**: Google Fonts (Inter) with `font-display: swap`
- **Analytics**: Vercel Analytics for performance tracking

## Code Conventions & Patterns

### Component Patterns
```typescript
// Standard component structure
'use client';

import { useState } from 'react';
import ComponentName from '@/components/ComponentName';

export default function PageName() {
  const [state, setState] = useState('');
  
  return (
    <ToolPageLayout title="Page Title" subtitle="Description">
      <Card>
        {/* Component content */}
      </Card>
    </ToolPageLayout>
  );
}
```

### Styling Conventions
- **Input Styling**: Consistent focus states with `focus:ring-2 focus:ring-blue-500`
- **Button States**: Active/inactive states with conditional classes
- **Responsive Design**: `flex flex-col sm:flex-row` pattern for mobile-first
- **Color Palette**: 
  - Primary: `blue-600`
  - Text: `gray-900`, `gray-700`, `gray-600`
  - Backgrounds: `gray-50`, `white`

### File Naming
- **Pages**: `page.tsx` (Next.js App Router convention)
- **Components**: PascalCase (e.g., `ToolPageLayout.tsx`)
- **Utilities**: camelCase (e.g., `formatTime.ts`)

### Import Patterns
- **Absolute Imports**: Uses `@/*` path mapping for src directory
- **Component Imports**: Grouped by type (React hooks, Next.js, local components)

## Configuration Files

### TypeScript Configuration
- **Target**: ES2017 for broad browser support
- **Strict Mode**: Enabled for type safety
- **Path Mapping**: `@/*` points to `./src/*`

### ESLint Setup
- **Next.js Rules**: Uses `next/core-web-vitals` and `next/typescript`
- **Flat Config**: Modern ESLint configuration format

### PostCSS Configuration
- **Tailwind Plugin**: `@tailwindcss/postcss` for Tailwind v4

## Production Considerations

### Deployment
- **Platform**: Vercel (optimized for Next.js)
- **Domain**: gopace.run
- **Analytics**: Vercel Analytics integrated
- **Monetization**: Google AdSense implementation

### Performance
- **Image Optimization**: Next.js Image component with proper sizing
- **Font Loading**: Optimized Google Fonts loading
- **CSS**: Tailwind's purging for minimal bundle size

### SEO Features
- **Metadata**: Comprehensive Open Graph and Twitter Card meta tags
- **Structured URLs**: Clean route structure
- **Performance**: Optimized for Core Web Vitals

## Development Workflow

### Getting Started
1. Clone repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server
4. Visit `http://localhost:3000`

### Making Changes
- Components are in `src/components/`
- Pages use App Router in `src/app/`
- Global styles in `src/app/globals.css`
- Utilities in `src/utils/`

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Tailwind for consistent styling
- Component-based architecture for maintainability

# Important Development Notes

## File Access Issues
There appears to be an issue with the Read tool on this system where it returns "File does not exist" even when files clearly exist (confirmed by ls and other bash commands). When encountering this:
1. Use bash commands like `cat`, `head`, `tail` to read file contents
2. Use the Edit tool directly with content confirmed via bash commands
3. Do NOT use the Write tool to "recreate" existing files - this overwrites them unnecessarily
4. Always verify file existence with `ls` or bash commands before assuming files don't exist


## Development Server Management
- ALWAYS ensure localhost development server is running after making changes that need user verification
- Use `npm run dev` to start the server (runs on http://localhost:3000)
- Kill existing processes with `pkill -f "next dev"` if needed before restarting
- The dev server auto-reloads on file changes, but restart if there are issues
