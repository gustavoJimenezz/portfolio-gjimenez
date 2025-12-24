# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development Server
```bash
npm run dev
```
Starts the Next.js development server with Turbopack on port 9002.

### Build
```bash
npm run build
```
Creates a production build. Sets `NODE_ENV=production` explicitly.

### Linting
```bash
npm run lint
```
Runs ESLint on the codebase.

### Type Checking
```bash
npm run typecheck
```
Runs TypeScript compiler in no-emit mode to check for type errors.

### Genkit AI Development
```bash
npm run genkit:dev    # Start Genkit development server
npm run genkit:watch  # Start with watch mode
```
This project includes Firebase Genkit with Google GenAI integration, though the `src/ai/` directory does not currently exist in the repository.

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.3.3 with App Router and Turbopack
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS with shadcn/ui components
- **Language**: TypeScript (strict mode enabled)
- **AI Integration**: Firebase Genkit with Google GenAI (configured but not actively used)
- **Theme**: Dark mode support via next-themes

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with ThemeProvider and global fonts
│   ├── page.tsx           # Homepage composed of section components
│   └── globals.css        # Global styles and Tailwind directives
├── components/
│   ├── layout/            # Layout components (Header, Footer)
│   ├── sections/          # Page sections (Hero, About, Education, Skills, Experience, Projects)
│   ├── ui/                # shadcn/ui components
│   ├── theme-provider.tsx # Dark mode theme provider
│   └── theme-toggle.tsx   # Theme switcher component
├── hooks/                 # React hooks (use-mobile, use-toast)
└── lib/                   # Utilities (cn function, placeholder images)
```

### Component Architecture

**Single-Page Portfolio Layout**: The homepage (`src/app/page.tsx`) is composed of six distinct section components rendered sequentially:
1. Hero - Profile image and introduction
2. About - Personal description
3. Education - Academic background
4. Skills - Technical skills showcase
5. Experience - Work history
6. Projects - Portfolio projects

Each section component is self-contained and located in `src/components/sections/`.

**shadcn/ui Integration**: UI components follow the shadcn/ui pattern with configuration in `components.json`. All components use the `cn()` utility from `src/lib/utils.ts` for conditional class merging.

**Theme System**: The application uses a CSS variable-based theming system with support for light/dark modes. Theme colors and styles are defined in `src/app/globals.css` and extended in Tailwind config. The `ThemeProvider` wraps the entire application in `src/app/layout.tsx`.

### Path Aliases
TypeScript path aliases are configured with `@/*` pointing to the project root:
- `@/src/components/...` for components
- `@/src/lib/...` for utilities
- `@/src/hooks/...` for hooks

Note: The shadcn/ui configuration in `components.json` uses different aliases (`@/components`, `@/lib`, etc.) but the actual imports in the codebase use `@/src/` paths.

### Styling Conventions
- Custom fonts: Inter (body) and Space Grotesk (headlines) loaded via Google Fonts
- Tailwind utilities with custom animations: `fade-in`, `accordion-down`, `accordion-up`
- Responsive design with mobile-first approach
- Dark mode as the default theme

### Known Issues
- The `tailwind.config.ts` file contains commented-out duplicate configurations (lines 1-210) that should be cleaned up
- There are duplicate component files in `src/components/ui/` with "(1)" suffix that may need cleanup
- The Genkit AI scripts reference `src/ai/dev.ts` which doesn't exist in the repository
